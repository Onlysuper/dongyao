(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/user"],{"0038":function(t,e,i){"use strict";i.r(e);var a=i("5ed5"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=n.a},"0608":function(t,e,i){"use strict";var a=i("ea64"),n=i.n(a);n.a},"24b8":function(t,e,i){"use strict";i("ba95");var a=s(i("b0ce")),n=s(i("bc49"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(n.default))},"4fb1":function(t,e,i){"use strict";var a=i("757a"),n=i.n(a);n.a},5062:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"m-vip-top"},[i("view",{staticClass:"m-content"},[i("view",{staticClass:"m-left"},[i("view",{staticClass:"m-title"},[i("view",{staticClass:"name"},[t._t("name",null,{mpcomid:"00eb27b6-0"})],2),i("view",{staticClass:"label"},[t._t("label",null,{mpcomid:"00eb27b6-1"})],2)]),i("view",{staticClass:"m-describe"},[t._t("describe",null,{mpcomid:"00eb27b6-2"})],2)]),i("view",{staticClass:"m-right"},[t._t("right",null,{mpcomid:"00eb27b6-3"})],2)])])},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},"5e3f":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"m-user-page"},[i("view",{staticClass:"m-header"},[t.isLogin?i("view",{staticClass:"m-user"},[i("view",{staticClass:"m-img"},[i("image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.userData.avatarUrl,mode:"aspectFit"}})]),i("view",{staticClass:"m-text"},[i("view",{staticClass:"m-username"},[t._v(t._s(t.userData.nickName))]),i("image",{staticStyle:{width:"57rpx",height:"33rpx"},attrs:{src:"../../static/img/icon/me_icon_VIP_lose.png",mode:"aspectFit"}})])]):i("view",{staticClass:"m-user",attrs:{eventid:"09ce8447-0"},on:{tap:function(e){t.linkTo("/pages/login/login","login")}}},[t._m(0),t._m(1)]),i("view",{staticClass:"m-card",attrs:{eventid:"09ce8447-1"},on:{tap:function(e){t.linkTo("/pages/user/vip")}}},[i("m-vip-top",{attrs:{mpcomid:"09ce8447-0"}},[i("view",{slot:"name"},[t._v("VIP会员")]),i("view",{slot:"label"},[t._v("（半年卡6折）")]),i("view",{slot:"describe"},[t._v("享受专属折扣  福利优惠  定制服务")]),i("view",{slot:"right"},[t._v("立即开通>")])])],1),i("view",{staticClass:"m-order-chose"},[i("view",{staticClass:"m-title"},[i("view",{},[t._v("我的订单")]),i("view",{staticClass:"right",attrs:{eventid:"09ce8447-2"},on:{tap:function(e){t.linkToOrderTab(4)}}},[t._v("查看全部 >")])]),i("view",{staticClass:"m-slection"},[i("view",{staticClass:"m-item",attrs:{eventid:"09ce8447-3"},on:{tap:function(e){t.linkToOrderTab(1)}}},[t._m(2),i("view",{},[t._v("待取货")])]),i("view",{staticClass:"m-item",attrs:{eventid:"09ce8447-4"},on:{tap:function(e){t.linkToOrderTab(2)}}},[t._m(3),i("view",{},[t._v("待支付")])]),i("view",{staticClass:"m-item",attrs:{eventid:"09ce8447-5"},on:{tap:function(e){t.linkToOrderTab(3)}}},[t._m(4),i("view",{},[t._v("待评价")])])])]),i("view",{staticClass:"m-cell-list"},[i("m-cell",{attrs:{label:"我的优惠券",link:!0,eventid:"09ce8447-6",mpcomid:"09ce8447-1"},on:{handleFn:function(e){t.linkTo("/pages/user/tokencard")}}},[i("image",{staticStyle:{width:"30rpx",height:"30rpx"},attrs:{src:"../../static/img/icon/me_icon_preferential.png",mode:"aspectFit"}})]),i("m-cell",{attrs:{label:"关于我们",link:!0,eventid:"09ce8447-7",mpcomid:"09ce8447-2"},on:{handleFn:function(e){t.linkTo("/pages/user/aboutme")}}},[i("image",{staticStyle:{width:"30rpx",height:"30rpx"},attrs:{src:"../../static/img/icon/me_icon_about.png",mode:"aspectFit"}})])],1)])])},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"m-img"},[i("image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:"../../static/img/icon/home_icon_gps.png",mode:"aspectFit"}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"m-text"},[i("view",{staticClass:"m-username"},[i("view",{staticClass:"m-login-but"},[t._v("登录/注册")])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"img-box"},[i("image",{staticStyle:{width:"59rpx",height:"59rpx"},attrs:{src:"../../static/img/icon/me_icon_buy.png",mode:"aspectFit"}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"img-box"},[i("image",{staticStyle:{width:"59rpx",height:"59rpx"},attrs:{src:"../../static/img/icon/me_icon_maney.png",mode:"aspectFit"}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"img-box"},[i("image",{staticStyle:{width:"59rpx",height:"59rpx"},attrs:{src:"../../static/img/icon/me_icon_pingjia.png",mode:"aspectFit"}})])}];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},"5ed5":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"m-vip-top",props:{title:{type:String,value:""},label:{type:String,value:""},labelColor:{type:String,value:""}},data:function(){return{}},methods:{titleHandle:function(){this.$emit("titleHandle")}}};e.default=a},6412:function(t,e,i){"use strict";var a=i("84a5"),n=i.n(a);n.a},"757a":function(t,e,i){},"7b03":function(t,e,i){"use strict";i.r(e);var a=i("fad2"),n=i("bfbc");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("6412");var r=i("2877"),c=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports},"81e3":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(i("a34a")),n=r(i("8c36")),s=r(i("7b03"));r(i("d5ef"));function r(t){return t&&t.__esModule?t:{default:t}}function c(t,e,i,a,n,s,r){try{var c=t[s](r),l=c.value}catch(o){return void i(o)}c.done?e(l):Promise.resolve(l).then(a,n)}function l(t){return function(){var e=this,i=arguments;return new Promise(function(a,n){var s=t.apply(e,i);function r(t){c(s,a,n,r,l,"next",t)}function l(t){c(s,a,n,r,l,"throw",t)}r(void 0)})}}var o={components:{mVipTop:n.default,mCell:s.default},data:function(){return{isLogin:!1,userData:{}}},methods:{linkToOrderTab:function(e){t.setStorageSync("orderTab",e),t.switchTab({url:"/pages/tabBar/order"})},linkToTab:function(e){t.switchTab({url:e})},linkTo:function(e,i){if("login"==i){var a=encodeURI("/pages/tabBar/user");t.redirectTo({url:e+"?back="+a})}else t.navigateTo({url:e})},vipCardDetail:function(){t.navigateTo({url:url})},checkLogin:function(){var e=l(a.default.mark(function e(){var i;return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.globelIsLogin();case 2:i=e.sent,this.isLogin=i,i&&(this.userData=JSON.parse(t.getStorageSync("userData")),this.userData.avatarUrl||this.$set(this.userData,"avatarUrl",this.userData.headAddress||""),this.userData.nickName||this.$set(this.userData,"nickName",this.userData.nickname||""));case 5:case"end":return e.stop()}},e,this)}));function i(){return e.apply(this,arguments)}return i}()},onLoad:function(){this.checkLogin()},onShow:function(){this.checkLogin()}};e.default=o}).call(this,i("543d")["default"])},"84a5":function(t,e,i){},"8c36":function(t,e,i){"use strict";i.r(e);var a=i("5062"),n=i("0038");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("0608");var r=i("2877"),c=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports},bc49:function(t,e,i){"use strict";i.r(e);var a=i("5e3f"),n=i("e7c7");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("4fb1");var r=i("2877"),c=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports},bfbc:function(t,e,i){"use strict";i.r(e);var a=i("e266"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=n.a},e266:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"m-cell",props:{label:{type:String,value:""},link:{type:Boolean,value:!1}},data:function(){return{}},methods:{handleFn:function(){this.link&&this.$emit("handleFn")}}};e.default=a},e7c7:function(t,e,i){"use strict";i.r(e);var a=i("81e3"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=n.a},ea64:function(t,e,i){},fad2:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"m-cell"},[i("view",{staticClass:"m-icon"},[t._t("default",null,{mpcomid:"3dcd2a1e-0"})],2),i("view",{staticClass:"m-label",attrs:{eventid:"3dcd2a1e-0"},on:{tap:t.handleFn}},[t._v(t._s(t.label))]),i("view",{directives:[{name:"show",rawName:"v-show",value:t.link,expression:"link"}]},[i("image",{staticStyle:{width:"8rpx",height:"15rpx"},attrs:{src:"../../static/img/icon/right-icon.png",mode:"aspectFit"}})])])},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})}},[["24b8","common/runtime","common/vendor"]]]);