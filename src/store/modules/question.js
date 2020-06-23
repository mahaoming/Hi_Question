import func from "_u/func";

const state = {
  score: 0,
  questionList: [],
  collectList: [],
};

const mutations = {
  ["SET_SCORE"](state, data) {
    state.score = data;
  },
  ["SET_QUESTION_LIST"](state, data) {
    state.questionList = data;
  },
  ["SET_COLLECT_LIST"](state, data) {
    state.collectList = data;
  },
};

const getters = {
  questionList: (state) => {
    return state.questionList;
  },
  score: (state) => {
    return state.score;
  },
};

const actions = {
  // 获取试卷题目
  async getQuestionList({ commit }, paperId) {
    let QuestionPaper = new wx.BaaS.TableObject("question_paper");
    let questionPaper = QuestionPaper.getWithoutData(paperId);

    let query = new wx.BaaS.Query();
    let Question = new wx.BaaS.TableObject("question");
    query.compare("paper", "=", questionPaper);
    const res = await Question.setQuery(query).find();

    commit("SET_QUESTION_LIST", res.data.objects);
    return res.data.objects;
  },

  // 获取收藏题目
  async getCollectList({ commit }, paperId) {
    let QuestionCollect = new wx.BaaS.TableObject("question_collect");
    let query = new wx.BaaS.Query();

    // 查询指定试卷收藏题目
    if (paperId) {
      let QuestionPaper = new wx.BaaS.TableObject("question_paper");
      let questionPaper = QuestionPaper.getWithoutData(paperId);
      query.compare("paper", "=", questionPaper);
    }
    const res = await QuestionCollect.setQuery(query)
      .expand("question")
      .find();

    commit("SET_COLLECT_LIST", res.data.objects);
    return res.data.objects;
  },

  // 获取试卷内容
  async getPaperDetail({ commit, dispatch }, { paperId }) {
    uni.showLoading({ title: "加载中..." });
    let questionList = await dispatch("getQuestionList", paperId);
    let collectList = await dispatch("getCollectList", paperId);

    // 合并数据
    questionList = questionList.map((item) => {
      collectList = collectList.filter((collectItem) => {
        if (item.id === collectItem.question.id) {
          item = Object.assign(
            {
              selectOption: -1,
              isCollected: true,
              collectId: collectItem.id,
            },
            item
          );
        }
        return item.id !== collectItem.question.id;
      });
      item = Object.assign({ selectOption: -1, isCollected: false }, item);
      return item;
    });

    commit("SET_QUESTION_LIST", questionList);
    uni.hideLoading();
  },

  // 获取试卷结果
  async getPaperResult({ commit, dispatch }, { resultId, paperId }) {
    uni.showLoading({ title: "加载中..." });
    let questionList =
      state.questionList.length === 0
        ? await dispatch("getQuestionList", paperId)
        : state.questionList;
    let collectList =
      state.collectList.length === 0
        ? await dispatch("getCollectList", paperId)
        : state.collectList;

    let PaperResult = new wx.BaaS.TableObject("paper_result");
    let paperResult = await PaperResult.get(resultId);

    let { wrongQuestions } = paperResult.data;

    // 计算分数
    const score =
      100 *
      (
        (questionList.length - wrongQuestions.length) /
        questionList.length
      ).toFixed(1);
    commit("SET_SCORE", score);

    // 合并数据
    questionList = questionList.map((item) => {
      collectList = collectList.filter((collectItem) => {
        if (item.id === collectItem.question.id) {
          item = Object.assign(
            {
              selectOption: -1,
              isCollected: true,
              collectId: collectItem.id,
            },
            item
          );
        }
        return item.id !== collectItem.question.id;
      });
      // 错题筛选
      wrongQuestions = wrongQuestions.filter((wrongItem) => {
        if (wrongItem.id === item.id) {
          item = Object.assign(
            {
              selectOption: wrongItem.selectOption,
              wrongSelectOption: wrongItem.selectOption,
              isShowAnswer: true,
              isWrong: true,
            },
            item
          );
        }
        return wrongItem.id !== item.id;
      });

      item = Object.assign(
        {
          selectOption: item.rightOption,
          isCollected: false,
          isWrong: false,
        },
        item
      );
      return item;
    });

    uni.hideLoading();
    commit("SET_QUESTION_LIST", questionList);
  },

  // 设置收藏题目
  // TODO 增加多英语题干单一的判断, 根据返回的收藏列表
  async onCollectQuestion({ commit, state }, { questionIndex, paperId }) {
    let questionList = state.questionList;
    const canCollect = !questionList[questionIndex]["isCollected"];

    let QuestionCollect = new wx.BaaS.TableObject("question_collect");
    let QuestionPaper = new wx.BaaS.TableObject("question_paper");
    let Question = new wx.BaaS.TableObject("question");

    if (canCollect) {
      if (func.isEmpty(paperId)) return uni.showToast("缺少关联试卷");

      let questionPaper = QuestionPaper.getWithoutData(paperId);
      let question = Question.getWithoutData(questionList[questionIndex].id);
      let MyRecord = QuestionCollect.create();
      MyRecord.set({
        paper: questionPaper,
        question: question,
      });
      const res = await MyRecord.save();

      questionList[questionIndex] = Object.assign(questionList[questionIndex], {
        isCollected: true,
        collectId: res.data.id,
      });
      uni.showToast({ title: "收藏成功!" });
    } else {
      // 取消收藏
      QuestionCollect.delete(questionList[questionIndex]["collectId"]);
      questionList[questionIndex] = Object.assign(questionList[questionIndex], {
        isCollected: false,
        collectId: null,
      });
      uni.showToast({ title: "已取消收藏!", icon: "none" });
    }

    commit("SET_QUESTION_LIST", questionList);
  },

  // 设置选择选项
  onSelectOption({ commit }, { questionIndex, optionIndex }) {
    let questionList = state.questionList;
    questionList[questionIndex]["selectOption"] = optionIndex;
    uni.vibrateShort();
    commit("SET_QUESTION_LIST", questionList);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
