<template>
  <view class="history-wrap">
    <view class="history-wrap__title">
      <text>你的刷题</text>
    </view>
    <view
      class="flex flex-direction align-center justify-center margin-top-xl"
      v-if="paperList.length === 0"
    >
      <image
        class="history-wrap__empty"
        mode="widthFix"
        src="../../../static/image/home/paperempty.png"
      ></image>
      <view class="history-wrap__empty--text"
        >没有刷题? 你可真是个'小天才'</view
      >
    </view>
    <view v-else>
      <read-more toggle>
        <view class="animation-fade paperlist">
          <view
            v-for="(paper, index) of paperList"
            :key="index"
            class="paperitem click-scale"
            @click="toQuestionResult(paper, paper.paper)"
          >
            <view>
              <view class="title">{{ paper.paper.title }}</view>
              <view class="text-gray text-sm">{{
                paper.created_at | parseTime("{y}-{m}-{d} {h}:{i}")
              }}</view>
            </view>
            <view>
              <text class="cuIcon cuIcon-right text-gray"></text>
            </view>
          </view>
        </view>
      </read-more>
    </view>
  </view>
</template>

<script>
import ReadMore from "@/components/ReadMore/ReadMore";

export default {
  components: {
    ReadMore
  },
  data() {
    return {
      paperList: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.getPaperList();
    },

    // 获取试卷列表
    async getPaperList() {
      // TODO 加入分页
      await this.$store.dispatch("user/getUserInfo");
      if (this.$store.getters["user/userId"]) {
        let Query = new wx.BaaS.Query();
        let PaperResult = new wx.BaaS.TableObject("paper_result");
        let User = new wx.BaaS.User();

        Query.compare("created_by", "=", this.$store.getters["user/userId"]);
        const PaperRes = await PaperResult.setQuery(Query)
          .orderBy(["created_at"])
          .expand("paper")
          .find();
        this.paperList = PaperRes.data.objects;
      }
    },

    // 前往试卷详情
    toQuestionResult(result, paper) {
      uni.navigateTo({
        url: `/pages/question/result?resultId=${result.id}&paperId=${paper.id}&title=${paper.title}`
      });
    }
  }
};
</script>

<style lang="scss">
.history-wrap {
  margin-top : 60rpx;

  font-size : $text-xxl;
  font-weight : 600;
  &__title {
    margin-bottom : 30rpx;

    font-weight : 800;
  }
  &__empty {
    width : 50%;

    // height : 200rpx;
  }
  &__empty--text {
    margin-top : 20rpx;

    font-size : $text-sm;
    font-weight : 400;

    color : $gray;
  }
  .paperlist {
    display : grid;

    gap : 20rpx 40rpx;
    grid-template-columns : 1fr 1fr;
    .paperitem {
      display : flex;

      font-size : $text-lg;
      font-weight : 400;

      align-items : center;
      justify-content : space-between;
      .title {
        font-weight : 600;
      }
    }
  }
}

</style>