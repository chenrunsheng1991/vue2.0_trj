import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import routes from './routes';
import store from './store';
import filters from './filters';

import Loading from './components/loading'; //自定义loading的组件install,需要use
import Toast from './components/toast';

//引入全局的reset文件
require('./assets/styles/reset.css');

Object.keys(filters).forEach(filter => Vue.filter(filter, filters[filter]))
Vue.use(Loading);
Vue.use(Toast);
Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history', //切换路径模式，变成history模式地址不会出现＃
  scrollBehavior: () => ({ y: 0 }), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
  routes
});

//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
axios.interceptors.request.use(function (config) {  //配置发送请求的信息
  store.dispatch('showLoading');
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
  store.dispatch('hideLoading');
  return response;
}, function (error) {
  return Promise.reject(error);
});

// axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.baseURL='https://m.tourongjia.com/';
Vue.prototype.$http = axios; //其他页面在使用axios的时候直接  this.$http就可以了

new Vue({
  el: '#app',
  router,
  store,
  render: creat => creat(App)
})