// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import Element from 'element-ui'
import router from './router'
import './assets/font/iconfont.css';
import echarts from 'echarts';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$echarts = echarts;
Vue.use(Element)
import biz from './config.js';
Vue.prototype.biz = biz;
import store from './vuex'
import 'echarts-wordcloud/dist/echarts-wordcloud.js';
import 'echarts-wordcloud/dist/echarts-wordcloud.min.js';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
