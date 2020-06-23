import {
  SET_USERINFO,
  SET_ISAUTH
} from './../mutations_type'

import { dateDifference } from "_u/date";
import func from "_u/func";

const state = {
  userInfo: {},
  isAuth: false,
  hasUserInfo: false
}

const mutations = {
  [SET_USERINFO](state, data) {
    state.userInfo = data
  },
  [SET_ISAUTH](state, data) {
    state.isAuth = data
  }
}

const getters = {
  userInfo: state => {
    return state.userInfo
  },
  userId: state => {
    return state.userInfo.userId
  },
  isAuth: state => {
    return state.isAuth
  }
}

const actions = {
  // 获取用户信息
  async getUserInfo({ commit }) {
    try {
      let user = await wx.BaaS.auth.loginWithWechat()
      // user 为 currentUser 对象
      commit(SET_USERINFO, {
        nickname: user.nickname,
        avatar: user.avatar,
        userId: user.user_id,
        created_at: user.created_at
      })
      commit(SET_ISAUTH, user.is_authorized || false)
      return true
    } catch (err) {
      console.log('getUserInfo', err)
      commit(SET_ISAUTH, false)
      return false
    }
  },

  // 微信用户授权
  async authUserInfo({ commit }, userInfo) {
    uni.showLoading({title: '登录中...'})
    const res = await wx.BaaS.auth.loginWithWechat(userInfo, {
      syncUserProfile: 'overwrite'
    })
    uni.hideLoading()
    commit(SET_USERINFO, {
      nickname: res.nickname,
      avatar: res.avatar,
      userId: res.user_id,
      created_at: res.created_at
    })
    commit(SET_ISAUTH, true)
    return true
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
