<template>
  <view class="question-wrap">
    <!-- 导航栏 -->
    <navbar
      fixed
      transparent="show"
      :border="isShowBorder"
      :backgroundColor="[224, 229, 236]"
    >
      <view v-if="timing !== 0">
        <count-down
          color="#000000"
          background-color="transparent"
          border-color="transparent"
          :show-day="false"
          :second="timing"
        ></count-down>
      </view>
      <view class="upload" @click="onClickUpload"></view>
    </navbar>

    <!-- 内容 -->
    <view class="margin-lr-sm">
      <progress :is-show="isShowProgress">
        <!-- 试卷题目 -->
        <view class="margin-top-sm text-xxl text-bold flex justify-center">
          {{ title }}
        </view>
        <!-- 试卷列表 -->
        <question-list
          :question-list="questionList"
          canSelect
          @collect="$_onCollectQuestion"
          @select="$_onSelectOption"
        ></question-list>
      </progress>
    </view>
  </view>
</template>

<script>
import parser from "_c/jyf-parser/jyf-parser";
import CountDown from "_c/CountDown/CountDown";
import Progress from "_c/Progress/Progress";
import QuestionList from "./components/QuestionList";

import { mapActions, mapGetters } from "vuex";

let paperId = null; // 试卷id

export default {
  components: {
    "jyf-parser": parser,
    CountDown,
    Progress,
    QuestionList
  },

  data() {
    return {
      title: "----",
      isShowProgress: false,
      isShowBorder: false,
      timing: 0
    };
  },

  onLoad(option) {
    this.title = option.title;
    paperId = option.id;
    this.timing = option.timing; // 设置考试时间
    this.getPaperDetail({ paperId });
  },

  filters: {
    indexFilter: function(index) {
      return index < 10 ? `0${index}题` : `${index}题`;
    }
  },

  onPageScroll(e) {
    this.isShowBorder = e.scrollTop !== 0;
  },

  computed: {
    ...mapGetters("question", ["questionList"])
  },

  methods: {
    ...mapActions("question", [
      "getPaperDetail",
      "onCollectQuestion",
      "onSelectOption"
    ]),

    // 收藏问题
    $_onCollectQuestion(questionIndex) {
      this.onCollectQuestion({ questionIndex, paperId });
    },

    // 选择选项
    $_onSelectOption(questionIndex, optionIndex) {
      this.onSelectOption({ questionIndex, optionIndex });
    },

    // 上传问题
    async onClickUpload() {
      uni.showModal({
        title: "是否确认提交试卷",
        success: async res => {
          if (res.confirm) {
            if (!this.isShowProgress) {
              this.isShowProgress = true;
              let wrongQuestionsList = this.questionList.filter(item => {
                return item.selectOption !== item.rightOption;
              });
              wrongQuestionsList = wrongQuestionsList.map(item => {
                const { content, selectOption, id } = item;
                return { content, selectOption, id };
              });
              let QuestionResult = new wx.BaaS.TableObject("paper_result");
              let QuestionPaper = new wx.BaaS.TableObject("paper_paper");

              let MyRecord = QuestionResult.create();
              let questionPaper = QuestionPaper.getWithoutData(paperId);

              MyRecord.set({
                paper: questionPaper,
                wrongQuestions: [...wrongQuestionsList],
                rightQuestionsNum:
                  this.questionList.length - wrongQuestionsList.length,
                userinfo: this.$store.state.user.userInfo,
                inRank: this.timing !== 0 ? true : false
              });
              const ResultRes = await MyRecord.save();

              // TODO 保存错题
              this.saveWrongQuestion(wrongQuestionsList);

              setTimeout(() => {
                uni.redirectTo({
                  url: `/pages/question/result?resultId=${ResultRes.data.id}&paperId=${paperId}&title=${this.title}`
                });
              }, 2500);
            }
          }
        }
      });
    },

    // 添加入错题集
    saveWrongQuestion() {},

    // 返回上一层
    onClickBack() {
      uni.navigateBack({
        delta: -1
      });
    }
  }
};
</script>

