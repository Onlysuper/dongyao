(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/comment"],{"2e00":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"m-comment-page"},[t._l(t.productList,function(e,n){return a("view",{key:n,staticClass:"m-pro"},[a("view",{staticClass:"m-top"},[a("view",{staticClass:"m-title"},[a("view",{staticClass:"img-box"},[a("image",{staticStyle:{width:"80rpx",height:"80rpx"},attrs:{src:e["pictures"][0]["pictureUrl"],mode:"aspectFit"}})]),t._v("商品评价")]),a("view",{},[a("uni-rate",{attrs:{size:"18",value:"5",eventid:"d1bc61ae-0-"+n,mpcomid:"d1bc61ae-0-"+n},on:{change:function(e){t.changeStar(e,n)}}})],1)]),a("view",{staticClass:"m-body"},[a("view",{staticClass:"m-text"},[a("view",{staticClass:"m-title"},[t._v("分享一下吧")]),a("textarea",{staticClass:"m-textarea",attrs:{"placeholder-style":"color:$color-2",placeholder:"产品你还满意吗？有什么想对我们说的吗？让更多人知道吧",eventid:"d1bc61ae-1-"+n},on:{input:function(e){t.textAreaChange(e,n)}}})]),a("view",{staticClass:"m-img"},[t._l(t.imgsUrl[n],function(e,i){return a("view",{key:i,staticClass:"m-img-item"},[a("image",{staticStyle:{width:"120rpx",height:"120rpx"},attrs:{src:e,mode:"",eventid:"d1bc61ae-2-"+n+"-"+i},on:{tap:function(e){t.handleImagePreview(n,i)}}}),a("view",{staticClass:"delete",attrs:{eventid:"d1bc61ae-3-"+n+"-"+i},on:{tap:function(e){t.removeImage(n,i)}}},[a("icon",{attrs:{type:"clear",size:"26"}})],1)])}),a("view",{staticClass:"m-img-item",attrs:{eventid:"d1bc61ae-4-"+n},on:{click:function(e){t.chooseImg(n)}}},[a("view",{staticClass:"m-img-but"})])],2)]),a("view",{staticClass:"m-footer"},[t._v("是否匿名"),a("switch",{staticStyle:{"margin-left":"20rpx"},attrs:{type:"checkbox",eventid:"d1bc61ae-5-"+n},on:{change:function(e){t.switchChange(e,n)}}})])])}),a("view",{staticClass:"m-footer-but",attrs:{eventid:"d1bc61ae-6"},on:{tap:t.commentFn}},[t._v("提交评论")]),a("view",{staticClass:"split-place"})],2)},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},"60b6":function(t,e,a){},9515:function(t,e,a){"use strict";var n=a("60b6"),i=a.n(n);i.a},a1d8:function(t,e,a){"use strict";a("ba95");var n=r(a("b0ce")),i=r(a("a704"));function r(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(i.default))},a704:function(t,e,a){"use strict";a.r(e);var n=a("2e00"),i=a("bc8b");for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);a("9515");var o=a("2877"),c=Object(o["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=c.exports},bc8b:function(t,e,a){"use strict";a.r(e);var n=a("fe5a"),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);e["default"]=i.a},fe5a:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("e944"));function i(t){return t&&t.__esModule?t:{default:t}}function r(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},n=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter(function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),n.forEach(function(e){o(t,e,a[e])})}return t}function o(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var c={components:{uniRate:n.default},data:function(){return{productList:[],imgsUrl:[],textAreaVals:[],levels:[],anonymous:[]}},methods:{switchChange:function(t,e){var a=t.detail.value?1:0;this.anonymous[e]=a},textAreaChange:function(t,e){var a=t.detail.value;this.textAreaVals[e]=a},chooseImg:function(e){var a=this;console.log("index:"+e),t.chooseImage({count:3,success:function(t){a.imgsUrl[e]||(a.imgsUrl[e]=[]);var n=a.imgsUrl[e].concat(t.tempFilePaths);a.$set(a.imgsUrl,e,a.imgsUrl[e].length<=3?n:n.slice(0,3)),console.log(a.imgsUrl)},fail:function(t){console.log(t)}})},changeStar:function(t,e){this.levels[e]=t.value},removeImage:function(t,e){this.imgsUrl[t].splice(e,1)},handleImagePreview:function(e,a){var n=a,i=this.imgsUrl[e];t.previewImage({current:i[n],urls:i})},commentFn:function(){var e=this,a=this;this.productList.forEach(function(n,i){var o={productId:n.id,anonymous:a.anonymous[i]||0,orderId:a.orderid,starLevel:a.levels[i]||5,commentContent:a.textAreaVals[i]};if(!e.imgsUrl[i]||0==e.imgsUrl[i].length)return!1;var c=e.imgsUrl[i].map(function(e){var n={url:a.apiurl+"/server/o/commentOn",header:{"Cache-Control":"no-cache",Authorization:t.getStorageSync("Authorization")},filePath:e,formData:o,name:"file"};return t.uploadFile(r({},n))});Promise.all(c).then(function(e){t.showModal({title:"上传成功",content:"可在我的订单中查看详情",showCancel:!1,confirmText:"查看",success:function(e){e.confirm?(t.setStorageSync("orderTab",4),t.switchTab({url:"/pages/tabBar/order"})):e.cancel&&t.switchTab({url:"/pages/tabBar/home"})}})}).catch(function(e){t.showToast({title:"上传失败",icon:"none"})})})}},onLoad:function(t){var e=decodeURI(t.ProductUrlData),a=JSON.parse(e)["ProductUrlData"],n=t.orderid;this.productList=a,this.orderid=n}};e.default=c}).call(this,a("543d")["default"])}},[["a1d8","common/runtime","common/vendor"]]]);