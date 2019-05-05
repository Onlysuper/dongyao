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

// my config end
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
