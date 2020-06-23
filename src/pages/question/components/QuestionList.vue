<template>
  <view class="question-container">
    <hi-transition name="slide-left" show>
      <view
        class="question-item"
        :key="questionIndex"
        v-for="(question, questionIndex) of questionList"
      >
        <view class="question">
          <!-- 序号 -->
          <view class="topic"
            ><text class="num">{{ question.index | indexFilter }}</text></view
          >

          <!-- 题干 -->
          <view class="content" v-if="question.content.type === 'text'">{{
            question.content.content
          }}</view>
          <view class="content" v-else-if="question.content.type === 'image'">
            <image
              :src="question.content.content"
              style="width: 100%"
              mode="widthFix"
            ></image>
          </view>

          <!-- 选项 -->
          <view class="radiogroup">
            <div
              class="wrapper"
              :class="[
                canSelect && question.selectOption === optionIndex
                  ? 'checked'
                  : '',
                !canSelect && question.rightOption === optionIndex
                  ? 'right-checked'
                  : '',
                question.isWrong && question.wrongSelectOption === optionIndex
                  ? 'wrong-checked'
                  : ''
              ]"
              v-for="(option, optionIndex) of question.contentOptions"
              :key="optionIndex"
            >
              <input class="state" type="radio" :value="option.label" />
              <label
                class="label"
                :for="option.label"
                @click="$emit('select', questionIndex, optionIndex)"
              >
                <div class="indicator"></div>
                <span class="text" v-if="option.type === 'text'">{{
                  option.content
                }}</span>
                <image
                  :src="option.content"
                  align="left"
                  lazy-load
                  mode="aspectFit"
                  style="height: 80rpx;margin-left: 20rpx;width:100%"
                  v-else
                ></image>
              </label>
            </div>
          </view>

          <!-- 答案 & 解析 -->
          <view
            class="answer"
            v-if="isShowAnswer"
            :class="question.isWrong ? 'wrong' : ''"
          >
            <view class="label">
              <text>{{
                question.selectOption === -1
                  ? "未选择任何选项"
                  : "你的选择是: 第" + (question.selectOption + 1) + "个选项"
              }}</text>
              <text :class="question.isWrong ? 'text-pink' : 'text-blue'"
                >(<text
                  class="cuIcon"
                  :class="question.isWrong ? 'cuIcon-close' : 'cuIcon-check'"
                ></text
                >)</text
              >
            </view>
            <view class="content"
              ><text class="tip">解析: </text> {{ question.answer }}</view
            >
          </view>

          <!-- 底部 -->
          <view class="footer" v-if="isShowFooter">
            <text
              >{{ question.paperCreateAt | parseTime("{y}-{m}-{d} {h}:{i}") }}
            </text>
            <text class="dot"> · </text>
            <text> {{ question.paperTitle }}</text>
          </view>
        </view>

        <!-- 收藏操作 -->
        <view class="action">
          <view
            class="collect"
            :class="question.isCollected ? 'collected' : ''"
            @click="$emit('collect', questionIndex)"
          >
            <image
              mode="widthFix"
              :src="
                question.isCollected
                  ? '/static/image/question/collected.png'
                  : '/static/image/question/collect.png'
              "
            ></image>
          </view>
        </view>
      </view>
    </hi-transition>
  </view>
</template>
<script>
import HiTransition from "@/components/FeedBack/Transition";

export default {
  components: { HiTransition },
  props: {
    questionList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    canSelect: {
      type: Boolean,
      default: false
    },
    isShowAnswer: {
      type: Boolean,
      default: false
    },
    isShowFooter: {
      type: Boolean,
      default: false
    }
  },

  computed: {},
  data() {
    return {};
  },

  methods: {},

  filters: {
    indexFilter: function(index) {
      return index < 10 ? `0${index}题` : `${index}题`;
    }
  }
};
</script>

