<template>
  <view class="rank-wrap">
    <navbar fixed transparent="show" :backgroundColor="[224, 229, 236]">
      <view class="text-xl text-bold">
        排行榜
      </view>
    </navbar>
    <view class="margin-lr">
      <view class="top-rank">
        <view
          class="topitem"
          v-for="(topItem, index) of topRankList"
          :key="index"
        >
          <view class="avatar">
            <image :src="topItem.userinfo.avatar" mode="widthFix"></image>
          </view>
          <view class="content">
            <view>
              <text class="correct">{{ topItem.ratio }}%</text>
              <text> </text>
            </view>
            <view class="ratio">答题数:{{ topItem.totalNum }} </view>
            <view class="nickname">{{ topItem.userinfo.nickname }}</view>
          </view>
        </view>
      </view>
      <view class="flex justify-end text-gray margin-top-sm?">
        <view
          >数据更新时间:
          {{ updateTime | parseTime("{y}-{m}-{d} {h}:{i}") }}</view
        >
      </view>
      <view class="bottom-rank">
        <view
          class="rank-item"
          :key="subIndex"
          v-for="(subItem, subIndex) of subRankList"
        >
          <view>
            <text class="ranking">{{ subIndex + 4 }}</text>
            <text class="name">{{ subItem.userinfo.nickname }}</text>
          </view>
          <view>
            <text class="correct">{{ subItem.ratio }}%</text>
            <text class="ratio">({{ subItem.totalNum }})题</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import func from "_u/func";

const formatResults = results => {
  let paperResults = {};
  let totalNum = 0;
  results.forEach(result => {
    const { userinfo, rightQuestionsNum, wrongQuestions } = result;
    totalNum += rightQuestionsNum + wrongQuestions.length;
    if (func.isEmpty(paperResults[userinfo.userId])) {
      paperResults[userinfo.userId] = {
        totalNum: rightQuestionsNum + wrongQuestions.length,
        rightNum: rightQuestionsNum,
        userinfo
      };
    } else {
      paperResults[userinfo.userId] = Object.assign(
        paperResults[userinfo.userId],
        {
          totalNum:
            paperResults[userinfo.userId]["totalNum"] +
            rightQuestionsNum +
            wrongQuestions.length,
          rightNum:
            paperResults[userinfo.userId]["rightNum"] + rightQuestionsNum
        }
      );
    }
  });

  return [paperResults, totalNum];
};

export default {
  data() {
    return {
      topRankList: [],
      subRankList: []
    };
  },
  computed: {
    updateTime: function() {
      return new Date(new Date().toLocaleDateString()).getTime() - 60;
    }
  },
  mounted() {
    this.getQuestionResults();
  },
  methods: {
    // 获取问题结果
    async getQuestionResults() {
      uni.showLoading({ title: "加载中..." });
      let PaperResult = new wx.BaaS.TableObject("paper_result");
      let Query = new wx.BaaS.Query();
      Query.compare("inRank", "=", true);
      let resultRes = await PaperResult.setQuery(Query)
        .limit(1000)
        .find();
      let [results, totalNum] = formatResults(resultRes.data.objects);

      // 当数据为空时
      if (func.isEmpty(resultRes)) {
        uni.hideLoading();
        return;
      }

      // 计算百分比
      results = Object.keys(results).map(item => {
        return Object.assign(results[item], {
          radioNum: results[item]["rightNum"] / results[item]["totalNum"],
          ratio: Number(
            (results[item]["rightNum"] / results[item]["totalNum"]) * 100
          ).toFixed(2)
        });
      });

      // 自定义排序规则
      // 目前按正确率 * 0.8 + 答题数 * 0.2
      results = results.sort((a, b) => {
        const ratio1 = (a.totalNum / totalNum) * 20 + a.radioNum * 80;
        const ratio2 = (b.totalNum / totalNum) * 20 + b.radioNum * 80;
        return ratio2 - ratio1;
      });

      this.topRankList = results.splice(0, 3);
      this.subRankList = results.splice(0, 7);
      uni.hideLoading();
    }
  }
};
</script>

<style lang="scss">
.rank-wrap {
  .top-rank {
    display: grid;

    margin-top: 40rpx;

    align-content: end;
    grid-template-columns: 1fr 1fr 1fr;
    .avatar {
      text-align: center;
      background-color: rgba(0, 0, 0, 0);
      image {
        margin: 0 auto;
        margin-bottom: 30rpx;
        border-radius: 50%;
        width: 100rpx;
        height: 100rpx;

        background: linear-gradient(225deg, #f0f5fd, #caced4);

        box-shadow: -5px 5px 10px #bec3c9, 5px -5px 10px #ffffff;
      }
    }
    .topitem {
      align-self: end;
      background-color: rgba(0, 0, 0, 0);
      .content {
        display: flex;
        border-radius: 25rpx 25rpx 0 0;

        padding: 30rpx;

        align-items: center;
        flex-direction: column;
        .correct {
          background: #e0e5ec;
          margin-right: 4rpx;
          margin-bottom: 4rpx;

          font-size: $text-xxl;
          font-weight: 800;
        }
        .ratio {
          font-size: $text-sm;

          color: $gray;
        }
      }
      &:nth-child(1) {
        align-self: end;
        order: 2;
        .content {
          height: 340rpx;
          box-shadow: -6px 6px 12px #caced4, 6px -6px 12px #f6fcff;
        }
      }
      &:nth-child(2) {
        align-self: end;
        order: 1;
        .content {
          height: 260rpx;
          box-shadow: -6px 6px 12px #caced4, 6px -6px 12px #f6fcff;
        }
      }
      &:nth-child(3) {
        align-self: end;
        order: 3;
        .content {
          height: 220rpx;
          box-shadow: -6px 6px 12px #caced4, 6px -6px 12px #f6fcff;
        }
      }
    }
  }
  .bottom-rank {
    .rank-item {
      display: flex;

      margin-top: 20rpx;
      border-radius: 20rpx;
      padding: 20rpx;
      height: 90%;

      background: #e0e5ec;

      box-shadow: -6px 6px 12px #b8bcc2, 6px -6px 12px #ffffff;

      align-items: center;
      justify-content: space-between;
      .ranking {
        display: inline-flex;

        margin: 10rpx 20rpx 10rpx 0;
        border-radius: 50%;
        width: 50rpx;
        height: 50rpx;

        font-weight: 600;

        background: linear-gradient(145deg, #caced4, #f0f5fd);

        box-shadow: 2px 2px 5px #bec3c9, -2px -2px 5px #ffffff;

        align-items: center;
        justify-content: center;
      }
      .name {
        font-size: $text-lg;
      }
      .correct {
        margin-right: 4rpx;

        font-size: $text-xl;
      }
      .ratio {
        font-size: $text-sm;

        color: $gray;
      }
    }
  }
}
</style>