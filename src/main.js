import Vue from 'vue';
import axios from 'axios'
import Cookies from 'js-cookie';
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';

import 'normalize.css/normalize.css'; // a modern alternative to CSS resets

import Element from 'element-ui';
import '@/@ovu/styles/element-variables.scss';

import '@/styles/index.scss'; // global css
import '@/assets/fonts/iconfont.css'; // global css

import '@/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';

import '@/@ovu/directive/permission';

import './icons'; // icon
import './permission'; // permission control
import './utils/error-log'; // error log
import 'font-awesome/css/font-awesome.css';
import moment from 'moment';
// 图片放大预览
import Viewer from 'v-viewer';
import common from './assets/js/common.js';
import 'viewerjs/dist/viewer.css';
import VueCropper from 'vue-cropper';
import * as filters from './filters'; // global filters

import '@/@ovu/components';
import Print from 'vue-print-nb'; // 打印插件
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock');
//   mockXHR();
// }

Vue.use(Element, {
  size: Cookies.get('size') || 'mini' // set element-ui default size
});

Vue.use(VueCropper);
Vue.use(Viewer);
Vue.use(Print); // 注册打印
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
Vue.prototype.moment = moment;
Vue.prototype.processImgUrl = common.processImgUrl;
Vue.prototype.downUrl = window.location.origin;
Vue.prototype.$axios = axios;
// Vue.prototype.downUrl = 'http://192.168.0.13:5677';
Vue.prototype.openForm = function(url, params, method) {
  const form = document.createElement('form');
  form.style.display = 'none';
  form.action = url;
  form.method = method;
  document.body.appendChild(form);
  Object.keys(params).forEach(item => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = item;
    input.value = params[item];
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

// 时间格式化过滤器 yyyy-mm-dd
Vue.filter('dateFormat', function(time) {
  var date = new Date(time);
  var year = date.getFullYear();
  var month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  // var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
  // var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
  // var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
  return year + '-' + month + '-' + day;
});
// 转换YYYY-MM-DD hh:mm:ss
Vue.filter('dateFormat_1', function(time) {
  var date = new Date(time);
  var year = date.getFullYear();
  var month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var seconds =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return (
    year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  );
});
// import { getToken, setToken, setUserId } from "@/utils/auth"; // get token from cookie
// setToken('f58d7f68c96043c0b8f4feb520610e3c');
var clockUrl = '';
if (window.location.origin.indexOf('192.168') == -1 && window.location.origin.indexOf('localhost')== -1) {
  console.log('正式环境');
 
  clockUrl = 'https://account.ovupark.com/auth';
 
} else {
  console.log('测试环境');
  clockUrl = 'http://192.168.0.16:9035/auth';
}
Vue.use(VueKeyCloak, {
  init: {
    // onLoad: 'login-required'
    onLoad: 'check-sso'
  },
  config: {
    // url: 'https://account.ovupark.com/auth',
    // url: 'http://192.168.0.16:9035/auth',
    url: clockUrl,
    clientId: 'ums',
    realm: 'OVU'
    // sercet: '7de67c9f-9dc5-44ac-95a3-e15422ca5388'
  },
  onReady: async(keycloak) => {
    await store.dispatch('user/login', keycloak);
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
