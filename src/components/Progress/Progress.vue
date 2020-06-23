<template>
  <view>
    <!-- 进度条 -->
    <view class="neumorphic-progress" v-if="isShow">
      <view class="neumorphic-progress__back"></view>
      <view class="neumorphic-progress__line"></view>
    </view>

    <view :class="isShow ? 'mask-wrap' : ''">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.mask-wrap {
  filter: blur(4rpx);
}

.neumorphic-progress {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20;

  margin: auto;
  width: 260px;

  transform: translateX(-50%);
}

.neumorphic-progress__back,
.neumorphic-slider__back {
  border: 4px solid #f3f4f7;
  border-radius: 10px;
  height: 24px;

  background-color: var(--back-color);

  box-shadow: 7px 7px 15px rgba(55, 84, 170, 0.15),
    -7px -7px 20px rgba(255, 255, 255, 1),
    inset 0px 0px 4px rgba(255, 255, 255, 0),
    inset 7px 7px 15px rgba(55, 84, 170, 0.15),
    inset -7px -7px 20px rgba(255, 255, 255, 1),
    0px 0px 4px rgba(255, 255, 255, 0.2) !important;
}

.neumorphic-slider {
  width: 240px;
}

.neumorphic-slider__back {
  margin-left: -10px;
  width: calc(100% + 20px);
}

.neumorphic-progress__line {
  margin-top: -20px;
  margin-left: 4px;
  border-radius: 8px;
  width: var(--value);
  height: 16px;

  background-color: #185bf1;

  opacity: 1;

  animation: sliding 3s ease;
}

@keyframes sliding {
  0% {
    width: 0;
  }
  100% {
    width: calc(100% - 8px);
  }
}
</style>