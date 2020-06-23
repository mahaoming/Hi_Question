<template>
  <view class="subject-wrap">
    <navbar fixed transparent="show" :backgroundColor="[224, 229, 236]">
      <view class="text-xl text-bold">
        {{ title }}
      </view>
    </navbar>

    <view class="vertical-tabs">
      <view class="tabs">
        <view
          class="tabs--item"
          :key="value.index"
          v-for="(value, subject) in subjects"
          :data-subject="subject"
          :data-value="value"
          @click="selectTab"
        >
          {{ subject }}
        </view>
        <view class="active-tab" :style="{ top: `${current * 80}rpx` }"
          >{{ activeName }}
        </view>
      </view>
      <view class="content">
        <view
          v-for="(paperItem, paperIndex) of activePapers"
          class="content-item"
          :key="paperIndex"
          @click="onClickPaper(paperItem)"
        >
          <view>
            <view class="name">{{ paperItem.title }}</view>
            <view class="margin-top-xs flex align-center">
              <text class="year">{{ paperItem.year }}</text>
              <text
                v-for="(tagItem, tagIndex) of paperItem.tags"
                :key="tagIndex"
                class="tag"
              >
                {{ tagItem }}
              </text>
            </view>
          </view>
          <view>
            <text class="cuIcon cuIcon-right text-xl"></text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import func from "_u/func";

// 试卷分组
const formatPapers = papers => {
  let subjects = {};
  let firseSubject = ""; //用于初始展示
  let index = 0;
  // uni-app 不支持遍历对象中带索引, 添加手动索引
  // https://ask.dcloud.net.cn/question/58891

  papers.forEach(paper => {
    if (func.isEmpty(subjects[paper.subject])) {
      subjects[paper.subject] = { papers: [paper], index };
      if (index === 0) firseSubject = paper.subject;
      index++;
    } else {
      subjects[paper.subject]["papers"] = [
        ...subjects[paper.subject]["papers"],
        paper
      ];
    }
  });
  return [subjects, firseSubject];
};

export default {
  data() {
    return {
      title: "",
      current: 0,
      activeName: "",
      activePapers: [],
      subjects: []
    };
  },

  mounted() {
    this.getQuestionPapers();
  },

  onLoad(option) {
    this.title = option.title;
  },

  methods: {
    // 获取试卷
    async getQuestionPapers() {
      let questionPaper = new wx.BaaS.TableObject("question_paper");
      let query = new wx.BaaS.Query();
      query.compare("cate", "=", this.title);

      uni.showLoading();
      let papers = await questionPaper.setQuery(query).find();
      papers = papers.data.objects;
      if (papers.length !== 0) {
        [this.subjects, this.activeName] = formatPapers(papers);
        this.activePapers = this.subjects[this.activeName]["papers"];
      }
      uni.hideLoading();
    },

    // 选择侧边导航栏
    selectTab(e) {
      this.current = e.target.dataset.value.index;
      this.activeName = e.target.dataset.subject;
      this.activePapers = e.target.dataset.value.papers;
    },

    // 跳转试卷详情页
    onClickPaper(paper) {
      uni.navigateTo({
        url: `/pages/question/index?id=${paper.id}&title=${paper.title}&timing=${paper.timing}`
      });
    }
  }
};
</script>

<style lang="scss">
.subject-wrap {
  background: $theme-bg;

  .vertical-tabs {
    padding-left: 30rpx;
    display: grid;

    margin-top: 20rpx;

    column-gap: 20rpx;
    grid-template-columns: 3fr 7fr;
    .tabs {
      position: relative;

      border-radius: 10px;
      padding-bottom: 100rpx;
      height: 400rpx;

      background: #e0e5ec;

      box-shadow: inset -5px 5px 10px #bec3c9, inset 5px -5px 10px #ffffff;

      &--item {
        display: flex;

        height: 80rpx;

        align-items: center;
        justify-content: center;
        &.active {
          border-radius: 10px;

          background: #e0e5ec;

          box-shadow: -5px 5px 10px #bec3c9, 5px -5px 10px #ffffff;
        }
      }
      .active-tab {
        display: flex;

        position: absolute;
        left: 0;

        border-radius: 10px;
        width: 100%;
        height: 80rpx;

        background: #e0e5ec;

        box-shadow: -3px 3px 6px #bec3c9, 3px -3px 6px #ffffff;

        transition: top 0.4s;

        align-items: center;
        justify-content: center;
      }
    }

    .content {
      border-radius: 10px;
      height: calc(100vh - 300rpx);

      &-item {
        display: flex;

        margin-bottom: 30rpx;
        border-radius: 10px;
        padding: 20rpx 20rpx;

        background: #e0e5ec;

        box-shadow: 7px 7px 15px rgba(55, 84, 170, 0.15),
          -7px -7px 20px rgba(255, 255, 255, 1),
          inset 0px 0px 4px rgba(255, 255, 255, 0.2),
          inset 7px 7px 15px rgba(55, 84, 170, 0),
          inset -7px -7px 20px rgba(255, 255, 255, 0),
          0px 0px 4px rgba(255, 255, 255, 0) !important;

        transition: box-shadow 0.25s ease !important;

        align-items: center;
        justify-content: space-between;
        .name {
          margin-bottom: 30rpx;

          font-size: $text-xl;
          font-weight: 600;
        }
        .year {
          margin-right: 15rpx;
          border-radius: 20px;
          padding: 10rpx 15rpx;

          background: linear-gradient(145deg, #caced4, #f0f5fd);

          box-shadow: 2px 2px 5px #bec3c9, -2px -2px 5px #ffffff;
        }
        .tag {
          margin-right: 15rpx;
          border-radius: 20px;
          padding: 10rpx 15rpx;

          font-size: $text-sm;
          &:nth-child(2) {
            background: linear-gradient(145deg, #e0aa33, #ffca3d);

            box-shadow: 2px 2px 5px #d4a130, -2px -2px 5px #ffd942;
          }
          &:nth-child(3) {
            color: white;
            background: linear-gradient(145deg, #4362db, #4f75ff);

            box-shadow: 2px 2px 4px #3f5dcf, -2px -2px 4px #557dff;
          }
        }
        &:active {
          background: #e0e5ec;

          box-shadow: 7px 7px 15px rgba(55, 84, 170, 0.15),
            -7px -7px 20px rgba(255, 255, 255, 1),
            inset 0px 0px 4px rgba(255, 255, 255, 0),
            inset 7px 7px 15px rgba(55, 84, 170, 0.15),
            inset -7px -7px 20px rgba(255, 255, 255, 1),
            0px 0px 4px rgba(255, 255, 255, 0.2) !important;
        }
      }
    }
  }
}
</style>