<template>
  <view class="question-wrap">
    <navbar backState="1000" bgColor="#E0E5EC">
      <view class="text-xl text-bold">
        我的错题集
      </view>
    </navbar>
    <view v-if="questionList.length !== 0">
      <view
        class="question-item"
        :key="questionIndex"
        v-for="(question, questionIndex) of questionList"
      >
        <view class="question">
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
          <view class="radiogroup">
            <div
              class="wrapper"
              :key="optionIndex"
              :class="
                question.rightOption === optionIndex ? 'right-checked' : ''
              "
              v-for="(option, optionIndex) of question.contentOptions"
            >
              <input class="state" type="radio" :value="option.label" />
              <label class="label" :for="option.label">
                <div class="indicator"></div>
                <span class="text" v-if="option.type === 'text'">{{
                  option.content
                }}</span>
                <image
                  :src="option.content"
                  mode="aspectFit"
                  style="height: 80rpx;margin-left: 20rpx;width:100%"
                  v-else
                ></image>
              </label>
            </div>
          </view>
          <view class="answer">
            <view class="content"
              ><text class="tip">解析: </text> {{ question.answer }}</view
            >
          </view>
          <view class="footer">
            <text
              >{{ question.paperCreateAt | parseTime("{y}-{m}-{d} {h}:{i}") }}
            </text>
            <text class="dot"> · </text>
            <text> {{ question.paperTitle }}</text>
          </view>
        </view>
        <view class="action">
          <view
            class="collect collected"
            @click="setCollectCancel(questionIndex)"
          >
            <image
              mode="widthFix"
              src="../../static/image/question/collected.png"
            ></image>
          </view>
        </view>
      </view>
    </view>
    <image
      src="../../static/image/home/empty.png"
      mode="widthFix"
      v-else
      class="emptyimg"
    ></image>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "----",
      questionList: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //  初始化数据
    async init() {
      uni.showLoading();
      let collectQuestionRes = await this.getCollectQuestions();
      collectQuestionRes = collectQuestionRes.data.objects;

      this.questionList = collectQuestionRes.map(item => {
        return Object.assign(
          {
            collectId: item.id,
            paperTitle: item.paper.title,
            paperCreateAt: item.created_at
          },
          item.question
        );
      });
      uni.hideLoading();
    },

    // 获取收藏问题
    async getCollectQuestions() {
      let QuestionCollect = new wx.BaaS.TableObject("question_collect");
      return QuestionCollect.expand(["question", "paper"]).find();
    },

    // 取消收藏
    async setCollectCancel(questionIndex) {
      let QuestionCollect = new wx.BaaS.TableObject("question_collect");
      // 删除
      QuestionCollect.delete(this.questionList[questionIndex]["collectId"]);
      this.questionList.splice(questionIndex, 1);
      uni.showToast({ title: "已取消收藏!", icon: "none" });
    },

    // 返回上一层
    toSubject() {
      uni.navigateBack({
        delta: -1
      });
    }
  }
};
</script>

<style lang="scss" scope>
.question-wrap {
  margin: 30rpx;
  .back {
    margin-left: 14rpx;
    border-radius: 10px;
    width: 72rpx;
    height: 72rpx;

    background-image: url("../../static/image/navbar/icon_back_black.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 55%;
    // background: #e0e5ec;

    box-shadow: -8px 8px 15px #bec3c9, 8px -8px 15px #ffffff;
    &:active {
      box-shadow: inset -5px 5px 9px #bec3c9, inset 5px -5px 9px #ffffff;
    }
  }
  .upload {
    margin-left: 14rpx;
    border-radius: 10px;
    width: 72rpx;
    height: 72rpx;

    background-image: url("../../static/image/upload/upload.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 55%;
    // background: #e0e5ec;

    box-shadow: -8px 8px 15px #bec3c9, 8px -8px 15px #ffffff;
    &:active {
      box-shadow: inset -5px 5px 9px #bec3c9, inset 5px -5px 9px #ffffff;
    }
  }
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
}

.radiogroup {
  margin: 0 auto;
  border-radius: 16px;
  .wrapper {
    margin: 12px 0;
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

.right-checked {
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
.emptyimg {
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
}
</style>