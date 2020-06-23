<template>
  <view>
    <!-- 导航栏 -->
    <navbar
      fixed
      transparent="show"
      :title="title"
      :border="isShowBorder"
      :backgroundColor="[224, 229, 236]"
    >
    </navbar>

    <!-- 内容 -->
    <view class="flex justify-center padding-lr margin-top-sm">
      <v-count-to :end-val="score" color="#e74c3c"></v-count-to>
      <view class="margin-top-sm text-xxl text-bold"> </view>
    </view>
    <view class="margin-lr">
      <question-list
        :question-list="questionList"
        :canSelect="false"
        is-show-answer
        @collect="$_onCollectQuestion"
      ></question-list>
    </view>
  </view>
</template>

<script>
import QuestionList from "./components/QuestionList";
import VCountTo from "@/components/CountTo/CountTo";
import { mapActions, mapGetters } from "vuex";

let paperId = null;

export default {
  components: { QuestionList, VCountTo },

  data() {
    return {
      isShowScore: false,
      isShowBorder: false,
      title: "----",
      score1: 222
    };
  },

  onLoad(option) {
    paperId = option.paperId;
    this.title = option.title;
    this.getPaperResult({ resultId: option.resultId, paperId });
    this.getFontFamily();
  },

  onPageScroll(e) {
    this.isShowBorder = e.scrollTop !== 0;
  },

  computed: {
    ...mapGetters("question", ["questionList", "score"])
  },
  methods: {
    ...mapActions("question", ["getPaperResult", "onCollectQuestion"]),

    $_onCollectQuestion(questionIndex) {
      this.onCollectQuestion({ questionIndex, paperId });
    },

    // 加载网络字体
    getFontFamily() {
      uni.loadFontFace({
        family: "proximanova",
        source:
          'url("https://656e-env-used-1258356576.tcb.qcloud.la/TTF/proximanova.ttf?sign=4c675cf35b03b250eab077d901177a87&t=1592722974")',
        success() {
          console.log("success");
        }
      });
    }
  }
};
</script>

<style lang="scss" scope>
.score {
  font-family: "Parsek";
  color: #e96169;
  margin-left: 10rpx;
}
</style>