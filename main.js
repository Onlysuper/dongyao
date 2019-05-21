import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// my config start
// Vue.prototype.apiurl = 'http://39.105.89.138:6090'; 
Vue.prototype.apiurl = 'https://dy.gantangerbus.com/dy'; 
var Authorization =uni.getStorageSync('Authorization');
// console.log(Authorization);

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
				resolve(res.data)
			},
			fail:error=>{
				uni.showToast({
					title:  "操作失败，请检查网络",
					icon: "none"
				});
				reject(error)
			},
			complete: res => {
				// resolve(res)
			}
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
				resolve(res.data)
			},
			fail:error=>{
				// console.log(error);
				uni.showToast({
					title:  "操作失败，请检查网络",
					icon: "none"
				});
				reject(error)
			},
			complete: res => {
				// console.log(res);
				// resolve(res)
			}
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
				resolve(res.data)
			},
			fail:error=>{
				uni.showToast({
					title:  "操作失败，请检查网络",
					icon: "none"
				});
				reject(error)
			},
			complete: res => {
				
				// console.log(res);
				// resolve(res)
			}
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
