<template>
  <view
    v-if="isShow"
    :class="[animation.enter, animation.active, animation.leave]"
    :style="stylesObject"
    @click="change"
  >
    <slot></slot>
  </view>
</template>

<script>
const animation = { enter: "", active: "", leave: "" };

export default {
  name: "hiTransition",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: "fade"
    },
    styles: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      isShow: false,
      animation: Object.assign({}, animation)
    };
  },
  computed: {
    stylesObject() {
      let _styles = "";
      const toLine = name => {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      };
      for (let i in this.styles) {
        _styles += `${toLine(i)}:${this.styles[i]};`;
      }
      return _styles;
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.$_setEnter();
        } else {
          this.$_setLeave();
        }
      }
    }
  },
  methods: {
    // private method
    $_setEnter() {
      clearTimeout(this.timer);
      this.isShow = true;
      this.animation.enter = `hi-${this.name}-enter`;
      this.$nextTick(() => {
        setTimeout(() => {
          this.$_setAnimation(true);
        }, 50 + this.duration);
      });
    },
    $_setLeave(type) {
      clearTimeout(this.timer);
      this.$_setAnimation(false);
    },
    $_setAnimation(type) {
      this.animation = Object.assign({}, animation);
      if (type) {
        this.animation.active = `hi-${this.name}-active`;
      } else {
        this.animation.leave = `hi-${this.name}-leave`;
      }
      this.timer = setTimeout(() => {
        if (!type) {
          this.isShow = false;
        }
        this.$emit("change", {
          detail: this.isShow
        });
      }, 250);
    },
    change() {
      this.$emit("click", {
        detail: this.isShow
      });
    }
  }
};
</script>

<style lang="scss">
.hi-fade {
  &-enter {
    opacity: 0.01;
  }
  &-active {
    transition: opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
    opacity: 1;
  }
  &-leave {
    transition: opacity 250ms linear;
    opacity: 0.01;
  }
}

.hi-bounce {
  &-enter {
    transform: scale(0.5);
  }
  &-active {
    animation: bounce-in 300ms linear;
  }
  &-leave {
    animation: zoom-out 250ms linear;
  }
}

.hi-zoom {
  &-enter {
    opacity: 0.01;
    transform: scale(0.75);
  }
  &-active {
    transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  &-leave {
    opacity: 0.01;
    transform: scale(0.75);
    transition: all 250ms linear;
  }
}

.hi-punch {
  &-enter {
    opacity: 0.01;
    transform: scale(1.35);
  }
  &-active {
    transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  &-leave {
    opacity: 0.01;
    transform: scale(1.35);
    transition: all 250ms linear;
  }
}

.hi-slide-up {
  &-enter {
    transform: translate3d(0, 100%, 0);
  }
  &-active {
    transition: transform 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  &-leave {
    transform: translate3d(0, 100%, 0);
    transition: transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}

.hi-slide-right {
  &-enter {
    transform: translate3d(-100%, 0, 0);
  }
  &-active {
    transition: transform 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  &-leave {
    transform: translate3d(-100%, 0, 0);
    transition: transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}

.hi-slide-down {
  &-enter {
    transform: translate3d(0, -100%, 0);
  }
  &-active {
    transition: transform 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  &-leave {
    transform: translate3d(0, -100%, 0);
    transition: transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}

.hi-slide-left {
  &-enter {
    transform: translate3d(100%, 0, 0);
  }
  &-active {
    transition: transform 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  &-leave {
    transform: translate3d(100%, 0, 0);
    transition: transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}

.hi-fade-up {
  &-enter {
    opacity: 0.01;
    transform: translate3d(0, 20%, 0);
  }
  &-active {
    transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  &-leave {
    opacity: 0.01;
    transform: translate3d(0, 20%, 0);
    transition: all 250ms linear;
  }
}

.hi-fade-right {
  &-enter {
    opacity: 0.01;
    transform: translate3d(-20%, 0, 0);
  }
  &-active {
    transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  &-leave {
    opacity: 0.01;
    transform: translate3d(-20%, 0, 0);
    transition: all 250ms linear;
  }
}

.hi-fade-down {
  &-enter {
    opacity: 0.01;
    transform: translate3d(0, -20%, 0);
  }
  &-active {
    transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  &-leave {
    opacity: 0.01;
    transform: translate3d(0, -20%, 0);
    transition: all 250ms linear;
  }
}

.hi-fade-left {
  &-enter {
    opacity: 0.01;
    transform: translate3d(20%, 0, 0);
  }
  &-active {
    transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  &-leave {
    opacity: 0.01;
    transform: translate3d(20%, 0, 0);
    transition: all 250ms linear;
  }
}

.hi-fly {
  &-active {
    animation: fly-in 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  &-leave {
    animation: zoom-out 250ms;
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0.5);
  }
  45% {
    transform: scale(1.05);
  }
  80% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes zoom-out {
  to {
    opacity: 0.01;
    transform: scale(0.75);
  }
}

@keyframes fly-in {
  0% {
    opacity: 0.5;
    transform: scale(0.5) translate3d(0, 50px, 0);
  }
  45% {
    opacity: 1;
    transform: scale(1.05) translate3d(0, -50px, 0);
  }
  100% {
    transform: scale(1) translate3d(0, 0, 0);
  }
}
</style>
