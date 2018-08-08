import Vue from 'vue'
import Router from 'vue-router'
import {routerMode} from '../config/env'



Router.prototype.goBack = function (toPath) {
  this.isBack = true;
  if (!toPath){
    window.history.go(-1);
  }else{
    window.location.href=toPath;
  }

}

window.addEventListener('popstate', function (e) { //微信没有返回按钮解决
  Router.isBack = true
}, false)




Vue.use(Router);

export default new Router({
  mode:routerMode,
  routes: [
    { path: '/', component: resolve => require(['../page/main.vue'], resolve) },
    { path: '/home', component: resolve => require(['../page/main.vue'], resolve) },
    { path: '/my', component: resolve => require(['../page/my.vue'], resolve) },
    { path: '*', component: resolve => require(['../components/err.vue'], resolve) },
    { path: '/seach',meta: { keepAlive: true }, component: resolve => require(['../page/seach.vue'], resolve) },
    { path: '/book/:id?', name: 'book',   component: resolve => require(['../page/bookItem.vue'], resolve)},
    { path: '/chapter/:id?/:page?/:top?', name: 'chapter',   component: resolve => require(['../page/chapter.vue'], resolve)},
    { path: '/empty/:id?/:page?/:top?', name: 'empty',   component: resolve => require(['../page/empty.vue'], resolve)}


  ]


})
