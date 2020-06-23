<template>
  <view class="home-wrap">
    <!-- 导航栏 -->
    <navbar
      :back="false"
      fixed
      transparent="hidden"
      :backgroundColor="[224, 229, 236]"
    >
      <block slot="left">
        <sider-bar></sider-bar>
      </block>
    </navbar>

    <view class="margin-lr">
      <!-- 用户头像 -->
      <view class="user-wrap" v-if="!isAuth">
        <view>
          <text class="nickname">未登陆</text>
          <text>点击头像登陆</text>
        </view>
        <view>
          <button
            class="avatar"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo"
          ></button>
        </view>
      </view>
      <view class="user-wrap" v-else>
        <view>
          <text class="nickname">{{ userInfo.nickname }}</text>
          <text> {{ userInfo.created_at | parseTime("{y}-{m}-{d}") }}</text>
        </view>
        <view>
          <image :src="userInfo.avatar" class="avatar"></image>
        </view>
      </view>

      <!-- 目标 -->
      <view class="target-wrap" @click="onClickTarget">
        <image
          class="target-wrap--icon"
          src="../../static/image/home/target3.svg"
        ></image>
        <text class="target-wrap--text" v-if="remainDay === ''"
          >请设置一个考研年份作为目标吧!</text
        >
        <view class="flex remain" v-else>
          <view>距离考研还有</view>
          <view class="day">{{ remainDay }}</view>
          <view>天</view>
        </view>
      </view>

      <!-- 操作栏 -->
      <view class="action-wrap">
        <view
          class="action-wrap--item"
          v-for="(action, index) of actionList"
          @click="onClickAvatar(action)"
          :key="index"
        >
          <image mode="widthFix" :src="action.image"></image>
          <text>{{ action.title }}</text>
        </view>
      </view>

      <!-- 你的刷题 -->
      <paper-result></paper-result>
    </view>
  </view>
</template>

<script>
import SiderBar from "_c/SiderBar/SiderBar";
import PaperResult from "./components/PaperResult";
import { mapGetters, mapActions } from "vuex";
import { dateDifference } from "_u/date";

export default {
  components: {
    SiderBar,
    PaperResult
  },
  data() {
    return {
      actionList: [
        {
          image: "../../static/image/home/test.svg",
          title: "真题集训",
          url: "/pages/subject/index"
        },
        {
          image: "../../static/image/home/real.svg",
          title: "模拟训练",
          url: "/pages/subject/index"
        },
        {
          image: "../../static/image/home/rank.svg",
          title: "排行榜",
          url: "/pages/rank/index"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("user", ["isAuth", "userInfo"]),
    ...mapGetters("target", ["remainDay"])
  },
  mounted() {
    this.getUserTarget();
  },
  methods: {
    ...mapActions("user", ["authUserInfo"]),
    ...mapActions("target", ["getUserTarget"]),

    // 获取用户信息
    getUserInfo(e) {
      this.authUserInfo(e);
    },

    // 跳转到对应页面
    onClickAvatar(action) {
      if (this.isAuth) {
        const { title, url } = action;
        uni.navigateTo({ url: `${url}?title=${title}` });
      } else {
        uni.showToast({ title: "请点击头像登录", icon: "none" });
      }
    },

    // 跳转到排行榜
    onClickTarget() {
      uni.navigateTo({ url: "/pages/target/index" });
    }
  }
};
</script>

<style lang="scss" scope>
.home-wrap {
  background: $theme-bg;
  .user-wrap {
    display: flex;

    margin-top: 50rpx;

    justify-content: space-between;
    text {
      display: block;
    }
    .nickname {
      font-size: $text-xxl;
      font-weight: 800;
    }
    .avatar {
      border-radius: 50px;
      width: 100rpx;
      height: 100rpx;

      background: url(https://s1.ax1x.com/2020/03/31/GMG02j.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;

      box-shadow: -5px 5px 10px #bec3c9, 5px -5px 10px #ffffff;
    }
  }
  .target-wrap {
    display: flex;

    margin-top: 40rpx;
    border-radius: 10px;
    padding: 0 30rpx;
    width: 100%;
    height: 120rpx;

    background: #e0e5ec;

    box-shadow: -4px 4px 8px #bec3c9, 4px -4px 8px #ffffff;

    align-items: center;
    justify-content: space-between;
    &--icon {
      border-radius: 50px;
      width: 60rpx;
      height: 60rpx;

      background: linear-gradient(225deg, #f0f5fd, #caced4);

      box-shadow: -3px 3px 5px #bec3c9, 3px -3px 5px #ffffff;
    }
    &--text {
      font-size: $text-df;

      color: $gray;
    }

    .remain {
      display: flex;

      font-size: $text-lg;
      letter-spacing: 1rpx;

      color: $gray;

      align-items: center;
      justify-content: center;

      .day {
        margin: 0 10rpx;
        border-radius: 16rpx;
        padding: 10rpx;

        text-align: center;
        letter-spacing: 2rpx;

        background: #e0e5ec;

        box-shadow: 1px 1px 2px #bec3c9, -1px -1px 2px #ffffff;
      }
    }
  }
  .action-wrap {
    display: grid;
    // width: 100%;

    margin-top: 60rpx;

    column-gap: 30rpx;
    grid-template-columns: repeat(3, 1fr);
    &--item {
      display: flex;

      border-radius: 10px;
      height: 200rpx;

      background: #e0e5ec;

      box-shadow: 7px 7px 15px rgba(55, 84, 170, 0.15),
        -7px -7px 20px rgba(255, 255, 255, 1),
        inset 0px 0px 4px rgba(255, 255, 255, 0.2),
        inset 7px 7px 15px rgba(55, 84, 170, 0),
        inset -7px -7px 20px rgba(255, 255, 255, 0),
        0px 0px 4px rgba(255, 255, 255, 0) !important;

      transition: box-shadow 0.25s ease !important;

      align-items: center;
      flex-direction: column;
      justify-content: center;

      image {
        width: 100rpx;

        opacity: 0.85;
      }
      &:active {
        background: #e0e5ec;

        box-shadow: 7px 7px 15px rgba(55, 84, 170, 0.15),
          -7px -7px 20px rgba(255, 255, 255, 1),
          inset 0px 0px 4px rgba(255, 255, 255, 0),
          inset 7px 7px 15px rgba(55, 84, 170, 0.15),
          inset -7px -7px 20px rgba(255, 255, 255, 1),
          0px 0px 4px rgba(255, 255, 255, 0.2) !important;
      }
    }
  }
}
</style>