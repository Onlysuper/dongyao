import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// my config start
// Vue.prototype.apiurl = 'http://39.105.89.138:6090'; 
Vue.prototype.apiurl = 'https://dy.gantangerbus.com/dy'; 
var Authorization =uni.getStorageSync('Authorization');
// console.log(Authorization);
var service=(res)=>{
	console.log(res);
	if(res.statusCode==200){
		if(res.data.code=='-1'){
			// 请求失败
			uni.showToast({
				title:  "请求出错",
				icon: "none"
			});
// 			uni.redirectTo({
// 				url:'/pages/empty/error'
// 			})
		}else if(res.data.code=='-2'){
			// 重新登录
			let backurl = encodeURI("/pages/tabBar/user");
			uni.redirectTo({
				url:'/pages/login/login?back='+backurl 
			})
		}
	}else{
		uni.showToast({
			title:  "请求出错"+res.statusCod,
			icon: "none"
		});
	}
	
}
//经纬度转换成三角函数中度分表形式。
Vue.prototype.rad= function(d) {
  return d * Math.PI / 180.0;
},
/**
 *
 * @param lat1  纬度1
 * @param lng1  经度1
 * @param lat2  纬度2
 * @param lng2  经度2
 */
Vue.prototype.geoDistance= function(lat1, lng1, lat2, lng2) {
  let radLat1 = this.rad(lat1);
  let radLat2 = this.rad(lat2);
  let a = radLat1 - radLat2;
  let b = this.rad(lng1) - this.rad(lng2);
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;// EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; //输出为公里
  return (s.toFixed(1))+'km';
},
console.log(Authorization);
Vue.prototype.mGet = function(url,data){
	let _this=this;
	return new Promise(function(resolve, reject){
		uni.request({
			url: _this.apiurl+url,
			method: 'GET',
			header:{
				"Cache-Control": "no-cache",
				"Content-Type": "application/json;charset=UTF-8",
				"Authorization":Authorization
			},
			data: {...data},
			success: res => {
				if(res.data.code==1){
					resolve(res.data)
				}else{
					service(res);
					uni.showToast({
						title:  "服务器开小差了，稍后重试",
						icon: "none"
					});
					reject(res.data)
				}
			},
			fail:error=>{
				uni.showToast({
					title:  "请求超时，当前网络不稳定",
					icon: "none"
				});
				reject(error)
			}
// 			complete() {
// 				uni.stopPullDownRefresh();
// 			}
		})
	});
}
Vue.prototype.mPost = function(url,data,host){
	let _this=this;
	let baseurl = _this.apiurl+url;
	if(host){
		baseurl=host+url
	}
	return new Promise(function(resolve, reject){
		uni.request({
			url:baseurl,
			method: 'POST',
			header:{
				"Cache-Control": "no-cache",
				"Content-Type": "application/json;charset=UTF-8",
				"Authorization":Authorization
			},
			data: data,
			success: res => {
				if(res.data.code==1){
					resolve(res.data)
				}else{
					service(res);
					reject(res.data)
				}
			},
			fail:error=>{
				uni.showToast({
					title:  "请求超时，当前网络不稳定",
					icon: "none"
				});
				reject(error)
			}
// 			complete() {
// 				uni.stopPullDownRefresh();
// 			}
		})
	});
}
Vue.prototype.mPostForm = function(url,data,host){
	let _this=this;
	let baseurl = _this.apiurl+url;
	if(host){
		baseurl=host+url
	}
	
	return new Promise(function(resolve, reject){
		uni.request({
			url:baseurl,
			method: 'POST',
			header:{
				"Cache-Control": "no-cache",
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization":Authorization
			},
			data: data,
			success: res => {
				if(res.data.code==1){
					resolve(res.data)
				}else{
					service(res);
					reject(res.data)
				}
			},
			fail:error=>{
				uni.showToast({
					title:  "操作失败，请检查网络",
					icon: "none"
				});
				reject(error)
			}
// 			complete() {
// 				uni.stopPullDownRefresh();
// 			}
		})
	});
}

/**
     * 乘法，解决js精度损失问题
     * @param {*} arg1 
     * @param {*} arg2 
     */
Vue.prototype.accMul = function(arg1, arg2) {
	arg1 = arg1 || 0;
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) { }
	try {
		m += s2.split(".")[1].length
	} catch (e) { }
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

//判断是否登录
Vue.prototype.globelIsLogin=function(){
	// #ifdef MP-WEIXIN
	let phone = uni.getStorageSync('phone');
	return new Promise(function(resolve, reject){
		wx.checkSession({
			success() {
				if(phone){
					resolve('success')
				}else{
					reject('fail')
				}
			},
			fail() {
				console.log('失败这里这里')
				reject('fail')
			}
		})
	})
	
	// #endif
	
}
// my config end
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
