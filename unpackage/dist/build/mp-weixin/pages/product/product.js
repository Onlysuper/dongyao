(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/product"],{"12a7":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=a(i("378e"));function a(t){return t&&t.__esModule?t:{default:t}}var n={name:"uni-rate",components:{uniIcon:s.default},props:{isFill:{type:[Boolean,String],default:!0},color:{type:String,default:"#ececec"},activeColor:{type:String,default:"#ffca3e"},size:{type:[Number,String],default:24},value:{type:[Number,String],default:0},max:{type:[Number,String],default:5},margin:{type:[Number,String],default:0},disabled:{type:[Boolean,String],default:!1}},data:function(){return console.log("data"),{maxSync:this.max,valueSync:this.value}},computed:{stars:function(){for(var t=Number(this.maxSync)?Number(this.maxSync):5,e=Number(this.valueSync)?Number(this.valueSync):0,i=[],s=Math.floor(e),a=Math.ceil(e),n=0;n<t;n++)s>n?i.push({activeWitch:"100%"}):a-1===n?i.push({activeWitch:100*(e-s)+"%"}):i.push({activeWitch:"0"});return i}},methods:{onClick:function(t){!0!==this.disabled&&"true"!==this.disabled&&(this.valueSync=t+1,this.$emit("change",{value:this.valueSync}))}}};e.default=n},"2be0":function(t,e,i){},3177:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s,a=n(i("e944"));function n(t){return t&&t.__esModule?t:{default:t}}function c(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function o(t){return u(t)||l(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function l(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function u(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}var d=(s={components:{uniRate:a.default},data:function(){return{beforeHeaderzIndex:11,afterHeaderzIndex:10,beforeHeaderOpacity:1,afterHeaderOpacity:0,swiperList:[],currentSwiper:0,anchorlist:[],selectAnchor:0,serviceClass:"",specClass:"",shareClass:"",goodsData:{},selectSpec:null,descriptionStr:'<div style="text-align:center;"><img width="100%" src="https://s2.ax1x.com/2019/03/28/AdOogx.jpg"/><img width="100%" src="https://s2.ax1x.com/2019/03/28/AdOHKK.jpg"/><img width="100%" src="https://s2.ax1x.com/2019/03/28/AdOTv6.jpg"/></div>'}},onLoad:function(t){this.showBack=!1,console.log(t.cid)},onReady:function(){}},c(s,"onLoad",function(t){var e=this,i=t.id;this.mPost("/server/p/product",{id:i}).then(function(t){if("1"==t.code&&t.data){var i=t.data;i.pictures&&(console.log(t.data.pictures),e.swiperList=o(t.data.pictures)),e.goodsData=i}}),this.mPost("/server/c/praise/degree",{productid:i}).then(function(t){t.code})}),c(s,"onPageScroll",function(t){this.selectAnchor=t.scrollTop>=this.anchorlist[2].top?2:t.scrollTop>=this.anchorlist[1].top?1:0;var e=375;t.scrollTop=t.scrollTop>e?375:t.scrollTop,this.afterHeaderOpacity=t.scrollTop*(1/e),this.beforeHeaderOpacity=1-this.afterHeaderOpacity,this.beforeHeaderzIndex=t.scrollTop>0?10:11,this.afterHeaderzIndex=t.scrollTop>0?11:10}),c(s,"onReachBottom",function(){t.showToast({title:"触发上拉加载"})}),c(s,"methods",{swiperChange:function(t){this.currentSwiper=t.detail.current},toMsg:function(){t.navigateTo({url:"../msg/msg"})},toChat:function(){t.navigateTo({url:"../msg/chat/chat?name=客服008"})},share:function(){this.shareClass="show"},hideShare:function(){var t=this;this.shareClass="hide",setTimeout(function(){t.shareClass="none"},150)},joinCart:function(){if(null==this.selectSpec)return this.showSpec(function(){t.showToast({title:"已加入购物车"})});t.showToast({title:"已加入购物车"})},buy:function(){var t=this;if(null==this.selectSpec)return this.showSpec(function(){t.toConfirmation()});this.toConfirmation()},toConfirmation:function(){var e=[],i={id:this.goodsData.id,img:"../../static/img/goods/p1.jpg",name:this.goodsData.name,spec:"规格:"+this.goodsData.spec[this.selectSpec],price:this.goodsData.price,number:this.goodsData.number};e.push(i),t.setStorage({key:"buylist",data:e,success:function(){t.navigateTo({url:"../order/confirmation"})}})},showComments:function(t){},setSelectSpec:function(t){this.selectSpec=t},sub:function(){this.goodsData.number<=1||this.goodsData.number--},add:function(){this.goodsData.number++},toAnchor:function(e){this.selectAnchor=e,t.pageScrollTo({scrollTop:this.anchorlist[e].top,duration:200})},calcAnchor:function(){var e=this;this.anchorlist=[{name:"主图",top:0},{name:"评价",top:0},{name:"详情",top:0}];var i=t.createSelectorQuery().select("#comments");i.boundingClientRect(function(i){var s=0,a=t.upx2px(100);e.anchorlist[1].top=i.top-a-s,e.anchorlist[2].top=i.bottom-a-s}).exec()},back:function(){t.navigateBack()},showService:function(){console.log("show"),this.serviceClass="show"},hideService:function(){var t=this;this.serviceClass="hide",setTimeout(function(){t.serviceClass="none"},200)},showSpec:function(t){console.log("show"),this.specClass="show",this.specCallback=t},specCallback:function(){},hideSpec:function(){var t=this;this.specClass="hide",this.selectSpec&&this.specCallback&&this.specCallback(),this.specCallback=!1,setTimeout(function(){t.specClass="none"},200)},discard:function(){}}),c(s,"mounted",function(){}),s);e.default=d}).call(this,i("543d")["default"])},"378e":function(t,e,i){"use strict";i.r(e);var s=i("e4ea"),a=i("65f3");for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);i("ea6d");var c=i("2877"),o=Object(c["a"])(a["default"],s["a"],s["b"],!1,null,null,null);e["default"]=o.exports},3935:function(t,e,i){"use strict";var s=i("5c8c"),a=i.n(s);a.a},"44e6":function(t,e,i){"use strict";i("ba95");var s=n(i("b0ce")),a=n(i("717e"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(a.default))},"5c8c":function(t,e,i){},"65f3":function(t,e,i){"use strict";i.r(e);var s=i("ebc8"),a=i.n(s);for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);e["default"]=a.a},"717e":function(t,e,i){"use strict";i.r(e);var s=i("8cdf"),a=i("9f3f");for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);i("e83d");var c=i("2877"),o=Object(c["a"])(a["default"],s["a"],s["b"],!1,null,null,null);e["default"]=o.exports},"8cdf":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",[i("view",{staticClass:"status",style:{opacity:t.afterHeaderOpacity}}),i("view",{staticClass:"header"},[i("view",{staticClass:"before",style:{opacity:1-t.afterHeaderOpacity,zIndex:t.beforeHeaderzIndex}},[i("view",{staticClass:"back"},[t.showBack?i("view",{staticClass:"icon xiangqian",attrs:{eventid:"655b68cc-0"},on:{tap:t.back}}):t._e()]),i("view",{staticClass:"middle"}),i("view",{staticClass:"icon-btn"})]),i("view",{staticClass:"after",style:{opacity:t.afterHeaderOpacity,zIndex:t.afterHeaderzIndex}},[i("view",{staticClass:"back"},[t.showBack?i("view",{staticClass:"icon xiangqian",attrs:{eventid:"655b68cc-1"},on:{tap:t.back}}):t._e()]),i("view",{staticClass:"middle"},t._l(t.anchorlist,function(e,s){return i("view",{key:s,class:[t.selectAnchor==s?"on":""],attrs:{eventid:"655b68cc-2-"+s},on:{tap:function(e){t.toAnchor(s)}}},[t._v(t._s(e.name))])})),i("view",{staticClass:"icon-btn"})])]),i("view",{staticClass:"footer"},[i("view",{staticClass:"icons"},[i("view",{staticClass:"box",attrs:{eventid:"655b68cc-3"},on:{tap:t.share}},[t._m(0),i("view",{staticClass:"text"},[t._v("首页")])]),i("view",{staticClass:"box",attrs:{eventid:"655b68cc-4"},on:{tap:t.toChat}},[t._m(1),i("view",{staticClass:"text"},[t._v("进店")])])]),i("view",{staticClass:"btn"},[i("view",{staticClass:"joinCart",attrs:{eventid:"655b68cc-5"},on:{tap:t.joinCart}},[t._v("我要拼")]),i("view",{staticClass:"buy",attrs:{eventid:"655b68cc-6"},on:{tap:t.buy}},[t._v("立即购买")])])]),i("view",{staticClass:"popup service",class:t.serviceClass,attrs:{eventid:"655b68cc-9"},on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),t.discard(e)},tap:t.hideService}},[i("view",{staticClass:"mask"}),i("view",{staticClass:"layer",attrs:{eventid:"655b68cc-8"},on:{tap:function(e){e.stopPropagation(),t.discard(e)}}},[i("view",{staticClass:"content"},t._l(t.goodsData.service,function(e,s){return i("view",{key:s,staticClass:"row"},[i("view",{staticClass:"title"},[t._v(t._s(e.name))]),i("view",{staticClass:"description"},[t._v(t._s(e.description))])])})),i("view",{staticClass:"btn"},[i("view",{staticClass:"button",attrs:{eventid:"655b68cc-7"},on:{tap:t.hideService}},[t._v("完成")])])])]),i("view",{staticClass:"popup spec",class:t.specClass,attrs:{eventid:"655b68cc-17"},on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),t.discard(e)},tap:t.hideSpec}},[i("view",{staticClass:"mask"}),i("view",{staticClass:"layer",attrs:{eventid:"655b68cc-16"},on:{tap:function(e){e.stopPropagation(),t.discard(e)}}},[i("view",{staticClass:"content"},[i("view",{staticClass:"title"},[t._v("选择规格：")]),i("view",{staticClass:"sp"},t._l(t.goodsData.spec,function(e,s){return i("view",{key:s,class:[s==t.selectSpec?"on":""],attrs:{eventid:"655b68cc-10-"+s},on:{tap:function(e){t.setSelectSpec(s)}}},[t._v(t._s(e))])})),null!=t.selectSpec?i("view",{staticClass:"length"},[i("view",{staticClass:"text"},[t._v("数量")]),i("view",{staticClass:"number"},[i("view",{staticClass:"sub",attrs:{eventid:"655b68cc-11"},on:{tap:function(e){e.stopPropagation(),t.sub(e)}}},[i("view",{staticClass:"icon jian"})]),i("view",{staticClass:"input",attrs:{eventid:"655b68cc-13"},on:{tap:function(e){e.stopPropagation(),t.discard(e)}}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.goodsData.number,expression:"goodsData.number"}],attrs:{type:"number",eventid:"655b68cc-12"},domProps:{value:t.goodsData.number},on:{input:function(e){e.target.composing||(t.goodsData.number=e.target.value)}}})]),i("view",{staticClass:"add",attrs:{eventid:"655b68cc-14"},on:{tap:function(e){e.stopPropagation(),t.add(e)}}},[i("view",{staticClass:"icon jia"})])])]):t._e()]),i("view",{staticClass:"btn"},[i("view",{staticClass:"button",attrs:{eventid:"655b68cc-15"},on:{tap:t.hideSpec}},[t._v("完成")])])])]),i("view",{staticClass:"swiper-box"},[i("swiper",{attrs:{circular:"true",autoplay:"true",eventid:"655b68cc-20"},on:{change:t.swiperChange}},t._l(t.swiperList,function(e,s){return i("swiper-item",{key:e.id,attrs:{mpcomid:"655b68cc-0-"+s}},["1"==e.type?i("video",{attrs:{objectFit:"fill",src:e.pictureUrl,controls:"",eventid:"655b68cc-18-"+s},on:{tap:function(i){t.toSwiper(e)}}}):t._e(),"0"==e.type?i("image",{attrs:{src:e.pictureUrl,eventid:"655b68cc-19-"+s},on:{tap:function(i){t.toSwiper(e)}}}):t._e()])})),i("view",{staticClass:"indicator"},[t._v(t._s(t.currentSwiper+1)+"/"+t._s(t.swiperList.length))])],1),i("view",{staticClass:"info-box goods-info"},[i("view",{staticClass:"title"},[t._v(t._s(t.goodsData.synopsis))]),i("view",{staticClass:"tip-box"},[i("view",{staticClass:"item"},[t._v(t._s(t.goodsData.describes))])]),i("view",{staticClass:"price-box"},[i("view",{staticClass:"price"},[t._v("￥"+t._s(t.goodsData.presentPrice))]),i("view",{staticClass:"oldprice"},[t._v("￥"+t._s(t.goodsData.originalPrice))]),i("view",{staticClass:"num"},[t._v("商品库存："+t._s(t.goodsData.stock))])])]),i("view",{staticClass:"info-box comments",attrs:{id:"comments"}},[t._m(2),i("view",{staticClass:"m-body"},[t._m(3),i("view",{staticClass:"container"},[i("view",{staticClass:"user-box"},[t._m(4),i("uni-rate",{attrs:{size:"5",value:"4",mpcomid:"655b68cc-1"}})],1),i("view",{staticClass:"content"},[t._v("真是特别鲜嫩，这个季节很适宜，推荐推荐。\n\t\t\t\t\t真是特别鲜嫩，这个季节很适宜，推荐推荐。\n\t\t\t\t\t真是特别鲜嫩，这个季节很适宜，推荐推荐。")])])]),i("view",{staticClass:"m-body"},[t._m(5),i("view",{staticClass:"container"},[i("view",{staticClass:"user-box"},[t._m(6),i("uni-rate",{attrs:{size:"5",value:"4",mpcomid:"655b68cc-2"}})],1),i("view",{staticClass:"content"},[t._v("真是特别鲜嫩，这个季节很适宜，推荐推荐。\n\t\t\t\t\t真是特别鲜嫩，这个季节很适宜，推荐推荐。\n\t\t\t\t\t真是特别鲜嫩，这个季节很适宜，推荐推荐。")])])])]),i("view",{staticClass:"description"},[i("view",{staticClass:"content"},[i("rich-text",{attrs:{nodes:t.descriptionStr,mpcomid:"655b68cc-3"}})],1)])])},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"icon home"},[i("image",{staticStyle:{width:"38rpx",height:"100%"},attrs:{src:"../../static/img/icon/goods_icon_house.png",mode:"aspectFit"}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"icon store"},[i("image",{staticStyle:{width:"38rpx",height:"100%"},attrs:{src:"../../static/img/icon/goods_icon_shop.png",mode:"aspectFit"}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"m-header"},[i("view",{staticClass:"m-label"},[t._v("商品评价")]),i("view",{staticClass:"m-detail"},[t._v("好评度 98%>")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"img-box"},[i("image",{staticStyle:{width:"80rpx",height:"80rpx"},attrs:{src:"../../static/img/icon/home_icon_gps.png",mode:"aspectFit"}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{},[i("view",{staticClass:"user-name"},[t._v("宝宝熊")]),i("view",{staticClass:"time"},[t._v("2019年03月20")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"img-box"},[i("image",{staticStyle:{width:"80rpx",height:"80rpx"},attrs:{src:"../../static/img/icon/home_icon_gps.png",mode:"aspectFit"}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{},[i("view",{staticClass:"user-name"},[t._v("宝宝熊")]),i("view",{staticClass:"time"},[t._v("2019年03月20")])])}];i.d(e,"a",function(){return s}),i.d(e,"b",function(){return a})},"991a":function(t,e,i){},"9f3f":function(t,e,i){"use strict";i.r(e);var s=i("3177"),a=i.n(s);for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);e["default"]=a.a},c1cf:function(t,e,i){"use strict";i.r(e);var s=i("12a7"),a=i.n(s);for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);e["default"]=a.a},c9f0:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"uni-rate"},t._l(t.stars,function(e,s){return i("view",{key:s,staticClass:"uni-rate-icon",style:{marginLeft:t.margin+"px"},attrs:{eventid:"2e43fa40-0-"+s},on:{click:function(e){t.onClick(s)}}},[i("uni-icon",{attrs:{size:t.size,color:t.color,type:!1===t.isFill||"false"===t.isFill?"star":"star-filled",mpcomid:"2e43fa40-0-"+s}}),i("view",{staticClass:"uni-rate-icon-on",style:{width:e.activeWitch}},[i("uni-icon",{attrs:{size:t.size,color:t.activeColor,type:"star-filled",mpcomid:"2e43fa40-1-"+s}})],1)],1)}))},a=[];i.d(e,"a",function(){return s}),i.d(e,"b",function(){return a})},e4ea:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"uni-icon",class:["uni-icon-"+t.type],style:{color:t.color,"font-size":t.fontSize},attrs:{eventid:"edb51340-0"},on:{click:function(e){t.onClick()}}})},a=[];i.d(e,"a",function(){return s}),i.d(e,"b",function(){return a})},e83d:function(t,e,i){"use strict";var s=i("2be0"),a=i.n(s);a.a},e944:function(t,e,i){"use strict";i.r(e);var s=i("c9f0"),a=i("c1cf");for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);i("3935");var c=i("2877"),o=Object(c["a"])(a["default"],s["a"],s["b"],!1,null,null,null);e["default"]=o.exports},ea6d:function(t,e,i){"use strict";var s=i("991a"),a=i.n(s);a.a},ebc8:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={name:"uni-icon",props:{type:String,color:String,size:[Number,String]},computed:{fontSize:function(){return"".concat(this.size,"px")}},methods:{onClick:function(){this.$emit("click")}}};e.default=s}},[["44e6","common/runtime","common/vendor"]]]);