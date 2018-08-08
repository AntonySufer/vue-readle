// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'
import store from './store/index'
import FastClick from 'fastclick'
import './assets/css/public.css'/*引入公共样式*/
import './assets/css/main.css'/*引入公共样式*/

import axios from './config/api/axios'   /*数据请求*/
Vue.prototype.$axios = axios;

import {api} from './config/env'; /*请求url链接*/
Vue.prototype.$api = api;

import commomUtils from './config/commonUtils'   /*数据请求*/
Vue.prototype.$util = commomUtils;


import Loading from './components/loading.vue'
Vue.component('Loading',Loading)  /*自定义loading 组件*/

Vue.config.productionTip = false;

import betterScroll from './components/betterScroll.vue'
Vue.component('betterScroll',betterScroll)  /*自定义loading 组件*/



import { ToastPlugin} from 'vux'  /**vux的弹框组件*/ //ConfirmPlugin,AlertPlugin
 Vue.use(ToastPlugin)
// Vue.use(ConfirmPlugin)
//Vue.use(AlertPlugin)

//公用的弹窗(全局变量)
Vue.prototype.showToast = function(text,type,width="7.6em",postion='bottom'){
  this.$vux.toast.show({
    text: text,
    type: type,
    width: width,
    position: postion
  })
}


if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

router.beforeEach((to, from, next) => {

  if (from.path =='/seach') { //主页seach刷新
    if (to.path=='/'){
      from.meta.keepAlive = false;
    }else{
      from.meta.keepAlive = true;
    }
  }

  next();
});




new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


