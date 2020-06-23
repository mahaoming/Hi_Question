import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store

// 导航栏
import Navbar from "_c/Navbar/Navbar";
Vue.component('Navbar', Navbar)

// 注册全局过滤器
import * as filters from './filters' // global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
