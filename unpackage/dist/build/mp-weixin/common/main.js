(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"0a7d":function(t,n,o){},"4ad1":function(t,n,o){"use strict";o.r(n);var e=o("dd06"),a=o.n(e);for(var r in e)"default"!==r&&function(t){o.d(n,t,function(){return e[t]})}(r);n["default"]=a.a},"89b7":function(t,n,o){"use strict";o.r(n);var e=o("4ad1");for(var a in e)"default"!==a&&function(t){o.d(n,t,function(){return e[t]})}(a);o("daad");var r,c,i=o("2877"),u=Object(i["a"])(e["default"],r,c,!1,null,null,null);n["default"]=u.exports},a42f:function(t,n,o){"use strict";(function(t){o("ba95");var n=a(o("f3d3")),e=a(o("89b7"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{},e=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(o).filter(function(t){return Object.getOwnPropertyDescriptor(o,t).enumerable}))),e.forEach(function(n){c(t,n,o[n])})}return t}function c(t,n,o){return n in t?Object.defineProperty(t,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[n]=o,t}n.default.config.productionTip=!1,n.default.prototype.apiurl="https://dy.gantangerbus.com/dy";var i=function(n){if(console.log(n),200==n.statusCode){if("-1"==n.data.code)t.showToast({title:"请求出错",icon:"none"});else if("-2"==n.data.code){var o=encodeURI("/pages/tabBar/user");t.redirectTo({url:"/pages/login/login?back="+o})}}else t.showToast({title:"请求出错"+n.statusCod,icon:"none"})};n.default.prototype.rad=function(t){return t*Math.PI/180},n.default.prototype.geoDistance=function(t,n,o,e){var a=this.rad(t),r=this.rad(o),c=a-r,i=this.rad(n)-this.rad(e),u=2*Math.asin(Math.sqrt(Math.pow(Math.sin(c/2),2)+Math.cos(a)*Math.cos(r)*Math.pow(Math.sin(i/2),2)));return u*=6378.137,u=Math.round(1e4*u)/1e4,u.toFixed(1)+"km"},n.default.prototype.mGet=function(n,o){var e=this;return new Promise(function(a,c){t.request({url:e.apiurl+n,method:"GET",header:{"Cache-Control":"no-cache","Content-Type":"application/json;charset=UTF-8",Authorization:t.getStorageSync("Authorization")},data:r({},o),success:function(n){1==n.data.code?a(n.data):(i(n),t.showToast({title:"服务器开小差了，稍后重试",icon:"none"}),c(n.data))},fail:function(n){t.showToast({title:"请求超时，当前网络不稳定",icon:"none"}),c(n)}})})},n.default.prototype.mPost=function(n,o,e){var a=this,r=a.apiurl+n;return e&&(r=e+n),new Promise(function(n,e){t.request({url:r,method:"POST",header:{"Cache-Control":"no-cache","Content-Type":"application/json;charset=UTF-8",Authorization:t.getStorageSync("Authorization")},data:o,success:function(t){1==t.data.code?n(t.data):(i(t),e(t.data))},fail:function(n){t.showToast({title:"请求超时，当前网络不稳定",icon:"none"}),e(n)}})})},n.default.prototype.mPostForm=function(n,o,e){var a=this,r=a.apiurl+n;return e&&(r=e+n),new Promise(function(n,e){t.request({url:r,method:"POST",header:{"Cache-Control":"no-cache","Content-Type":"application/x-www-form-urlencoded",Authorization:t.getStorageSync("Authorization")},data:o,success:function(t){1==t.data.code?n(t.data):(i(t),e(t.data))},fail:function(n){t.showToast({title:"操作失败，请检查网络",icon:"none"}),e(n)}})})},n.default.prototype.accMul=function(t,n){t=t||0;var o=0,e=t.toString(),a=n.toString();try{o+=e.split(".")[1].length}catch(r){}try{o+=a.split(".")[1].length}catch(r){}return Number(e.replace(".",""))*Number(a.replace(".",""))/Math.pow(10,o)},n.default.prototype.globelIsLogin=function(){var n=t.getStorageSync("phone");return new Promise(function(t,o){n?wx.checkSession({success:function(){t(!0)},fail:function(){t(!1)}}):t(!1)})},e.default.mpType="app";var u=new n.default(r({},e.default));u.$mount()}).call(this,o("543d")["default"])},daad:function(t,n,o){"use strict";var e=o("0a7d"),a=o.n(e);a.a},dd06:function(t,n,o){"use strict";(function(t,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")},onBackPress:function(){console.log("返回")}};n.default=e,o.isLogin=function(){try{var n=t.getStorageSync("authToken"),o=t.getStorageSync("srand")}catch(e){}return""!=n&&""!=o&&[n,o]}}).call(this,o("543d")["default"],o("c8ba"))}},[["a42f","common/runtime","common/vendor"]]]);