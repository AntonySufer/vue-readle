/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
  baseUrl = 'http://192.168.1.34:8080';
 //imgBaseUrl = 'http://cangdu.org:8001/img/';

}else if(process.env.NODE_ENV == 'production'){
  //baseUrl = '';
  //imgBaseUrl = '';
}

let myUrl= process.env.API_HOST+'wx.post?func=' ;  //api在config的index设置跨域.process.env.API_HOST根据环境区分

let api={
   "userLogin":myUrl+'userLogin',
   "getNotes":myUrl+'get_today_note', //每日一句
   "getIndexArt": myUrl+'yidian-get_index_article', //首页文章
   "getHistory": myUrl+'yidian-get_list_article', //历史文章list
   "getAttent": myUrl+'yidian-get_collect_article'//关注文章list

}


export {
  baseUrl,
  routerMode,
  imgBaseUrl,
  api
}
