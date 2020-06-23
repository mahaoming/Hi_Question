<template>
  <text class="timeago">{{ timeago }}</text>
</template>
<script>
import { parse, diff, format } from './utils/index'
export default {
  data () {
    return {
      currentTo: null,
      currentFrom: null,
      timeago: null
    }
  },
  props: {
    to: {
      type: String,
      default: ''
    },
    from: {
      type: String,
      default: ''
    },
    refreshable: {
      type: Boolean,
      value: false
    }
  },
  mounted () {
    if (this.to.toString().length === 10) this.to = this.to * 1000
    const diffTime = diff(this.to, new Date().getTime())
    const timeago = format(diffTime)
    this.timeago = timeago
  },
  methods: {
    /**
     * 更新时间
     * @param {Any} currentTo   当前开始时间
     * @param {Any} currentFrom 当前截止时间
     * @param {String} lang     返回文本的语言，可选值为 en、zh_CN、zh_TW
     * @param {Boolean} isForce 是否强制更新
     */
    updated (currentTo, currentFrom, isForce) {
      // clearTimeout
      this.clearTimer()

      // check datetime
      if (currentTo !== this.data.currentTo || currentFrom !== this.data.currentFrom || isForce) {
        const diffTime = diff(currentTo, currentFrom)
        const timeago = format(diffTime)
        // this.setData({ currentTo, currentFrom, timeago }, () => {
        //   // check refreshable
        //   if (this.data.refreshable && !this.data.from) {
        //     const howOld = diff(currentTo, currentFrom, 'minute')
        //     const secondsUntilUpdate = howOld < 1 && 1 || howOld < 60 && 30 || howOld < 180 && 300 || 3600
        //     // setTimeout
        //     this.timeout = setTimeout(() => {
        //       this.updated(currentTo, this.getNow())
        //     }, secondsUntilUpdate * 1000)
        //   }
        // })
      }
    },

    /**
     * 清除定时器
     */
    clearTimer () {
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
    },

    /**
     * 获取当前截止时间
     */
    getNow () {
      const { from } = this
      return from ? from && parse(from) : new Date().getTime()
    }
  }
}
</script>
<style>
.timeago {
  font-size: 24rpx !important;
  color: #232a3d !important;
  font-weight: 400 !important;
  margin: 0 !important;
}
</style>
