<script>
export default {
  onLaunch: async function() {
    // require SDK
    require("./plugins/sdk-wechat.3.13.0-beta.2.js");
    wx.BaaS.init("659c10502ff2539e1c8b");
    await this.$store.dispatch("user/getUserInfo");
  },
  onShow: function() {},
  onHide: function() {}
};
</script>

<style lang="scss">
@import "static/styles/index.scss";

/*每个页面公共css */
page {
  height: 100vh;

  background: $theme-bg;
}
.click-scale {
  transform: scale(0.95, 0.95);
}
.text-light {
  font-weight: 300;
}

.clearfix:after {
  display: block;
  visibility: hidden;
  clear: both;

  height: 0;

  content: "";
}

@keyframes show {
  0% {
    transform: translateY(-50px);
  }

  60% {
    transform: translateY(40upx);
  }

  100% {
    transform: translateY(0px);
  }
}

@-webkit-keyframes show {
  0% {
    transform: translateY(-50px);
  }

  60% {
    transform: translateY(40upx);
  }

  100% {
    transform: translateY(0px);
  }
}
.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
.shadow-inner {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}
.shadow-outline {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
.shadow-none {
  box-shadow: none;
}
.line-blue {
  border: 3rpx solid #4674e5;

  background: white !important;
}
</style>
