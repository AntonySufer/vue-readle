import Vue from 'vue'
import Router from 'vue-router'
import {routerMode} from '../config/env'



Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

window.addEventListener('popstate', function (e) { //微信没有返回按钮解决
  Router.isBack = true
}, false)


Vue.use(Router);

export default new Router({
  mode:routerMode,
  routes: [
    { path: '/', component: resolve => require(['../page/main.vue'], resolve) },
    { path: '/art/:id?', name: 'art',   component: resolve => require(['../page/art.vue'], resolve)},
    { path: '*', component: resolve => require(['../components/err.vue'], resolve) },
    { path: '/history', meta: { keepAlive: true }, component: resolve => require(['../page/historyList.vue'], resolve) },
    { path: '/attent', meta: { keepAlive: true },component: resolve => require(['../page/attention.vue'], resolve) },
    { path: '/my', component: resolve => require(['../page/my.vue'], resolve) }


  ]


})
