(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/productlist"],{"290a":function(t,e,n){},3901:function(t,e,n){"use strict";n.r(e);var c=n("a27c"),r=n.n(c);for(var i in c)"default"!==i&&function(t){n.d(e,t,function(){return c[t]})}(i);e["default"]=r.a},"77c2":function(t,e,n){"use strict";var c=n("290a"),r=n.n(c);r.a},"87d4":function(t,e,n){"use strict";var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"m-product-list"},t._l(t.nearStoreList,function(e,c){return n("view",{key:c,attrs:{eventid:"043cc190-0-"+c},on:{click:function(n){t.goPro(e.id)}}},[n("view",{staticClass:"m-page-title"},[t._v(t._s(e.sName))]),n("m-groupbuy-list",{attrs:{rowData:e,mpcomid:"043cc190-0-"+c}})],1)}))},r=[];n.d(e,"a",function(){return c}),n.d(e,"b",function(){return r})},a27c:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c=r(n("ec32"));function r(t){return t&&t.__esModule?t:{default:t}}var i={data:function(){return{nearStoreList:[{img:"../../static/img/2.jpg",title:"精品秋葵600g",describe:"特价小白菜",price:"￥2.99",oldprice:"￥100"},{img:"../../static/img/2.jpg",title:"精品秋葵600g",describe:"特价小白菜",price:"￥2.99",oldprice:"￥100"},{img:"../../static/img/2.jpg",title:"精品秋葵600g",describe:"特价小白菜",price:"￥2.99",oldprice:"￥100"}]}},methods:{goPro:function(e){console.log(e),t.navigateTo({url:"/pages/product/product?id="+e})}},onLoad:function(t){var e=this;t.search;this.mPost("/server/p/search/products",{start:0,length:20,name:this.search}).then(function(t){"1"==t.code&&t.data&&t.data.list&&(e.nearStoreList=t.data.list,console.log(e.nearStoreList)),console.log(t)})},components:{mGroupbuyList:c.default}};e.default=i}).call(this,n("543d")["default"])},d6c7:function(t,e,n){"use strict";n("ba95");var c=i(n("b0ce")),r=i(n("ed1c"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,c.default)(r.default))},ed1c:function(t,e,n){"use strict";n.r(e);var c=n("87d4"),r=n("3901");for(var i in r)"default"!==i&&function(t){n.d(e,t,function(){return r[t]})}(i);n("77c2");var o=n("2877"),a=Object(o["a"])(r["default"],c["a"],c["b"],!1,null,null,null);e["default"]=a.exports}},[["d6c7","common/runtime","common/vendor"]]]);