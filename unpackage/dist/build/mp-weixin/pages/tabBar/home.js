(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/home"],{"0db1":function(t,e,i){"use strict";i.r(e);var n=i("e675"),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=s.a},"17d0":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticStyle:{background:"#fff"}},[i("view",{staticClass:"status",style:{position:t.headerPosition,top:t.statusTop,opacity:t.afterHeaderOpacity}}),i("view",{staticClass:"header",style:{position:t.headerPosition,top:t.headerTop,opacity:t.afterHeaderOpacity}},[i("view",{staticClass:"addr",attrs:{eventid:"09c88d5b-0"},on:{tap:t.choseStore}},[t._m(0),t._v("请选择门店")]),i("view",{staticClass:"input-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.searchValue,expression:"searchValue"}],attrs:{placeholder:"默认关键字","placeholder-style":"color:#c0c0c0;",eventid:"09c88d5b-1"},domProps:{value:t.searchValue},on:{input:function(e){e.target.composing||(t.searchValue=e.target.value)}}}),i("image",{staticClass:"icon",staticStyle:{width:"13px",height:"100%"},attrs:{src:"../../static/img/icon/home_icon_search.png",mode:"aspectFit",eventid:"09c88d5b-2"},on:{tap:function(e){t.toSearch()}}})])]),i("view",{staticClass:"place"}),i("view",{staticClass:"swiper-box"},[i("uni-swiper-dot",{attrs:{info:t.swiperList,current:t.current,field:"content",mode:t.mode,mpcomid:"09c88d5b-1"}},[i("swiper",{staticClass:"swiper-box",attrs:{eventid:"09c88d5b-4"},on:{change:t.change}},t._l(t.swiperList,function(e,n){return i("swiper-item",{key:n,attrs:{mpcomid:"09c88d5b-0-"+n}},[i("view",{staticClass:"swiper-item"},[i("image",{attrs:{src:e.imgUrl,eventid:"09c88d5b-3-"+n},on:{tap:function(e){t.swiperChange(n)}}})])])}))],1)],1),i("view",{staticClass:"m-container"},[i("m-title",{attrs:{title:"超值热卖",labelColor:"#666666",label:"换一换",eventid:"09c88d5b-5",mpcomid:"09c88d5b-2"},on:{titleHandle:t.getHotsellList}},[i("image",{staticStyle:{width:"30rpx",height:"20rpx","margin-right":"10rpx"},attrs:{src:"../../static/img/icon/home_icon_refresh.png",mode:"aspectFit"}})]),i("view",{staticClass:"m-content m-hotsell"},[t._l(t.hotProList,function(e,n){return[i("m-home-hotpro",{key:n,attrs:{rowData:e,eventid:"09c88d5b-6-"+n,mpcomid:"09c88d5b-3-"+n},on:{handleFn:function(i){t.hotProDetail(e)}}})]})],2)],1),i("view",{staticClass:"m-container"},[i("m-title",{attrs:{title:"今日必拼",label:"查看更多 >",eventid:"09c88d5b-7",mpcomid:"09c88d5b-5"},on:{titleHandle:t.pintuanHandle}}),i("view",{staticClass:"m-content m-pin"},[i("scroll-view",{staticClass:"scroll-view",attrs:{"scroll-x":"true","scroll-left":"0"}},[i("view",{staticClass:"m-togethoer"},[t._l(t.groupsellList,function(e,n){return[i("m-home-pro",{key:n,attrs:{rowData:e,eventid:"09c88d5b-8-"+n,mpcomid:"09c88d5b-6-"+n},on:{handleFn:function(i){t.groupProDetail(e)}}})]})],2)])],1)],1),i("view",{staticClass:"m-container"},[i("m-title",{attrs:{title:"附近门店",label:"查看全部 >",eventid:"09c88d5b-9",mpcomid:"09c88d5b-8"},on:{titleHandle:t.storeHandle}}),i("view",{staticClass:"m-content m-store"},[t._l(t.nearStoreList,function(e,n){return[i("m-home-store",{key:n,attrs:{tips:e.tips,rowData:e,eventid:"09c88d5b-10-"+n,mpcomid:"09c88d5b-9-"+n},on:{handleFn:t.storeDetail}})]})],2)],1)])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"icon"},[i("image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:"../../static/img/icon/home_icon_gps.png",mode:"aspectFit"}})])}];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})},"18bd":function(t,e,i){},"2c67":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"uni-swiper-dot",props:{info:{type:Array,default:function(){return[]}},current:{info:Number,default:0},dotsStyles:{type:Object,default:function(){return{}}},mode:{type:String,default:"default"},field:{type:String,default:""}},data:function(){return{dots:{width:5,height:5,bottom:10,color:"#fff",backgroundColor:"rgba(255, 255, 255, .3)",border:"1px rgba(0, 0, 0, .3) solid",selectedBackgroundColor:"#e5e5e5",selectedBorder:"1px rgba(255, 255, 255, 0) solid"}}},created:function(){"indexes"===this.mode&&(this.dots.width=15,this.dots.height=15),this.dots=Object.assign(this.dots,this.dotsStyles)},watch:{dotsStyles:function(t){this.dots=Object.assign(this.dots,this.dotsStyles)},mode:function(t){"indexes"===t?(this.dots.width=15,this.dots.height=15):(this.dots.width=5,this.dots.height=5)}}};e.default=n},"32fa":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"m-store-item",attrs:{eventid:"36b44e7c-0"},on:{tap:t.handleFn}},[t.rowData.imgUrl?i("view",{staticClass:"m-img"},[i("image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.rowData.imgUrl,mode:"aspectFit"}})]):t._e(),i("view",{staticClass:"m-text"},[i("view",{staticClass:"m-title"},[t._v(t._s(t.rowData.name))]),i("view",{staticClass:"m-discount"},[t._l(t.tips,function(e,n){return i("view",{key:n,staticClass:"m-tip"},[t._v(t._s(e))])}),t._t("tip",null,{mpcomid:"36b44e7c-0"}),t._v(t._s(t.rowData.describel))],2),i("view",{staticClass:"m-address"},[t._v(t._s(t.rowData.address))])]),i("view",{staticClass:"m-distance"},[t._v(t._s(t.rowData.fencingRange)+"km")])])},s=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})},3436:function(t,e,i){"use strict";var n=i("43f2"),s=i.n(n);s.a},"3e4a":function(t,e,i){"use strict";var n=i("9e5c"),s=i.n(n);s.a},"43f2":function(t,e,i){},"46b5":function(t,e,i){"use strict";i("ba95");var n=o(i("b0ce")),s=o(i("85e0"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(s.default))},"4a50":function(t,e,i){"use strict";i.r(e);var n=i("550a"),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=s.a},"4d0a":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"m-hotpro-item"},[i("view",{staticClass:"m-content",attrs:{eventid:"c5e88902-0"},on:{tap:t.handleFn}},[i("view",{staticClass:"m-img"},[i("image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.rowData.pictureUrl,mode:"aspectFit"}})]),i("view",{staticClass:"m-pro"},[i("view",{staticClass:"m-title"},[t._v(t._s(t.rowData.synopsis))]),i("view",{staticClass:"m-price"},[i("view",{staticClass:"new"},[t._v(t._s(t.rowData.presentPrice))]),i("view",{staticClass:"old"},[t._v(t._s(t.rowData.originalPrice))])])])])])},s=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})},"52fd":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=l(i("a34a")),s=l(i("9784")),o=l(i("51bc")),r=l(i("e638")),a=l(i("5f67")),c=l(i("5989"));function l(t){return t&&t.__esModule?t:{default:t}}function u(t,e,i,n,s,o,r){try{var a=t[o](r),c=a.value}catch(l){return void i(l)}a.done?e(c):Promise.resolve(c).then(n,s)}function d(t){return function(){var e=this,i=arguments;return new Promise(function(n,s){var o=t.apply(e,i);function r(t){u(o,n,s,r,a,"next",t)}function a(t){u(o,n,s,r,a,"throw",t)}r(void 0)})}}function f(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var h={data:function(){var t;return t={current:0,mode:"long",searchValue:"",afterHeaderOpacity:1,headerPosition:"fixed",headerTop:null,statusTop:null,swiperList:[],hotsellPage:1,hotProList:[],groupsellList:[],nearStoreList:[{}]},f(t,"current",0),f(t,"mode","long"),t},components:{uniSwiperDot:s.default,mTitle:o.default,mHomePro:r.default,mHomeHotpro:a.default,mHomeStore:c.default},methods:{change:function(t){this.current=t.detail.current},toSearch:function(){this.linkTo("/pages/product/productlist?search="+this.searchValue)},getBanners:function(){var t=this;this.mGet("/server/b/banners",{}).then(function(e){t.swiperList=e.data}).catch(function(t){console.log(t)})},getHotsellList:function(){var t=this;this.mPost("/server/p/hot/products",{start:this.hotsellPage,length:6}).then(function(e){if(e.data){var i=e.data;t.hotProList=i.list,t.hotsellPage=i.nextPage}}).catch(function(t){console.log(t)})},getGroupsellList:function(){var t=this;this.mPost("/server/p/group/products",{start:this.hotsellPage,length:500}).then(function(e){if(e.data){var i=e.data;i.list&&(t.groupsellList=i.list)}}).catch(function(t){console.log(t)})},getStoreList:function(t,e){var i=this;i.mPost("/server/s/vicinity/stores",{lng:t||116.206845,lat:e||39.762155}).then(function(t){if(t.data){var e=t.data;i.nearStoreList=e}}).catch(function(t){console.log(t)})},choseStore:function(){this.linkTo("/pages/store/list")},hotProDetail:function(t){this.linkTo("/pages/store/store?storeid="+t.storeId+"&typeid="+t.storeId)},groupProDetail:function(t){this.linkTo("/pages/product/product?id="+t.id)},storeDetail:function(t){this.linkTo("/pages/store/store?storeid="+t)},swiperChange:function(t){this.current=t,this.current=t.detail.current},pintuanHandle:function(){this.linkTo("/pages/groupbuy/groupbuy")},storeHandle:function(){this.linkTo("/pages/store/list")},linkTo:function(){var e=d(n.default.mark(function e(i){var s;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.globelIsLogin();case 2:s=e.sent,s?t.navigateTo({url:i}):t.navigateTo({url:"/pages/login/login"});case 4:case"end":return e.stop()}},e,this)}));function i(t){return e.apply(this,arguments)}return i}()},onLoad:function(){var e=this;t.getLocation({type:"wgs84",success:function(t){e.getStoreList(t.longitude,t.latitude)}}),this.getBanners(),this.getHotsellList(),this.getGroupsellList()},onPullDownRefresh:function(){t.stopPullDownRefresh()}};e.default=h}).call(this,i("543d")["default"])},"550a":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"m-home-pro",props:{rowData:{type:Object,default:function(){return{img:"",describel:"",price:"",oldPrice:""}}}},data:function(){return{}},methods:{handleFn:function(t){this.$emit("handleFn",this.rowData)}}};e.default=n},"595b":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"m-pro-item"},[i("view",{staticClass:"m-content",attrs:{eventid:"ad35d264-0"},on:{tap:t.handleFn}},[i("view",{staticClass:"m-img"},[i("image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.rowData.pictureUrl,mode:"aspectFit"}})]),i("view",{staticClass:"m-pro"},[i("view",{staticClass:"m-title"},[t._v(t._s(t.rowData.synopsis))]),i("view",{staticClass:"m-price"},[i("view",{staticClass:"new"},[t._v(t._s(t.rowData.presentPrice))]),i("view",{staticClass:"old"},[t._v(t._s(t.rowData.originalPrice))])])])])])},s=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})},5989:function(t,e,i){"use strict";i.r(e);var n=i("32fa"),s=i("0db1");for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);i("3436");var r=i("2877"),a=Object(r["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=a.exports},"5a67":function(t,e,i){"use strict";var n=i("18bd"),s=i.n(n);s.a},"5f67":function(t,e,i){"use strict";i.r(e);var n=i("4d0a"),s=i("940e");for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);i("c2e4");var r=i("2877"),a=Object(r["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=a.exports},"6a40":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"m-home-pro",props:{rowData:{type:Object,default:function(){return{img:"",describel:"",price:"",oldPrice:""}}}},data:function(){return{}},methods:{handleFn:function(t){this.$emit("handleFn",this.rowData)}}};e.default=n},"85e0":function(t,e,i){"use strict";i.r(e);var n=i("17d0"),s=i("ddc9");for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);i("3e4a");var r=i("2877"),a=Object(r["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=a.exports},"940e":function(t,e,i){"use strict";i.r(e);var n=i("6a40"),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=s.a},9784:function(t,e,i){"use strict";i.r(e);var n=i("d6f9"),s=i("a939");for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);i("d96c");var r=i("2877"),a=Object(r["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=a.exports},"9e5c":function(t,e,i){},a939:function(t,e,i){"use strict";i.r(e);var n=i("2c67"),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=s.a},ba65:function(t,e,i){},c2e4:function(t,e,i){"use strict";var n=i("ba65"),s=i.n(n);s.a},d524:function(t,e,i){},d6f9:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"uni-swiper__warp"},[t._t("default",null,{mpcomid:"59726e80-0"}),"default"===t.mode?i("view",{staticClass:"uni-swiper__dots-box",style:{bottom:t.dots.bottom+"px"}},t._l(t.info,function(e,n){return i("view",{key:n,staticClass:"uni-swiper__dots-item",style:{width:t.dots.width+"px",height:t.dots.height+"px","background-color":n!==t.current?t.dots.backgroundColor:t.dots.selectedBackgroundColor,border:n!==t.current?t.dots.border:t.dots.selectedBorder}})})):t._e(),"long"===t.mode?i("view",{staticClass:"uni-swiper__dots-box",style:{bottom:t.dots.bottom+"px"}},t._l(t.info,function(e,n){return i("view",{key:n,staticClass:"uni-swiper__dots-item ",class:[n===t.current&&"uni-swiper__dots-long"],style:{width:(n===t.current?3*t.dots.width:t.dots.width)+"px",height:t.dots.height+"px","background-color":n!==t.current?t.dots.backgroundColor:t.dots.selectedBackgroundColor,border:n!==t.current?t.dots.border:t.dots.selectedBorder}})})):t._e(),"nav"===t.mode?i("view",{staticClass:"uni-swiper__dots-box uni-swiper__dots-nav",style:{"background-color":t.dotsStyles.backgroundColor}},[i("view",{staticClass:"uni-swiper__dots-nav-item",style:{color:t.dotsStyles.color}},[t._v(t._s(t.current+1+"/"+t.info.length)+"\n\t\t\t"+t._s(t.info[t.current][t.field]))])]):t._e(),"indexes"===t.mode?i("view",{staticClass:"uni-swiper__dots-box",style:{bottom:t.dots.bottom+"px"}},t._l(t.info,function(e,n){return i("view",{key:n,staticClass:"uni-swiper__dots-item uni-swiper__dots-indexes",style:{width:t.dots.width+"px",height:t.dots.height+"px",color:n===t.current?t.dots.selectedColor:t.dots.color,"background-color":n!==t.current?t.dots.backgroundColor:t.dots.selectedBackgroundColor,border:n!==t.current?t.dots.border:t.dots.selectedBorder}},[t._v(t._s(n+1))])})):t._e()],2)},s=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})},d96c:function(t,e,i){"use strict";var n=i("d524"),s=i.n(n);s.a},ddc9:function(t,e,i){"use strict";i.r(e);var n=i("52fd"),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=s.a},e638:function(t,e,i){"use strict";i.r(e);var n=i("595b"),s=i("4a50");for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);i("5a67");var r=i("2877"),a=Object(r["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=a.exports},e675:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"m-home-store",props:{rowData:{type:Object,default:function(){return{}}},tips:{type:Array,default:function(){return[]}}},methods:{handleFn:function(){this.$emit("handleFn",this.rowData.id)}},data:function(){return{}}};e.default=n}},[["46b5","common/runtime","common/vendor"]]]);