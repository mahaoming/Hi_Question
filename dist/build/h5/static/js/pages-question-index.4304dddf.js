(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-question-index"],{"0250":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{isShow:{type:Boolean,default:!1}}};e.default=n},"057c":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,"[data-v-c2b3a816]:export{blue:#4a6df3;gray:#aaa;green:#30b08f;light-blue:#4674e5;panGreen:#30b08f;pink:#e96169;red:#c03639;text-df:%?28?%;text-lg:%?32?%;text-sl:%?80?%;text-sm:%?24?%;text-xl:%?36?%;text-xs:%?20?%;text-xsl:%?120?%;text-xxl:%?44?%;tiffany:#56ccf2;yellow:#f2cf63}.uni-countdown[data-v-c2b3a816]{display:-webkit-box;display:-webkit-flex;display:flex;padding:%?2?% 0;font-weight:400;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.uni-countdown__splitor[data-v-c2b3a816]{display:-webkit-box;display:-webkit-flex;display:flex;padding:%?5?%;font-size:%?32?%;line-height:%?48?%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.uni-countdown__number[data-v-c2b3a816]{display:-webkit-box;display:-webkit-flex;display:flex;margin:%?5?%;width:%?52?%;height:%?48?%;font-size:%?32?%;line-height:%?48?%;text-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}",""]),t.exports=e},"15a3":function(t,e,i){"use strict";i.r(e);var n=i("9ef5"),r=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=r.a},"1de5":function(t,e,i){"use strict";t.exports=function(t,e){return e||(e={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},"20fd":function(t,e,i){"use strict";var n=i("d9f6"),r=i("aebd");t.exports=function(t,e,i){e in t?n.f(t,e,r(0,i)):t[e]=i}},"25ac":function(t,e,i){"use strict";var n=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("8e6e"),i("ac6a"),i("456d");var r=n(i("75fc"));i("96cf");var o=n(i("3b8d")),a=n(i("bd86")),s=n(i("7f5c")),c=n(i("6a2a")),l=n(i("40ee")),u=n(i("8dce")),d=i("2f62");function f(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function p(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?f(Object(i),!0).forEach((function(e){(0,a.default)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):f(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var h=null,g={components:{"jyf-parser":s.default,CountDown:c.default,Progress:l.default,QuestionList:u.default},data:function(){return{title:"----",isShowProgress:!1,isShowBorder:!1,timing:0}},onLoad:function(t){this.title=t.title,h=t.id,this.timing=t.timing,this.getPaperDetail({paperId:h})},filters:{indexFilter:function(t){return t<10?"0".concat(t,"题"):"".concat(t,"题")}},onPageScroll:function(t){this.isShowBorder=0!==t.scrollTop},computed:p({},(0,d.mapGetters)("question",["questionList"])),methods:p({},(0,d.mapActions)("question",["getPaperDetail","onCollectQuestion","onSelectOption"]),{$_onCollectQuestion:function(t){this.onCollectQuestion({questionIndex:t,paperId:h})},$_onSelectOption:function(t,e){this.onSelectOption({questionIndex:t,optionIndex:e})},onClickUpload:function(){var t=(0,o.default)(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:uni.showModal({title:"是否确认提交试卷",success:function(){var t=(0,o.default)(regeneratorRuntime.mark((function t(i){var n,o,a,s,c,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!i.confirm){t.next=15;break}if(e.isShowProgress){t.next=15;break}return e.isShowProgress=!0,n=e.questionList.filter((function(t){return t.selectOption!==t.rightOption})),n=n.map((function(t){var e=t.content,i=t.selectOption,n=t.id;return{content:e,selectOption:i,id:n}})),o=new wx.BaaS.TableObject("paper_result"),a=new wx.BaaS.TableObject("paper_paper"),s=o.create(),c=a.getWithoutData(h),s.set({paper:c,wrongQuestions:(0,r.default)(n),rightQuestionsNum:e.questionList.length-n.length,userinfo:e.$store.state.user.userInfo,inRank:0!==e.timing}),t.next=12,s.save();case 12:l=t.sent,e.saveWrongQuestion(n),setTimeout((function(){uni.redirectTo({url:"/pages/question/result?resultId=".concat(l.data.id,"&paperId=").concat(h,"&title=").concat(e.title)})}),2500);case 15:case"end":return t.stop()}}),t)})));function i(e){return t.apply(this,arguments)}return i}()});case 1:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}(),saveWrongQuestion:function(){},onClickBack:function(){uni.navigateBack({delta:-1})}})};e.default=g},"3c40":function(t,e,i){var n=i("24fb"),r=i("1de5"),o=i("8551");e=n(!1);var a=r(o);e.push([t.i,"[data-v-4ace8d1f]:export{blue:#4a6df3;gray:#aaa;green:#30b08f;light-blue:#4674e5;panGreen:#30b08f;pink:#e96169;red:#c03639;text-df:%?28?%;text-lg:%?32?%;text-sl:%?80?%;text-sm:%?24?%;text-xl:%?36?%;text-xs:%?20?%;text-xsl:%?120?%;text-xxl:%?44?%;tiffany:#56ccf2;yellow:#f2cf63}.question-wrap .upload[data-v-4ace8d1f]{margin-left:%?20?%;border-radius:10px;width:%?72?%;height:%?72?%;background-image:url("+a+');background-repeat:no-repeat;background-position:50%;background-size:auto 55%;box-shadow:-8px 8px 15px #bec3c9,8px -8px 15px #fff}.question-wrap .upload[data-v-4ace8d1f]:active{box-shadow:inset -5px 5px 9px #bec3c9,inset 5px -5px 9px #fff}.question-wrap .question-item[data-v-4ace8d1f]{display:grid;-webkit-column-gap:%?20?%;column-gap:%?20?%;grid-template-columns:8.5fr 1.5fr}.question-wrap .question-item .question[data-v-4ace8d1f]{margin:%?35?% %?15?%;border-radius:%?20?%;padding:%?30?%;background:#e0e5ec;box-shadow:10px 10px 19px #bec3c9,-10px -10px 19px #fff}.question-wrap .question-item .question .topic[data-v-4ace8d1f]{font-size:%?28?%;letter-spacing:%?12?%;color:#aaa}.question-wrap .question-item .question .topic .num[data-v-4ace8d1f]{margin:0 %?10?%;text-align:center;letter-spacing:%?2?%;background:#e0e5ec;box-shadow:1px 1px 2px #bec3c9,-1px -1px 2px #fff;border-radius:%?8?%;padding:%?2?% %?6?%}.question-wrap .question-item .question .content[data-v-4ace8d1f]{margin-top:%?20?%;margin-bottom:%?40?%;font-size:%?32?%}.question-wrap .question-item .action[data-v-4ace8d1f]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.question-wrap .question-item .action .collect[data-v-4ace8d1f]{display:-webkit-box;display:-webkit-flex;display:flex;border-radius:50%;width:%?100?%;height:%?100?%;background:-webkit-linear-gradient(305deg,#caced4,#f0f5fd);background:linear-gradient(145deg,#caced4,#f0f5fd);box-shadow:5px 5px 11px #bec3c9,-5px -5px 11px #fff;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.question-wrap .question-item .action .collect uni-image[data-v-4ace8d1f]{width:%?70?%;-webkit-transition:background-image 1s ease;transition:background-image 1s ease}.question-wrap .question-item .action .collected[data-v-4ace8d1f]{background:#e0e5ec;box-shadow:inset 5px 5px 11px #bec3c9,inset -5px -5px 11px #fff}.radiogroup[data-v-4ace8d1f]{margin:0 auto;border-radius:16px}.radiogroup .wrapper[data-v-4ace8d1f]{padding:6px 12px}.radiogroup .state[data-v-4ace8d1f]{position:absolute;top:0;right:0;opacity:.00001;pointer-events:none}.radiogroup .label[data-v-4ace8d1f]{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;display:grid;width:100%;word-wrap:break-word;word-break:break-all;color:#394a56;-webkit-box-align:center;-webkit-align-items:center;align-items:center;grid-template-columns:1fr 9fr}.radiogroup .text[data-v-4ace8d1f]{margin-left:16px;width:100%;font-size:%?28?%;opacity:.6;-webkit-transition:opacity .2s linear,-webkit-transform .2s ease-out;transition:opacity .2s linear,-webkit-transform .2s ease-out;transition:opacity .2s linear,transform .2s ease-out;transition:opacity .2s linear,transform .2s ease-out,-webkit-transform .2s ease-out}.radiogroup .indicator[data-v-4ace8d1f]{overflow:hidden;position:relative;border-radius:50%;width:30px;height:30px;background:#e0e5ec;box-shadow:3px 3px 6px #bec3c9,-3px -3px 6px #fff}.radiogroup .indicator[data-v-4ace8d1f]::before,.radiogroup .indicator[data-v-4ace8d1f]::after{position:absolute;top:10%;left:10%;border-radius:50%;width:80%;height:80%;content:""}.radiogroup .indicator[data-v-4ace8d1f]::before{box-shadow:-4px -2px 4px 0 #d1d9e6,4px 2px 8px 0 #fff}.radiogroup .indicator[data-v-4ace8d1f]::after{background-color:#ecf0f3;box-shadow:-4px -2px 4px 0 #fff,4px 2px 8px 0 #d1d9e6;-webkit-transition:opacity .25s ease-in-out,-webkit-transform .25s ease-in-out;transition:opacity .25s ease-in-out,-webkit-transform .25s ease-in-out;transition:opacity .25s ease-in-out,transform .25s ease-in-out;transition:opacity .25s ease-in-out,transform .25s ease-in-out,-webkit-transform .25s ease-in-out;-webkit-transform:scaleX(1);transform:scaleX(1)}.checked .indicator[data-v-4ace8d1f]::after{opacity:0;-webkit-transform:scale3d(.975,.975,1) translate3d(0,10%,0);transform:scale3d(.975,.975,1) translate3d(0,10%,0)}.checked .text[data-v-4ace8d1f]{font-size:%?36?%;opacity:1;-webkit-transform:translate3d(8px,0,0);transform:translate3d(8px,0,0)}',""]),t.exports=e},"3f13":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("28a5"),i("a481"),i("ac4d"),i("8a81"),i("ac6a"),i("4917"),i("6762"),i("2fdb"),i("c5f6");var n=uni.getSystemInfoSync().screenWidth/750,r=i("b101"),o={name:"parser",data:function(){return{uid:this._uid,scaleAm:"",showAm:"",nodes:[],imgs:[]}},props:{html:null,autopause:{type:Boolean,default:!0},autosetTitle:{type:Boolean,default:!0},compress:Number,domain:String,gestureZoom:Boolean,lazyLoad:Boolean,selectable:Boolean,tagStyle:Object,showWithAnimation:Boolean,useAnchor:Boolean,useCache:Boolean,xml:Boolean},watch:{html:function(t){this.setContent(t)}},mounted:function(){this.imgList=[],this.imgList.each=function(t){for(var e=0,i=this.length;e<i;e++)this.setItem(e,t(this[e],e,this))},this.imgList.setItem=function(t,e){if(t&&e){if(0==e.indexOf("http")&&this.includes(e)){for(var i,n="",r=0;i=e[r];r++){if("/"==i&&"/"!=e[r-1]&&"/"!=e[r+1])break;n+=Math.random()>.5?i.toUpperCase():i}return n+=e.substr(r),this[t]=n}if(this[t]=e,e.includes("data:image")){var o=e.match(/data:image\/(\S+?);(\S+?),(.+)/);if(!o)return}}},this.nodes.length||this.setContent(this.html)},beforeDestroy:function(){this._observer&&this._observer.disconnect(),this.imgList.each((function(t){})),clearInterval(this._timer)},methods:{_Dom2Str:function(t){var e="",i=!0,n=!1,r=void 0;try{for(var o,a=t[Symbol.iterator]();!(i=(o=a.next()).done);i=!0){var s=o.value;if("text"==s.type)e+=s.text;else{for(var c in e+="<"+s.name,s.attrs||{})e+=" "+c+'="'+s.attrs[c]+'"';s.children&&s.children.length?e+=">"+this._Dom2Str(s.children)+"</"+s.name+">":e+=">"}}}catch(l){n=!0,r=l}finally{try{i||null==a.return||a.return()}finally{if(n)throw r}}return e},setContent:function(t,e){var i=this;if(t){"string"!=typeof t&&(t=this._Dom2Str(t.nodes||t)),t.includes("rpx")&&(t=t.replace(/[0-9.]*rpx/g,(function(t){return parseFloat(t)*n+"px"})));var o=document.createElement("div");if(e)this.rtf?this.rtf.appendChild(o):this.rtf=o;else{var a="<style scoped>@keyframes show{0%{opacity:0}100%{opacity:1}}";for(var s in r.userAgentStyles)a+="".concat(s,"{").concat(r.userAgentStyles[s],"}");for(s in this.tagStyle)a+="".concat(s,"{").concat(this.tagStyle[s],"}");a+="</style>",t=a+t,this.rtf&&this.rtf.parentNode.removeChild(this.rtf),this.rtf=o}o.innerHTML=t;for(var c,l=this.rtf.getElementsByTagName("style"),u=0;c=l[u++];)c.innerHTML=c.innerHTML.replace(/\s*body/g,"#rtf"+this._uid),c.setAttribute("scoped","true");!this._observer&&this.lazyLoad&&IntersectionObserver&&(this._observer=new IntersectionObserver((function(t){for(var e,n=0;e=t[n++];)e.isIntersecting&&(e.target.src=e.target.getAttribute("data-src"),e.target.removeAttribute("data-src"),i._observer.unobserve(e.target))}),{rootMargin:"900px 0px 900px 0px"}));var d=this,f=this.rtf.getElementsByTagName("title");f.length&&this.autosetTitle&&uni.setNavigationBarTitle({title:f[0].innerText}),this.imgList.length=0;for(var p,h=this.rtf.getElementsByTagName("img"),g=0,b=0;p=h[g];g++){p.style.maxWidth="100%";var m=p.getAttribute("src");this.domain&&m&&("/"==m[0]?"/"==m[1]?p.src=(this.domain.includes("://")?this.domain.split("://")[0]:"")+":"+m:p.src=this.domain+m:m.includes("://")||(p.src=this.domain+"/"+m)),p.hasAttribute("ignore")||"A"==p.parentElement.nodeName||(p.i=b++,d.imgList.push(p.src||p.getAttribute("data-src")),p.onclick=function(){var t=!0;this.ignore=function(){return t=!1},d.$emit("imgtap",this),t&&uni.previewImage({current:this.i,urls:d.imgList})}),p.onerror=function(){d.$emit("error",{source:"img",target:this})},d.lazyLoad&&this._observer&&p.src&&0!=p.i&&(p.setAttribute("data-src",p.src),p.removeAttribute("src"),this._observer.observe(p))}var v=this.rtf.getElementsByTagName("a"),x=!0,w=!1,y=void 0;try{for(var A,k=v[Symbol.iterator]();!(x=(A=k.next()).done);x=!0){var C=A.value;C.onclick=function(){var t=!0,e=this.getAttribute("href");if(d.$emit("linkpress",{href:e,ignore:function(){return t=!1}}),t&&e)if("#"==e[0])d.useAnchor&&d.navigateTo({id:e.substr(1)});else{if(0==e.indexOf("http")||0==e.indexOf("//"))return!0;uni.navigateTo({url:e})}return!1}}}catch(z){w=!0,y=z}finally{try{x||null==k.return||k.return()}finally{if(w)throw y}}var _=this.rtf.getElementsByTagName("video");d.videoContexts=_;for(var E,S=0;E=_[S++];)E.style.maxWidth="100%",E.onerror=function(){d.$emit("error",{source:"video",target:this})},E.onplay=function(){if(d.autopause)for(var t,e=0;t=d.videoContexts[e++];)t!=this&&t.pause()};var O,Q=this.rtf.getElementsByTagName("audios"),I=!0,q=!1,M=void 0;try{for(var B,T=Q[Symbol.iterator]();!(I=(B=T.next()).done);I=!0){var j=B.value;j.onerror=function(){d.$emit("error",{source:"audio",target:this})}}}catch(z){q=!0,M=z}finally{try{I||null==T.return||T.return()}finally{if(q)throw M}}this.document=this.rtf,e||document.getElementById("rtf"+this._uid).appendChild(this.rtf),this.$nextTick((function(){i.nodes=[1],i.$emit("load")})),setTimeout((function(){return i.showAm=""}),500),clearInterval(this._timer),this._timer=setInterval((function(){var t=[i.rtf.getBoundingClientRect()];i.width=t[0].width,t[0].height==O&&(i.$emit("ready",t[0]),clearInterval(i._timer)),O=t[0].height}),350),this.showWithAnimation&&!e&&(this.showAm="animation:show .5s")}else this.rtf&&!e&&this.rtf.parentNode.removeChild(this.rtf)},getText:function(){arguments.length>0&&void 0!==arguments[0]||this.html||this.nodes;return this.rtf.innerText},navigateTo:function(t){if(!this.useAnchor)return t.fail&&t.fail({errMsg:"Anchor is disabled"});if(!t.id)return window.scrollTo(0,this.rtf.offsetTop),t.success&&t.success({errMsg:"pageScrollTo:ok"});var e=document.getElementById(t.id);if(!e)return t.fail&&t.fail({errMsg:"Label not found"});t.scrollTop=this.rtf.offsetTop+e.offsetTop,uni.pageScrollTo(t)},getVideoContext:function(t){if(!t)return this.videoContexts;for(var e=this.videoContexts.length;e--;)if(this.videoContexts[e].id==t)return this.videoContexts[e]},preLoad:function(t,e){t.constructor==Array&&(t=this._Dom2Str(t));var i=document.createElement("div");i.innerHTML=t;for(var n=i.querySelectorAll("img"),r=n.length-1;r>=e;r--)n[r].removeAttribute("src")},_load:function(t){},_tap:function(t){if(this.gestureZoom&&t.timeStamp-this._lastT<300){var e=t.touches[0].pageY-t.currentTarget.offsetTop;if(this._zoom)this._scaleAm.translateX(0).scale(1).step(),uni.pageScrollTo({scrollTop:(e+this._initY)/2-t.touches[0].clientY,duration:400});else{var i=t.touches[0].pageX-t.currentTarget.offsetLeft;this._initY=e,this._scaleAm=uni.createAnimation({transformOrigin:"".concat(i,"px ").concat(this._initY,"px 0"),timingFunction:"ease-in-out"}),this._scaleAm.scale(2).step(),this._tMax=i/2,this._tMin=(i-this.width)/2,this._tX=0}this._zoom=!this._zoom,this.scaleAm=this._scaleAm.export()}this._lastT=t.timeStamp},_touchstart:function(t){1==t.touches.length&&(this._initX=this._lastX=t.touches[0].pageX)},_touchmove:function(t){var e=t.touches[0].pageX-this._lastX;if(this._zoom&&1==t.touches.length&&Math.abs(e)>20){if(this._lastX=t.touches[0].pageX,this._tX<=this._tMin&&e<0||this._tX>=this._tMax&&e>0)return;this._tX+=e*Math.abs(this._lastX-this._initX)*.05,this._tX<this._tMin&&(this._tX=this._tMin),this._tX>this._tMax&&(this._tX=this._tMax),this._scaleAm.translateX(this._tX).step(),this.scaleAm=this._scaleAm.export()}}}};e.default=o},"3f59":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,"[data-v-10155682]:export{blue:#4a6df3;gray:#aaa;green:#30b08f;light-blue:#4674e5;panGreen:#30b08f;pink:#e96169;red:#c03639;text-df:%?28?%;text-lg:%?32?%;text-sl:%?80?%;text-sm:%?24?%;text-xl:%?36?%;text-xs:%?20?%;text-xsl:%?120?%;text-xxl:%?44?%;tiffany:#56ccf2;yellow:#f2cf63}.mask-wrap[data-v-10155682]{-webkit-filter:blur(%?4?%);filter:blur(%?4?%)}.neumorphic-progress[data-v-10155682]{position:fixed;top:50%;left:50%;z-index:20;margin:auto;width:260px;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.neumorphic-progress__back[data-v-10155682],.neumorphic-slider__back[data-v-10155682]{border:4px solid #f3f4f7;border-radius:10px;height:24px;background-color:var(--back-color);box-shadow:7px 7px 15px rgba(55,84,170,.15),-7px -7px 20px #fff,inset 0 0 4px hsla(0,0%,100%,0),inset 7px 7px 15px rgba(55,84,170,.15),inset -7px -7px 20px #fff,0 0 4px hsla(0,0%,100%,.2)!important}.neumorphic-slider[data-v-10155682]{width:240px}.neumorphic-slider__back[data-v-10155682]{margin-left:-10px;width:calc(100% + 20px)}.neumorphic-progress__line[data-v-10155682]{margin-top:-20px;margin-left:4px;border-radius:8px;width:var(--value);height:16px;background-color:#185bf1;opacity:1;-webkit-animation:sliding-data-v-10155682 3s ease;animation:sliding-data-v-10155682 3s ease}@-webkit-keyframes sliding-data-v-10155682{0%{width:0}100%{width:calc(100% - 8px)}}@keyframes sliding-data-v-10155682{0%{width:0}100%{width:calc(100% - 8px)}}",""]),t.exports=e},"40ee":function(t,e,i){"use strict";i.r(e);var n=i("8ed3"),r=i("430d");for(var o in r)"default"!==o&&function(t){i.d(e,t,(function(){return r[t]}))}(o);i("df8e");var a,s=i("f0c5"),c=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"10155682",null,!1,n["a"],a);e["default"]=c.exports},"430d":function(t,e,i){"use strict";i.r(e);var n=i("0250"),r=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=r.a},"43f6":function(t,e,i){"use strict";var n=i("5acc"),r=i.n(n);r.a},"44d9":function(t,e,i){"use strict";i.r(e);var n=i("25ac"),r=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=r.a},"4fdd":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticStyle:{display:"inherit"}},[t.nodes.length?t._e():t._t("default"),i("v-uni-view",{staticClass:"top",style:t.showAm+(t.selectable?";user-select:text;-webkit-user-select:text":""),attrs:{animation:t.scaleAm},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t._touchstart.apply(void 0,arguments)},touchmove:function(e){arguments[0]=e=t.$handleEvent(e),t._touchmove.apply(void 0,arguments)},click:function(e){arguments[0]=e=t.$handleEvent(e),t._tap.apply(void 0,arguments)}}},[i("div",{attrs:{id:"rtf"+t.uid}})]),t._l(t.imgs,(function(e,n){return i("v-uni-image",{key:n,attrs:{id:n,src:e,hidden:!0},on:{load:function(e){arguments[0]=e=t.$handleEvent(e),t._load.apply(void 0,arguments)}}})}))],2)},o=[]},5228:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,"@-webkit-keyframes show-data-v-19ea4da2{0%{opacity:0}100%{opacity:1}}@keyframes show-data-v-19ea4da2{0%{opacity:0}100%{opacity:1}}\r\n\r\n\r\n\r\n",""]),t.exports=e},"549b":function(t,e,i){"use strict";var n=i("d864"),r=i("63b6"),o=i("241e"),a=i("b0dc"),s=i("3702"),c=i("b447"),l=i("20fd"),u=i("7cd6");r(r.S+r.F*!i("4ee1")((function(t){Array.from(t)})),"Array",{from:function(t){var e,i,r,d,f=o(t),p="function"==typeof this?this:Array,h=arguments.length,g=h>1?arguments[1]:void 0,b=void 0!==g,m=0,v=u(f);if(b&&(g=n(g,h>2?arguments[2]:void 0,2)),void 0==v||p==Array&&s(v))for(e=c(f.length),i=new p(e);e>m;m++)l(i,m,b?g(f[m],m):f[m]);else for(d=v.call(f),i=new p;!(r=d.next()).done;m++)l(i,m,b?a(d,g,[r.value,m],!0):r.value);return i.length=m,i}})},"5acc":function(t,e,i){var n=i("5228");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("1f77c00d",n,!0,{sourceMap:!1,shadowMode:!1})},"60bf":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-countdown"},[t.showDay?i("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.d))]):t._e(),t.showDay?i("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v("天")]):t._e(),i("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.h))]),i("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v(t._s(t.showColon?":":"时"))]),i("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.i))]),i("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v(t._s(t.showColon?":":"分"))]),i("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.s))]),t.showColon?t._e():i("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v("秒")])],1)},o=[]},"65ea":function(t,e,i){var n=i("057c");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("07895ce4",n,!0,{sourceMap:!1,shadowMode:!1})},6733:function(t,e,i){var n=i("3c40");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("b1be7d90",n,!0,{sourceMap:!1,shadowMode:!1})},"6a2a":function(t,e,i){"use strict";i.r(e);var n=i("60bf"),r=i("15a3");for(var o in r)"default"!==o&&function(t){i.d(e,t,(function(){return r[t]}))}(o);i("9a5a");var a,s=i("f0c5"),c=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"c2b3a816",null,!1,n["a"],a);e["default"]=c.exports},"75fc":function(t,e,i){"use strict";i.r(e),i.d(e,"default",(function(){return f}));var n=i("a745"),r=i.n(n);function o(t){if(r()(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}var a=i("774e"),s=i.n(a),c=i("c8bb"),l=i.n(c);function u(t){if(l()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return s()(t)}function d(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function f(t){return o(t)||u(t)||d()}},"774e":function(t,e,i){t.exports=i("d2d5")},"7f5c":function(t,e,i){"use strict";i.r(e);var n=i("4fdd"),r=i("f76b");for(var o in r)"default"!==o&&function(t){i.d(e,t,(function(){return r[t]}))}(o);i("43f6");var a,s=i("f0c5"),c=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"19ea4da2",null,!1,n["a"],a);e["default"]=c.exports},"80e1":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"question-wrap"},[i("navbar",{attrs:{fixed:!0,transparent:"show",border:t.isShowBorder,backgroundColor:[224,229,236]}},[0!==t.timing?i("v-uni-view",[i("count-down",{attrs:{color:"#000000","background-color":"transparent","border-color":"transparent","show-day":!1,second:t.timing}})],1):t._e(),i("v-uni-view",{staticClass:"upload",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickUpload.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"margin-lr-sm"},[i("v-uni-progress",{attrs:{"is-show":t.isShowProgress}},[i("v-uni-view",{staticClass:"margin-top-sm text-xxl text-bold flex justify-center"},[t._v(t._s(t.title))]),i("question-list",{attrs:{"question-list":t.questionList,canSelect:!0},on:{collect:function(e){arguments[0]=e=t.$handleEvent(e),t.$_onCollectQuestion.apply(void 0,arguments)},select:function(e){arguments[0]=e=t.$handleEvent(e),t.$_onSelectOption.apply(void 0,arguments)}}})],1)],1)],1)},o=[]},8551:function(t,e){t.exports="data:image/png;base64,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"},"8ed3":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[t.isShow?i("v-uni-view",{staticClass:"neumorphic-progress"},[i("v-uni-view",{staticClass:"neumorphic-progress__back"}),i("v-uni-view",{staticClass:"neumorphic-progress__line"})],1):t._e(),i("v-uni-view",{class:t.isShow?"mask-wrap":""},[t._t("default")],2)],1)},o=[]},"961d":function(t,e,i){"use strict";i.r(e);var n=i("80e1"),r=i("44d9");for(var o in r)"default"!==o&&function(t){i.d(e,t,(function(){return r[t]}))}(o);i("dcf1");var a,s=i("f0c5"),c=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"4ace8d1f",null,!1,n["a"],a);e["default"]=c.exports},"9a5a":function(t,e,i){"use strict";var n=i("65ea"),r=i.n(n);r.a},"9ef5":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("c5f6");var n={name:"UniCountdown",props:{showDay:{type:Boolean,default:!0},showColon:{type:Boolean,default:!0},backgroundColor:{type:String,default:"#FFFFFF"},borderColor:{type:String,default:"#000000"},color:{type:String,default:"#000000"},splitorColor:{type:String,default:"#000000"},day:{type:Number,default:0},hour:{type:Number,default:0},minute:{type:Number,default:0},second:{type:Number,default:0}},data:function(){return{timer:null,syncFlag:!1,d:"00",h:"00",i:"00",s:"00",leftTime:0,seconds:0}},watch:{day:function(t){this.changeFlag()},hour:function(t){this.changeFlag()},minute:function(t){this.changeFlag()},second:function(t){this.changeFlag()}},created:function(t){this.startData()},beforeDestroy:function(){clearInterval(this.timer)},methods:{toSeconds:function(t,e,i,n){return 60*t*60*24+60*e*60+60*i+n},timeUp:function(){clearInterval(this.timer),this.$emit("timeup")},countDown:function(){var t=this.seconds,e=0,i=0,n=0,r=0;t>0?(e=Math.floor(t/86400),i=Math.floor(t/3600)-24*e,n=Math.floor(t/60)-24*e*60-60*i,r=Math.floor(t)-24*e*60*60-60*i*60-60*n):this.timeUp(),e<10&&(e="0"+e),i<10&&(i="0"+i),n<10&&(n="0"+n),r<10&&(r="0"+r),this.d=e,this.h=i,this.i=n,this.s=r},startData:function(){var t=this;this.seconds=this.toSeconds(this.day,this.hour,this.minute,this.second),this.seconds<=0||(this.countDown(),this.timer=setInterval((function(){t.seconds--,t.seconds<0?t.timeUp():t.countDown()}),1e3))},changeFlag:function(){this.syncFlag||(this.seconds=this.toSeconds(this.day,this.hour,this.minute,this.second),this.startData(),this.syncFlag=!0)}}};e.default=n},b101:function(t,e,i){"use strict";function n(t){for(var e={},i=t.split(","),n=i.length;n--;)e[i[n]]=!0;return e}i("28a5"),t.exports={filter:null,highlight:null,onText:null,blankChar:n(" , ,\t,\r,\n,\f"),blockTags:n("address,article,aside,body,caption,center,cite,footer,header,html,nav,section,pre"),ignoreTags:n("area,base,basefont,canvas,command,frame,input,isindex,keygen,link,map,meta,param,script,source,style,svg,textarea,title,track,use,wbr,embed,iframe"),richOnlyTags:n("a,colgroup,fieldset,legend,picture,table"),selfClosingTags:n("area,base,basefont,br,col,circle,ellipse,embed,frame,hr,img,input,isindex,keygen,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),trustAttrs:n("align,alt,app-id,author,autoplay,border,cellpadding,cellspacing,class,color,colspan,controls,data-src,dir,face,height,href,id,ignore,loop,media,muted,name,path,poster,rowspan,size,span,src,start,style,type,unit-id,width,xmlns"),boolAttrs:n("autoplay,controls,ignore,loop,muted"),trustTags:n("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),userAgentStyles:{address:"font-style:italic",big:"display:inline;font-size:1.2em",blockquote:"background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px",caption:"display:table-caption;text-align:center",center:"text-align:center",cite:"font-style:italic",dd:"margin-left:40px",img:"max-width:100%",mark:"background-color:yellow",picture:"max-width:100%",pre:"font-family:monospace;white-space:pre;overflow:scroll",s:"text-decoration:line-through",small:"display:inline;font-size:0.8em",u:"text-decoration:underline"}}},d2d5:function(t,e,i){i("1654"),i("549b"),t.exports=i("584a").Array.from},dcf1:function(t,e,i){"use strict";var n=i("6733"),r=i.n(n);r.a},df8e:function(t,e,i){"use strict";var n=i("ed14"),r=i.n(n);r.a},ed14:function(t,e,i){var n=i("3f59");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("78b4e7f6",n,!0,{sourceMap:!1,shadowMode:!1})},f76b:function(t,e,i){"use strict";i.r(e);var n=i("3f13"),r=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=r.a}}]);