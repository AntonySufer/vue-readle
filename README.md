# vue-reader
一点阅读器！API源自追书神器，免费使用！目前已初步开发完成！


Github项目地址:[https://github.com/AntonySufer/vue-readle](https://github.com/AntonySufer/vue-readle)

欢迎`issue`，`pr`，`star` or `follow`！

推荐一个之前用Vue 文章类阅读写的 [一点阅读](https://github.com/AntonySufer/vue-cli-yidian)

微信小程序  [一点文章](https://github.com/AntonySufer/yidianwz_wx) 已上线，可以再微信搜索 一点文章体验

## 在线体验地址
[点击这里体验](https://sufer666.top/reader/#/)(服务器太low，渲染慢)

## 部分效果截图
![exp11](static/exp/exp11.gif)
![exp12](static/exp/exp12.gif)


## 一点阅读器优势
|     | 一点阅读器 |  追书神器|
|-----|-----------|----------|
|收费 | 免费      |部分章节免费,其余收费|
|广告 |绿色无广告 | 定时刷广告|
|体积 | 4MB     | 16.2MB   |
|章节大小| 每章5kb左右   | 掺杂广告，大于5kb|


## 使用
```
git clone https://github.com/AntonySufer/vue-readle.git

cd vue-readle

npm install

# 开发环境
npm run dev
访问 http://localhost:8888/

# 打包
npm run build
```



## 实现功能
- [x] 小说搜索
- [x] 小说详情
- [x] 小说换源
- [x] 小说阅读
- [x] 阅读字体大小变化
- [x] 阅读背景色变化
- [x] 阅读设置本地缓存
- [x] 阅读进度本地缓存
- [x] 搜索历史本地缓存


每次进入首页自动刷新最新章节列表


## 一些注意事项
项目中使用追书神器的接口，需要使用`http-proxy-middleware`进行转发，开发环境下需要在`cfg/base.js`中的`dev`中添加下列配置即可
```
proxy: {
  '/api': {
    target: 'http://api.zhuishushenqi.com/',
    pathRewrite: {'^/api' : '/'},
    changeOrigin: true
  },
  '/chapter': {
    target: 'http://chapter2.zhuishushenqi.com/',
    pathRewrite: {'^/chapter' : '/chapter'},
    changeOrigin: true
  }
}
```

实际环境中，服务器端配置
```
var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();
app.use('/static', express.static('static'));
app.use('/assets', express.static('assets'));
app.use('/api', proxy({
  target: 'http://api.zhuishushenqi.com/',
  pathRewrite: {'^/api' : '/'},
  changeOrigin: true
}
));

app.use('/chapter', proxy({
  target: 'http://chapter2.zhuishushenqi.com/',
  pathRewrite: {'^/chapter' : '/chapter'},
  changeOrigin: true
}
));
```


## 支持

欢迎`issue`，`pr`，`star` or `follow`！

[你可以在这里打赏我](https://note.sufer666.top/2018/08/08/%E4%B8%80%E7%82%B9%E5%B0%8F%E8%AF%B4/)




