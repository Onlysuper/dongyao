(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{"37e6":function(t,e,i){"use strict";var s=i("565e"),r=i.n(s);r.a},"514d":function(t,e,i){"use strict";i.r(e);var s=i("80f6"),r=i("fe73");for(var a in r)"default"!==a&&function(t){i.d(e,t,function(){return r[t]})}(a);i("37e6");var o=i("2877"),n=Object(o["a"])(r["default"],s["a"],s["b"],!1,null,null,null);e["default"]=n.exports},"565e":function(t,e,i){},"80f6":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"m-pay-page"},[i("view",{staticClass:"m-top-back"}),i("view",{staticClass:"m-top-map"},[i("view",{staticClass:"m-container"},[1==t.state?i("view",{staticClass:"m-content"},[i("view",{staticClass:"m-title"},[t._v(t._s(t.order.carryCode))]),i("view",{staticClass:"m-describe"},[t._v("请在取货时出示提示码")])]):2==t.state?i("view",{staticClass:"m-content waitepay"},[i("view",{staticClass:"m-title"},[t._v("待支付")]),i("view",{staticClass:"m-describe"},[t._v("支付成功后显示提货码")])]):3==t.state?i("view",{staticClass:"m-content"},[i("view",{staticClass:"m-title"},[t._v("已完成交易")]),i("view",{staticClass:"m-describe"},[t._v("感谢您对东尧蔬菜的信任")])]):t._e()])]),i("view",{staticClass:"m-store-box"},[i("view",{staticClass:"m-name"},[i("view",{staticClass:"m-body"},[t._v(t._s(t.store.name))]),i("view",{staticClass:"m-phone",attrs:{eventid:"69f9dad0-0"},on:{tap:function(e){t.callPhone(t.store.tel)}}},[i("image",{staticStyle:{width:"40rpx",height:"40rpx","margin-left":"20rpx"},attrs:{src:"../../static/img/icon/shop_icon_phone.png",mode:"aspectFit"}})])]),i("view",{staticClass:"address"},[t._v(t._s(t.store.address))]),3==t.state?i("view",{staticClass:"m-time"},[t._v("提货时间："+t._s(t.store.actualPickingTime))]):i("view",{staticClass:"m-time"},[t._v("提货时间："+t._s(t.store.aboutPickingTime))])]),i("view",{staticClass:"m-pro-container"},[t._l(t.productList,function(t,e){return i("m-order-pro",{key:t.id,attrs:{title:t.synopsis,price:t.presentPrice,oldprice:t.originalPrice,imgurl:t.pictureUrl,num:t.buyCount,mpcomid:"69f9dad0-0-"+e}})}),i("view",{staticClass:"m-footer"},[t._v("合计"),i("view",{staticClass:"count"},[t._v("￥"+t._s(t.order.totalPrice))])])],2),i("view",{staticClass:"m-order-detail"},[i("view",{staticClass:"m-title"},[t._v("订单信息")]),i("view",{staticClass:"m-item"},[t._v("订单编号："+t._s(t.order.id))]),i("view",{staticClass:"m-item"},[t._v("支付方式：微信支付")]),i("view",{staticClass:"m-item"},[t._v("下单时间："+t._s(t.order.createTime))])]),i("view",{staticClass:"place"}),2==t.state?i("view",{staticClass:"m-footer-but",attrs:{eventid:"69f9dad0-1"},on:{click:t.payFn}},[t._v("立即支付￥"+t._s(t.order.totalPrice))]):t._e()])},r=[];i.d(e,"a",function(){return s}),i.d(e,"b",function(){return r})},"929d":function(t,e,i){"use strict";i("ba95");var s=a(i("b0ce")),r=a(i("514d"));function a(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(r.default))},d0d6:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=a(i("df44")),r=a(i("ecb9"));function a(t){return t&&t.__esModule?t:{default:t}}function o(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},s=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(i).filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),s.forEach(function(e){n(t,e,i[e])})}return t}function n(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var c={components:{mMap:s.default,mOrderPro:r.default},data:function(){return{order:{},productList:[],store:{},state:"",orderid:"",paytype:"",latitude:39.909,longitude:116.39742}},methods:{getLocation:function(){t.getLocation({type:"wgs84",success:function(t){console.log("当前位置的经度："+t.longitude),console.log("当前位置的纬度："+t.latitude)}})},getOrder:function(){var t=this,e=this,i=e.orderid||"";this.mPost("/server/o/orderDetail",i).then(function(e){var i=e.data;t.order=i.order,t.productList=i.productList,t.store=i.store,t.state=t.order.state}).catch(function(t){console.log(t)})},payFn:function(){var e=this,i=e.productList.map(function(t){return{productId:t.id,cou:t.buyCount}}),s={storeId:e.store.storeid,totalCount:e.order.discount,type:e.order.is_assemble,couponId:e.order.couponId,products:i,aboutPickingTime:e.store.aboutPickingTime,outTradeNo:e.order.id,reserveTel:e.order.reserveTel};e.mPost("/server/pay/wxpay",s).then(function(i){if(1==i.code){var s=i.data,r=(s.prepay_id,{provider:"wxpay",timeStamp:s.timeStamp+"",nonceStr:s.nonceStr,package:s.package,signType:s.signType,paySign:s.paySign});t.requestPayment(o({},r,{success:function(e){t.showModal({title:"支付成功",content:"可在我的订单中查看订单详情",confirmText:"查看订单",success:function(e){e.confirm?t.switchTab({url:"/pages/tabBar/order"}):e.cancel&&console.log("用户点击取消")}})},fail:function(i){t.showModal({title:"支付失败",content:"请您在重新尝试一下支付",confirmText:"重新支付",success:function(t){t.confirm?e.payFn():t.cancel&&console.log("用户点击取消")}})}}))}})}},onLoad:function(t){this.orderid=t.orderid,this.getLocation(),this.getOrder()}};e.default=c}).call(this,i("543d")["default"])},fe73:function(t,e,i){"use strict";i.r(e);var s=i("d0d6"),r=i.n(s);for(var a in s)"default"!==a&&function(t){i.d(e,t,function(){return s[t]})}(a);e["default"]=r.a}},[["929d","common/runtime","common/vendor"]]]);