<template>
  <view class="prompt-wrap animation-fade"
        :style="{background: bgColor === '' ? '' : '#ffbe5c', height: windowHeight}"
        :class="inlineBlock ? 'prompt-wrap__iniline' : ''"
        v-if="visible">
    <block v-if="type !== ''">
      <img :src="typeImage"
           @click="onPrompt"
           mode="widthFix">
    </block>
    <block v-else>
      {{icon}}
      <img :src="icon">
    </block>
    <view class="title">{{title}}</view>
    <view class="text">{{text}}</view>
    <view class="button-wraper">
      <slot></slot>
    </view>
  </view>
</template>
<script>
export default {
  name: 'Prompt',
  props: {
    icon: {
      type: String,
      default: ''
    },
    windowHeight: {
      type: String,
      default: '100%'
    },
    title: String,
    text: String,
    visible: {
      type: Boolean,
      default: true
    },
    bgColor: {
      type: String,
      default: ''
    },
    inlineBlock: {
      type: Boolean,
      default: false
    },
    type: {
      validator (value) {
        return ['nocollect', 'nodata', 'noorder', 'nothing', 'nologin', 'noimage', 'nocoupon', 'nomessage', 'nofinish', 'nonet'].indexOf(value) !== -1
      },
      type: String,
      default: ''
    }
  },
  computed: {
    typeImage () {
      const typeImage = {
        'nomore': 'https://7072-pro-5hy50-1301379185.tcb.qcloud.la/loading/undraw_result_5583.svg?sign=4627484bf910d92a432e878986fb4da0&t=1584697747',
        'noconsume': 'https://7072-pro-5hy50-1301379185.tcb.qcloud.la/loading/undraw_deliveries_131a.svg?sign=bdc4a848bd33c9bb38623772db77809b&t=1584698165',
        'nologin': '../../static/image/home/empty.png',
        'nothing': 'https://7072-pro-5hy50-1301379185.tcb.qcloud.la/loading/undraw_result_5583.svg?sign=4627484bf910d92a432e878986fb4da0&t=1584697747',
        'noasset': 'https://7072-pro-5hy50-1301379185.tcb.qcloud.la/loading/undraw_noted_pc9f.svg?sign=84c3d45e757200ae7388c3dc2017cfb2&t=1584698424',
        'nocoupon': 'https://cloud-minapp-31286.cloud.ifanrusercontent.com/noncoupon_v2.png',
        'nomessage': 'https://cloud-minapp-31286.cloud.ifanrusercontent.com/nonmessage_v1.png',
        'nofinish': 'https://cloud-minapp-31286.cloud.ifanrusercontent.com/nonfinished_v1.png'
      }
      return typeImage[this.type]
    }
  },
  methods: {
    onPrompt () {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss">
.prompt-wrap {
  display : flex;

  position : absolute;
  left : 0;

  width : 100vw;

  align-items : center;
  flex-direction : column;
  justify-content : center;
  &__iniline {
    position : relative;

    height : 100%;
  }
  .title {
    font-size : 32rpx;
    font-weight : 600;

    color : black;
  }
  .text {
    padding-bottom : 20px;

    font-size : 32rpx;
    font-weight : 600;

    color : #515A61;
  }
  img {
    margin-bottom : 10px;
    width : 50vw;
    height : 30vh;

    opacity : .85;
  }
  .button-wraper {
    width : 100%;
  }
}

</style>

