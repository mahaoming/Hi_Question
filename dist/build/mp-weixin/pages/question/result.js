(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/question/result"],{"715a":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62");function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=function(){n.e("pages/question/components/QuestionList").then(function(){return resolve(n("8dce"))}.bind(null,n)).catch(n.oe)},s=function(){n.e("components/CountTo/CountTo").then(function(){return resolve(n("e046"))}.bind(null,n)).catch(n.oe)},a=null,l={components:{QuestionList:i,VCountTo:s},data:function(){return{isShowScore:!1,isShowBorder:!1,title:"----",score1:222}},onLoad:function(e){a=e.paperId,this.title=e.title,this.getPaperResult({resultId:e.resultId,paperId:a}),this.getFontFamily()},onPageScroll:function(e){this.isShowBorder=0!==e.scrollTop},computed:c({},(0,o.mapGetters)("question",["questionList","score"])),methods:c({},(0,o.mapActions)("question",["getPaperResult","onCollectQuestion"]),{$_onCollectQuestion:function(e){this.onCollectQuestion({questionIndex:e,paperId:a})},getFontFamily:function(){e.loadFontFace({family:"proximanova",source:'url("https://656e-env-used-1258356576.tcb.qcloud.la/TTF/proximanova.ttf?sign=4c675cf35b03b250eab077d901177a87&t=1592722974")',success:function(){console.log("success")}})}})};t.default=l}).call(this,n("543d")["default"])},"779d":function(e,t,n){"use strict";n.r(t);var o=n("e979"),r=n("dc21");for(var c in r)"default"!==c&&function(e){n.d(t,e,(function(){return r[e]}))}(c);n("f1b3");var u,i=n("f0c5"),s=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);t["default"]=s.exports},a5ee:function(e,t,n){"use strict";(function(e){n("6cdc");o(n("66fd"));var t=o(n("779d"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},dc21:function(e,t,n){"use strict";n.r(t);var o=n("715a"),r=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);t["default"]=r.a},e022:function(e,t,n){e.exports={blue:"#4a6df3",gray:"#aaa",green:"#30b08f","light-blue":"#4674e5",panGreen:"#30b08f",pink:"#e96169",red:"#c03639","text-df":"28rpx","text-lg":"32rpx","text-sl":"80rpx","text-sm":"24rpx","text-xl":"36rpx","text-xs":"20rpx","text-xsl":"120rpx","text-xxl":"44rpx",tiffany:"#56ccf2",yellow:"#f2cf63"}},e979:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return o}));var r=function(){var e=this,t=e.$createElement;e._self._c},c=[]},f1b3:function(e,t,n){"use strict";var o=n("e022"),r=n.n(o);r.a}},[["a5ee","common/runtime","common/vendor"]]]);