<style lang="scss" scope>
.question-container {
  .question-item {
    display: grid;

    column-gap: 20rpx;
    grid-template-columns: 8.5fr 1.5fr;
    .question {
      margin: 35rpx 15rpx;
      border-radius: 20rpx;
      padding: 30rpx;

      background: #e0e5ec;

      box-shadow: 10px 10px 19px #bec3c9, -10px -10px 19px #ffffff;
      .topic {
        font-size: $text-df;
        letter-spacing: 12rpx;

        color: $gray;
        .num {
          margin: 0 10rpx;
          text-align: center;
          letter-spacing: 2rpx;
          background: #e0e5ec;
          box-shadow: 1px 1px 2px #bec3c9, -1px -1px 2px #ffffff;
          border-radius: 8rpx;
          padding: 2rpx 6rpx;
        }
      }
      .content {
        margin-top: 20rpx;
        margin-bottom: 40rpx;

        font-size: $text-lg;
      }
    }
    .action {
      display: flex;

      align-items: center;
      justify-content: center;
      .collect {
        display: flex;

        border-radius: 50%;
        width: 100rpx;
        height: 100rpx;

        background: linear-gradient(145deg, #caced4, #f0f5fd);

        box-shadow: 5px 5px 11px #bec3c9, -5px -5px 11px #ffffff;

        align-items: center;
        justify-content: center;
        image {
          width: 70rpx;
        }
      }
      .collected {
        background: #e0e5ec;

        box-shadow: inset 5px 5px 11px #bec3c9, inset -5px -5px 11px #ffffff;
      }
    }
  }

  .radiogroup {
    margin: 0 auto;
    border-radius: 16px;
    .wrapper {
      margin: 12px 0 30rpx 0;
    }

    .state {
      position: absolute;
      top: 0;
      right: 0;

      opacity: 1e-5;

      pointer-events: none;
    }

    .label {
      display: inline-flex;
      display: grid;

      width: 100%;
      padding-right: 10rpx;

      word-wrap: break-word;
      word-break: break-all;

      color: #394a56;

      align-items: center;
      grid-template-columns: 1fr 9fr;
    }
    .text {
      margin-left: 16px;

      font-size: $text-df;

      opacity: 0.6;

      transition: opacity 0.2s linear, transform 0.2s ease-out;
    }

    .indicator {
      overflow: hidden;

      position: relative;

      border-radius: 50%;
      width: 30px;
      height: 30px;

      background: #e0e5ec;

      box-shadow: 3px 3px 6px #bec3c9, -3px -3px 6px #ffffff;

      flex-basis: 30px;
    }

    .indicator::before,
    .indicator::after {
      position: absolute;
      top: 10%;
      left: 10%;

      border-radius: 50%;
      width: 80%;
      height: 80%;

      content: "";
    }
    .indicator::before {
      box-shadow: -4px -2px 4px 0px #d1d9e6, 4px 2px 8px 0px #ffffff;
    }

    .indicator::after {
      background-color: #ecf0f3;

      box-shadow: -4px -2px 4px 0px #ffffff, 4px 2px 8px 0px #d1d9e6;

      transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
      transform: scale3d(1, 1, 1);
    }
  }

  .checked {
    .indicator::after {
      opacity: 0;

      transform: scale3d(0.975, 0.975, 1) translate3d(0, 10%, 0);
    }
    .text {
      font-size: $text-xl;

      opacity: 1;

      transform: translate3d(8px, 0, 0);
    }
  }

  .right-checked {
    .indicator {
      background: #4a6df3;
    }
    .indicator::before {
      box-shadow: -4px -2px 4px 0px #ffffff, 4px 2px 8px 0px #ffffff;
    }
    .indicator::after {
      opacity: 0;

      transform: scale3d(0.975, 0.975, 1) translate3d(0, 10%, 0);
    }
    .text {
      font-size: $text-xl;

      color: #4a6df3;

      opacity: 1;

      transform: translate3d(8px, 0, 0);
    }
  }

  .wrong-checked {
    .indicator {
      background: #e96169;
    }
    .indicator::after {
      opacity: 0;

      transform: scale3d(0.975, 0.975, 1) translate3d(0, 10%, 0);
    }
    .text {
      font-size: $text-xl;

      color: #e96169;

      opacity: 1;

      transform: translate3d(8px, 0, 0);
    }
  }

  .answer {
    .label {
      display: inline-block;
      display: flex;

      width: 100%;

      font-size: $text-sm;

      color: $gray;

      align-items: center;
      justify-content: space-between;
    }
    .content {
      font-size: $text-df;
      word-wrap: break-word;
      word-break: break-all;
      .tip {
        margin-right: 10rpx;

        font-size: $text-sm;
        white-space: nowrap;
      }
    }
  }

  .footer {
    display: flex;

    font-size: $text-sm;
    word-wrap: break-word;
    word-break: break-all;

    color: $gray;

    align-items: center;
    justify-content: flex-end;
    .dot {
      margin: 0 8rpx;
    }
  }
}
</style>