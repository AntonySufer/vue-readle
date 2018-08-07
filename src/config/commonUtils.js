/**
 * 创建人 : @yidian
 * 创建内容 : 公用头部
 * 创建时间 :2018/8/1
 * 创建版本 :1.0.0
 *
 **/
//将时间转化为  xx分钟 xx小时 ………………


const store = require('store') ;

const common ={};

common.time2Str = (stamp) => {
  let time = new Date(new Date() - new Date(stamp)).getTime();
  let min = time / (1000 * 60);
  let hour = min / 60;
  let day = hour / 24;
  let month = day / 30;
  let year = month / 12;
  if (min < 60) {
    return Math.floor(min) + '分钟';
  }
  else if (hour < 24) {
    return Math.floor(hour) + '小时';
  }
  else if (day < 30) {
    return Math.floor(day) + '天';
  }
  else if (month < 12) {
    return Math.floor(month) + '月';
  }
  else {
    return Math.floor(year) + '年';
  }
}

//转化封面url为实际url
common.url2Real = (url) => {
  if (url.search(/agent/i) === -1) {
    return 'http://api.zhuishushenqi.com' + url;
  }
  else{
    return decodeURIComponent(url.replace(/\/agent\//, ''));
  }
}

//将字数带上单位 如12345 转化为1.2万字
common.wordCount2Str = (wordCount) => {
  if (Array.from(String(wordCount)).length > 4) {
    let arr = Array.from(String(wordCount));
    arr.length -= 4;
    wordCount = arr.join('') + '万';
  }
  if (wordCount<=0){
    wordCount= 0 ;
  }
  return wordCount + '字';
}


/**
 * 存储localStorage
 */
common.setStore = (name, content) => {
  if (!name) return;
   return store.set(name, content);
}

/**
 * 获取localStorage
 */
common.getStore = name => {
  if (!name) return;
  return store.get(name);
}

/**
 * 删除localStorage
 */
common.removeStore = name => {
  if (!name) return;
  return store.remove(name);
};


/**
 * 通过id获取到当前存储的小说详情数组
 */
common.getOneBookStore = _id => {
  let bookitem_store =store.get('bookList') || [];
  let bookData = bookitem_store.filter(item =>{
    if(item._id == _id ){
      return item;
    }
  });
  return bookData[0] ||[];
};

/***
 * 获取资源
 * @param data
 * @returns {function(*)}
 */


export  default common;
