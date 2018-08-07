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

let apiUrl =process.env.API_HOST;
let chapter= process.env.CHAPTER_HOST;

let api={
   "searchList":apiUrl+"book/fuzzy-search?",//小说查询
    "getBookDet":apiUrl+'book/'  //小说介绍,

};


export {
  baseUrl,
  routerMode,
  imgBaseUrl,
  api
}
