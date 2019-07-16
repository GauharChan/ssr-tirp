import Vue from 'vue'
import moment from 'moment'

// 把moment绑定到对象的原型链上
// 记得在nuxt.config.js 引入本文件
Vue.prototype.$moment = moment