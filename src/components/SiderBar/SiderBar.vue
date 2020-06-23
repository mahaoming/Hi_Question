<template>
  <view class="sidebar-view">
    <sider-icon :is-active.sync="isShowSidebar"></sider-icon>
    <view v-if="isShowSidebar">
      <view class="mask" @click="setSidebarHidden"></view>
      <view class="siderbar animation-fade">
        <view class="siderbar__item" @click="onClickAction('collect')">
          <view class="label">收藏</view>
          <image src="/static/image/home/collect.svg" mode="widthFix"></image>
        </view>
        <view class="siderbar__item" @click="onClickAction('wrong')">
          <view class="label">错题集</view>
          <image src="/static/image/home/collect.svg" mode="widthFix"></image>
        </view>
        <button class="siderbar__item" open-type="contact">
          <view class="label">客服</view>
          <image src="/static/image/home/service.svg" mode="widthFix"></image>
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import SiderIcon from "./SiderIcon";

export default {
  components: { SiderIcon },
  data() {
    return {
      isShowSidebar: false
    };
  },
  methods: {
    setSidebarHidden() {
      this.isShowSidebar = false;
    },
    onClickAction(actionName) {
      this.setSidebarHidden();
      if (actionName === "wrong") {
        uni.showToast({ title: "七月初上线!", icon: "none" });
        return;
      }
      uni.navigateTo({
        url: {
          collect: `/pages/question/collect`
        }[actionName]
      });
    }
  }
};
</script>

<style lang="scss" scope>
.sidebar-view {
  position : relative;
  .siderbar {
    position : absolute;
    top : 0rpx;
    left : 100rpx;
    z-index : 20;

    &__item {
      display : flex;

      margin-bottom : 15rpx;
      border-radius : 10px;
      padding : 10rpx 20rpx;
      width : 100px;
      height : 40px;

      font-size : $text-df;

      color : black;
      background : #E0E5EC;

      box-shadow : 7px 7px 15px rgba(55, 84, 170, .15),
      -7px -7px 20px rgba(255, 255, 255, 1),
      inset 0px 0px 4px rgba(255, 255, 255, .2),
      inset 7px 7px 15px rgba(55, 84, 170, 0),
      inset -7px -7px 20px rgba(255, 255, 255, 0),
      0px 0px 4px rgba(255, 255, 255, 0) !important;

      transition : box-shadow .25s ease !important;

      align-items : center;
      justify-content : space-between;
      image {
        width : 40rpx;
      }
      &:hover {
        background : #E0E5EC;

        box-shadow : 7px 7px 15px rgba(55, 84, 170, .15),
        -7px -7px 20px rgba(255, 255, 255, 1),
        inset 0px 0px 4px rgba(255, 255, 255, 0),
        inset 7px 7px 15px rgba(55, 84, 170, .15),
        inset -7px -7px 20px rgba(255, 255, 255, 1),
        0px 0px 4px rgba(255, 255, 255, .2) !important;
      }
      &::after {
        border : none !important;
      }
    }
  }
  .mask {
    position : absolute;
    top : 0;
    left : -10vw;
    z-index : 10;

    width : 110vw;
    height : 100vh;

    background : transparent;
  }
}

</style>