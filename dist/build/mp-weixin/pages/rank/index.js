(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/rank/index"],{"5b45":function(t,e,n){"use strict";n.r(e);var r=n("bfa0"),u=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=u.a},"634c":function(t,e,n){t.exports={blue:"#4a6df3",gray:"#aaa",green:"#30b08f","light-blue":"#4674e5",panGreen:"#30b08f",pink:"#e96169",red:"#c03639","text-df":"28rpx","text-lg":"32rpx","text-sl":"80rpx","text-sm":"24rpx","text-xl":"36rpx","text-xs":"20rpx","text-xsl":"120rpx","text-xxl":"44rpx",tiffany:"#56ccf2",yellow:"#f2cf63"}},"7acc":function(t,e,n){"use strict";n.r(e);var r=n("8364"),u=n("5b45");for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);n("7df8");var i,o=n("f0c5"),c=Object(o["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);e["default"]=c.exports},"7b4e":function(t,e,n){"use strict";(function(t){n("6cdc");r(n("66fd"));var e=r(n("7acc"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"7df8":function(t,e,n){"use strict";var r=n("634c"),u=n.n(r);u.a},8364:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var u=function(){var t=this,e=t.$createElement,n=(t._self._c,t._f("parseTime")(t.updateTime,"{y}-{m}-{d} {h}:{i}"));t.$mp.data=Object.assign({},{$root:{f0:n}})},a=[]},bfa0:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("a34a")),u=a(n("6171"));function a(t){return t&&t.__esModule?t:{default:t}}function i(t,e){return s(t)||c(t,e)||o()}function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function c(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var n=[],r=!0,u=!1,a=void 0;try{for(var i,o=t[Symbol.iterator]();!(r=(i=o.next()).done);r=!0)if(n.push(i.value),e&&n.length===e)break}catch(c){u=!0,a=c}finally{try{r||null==o["return"]||o["return"]()}finally{if(u)throw a}}return n}}function s(t){if(Array.isArray(t))return t}function f(t,e,n,r,u,a,i){try{var o=t[a](i),c=o.value}catch(s){return void n(s)}o.done?e(c):Promise.resolve(c).then(r,u)}function l(t){return function(){var e=this,n=arguments;return new Promise((function(r,u){var a=t.apply(e,n);function i(t){f(a,r,u,i,o,"next",t)}function o(t){f(a,r,u,i,o,"throw",t)}i(void 0)}))}}var d=function(t){var e={},n=0;return t.forEach((function(t){var r=t.userinfo,a=t.rightQuestionsNum,i=t.wrongQuestions;n+=a+i.length,u.default.isEmpty(e[r.userId])?e[r.userId]={totalNum:a+i.length,rightNum:a,userinfo:r}:e[r.userId]=Object.assign(e[r.userId],{totalNum:e[r.userId]["totalNum"]+a+i.length,rightNum:e[r.userId]["rightNum"]+a})})),[e,n]},p={data:function(){return{topRankList:[],subRankList:[]}},computed:{updateTime:function(){return new Date((new Date).toLocaleDateString()).getTime()-60}},mounted:function(){this.getQuestionResults()},methods:{getQuestionResults:function(){var e=l(r.default.mark((function e(){var n,a,o,c,s,f,l;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"加载中..."}),n=new wx.BaaS.TableObject("paper_result"),a=new wx.BaaS.Query,a.compare("inRank","=",!0),e.next=6,n.setQuery(a).limit(1e3).find();case 6:if(o=e.sent,c=d(o.data.objects),s=i(c,2),f=s[0],l=s[1],!u.default.isEmpty(o)){e.next=11;break}return t.hideLoading(),e.abrupt("return");case 11:f=Object.keys(f).map((function(t){return Object.assign(f[t],{radioNum:f[t]["rightNum"]/f[t]["totalNum"],ratio:Number(f[t]["rightNum"]/f[t]["totalNum"]*100).toFixed(2)})})),f=f.sort((function(t,e){var n=t.totalNum/l*20+80*t.radioNum,r=e.totalNum/l*20+80*e.radioNum;return r-n})),this.topRankList=f.splice(0,3),this.subRankList=f.splice(0,7),t.hideLoading();case 16:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}()}};e.default=p}).call(this,n("543d")["default"])}},[["7b4e","common/runtime","common/vendor"]]]);