import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// my config start
Vue.prototype.apiurl = 'http://39.105.89.138:6090'; 
Vue.prototype.mGet = function(url,data){
	return new Promise(function(resolve, reject){
		uni.request({
			url: 'http://39.105.89.138:6090'+url,
			method: 'GET',
			header:{
				"Cache-Control": "no-cache",
				"Content-Type": "application/json;charset=UTF-8",
			},
			data: {...data},
			success: res => {
				console.log(res);
				resolve(res.data)
			},
			fail:error=>{
				reject(error)
			},
			complete: res => {
				// resolve(res)
			}
		})
	});
}
Vue.prototype.mPost = function(url,data){
	return new Promise(function(resolve, reject){
		uni.request({
			url: 'http://39.105.89.138:6090'+url,
			method: 'POST',
			header:{
				"Cache-Control": "no-cache",
				"Content-Type": "application/json;charset=UTF-8",
			},
			data: {...data},
			success: res => {
				resolve(res.data)
			},
			fail:error=>{
				reject(error)
			},
			complete: res => {
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
// my config end
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
