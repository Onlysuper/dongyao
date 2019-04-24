import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.apiurl = 'http://39.105.89.138:6090';  
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
