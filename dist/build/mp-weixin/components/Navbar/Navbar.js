(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/Navbar/Navbar"],{"0d5b":function(t,o,r){"use strict";r.r(o);var a=r("711c"),e=r("9016");for(var n in e)"default"!==n&&function(t){r.d(o,t,(function(){return e[t]}))}(n);r("7a06");var l,i=r("f0c5"),c=Object(i["a"])(e["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],l);o["default"]=c.exports},"3c2c":function(t,o,r){t.exports={blue:"#4a6df3",gray:"#aaa",green:"#30b08f","light-blue":"#4674e5",panGreen:"#30b08f",pink:"#e96169",red:"#c03639","text-df":"28rpx","text-lg":"32rpx","text-sl":"80rpx","text-sm":"24rpx","text-xl":"36rpx","text-xs":"20rpx","text-xsl":"120rpx","text-xxl":"44rpx",tiffany:"#56ccf2",yellow:"#f2cf63"}},6791:function(t,o,r){"use strict";(function(t){function a(t){return a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var e=function(){Promise.all([r.e("common/vendor"),r.e("components/Basic/Icon/index")]).then(function(){return resolve(r("98c9"))}.bind(null,r)).catch(r.oe)},n=t.getSystemInfoSync().statusBarHeight+"px",l={name:"Navbar",components:{hiIcon:e},data:function(){return{statusBarHeight:n,transparentValue:0,navTransparentFixedFontColor:"#fff",statusBarFontColorInfo:[],backgroundColorRgba:"rgba(255,255,255,1)",backgroundColorRgb:"rgb(222,222,222)",colorInfo:"#000000",placeholder:!1,colorContainer:null,slotSlidiSwitch:0}},props:{height:{type:String,default:"44px"},barPlaceholder:{type:String,default:"auto"},back:{type:[Boolean,String],default:!0},title:{type:String,default:""},leftSlot:{type:[Boolean,String],default:!0},rightSlot:{type:[Boolean,String],default:!0},leftText:{type:String,default:""},rightText:{type:String,default:""},leftIcon:{type:String,default:""},rightIcon:{type:String,default:""},fixed:{type:[Boolean,String],default:!1},color:{type:[Array,String],default:"#000000"},backgroundColor:{type:Array,default:function(){return new Array([255,255,255],[255,255,255])}},backgroundColorLinearDeg:{type:String,default:"45"},backgroundImg:{type:String,default:""},transparent:{type:String,default:"show"},statusBarFontColor:{type:[Array,String],default:function(){return new Array("#000000","#000000")}},statusBar:{type:[Boolean,String],default:!0},statusBarBackground:{type:String,default:""},shadow:{type:[String,Boolean],default:!1},border:{type:[String,Boolean],default:!1},defaultBackUrl:{type:String,default:""},backTabbarUrl:{type:String,default:"/pages/home/index"},leftSlidiSwitch:{type:[Boolean,String],default:!1},centerSlidiSwitch:{type:[Boolean,String],default:!1},rightSlidiSwitch:{type:[Boolean,String],default:!1},pageScroll:{type:Object,default:function(){return{}}}},created:function(){var t=this;switch(t.barPlaceholder){case"show":t.placeholder=!0;break;case"hidden":t.placeholder=!1;break;case"auto":t.fixed&&(t.placeholder=!0);break}switch(t.setStatusBarFontColor(),t.colorContainer="object"==a(t.color)?t.color:[t.color,t.color],t.colorInfo=t.colorContainer[0],t.transparent){case"show":t.transparentValue=1;break;case"hidden":t.transparentValue=0;break;case"auto":t.setTVAuto(t.pageScroll);break}t.setBgColor(),t.fixed&&(t.leftSlidiSwitch||t.centerSlidiSwitch||t.rightSlidiSwitch)&&t.doScroll(t.pageScroll)},watch:{pageScroll:function(t,o){var r=this;switch(r.transparent){case"show":r.transparentValue=1;break;case"hidden":r.transparentValue=0;break;case"auto":this.setTVAuto(t);break}r.fixed&&(r.leftSlidiSwitch||r.centerSlidiSwitch||r.rightSlidiSwitch)&&r.doScroll(t)},transparentValue:function(o,r){var a=this;r>.8?t.setNavigationBarColor({frontColor:a.statusBarFontColorInfo[1],backgroundColor:a.backgroundColorRgb}):r<.2&&t.setNavigationBarColor({frontColor:a.statusBarFontColorInfo[0],backgroundColor:a.backgroundColorRgb})},backgroundColor:function(t,o){var r=this;r.setBgColor()},color:function(t,o){}},methods:{onClickLeft:function(){this.back?getCurrentPages().length>1?t.navigateBack():this.defaultBackUrl?t.redirectTo({url:this.defaultBackUrl}):this.backTabbarUrl&&t.reLaunch({url:this.backTabbarUrl}):this.$emit("click-left")},onClickRight:function(){this.$emit("click-right")},doScroll:function(t){var o=this;o.$emit("scroll",t),t.scrollTop>100?o.slotSlidiSwitch=1:o.slotSlidiSwitch=0},setTVAuto:function(t){var o=this;o.$emit("scroll",t),t.scrollTop>100?(o.transparentValue=1,o.colorInfo=o.colorContainer[1]):(o.transparentValue=t.scrollTop/100,o.colorInfo=o.colorContainer[0]),o.setBgColor()},setBgColor:function(){var t=this;if("object"==a(t.backgroundColor[0])){var o=t.backgroundColor.length;if(o>=2){var r="linear-gradient("+t.backgroundColorLinearDeg+"deg,",e=null;for(var n in t.backgroundColor)e=t.backgroundColor[n],r+="rgba("+e[0]+","+e[1]+","+e[2]+","+t.transparentValue+")",o!=1*n+1&&(r+=",");r+=")",t.backgroundColorRgba=r}}else{var l=t.backgroundColor[0]+","+t.backgroundColor[1]+","+t.backgroundColor[2];t.backgroundColorRgb="rgb("+l+")",t.backgroundColorRgba="rgba("+l+","+t.transparentValue+")"}},setStatusBarFontColor:function(){var o=this;"string"==typeof o.statusBarFontColor?o.statusBarFontColorInfo=[o.statusBarFontColor,o.statusBarFontColor]:"object"==a(o.statusBarFontColor)&&(1==o.statusBarFontColor.length?o.statusBarFontColorInfo=[o.statusBarFontColor[0],o.statusBarFontColor[0]]:o.statusBarFontColor.length>=2&&(o.statusBarFontColorInfo=[o.statusBarFontColor[0],o.statusBarFontColor[1]])),t.setNavigationBarColor({frontColor:o.statusBarFontColorInfo[0],backgroundColor:o.backgroundColorRgb})}},destroyed:function(){}};o.default=l}).call(this,r("543d")["default"])},"711c":function(t,o,r){"use strict";var a;r.d(o,"b",(function(){return e})),r.d(o,"c",(function(){return n})),r.d(o,"a",(function(){return a}));var e=function(){var t=this,o=t.$createElement;t._self._c},n=[]},"7a06":function(t,o,r){"use strict";var a=r("3c2c"),e=r.n(a);e.a},9016:function(t,o,r){"use strict";r.r(o);var a=r("6791"),e=r.n(a);for(var n in a)"default"!==n&&function(t){r.d(o,t,(function(){return a[t]}))}(n);o["default"]=e.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/Navbar/Navbar-create-component',
    {
        'components/Navbar/Navbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0d5b"))
        })
    },
    [['components/Navbar/Navbar-create-component']]
]);