<style lang="scss" scope>
.question-wrap {
  .upload {
    margin-left: 20rpx;
    border-radius: 10px;
    width: 72rpx;
    height: 72rpx;

    background-image: url("../../static/image/upload/upload.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 55%;
    // background: #e0e5ec;

    box-shadow: -8px 8px 15px #bec3c9, 8px -8px 15px #ffffff;
    &:active {
      box-shadow: inset -5px 5px 9px #bec3c9, inset 5px -5px 9px #ffffff;
    }
  }
  .question-item {
    display: grid;

    column-gap: 20rpx;
    grid-template-columns: 8.5fr 1.5fr;
    .question {
      margin: 35rpx 15rpx;
      border-radius: 20rpx;
      padding: 30rpx;

      background: #e0e5ec;

      box-shadow: 10px 10px 19px #bec3c9, -10px -10px 19px #ffffff;
      .topic {
        font-size: $text-df;
        letter-spacing: 12rpx;

        color: $gray;
        .num {
          margin: 0 10rpx;
          text-align: center;
          letter-spacing: 2rpx;
          background: #e0e5ec;
          box-shadow: 1px 1px 2px #bec3c9, -1px -1px 2px #ffffff;
          border-radius: 8rpx;
          padding: 2rpx 6rpx;
        }
      }
      .content {
        margin-top: 20rpx;
        margin-bottom: 40rpx;

        font-size: $text-lg;
      }
    }
    .action {
      display: flex;

      align-items: center;
      justify-content: center;
      .collect {
        display: flex;

        border-radius: 50%;
        width: 100rpx;
        height: 100rpx;

        background: linear-gradient(145deg, #caced4, #f0f5fd);

        box-shadow: 5px 5px 11px #bec3c9, -5px -5px 11px #ffffff;

        align-items: center;
        justify-content: center;
        image {
          width: 70rpx;

          transition: background-image 1s ease;
        }
      }
      .collected {
        background: #e0e5ec;

        box-shadow: inset 5px 5px 11px #bec3c9, inset -5px -5px 11px #ffffff;
      }
    }
  }
}

.radiogroup {
  margin: 0 auto;
  border-radius: 16px;
  .wrapper {
    padding: 6px 12px;
  }

  .state {
    position: absolute;
    top: 0;
    right: 0;

    opacity: 1e-5;

    pointer-events: none;
  }

  .label {
    display: inline-flex;
    display: grid;

    width: 100%;

    word-wrap: break-word;
    word-break: break-all;

    color: #394a56;

    align-items: center;
    grid-template-columns: 1fr 9fr;
  }
  .text {
    margin-left: 16px;
    width: 100%;

    font-size: $text-df;

    opacity: 0.6;

    transition: opacity 0.2s linear, transform 0.2s ease-out;
  }

  .indicator {
    overflow: hidden;

    position: relative;

    border-radius: 50%;
    width: 30px;
    height: 30px;

    background: #e0e5ec;

    box-shadow: 3px 3px 6px #bec3c9, -3px -3px 6px #ffffff;
  }

  .indicator::before,
  .indicator::after {
    position: absolute;
    top: 10%;
    left: 10%;

    border-radius: 50%;
    width: 80%;
    height: 80%;

    content: "";
  }

  .indicator::before {
    box-shadow: -4px -2px 4px 0px #d1d9e6, 4px 2px 8px 0px #ffffff;
  }

  .indicator::after {
    background-color: #ecf0f3;

    box-shadow: -4px -2px 4px 0px #ffffff, 4px 2px 8px 0px #d1d9e6;

    transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
    transform: scale3d(1, 1, 1);
  }
}

.checked {
  .indicator::after {
    opacity: 0;

    transform: scale3d(0.975, 0.975, 1) translate3d(0, 10%, 0);
  }
  .text {
    font-size: $text-xl;

    opacity: 1;

    transform: translate3d(8px, 0, 0);
  }
}
</style>