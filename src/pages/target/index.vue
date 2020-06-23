<template>
  <view class="target-wrap">
    <navbar transparent="hidden" :back="false">
      <block slot="left">
        <view class="flex">
          <view class="back" @click="onClickBack"></view>
        </view>
      </block>
    </navbar>
    <view class="target">
      <view class="flex remain">
        <view>距离考研还有</view>
        <view class="day">{{ remainDay }}</view>
        <view>天</view>
      </view>
      <view class="text-align margin-top">
        <view class="text-align slogan">人之所以能，是相信能。</view>
      </view>

      <view>
        <picker
          mode="date"
          :value="targetTime"
          :start="timeInterval.startTime.year"
          :end="timeInterval.endTime.year"
          :fields="'year'"
          @change="setTimeChange"
        >
          <view class="target__button">
            {{ targetYear === "" ? "立个flag吧!" : targetYear + "年,加油!" }}
          </view>
        </picker>
      </view>
    </view>
    <div class="wrapper">
      <div class="candles">
        <div class="light__wave"></div>
        <div class="candle1">
          <div class="candle1__body">
            <div class="candle1__eyes">
              <span class="candle1__eyes-one"></span>
              <span class="candle1__eyes-two"></span>
            </div>
            <div class="candle1__mouth"></div>
          </div>
          <div class="candle1__stick"></div>
        </div>

        <div class="candle2">
          <div class="candle2__body">
            <div class="candle2__eyes">
              <div class="candle2__eyes-one"></div>
              <div class="candle2__eyes-two"></div>
            </div>
          </div>
          <div class="candle2__stick"></div>
        </div>
        <div class="candle2__fire"></div>
        <div class="sparkles-one"></div>
        <div class="sparkles-two"></div>
        <div class="candle__smoke-one"></div>
        <div class="candle__smoke-two"></div>
      </div>
      <div class="floor"></div>
    </div>
    <!-- partial -->
  </view>
</template>

<script>
import { showLoginModal } from "_u/wx";
import func from "_u/func";

import { mapGetters, mapActions } from "vuex";

let selectId = null;

export default {
  async mounted() {
    this.getTimeInterval();
    if (func.isEmpty(this.remainDay)) {
      this.getUserTarget();
    }
  },

  computed: {
    ...mapGetters("target", ["remainDay", "timeInterval", "targetYear"]),
    ...mapGetters("user", ["isAuth"])
  },

  methods: {
    ...mapActions("target", [
      "getUserTarget",
      "getTimeInterval",
      "setTargetChange"
    ]),

    // 设置目标
    async setTimeChange(e) {
      if (!this.isAuth) {
        showLoginModal();
        return;
      } else {
        // 遍历查询目标年份id
        let target = this.timeInterval.timeArray.find(
          item => item.year === e.detail.value
        );
        await this.setTargetChange(target);
        await this.getUserTarget();
      }
    },

    // 返回上一页
    onClickBack() {
      uni.navigateBack({
        delta: -1
      });
    }
  }
};
</script>

