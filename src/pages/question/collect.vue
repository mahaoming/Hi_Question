<template>
  <view class="question-wrap">
    <!-- 导航栏 -->
    <navbar
      fixed
      title="我的收藏"
      transparent="show"
      :border="isShowBorder"
      :backgroundColor="[224, 229, 236]"
    >
    </navbar>

    <view class="margin-lr">
      <!-- 试卷列表 -->
      <view v-if="questionList.length !== 0">
        <question-list
          :question-list="questionList"
          is-show-footer
          @collect="$_onCollectQuestion"
        ></question-list>
      </view>
      <image
        src="../../static/image/home/empty.png"
        mode="widthFix"
        v-else
        class="emptyimg"
      ></image>
    </view>
  </view>
</template>

<script>
import QuestionList from "./components/QuestionList";

import { mapActions, mapGetters } from "vuex";

export default {
  components: { QuestionList },

  data() {
    return {
      questionList: [],
      isShowBorder: false
    };
  },

  mounted() {
    this.getAllCollectList();
  },

  onPageScroll(e) {
    this.isShowBorder = e.scrollTop !== 0;
  },

  methods: {
    // 获取所有收藏题目
    async getAllCollectList() {
      uni.showLoading({ title: "加载中..." });

      let QuestionCollect = new wx.BaaS.TableObject("question_collect");
      let collectList = await QuestionCollect.expand([
        "question",
        "paper"
      ]).find();

      collectList = collectList.data.objects.map(item => {
        return Object.assign(
          {
            collectId: item.id,
            paperTitle: item.paper.title,
            paperCreateAt: item.created_at
          },
          item.question
        );
      });

      this.questionList = collectList;
      uni.hideLoading();
    },

    // 取消收藏题目
    $_onCollectQuestion(collectIndex) {
      console.log(
        "%c 🦑 collectIndex: ",
        "font-size:20px;background-color: #465975;color:#fff;",
        collectIndex
      );
      const QuestionCollect = new wx.BaaS.TableObject("question_collect");
      QuestionCollect.delete(this.questionList[collectIndex]["collectId"]);
      this.questionList.splice(collectIndex, 1);
      uni.showToast({ title: "已取消收藏!", icon: "none" });
    }
  }
};
</script>

<style lang="scss" scope>
.question-wrap {
  .question-item {
    display : grid;

    column-gap : 20rpx;
    grid-template-columns : 8.5fr 1.5fr;
    .question {
      margin : 35rpx 15rpx;
      border-radius : 20rpx;
      padding : 30rpx;

      background : #E0E5EC;

      box-shadow : 10px 10px 19px #BEC3C9, -10px -10px 19px #FFFFFF;
      .topic {
        font-size : $text-df;
        letter-spacing : 12rpx;

        color : $gray;
        .num {
          margin : 0 10rpx;

          text-align : center;
          letter-spacing : 2rpx;

          background : #E0E5EC;

          box-shadow : 1px 1px 2px #BEC3C9, -1px -1px 2px #FFFFFF;
        }
      }
      .content {
        margin-top : 20rpx;
        margin-bottom : 40rpx;

        font-size : $text-lg;
      }
    }
    .action {
      display : flex;

      align-items : center;
      justify-content : center;
      .collect {
        display : flex;

        border-radius : 50%;
        width : 100rpx;
        height : 100rpx;

        background : linear-gradient(145deg, #CACED4, #F0F5FD);

        box-shadow : 5px 5px 11px #BEC3C9, -5px -5px 11px #FFFFFF;

        align-items : center;
        justify-content : center;
        image {
          width : 70rpx;
        }
      }
      .collected {
        background : #E0E5EC;

        box-shadow : inset 5px 5px 11px #BEC3C9, inset -5px -5px 11px #FFFFFF;
      }
    }
  }
}

.radiogroup {
  margin : 0 auto;
  border-radius : 16px;
  .wrapper {
    margin : 12px 0;
  }

  .state {
    position : absolute;
    top : 0;
    right : 0;

    opacity : 1e-5;

    pointer-events : none;
  }

  .label {
    display : inline-flex;
    display : grid;

    width : 100%;

    word-wrap : break-word;
    word-break : break-all;

    color : #394A56;

    align-items : center;
    grid-template-columns : 1fr 9fr;
  }
  .text {
    margin-left : 16px;

    font-size : $text-df;

    opacity : .6;

    transition : opacity .2s linear, transform .2s ease-out;
  }

  .indicator {
    overflow : hidden;

    position : relative;

    border-radius : 50%;
    width : 30px;
    height : 30px;

    background : #E0E5EC;

    box-shadow : 3px 3px 6px #BEC3C9, -3px -3px 6px #FFFFFF;
  }

  .indicator::before, .indicator::after {
    position : absolute;
    top : 10%;
    left : 10%;

    border-radius : 50%;
    width : 80%;
    height : 80%;

    content : '';
  }

  .indicator::before {
    box-shadow : -4px -2px 4px 0px #D1D9E6, 4px 2px 8px 0px #FFFFFF;
  }

  .indicator::after {
    background-color : #ECF0F3;

    box-shadow : -4px -2px 4px 0px #FFFFFF, 4px 2px 8px 0px #D1D9E6;

    transition : opacity .25s ease-in-out, transform .25s ease-in-out;
    transform : scale3d(1, 1, 1);
  }
}

.right-checked {
  .indicator::after {
    opacity : 0;

    transform : scale3d(.975, .975, 1) translate3d(0, 10%, 0);
  }
  .text {
    font-size : $text-xl;

    color : #4A6DF3;

    opacity : 1;

    transform : translate3d(8px, 0, 0);
  }
}

.answer {
  .label {
    display : inline-block;
    display : flex;

    width : 100%;

    font-size : $text-sm;

    color : $gray;

    align-items : center;
    justify-content : space-between;
  }
  .content {
    font-size : $text-df;
    word-wrap : break-word;
    word-break : break-all;
    .tip {
      margin-right : 10rpx;

      font-size : $text-sm;
      white-space : nowrap;
    }
  }
}
.footer {
  display : flex;

  font-size : $text-sm;
  word-wrap : break-word;
  word-break : break-all;

  color : $gray;

  align-items : center;
  justify-content : flex-end;
  .dot {
    margin : 0 8rpx;
  }
}
.emptyimg {
  position : absolute;
  bottom : 0;
  left : 0;

  width : 100%;
}

</style>