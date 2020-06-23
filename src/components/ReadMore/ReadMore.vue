<template>
  <view class="">
    <view
      class="content"
      :style="{
        height: isLongContent && !showMore ? showHeight + 'rpx' : 'auto'
      }"
    >
      <slot></slot>
    </view>
    <view
      @tap="toggleReadMore"
      v-if="isLongContent"
      class="showmore-wrap"
      :class="{ 'show-more': showMore }"
      :style="[innerShadowStyle]"
    >
      <text
        class="readmore-btn"
        :style="{
          fontSize: fontSize + 'rpx',
          color: color
        }"
      >
        {{ showMore ? openText : closeText }}
      </text>
      <hi-icon
        :name="showMore ? 'arrow-up' : 'arrow-down'"
        color="#2979ff"
      ></hi-icon>
    </view>
  </view>
</template>

<script>
import HiIcon from "@/components/Basic/Icon";

/**
 * readMore 阅读更多
 * @description 该组件一般用于内容较长，预先收起一部分，点击展开全部内容的场景。
 * @tutorial https://www.uviewui.com/components/readMore.html
 * @property {String Number} show-height 内容超出此高度才会显示展开全文按钮，单位rpx（默认400）
 * @property {Boolean} toggle 展开后是否显示收起按钮（默认false）
 * @property {String} close-text 关闭时的提示文字（默认“展开阅读全文”）
 * @property {String Number} font-size 提示文字的大小，单位rpx（默认28）
 * @property {String} open-text 展开时的提示文字（默认“收起”）
 * @property {String} color 提示文字的颜色（默认#2979ff）
 * @example <read-more><rich-text :nodes="content"></rich-text></read-more>
 */
export default {
  components: {
    HiIcon
  },
  name: "read-more",
  props: {
    // 默认的显示占位高度，单位为rpx
    showHeight: {
      type: [Number, String],
      default: 400
    },
    // 展开后是否显示"收起"按钮
    toggle: {
      type: Boolean,
      default: false
    },
    // 关闭时的提示文字
    closeText: {
      type: String,
      default: "展开查看全部"
    },
    // 展开时的提示文字
    openText: {
      type: String,
      default: "收起"
    },
    // 提示的文字颜色
    color: {
      type: String,
      default: "#2979ff"
    },
    // 提示文字的大小
    fontSize: {
      type: [String, Number],
      default: 28
    },
    // 是否显示阴影
    shadowStyle: {
      type: Object,
      default() {
        return {
          backgroundImage:
            "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #E0E5EC 80%)",
          paddingTop: "300rpx",
          marginTop: "-300rpx"
        };
      }
    }
  },
  watch: {
    paramsChange(val) {
      this.init();
    }
  },
  computed: {
    paramsChange() {
      return `${this.toggle}-${this.showHeight}`;
    },
    // 展开后无需阴影，收起时才需要阴影样式
    innerShadowStyle() {
      if (this.showMore) return {};
      else return this.shadowStyle;
    }
  },
  data() {
    return {
      isLongContent: false, // 是否需要隐藏一部分内容
      showMore: false // 当前隐藏与显示的状态，true-显示，false-收起
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getRect(".content").then(res => {
        // 判断高度，如果真实内容高度大于占位高度，则显示收起与展开的控制按钮
        if (res.height > uni.upx2px(this.showHeight)) {
          this.isLongContent = true;
          this.showMore = false;
        }
      });
    },

    // 展开或者收起
    toggleReadMore() {
      this.showMore = !this.showMore;
      // 如果toggle为false，隐藏"收起"部分的内容
      if (this.toggle == false) this.isLongContent = false;
    },

    // 查询节点信息
    getRect(selector, all) {
      return new Promise(resolve => {
        uni
          .createSelectorQuery()
          .in(this)
          [all ? "selectAll" : "select"](selector)
          .boundingClientRect(rect => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          })
          .exec();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  // line-height: 1.8;
  // text-align: left;
  // text-indent: 2em;
  overflow : hidden;

  font-size : 30rpx;

  color : #606266;
}

.showmore-wrap {
  display : flex;

  position : relative;

  padding-bottom : 26rpx;
  width : 100%;

  align-items : center;
  justify-content : center;
}

.show-more {
  margin-top : 20rpx;
  padding-top : 0;

  background : none;
}

.readmore-btn {
  display : flex;

  margin-right : 3rpx;

  line-height : 1;

  align-items : center;
  justify-content : center;
}

.icon {
  margin-left : 14rpx;
}

</style>
