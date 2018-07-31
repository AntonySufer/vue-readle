
!function(win) {
  function resize() {
    var domWidth = domEle.getBoundingClientRect().width;
    if(domWidth / v > 1024){
      domWidth = 1024 * v;
    }
    win.rem = domWidth / 29.9;
    domEle.style.fontSize = win.rem + "px";
  }
  var v, initial_scale, timeCode, dom = win.document, domEle = dom.documentElement, viewport = dom.querySelector('meta[name="viewport"]'), flexible = dom.querySelector('meta[name="flexible"]');
  if (viewport) {
//          viewport：<meta name="viewport"content="initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5,user-scalable=no,minimal-ui"/>
    var o = viewport.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
    if(o){
      initial_scale = parseFloat(o[2]);
      v = parseInt(1 / initial_scale);
    }
  } else {
    if (flexible) {
      var o = flexible.getAttribute("content").match(/initial\-dpr=(["']?)([\d\.]+)\1?/);
      if(o){
        v = parseFloat(o[2]);
        initial_scale = parseFloat((1 / v).toFixed(2))
      }
    }
  }
  if (!v && !initial_scale) {
    var n = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
    v = win.devicePixelRatio;
    v = n ? v >= 3 ? 3 : v >= 2 ? 2 : 1 : 1, initial_scale = 1 / v
  }
  //没有viewport标签的情况下
  if (domEle.setAttribute("data-dpr", v), !viewport) {
    if (viewport = dom.createElement("meta"), viewport.setAttribute("name", "viewport"), viewport.setAttribute("content", "initial-scale=" + initial_scale + ", maximum-scale=" + initial_scale + ", minimum-scale=" + initial_scale + ", user-scalable=no"), domEle.firstElementChild) {
      domEle.firstElementChild.appendChild(viewport)
    } else {
      var m = dom.createElement("div");
      m.appendChild(viewport), dom.write(m.innerHTML)
    }
  }
  win.dpr = v;
  win.addEventListener("resize", function() {
    clearTimeout(timeCode), timeCode = setTimeout(resize, 300)
  }, false);
  win.addEventListener("pageshow", function(b) {
    b.persisted && (clearTimeout(timeCode), timeCode = setTimeout(resize, 300))
  }, false);
  /* 个人觉得没必要完成后就把body的字体设置为12
   "complete" === dom.readyState ? dom.body.style.fontSize = 12 * v + "px" : dom.addEventListener("DOMContentLoaded", function() {
   //dom.body.style.fontSize = 12 * v + "px"
   }, false);
   */
  resize();
}(window);
