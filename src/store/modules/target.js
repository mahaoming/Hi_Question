import { dateDifference } from "_u/date";
import func from "_u/func";

const state = {
  userTarget: {},
  timeInterval: {},
};

const mutations = {
  ["SET_USER_TARGET"](state, data) {
    state.userTarget = data;
  },
  ["SET_TIME_INTERVAL"](state, data) {
    state.timeInterval = data;
  }
};

const getters = {
  remainDay: (state) => {
    if (func.notEmpty(state.userTarget)) {
      // 返回目标时间与当前时间的间隔
      return dateDifference(new Date(), state.userTarget.target.detailDate);
    } else {
      return "";
    }
  },
  targetYear: (state)=>{
    if (func.notEmpty(state.userTarget)) {
      return state.userTarget.target.year;
    } else {
      return "";
    }
  },
  timeInterval: (state) => {
    return state.timeInterval;
  }
};

const actions = {
  getUserTarget({ commit }) {
    let UserTarget = new wx.BaaS.TableObject("user_target");
    UserTarget.expand("target")
      .find()
      .then((res) => {
        if (res.data.objects.length !== 0) {
          commit("SET_USER_TARGET", res.data.objects[0]);
        }
      })
      .catch(console.error);
  },

  // 获取目标区间
  getTimeInterval({ commit }) {
    let TargetTimes = new wx.BaaS.TableObject("target_year");
    TargetTimes.find().then((res) => {
      if (res.statusCode === 200) {
        const timeArray = JSON.parse(JSON.stringify(res.data.objects));
        const time = {
          timeArray,
          startTime: res.data.objects.shift(),
          endTime: res.data.objects.pop(),
        };
        commit("SET_TIME_INTERVAL", time);
      }
    });
  },

  // 设置目标
  async setTargetChange({ commit, state }, target) {
    let TargetTimes = new wx.BaaS.TableObject("target_year");
    let UserTarget = new wx.BaaS.TableObject("user_target");

    let targetTime = TargetTimes.getWithoutData(target.id);
    let myRecord = null;

    // 如果已存在目标年则更新, 没有则创建
    if (func.notEmpty(state.userTarget)) {
      myRecord = UserTarget.getWithoutData(state.userTarget.id);
      myRecord.set("target", targetTime);
      await myRecord.update();
    } else {
      myRecord = UserTarget.create();
      myRecord.set({ target: targetTime });
      await myRecord.save();
    }
    uni.showToast({
      title: func.notEmpty(state.userTarget) ? "更新成功" : "创建成功",
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
