<template>
  <div
    class="eum-nav-icon"
    :class="isActive ? 'active' : ''"
    @click="setIconActive"
  >
    <text></text>
    <text></text>
    <text></text>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setIconActive() {
      this.$emit("update:isActive", true);
    }
  }
};
</script>

<style lang="scss">
.eum-nav-icon {
  display : flex;

  border-radius : 10px;
  width : 40px;
  height : 40px;

  background : #E0E5EC;

  box-shadow : -8px 8px 15px #BEC3C9, 8px -8px 15px #FFFFFF;

  align-items : center;
  flex-direction : column;
  justify-content : center;
  text {
    margin : 4rpx 0;
    border-radius : 4px;
    width : 20px;
    height : 4rpx;

    background-color : lightcoral;

    box-shadow : 0 0 20rpx 0 rgba(240, 128, 128, .3);

    transition : margin .4s cubic-bezier(.79, .21, .06, .81),
    transform .4s cubic-bezier(.79, .21, .06, .81);
    &:nth-child(2) {
      transform-origin : 50% 50%;
    }
  }
  &.active {
    background : #E0E5EC;

    box-shadow : inset -5px 5px 9px #BEC3C9, inset 5px -5px 9px #FFFFFF;
    text {
      margin : -2rpx;
      &:nth-child(1) {
        transform : rotate(-45deg);
      }
      &:nth-child(2) {
        transform : scale(0);
      }
      &:nth-child(3) {
        transform : rotate(45deg);
      }
    }
  }
}

</style>