<style lang="scss" scope>
page {
  background-color: #e0e5ec;

  animation: change-background 10s infinite linear;
}
.target-wrap {
  position: relative;

  width: 100vw;
  height: 100vh;
  .back {
    border-radius: 10px;
    width: 72rpx;
    height: 72rpx;

    background: #e0e5ec;
    background-image: url("../../static/image/navbar/icon_back_black.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 45%;

    box-shadow: -8px 8px 15px #bec3c9, 8px -8px 15px #ffffff;

    animation: back-icon 10s infinite;
    &:active {
      box-shadow: inset -5px 5px 9px #bec3c9, inset 5px -5px 9px #ffffff;
    }
  }
  .target {
    display: flex;

    position: absolute;
    top: 10%;
    left: 50%;
    z-index: 10;

    margin-top: 50rpx;

    background-color: transparent;

    transform: translateX(-50%);

    align-items: center;
    flex-direction: column;
    justify-content: center;
    .slogan {
      color: black;

      animation: slogan-text 10s infinite;
    }
    &__button {
      text-decoration: underline;

      color: $pink;
    }
  }
  .remain {
    display: flex;

    font-size: $text-xl;
    letter-spacing: 2rpx;

    color: $gray;

    align-items: center;
    justify-content: center;

    .day {
      margin: 0 10rpx;
      padding: 4rpx 10rpx;
      text-align: center;
      letter-spacing: 2rpx;
      background: #e0e5ec;
      box-shadow: 1px 1px 2px #bec3c9, -1px -1px 2px #ffffff;
      border-radius: 12rpx;
    }
  }
}
.wrapper {
  position: absolute;
  top: 70%;
  left: 50%;

  transform: scale(1.5, 1.5) translate(-50%, -50%);
}

.floor {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;

  width: 350px;
  height: 5px;

  background: #673c63;

  box-shadow: 0px 2px 5px #111111;

  transform: translate(-50%, -50%);
}

.candles {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;

  width: 250px;
  height: 150px;

  transform: translate(-50%, -100%);
}

.candle1 {
  position: absolute;
  top: 50%;
  left: 50%;

  border: 3px solid #673c63;
  border-bottom: 0px;
  border-radius: 3px;
  width: 35px;
  height: 100px;

  background: #e0e5ec;

  box-shadow: -2px 0px 0px #95c6f2 inset;

  transform: translate(60%, -25%);
  transform-origin: center right;
  animation: expand-body 10s infinite linear;
}

.candle1__stick,
.candle2__stick {
  position: absolute;
  top: 0%;
  left: 50%;

  border-radius: 8px;
  width: 3px;
  height: 15px;

  background: #673c63;

  transform: translate(-50%, -100%);
}

.candle2__stick {
  height: 12px;

  transform-origin: bottom center;
  animation: stick-animation 10s infinite linear;
}

.candle1__eyes,
.candle2__eyes {
  position: absolute;
  top: 0%;
  left: 50%;

  width: 35px;
  height: 30px;

  transform: translate(-50%, 0%);
}

.candle1__eyes-one {
  position: absolute;
  top: 20%;
  left: 30%;

  border-radius: 100%;
  width: 5px;
  height: 5px;

  background: #673c63;

  transform: translate(-70%, 0%);
  animation: blink-eyes 3s infinite linear;
}

.candle1__eyes-two {
  position: absolute;
  top: 20%;
  left: 70%;

  border-radius: 100%;
  width: 5px;
  height: 5px;

  background: #673c63;

  transform: translate(-70%, 0%);
  animation: blink-eyes 3s infinite linear;
}

.candle1__mouth {
  position: absolute;
  top: 20%;
  left: 40%;

  border-radius: 20px;
  width: 0px;
  height: 0px;

  background: #673c63;

  transform: translate(-50%, -50%);
  animation: uff 10s infinite linear;
}

.candle__smoke-one {
  position: absolute;
  top: 50%;
  left: 30%;

  width: 30px;
  height: 3px;

  background: grey;

  transform: translate(-50%, -50%);
  animation: move-left 10s infinite linear;
}

.candle__smoke-two {
  position: absolute;
  top: 40%;
  left: 30%;

  border-radius: 10px;
  width: 10px;
  height: 10px;

  background: grey;

  transform: translate(-50%, -50%);
  animation: move-top 10s infinite linear;
}

.candle2 {
  position: absolute;
  top: 65%;
  left: 20%;

  border: 3px solid #673c63;
  border-bottom: 0px;
  border-radius: 3px;
  width: 42px;
  height: 60px;

  background: #e0e5ec;

  box-shadow: -2px 0px 0px #95c6f2 inset;

  transform: translate(60%, -15%);
  transform-origin: center right;
  animation: shake-left 10s infinite linear;
}

.candle2__eyes-one {
  display: inline-block;
  float: left;

  position: absolute;
  top: 50%;
  left: 30%;

  border: 0px solid #673c63;
  border-radius: 100%;
  width: 5px;
  height: 5px;

  background: #673c63;

  transform: translate(-80%, 0%);
  animation: changeto-lower 10s infinite linear;
}

.candle2__eyes-two {
  display: inline-block;
  float: left;

  position: absolute;
  top: 50%;
  left: 70%;

  border: 0px solid #673c63;
  border-radius: 100%;
  width: 5px;
  height: 5px;

  background: #673c63;

  transform: translate(-80%, 0%);
  animation: changeto-greater 10s infinite linear;
}

.light__wave {
  position: absolute;
  top: 35%;
  left: 35%;
  z-index: 0;

  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 100%;
  width: 75px;
  height: 75px;

  transform: translate(-25%, -50%) scale(2.5, 2.5);
  animation: expand-light 10s infinite linear;
}

.candle2__fire {
  display: block;

  position: absolute;
  top: 50%;
  left: 40%;

  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  width: 16px;
  height: 20px;

  background: #ff9800;
  background-color: red;

  transform: translate(-85%, -50%);
  animation: dance-fire 10s infinite linear;
}

@keyframes blink-eyes {
  0%,
  35% {
    opacity: 1;

    transform: translate(-70%, 0%);
  }
  36%,
  39% {
    opacity: 0;

    transform: translate(-70%, 0%);
  }
  40% {
    opacity: 1;

    transform: translate(-70%, 0%);
  }
  50%,
  65% {
    transform: translate(-140%, 0%);
  }
  66% {
    transform: translate(-70%, 0%);
  }
}
@keyframes expand-body {
  0%,
  40% {
    transform: scale(1, 1) translate(60%, -25%);
  }
  45%,
  55% {
    transform: scale(1.1, 1.1) translate(60%, -28%);
  }
  60% {
    transform: scale(0.89, 0.89) translate(60%, -25%);
  }
  65% {
    transform: scale(1, 1) translate(60%, -25%);
  }
  70% {
    transform: scale(0.95, 0.95) translate(60%, -25%);
  }
  75% {
    transform: scale(1, 1) translate(60%, -25%);
  }
}
@keyframes uff {
  0%,
  40% {
    width: 0px;
    height: 0px;
  }
  50%,
  54% {
    left: 30%;

    width: 15px;
    height: 15px;
  }
  59% {
    left: 20%;

    width: 5px;
    height: 5px;
  }
  62% {
    left: 20%;

    width: 2px;
    height: 2px;
  }
  67% {
    left: 30%;

    width: 0px;
    height: 0px;
  }
}
@keyframes change-background {
  0%,
  59%,
  98%,
  100% {
    background: #e0e5ec;
  }
  61%,
  97% {
    background: #33323f;
  }
}
@keyframes move-left {
  0%,
  59%,
  100% {
    left: 40%;

    width: 0px;
  }
  60% {
    left: 30%;

    width: 30px;
  }
  68% {
    left: 20%;

    width: 0px;
  }
}

@keyframes back-icon {
  0%,
  59% {
    background: #e0e5ec;
    background-image: url("../../static/image/navbar/icon_back_black.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 45%;

    box-shadow: -8px 8px 15px #bec3c9, 8px -8px 15px #ffffff;
  }
  60%,
  97% {
    background: #33323f;
    background-image: url("../../static/image/navbar/icon_back_white.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 45%;

    box-shadow: 6px 6px 12px #2b2b36, -6px -6px 12px #3b3a48;
  }
  100% {
    background: #e0e5ec;
    background-image: url("../../static/image/navbar/icon_back_black.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 45%;

    box-shadow: -8px 8px 15px #bec3c9, 8px -8px 15px #ffffff;
  }
}

@keyframes slogan-text {
  0%,
  59% {
    color: black;
  }
  60%,
  97% {
    color: white;
  }
  100% {
    color: black;
  }
}
@keyframes move-top {
  0%,
  64%,
  100% {
    top: 0%;

    width: 0px;
    height: 0px;
  }
  65% {
    top: 40%;
    left: 40%;

    width: 10px;
    height: 10px;
  }
  80% {
    top: 20%;

    width: 0px;
    height: 0px;
  }
}
@keyframes shake-left {
  0%,
  40% {
    left: 20%;

    transform: translate(60%, -15%);
  }
  50%,
  54% {
    left: 20%;

    transform: translate(60%, -15%);
  }
  59% {
    left: 20%;

    transform: translate(60%, -15%);
  }
  62% {
    left: 18%;

    transform: translate(60%, -15%);
  }
  65% {
    left: 21%;

    transform: translate(60%, -15%);
  }
  67% {
    left: 20%;

    transform: translate(60%, -15%);
  }
  75% {
    left: 20%;

    border-color: #673c63;

    background: #e0e5ec;

    transform: scale(1.15, 0.85) translate(60%, -15%);
  }
  91% {
    left: 20%;

    border-color: #f44336;

    background: #f44336;

    box-shadow: -2px 0px 0px #f44336 inset;

    transform: scale(1.18, 0.82) translate(60%, -10%);
  }
  92% {
    left: 20%;

    transform: scale(0.85, 1.15) translate(60%, -15%);
  }
  95% {
    left: 20%;

    transform: scale(1.05, 0.95) translate(60%, -15%);
  }
  97% {
    left: 20%;

    transform: scale(1, 1) translate(60%, -15%);
  }
}
@keyframes stick-animation {
  0%,
  40% {
    top: 0%;
    left: 50%;

    transform: translate(-50%, -100%);
  }
  50%,
  54% {
    top: 0%;
    left: 50%;

    transform: translate(-50%, -100%);
  }
  59% {
    top: 0%;
    left: 50%;

    transform: translate(-50%, -100%);
  }
  62% {
    top: 0%;
    left: 50%;

    transform: rotateZ(-15deg) translate(-50%, -100%);
  }
  65% {
    top: 0%;
    left: 50%;

    transform: rotateZ(15deg) translate(-50%, -100%);
  }
  70% {
    top: 0%;
    left: 50%;

    transform: rotateZ(-5deg) translate(-50%, -100%);
  }
  72% {
    top: 0%;
    left: 50%;

    transform: rotateZ(5deg) translate(-50%, -100%);
  }
  74%,
  84% {
    top: 0%;
    left: 50%;

    transform: rotateZ(0deg) translate(-50%, -100%);
  }
  85% {
    transform: rotateZ(180deg) translate(0%, 120%);
  }
  92% {
    top: 0%;
    left: 50%;

    transform: translate(-50%, -100%);
  }
}
@keyframes expand-light {
  10%,
  29%,
  59%,
  89% {
    border: 2px solid rgba(255, 255, 255, 0);

    transform: translate(-25%, -50%) scale(0, 0);
  }
  90%,
  20%,
  50% {
    transform: translate(-25%, -50%) scale(1, 1);
  }
  95%,
  96%,
  26%,
  27%,
  56%,
  57% {
    border: 2px solid rgba(255, 255, 255, 0.5);

    transform: translate(-25%, -50%) scale(2, 2);
  }
  0%,
  28%,
  58%,
  100% {
    border: 2px solid rgba(255, 255, 255, 0.2);

    transform: translate(-25%, -50%) scale(2.5, 2.5);
  }
}
@keyframes dance-fire {
  59%,
  89% {
    left: 40%;

    width: 0px;
    height: 0px;
  }
  90%,
  0%,
  7%,
  15%,
  23%,
  31%,
  39%,
  47%,
  55% {
    left: 40.8%;

    width: 16px;
    height: 20px;

    background: #ffc107;
  }
  94%,
  3%,
  11%,
  19%,
  27%,
  35%,
  43%,
  51%,
  58% {
    left: 41.2%;

    width: 16px;
    height: 20px;

    background: #ff9800;
  }
}
@keyframes changeto-lower {
  0%,
  70%,
  90% {
    display: inline-block;

    border: 0px solid #673c63;
    border-width: 0 0 0 0;
    border-radius: 100%;
    padding: 0px;

    background: #673c63;

    transform: translate(-90%, 0%);
  }
  71%,
  89% {
    display: inline-block;
    float: left;

    border: solid #673c63;
    border-width: 0 2px 2px 0;
    border-radius: 0px;
    padding: 1px;

    background: none;

    -webkit-transform: rotate(-45deg) translate(-50%, -65%);
    transform: rotate(-45deg) translate(-50%, -65%);
    transform-origin: bottom left;
  }
}
@keyframes changeto-greater {
  0%,
  70%,
  90% {
    display: inline-block;

    top: 50%;

    border: 0px solid #673c63;
    border-width: 0 0 0 0;
    border-radius: 100%;
    padding: 0px;

    background: #673c63;

    transform: translate(-80%, 0%);
  }
  71%,
  89% {
    display: inline-block;
    float: left;

    top: 30%;

    border: solid #673c63;
    border-width: 0 2px 2px 0;
    border-radius: 0px;
    padding: 1px;

    background: none;

    -webkit-transform: rotate(135deg) translate(-80%, 20%);
    transform: rotate(135deg) translate(-80%, 20%);
    transform-origin: bottom left;
  }
}
</style>