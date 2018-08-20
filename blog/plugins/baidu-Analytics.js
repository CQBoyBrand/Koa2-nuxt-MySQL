/*
** 只在生产模式的客户端中使用
*/
if (process.env.NODE_ENV === 'production') {
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?7acdd17ce6f34101a7f098b2e9a55823";
    hm.id = "baidu_tj";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();

  /*
  ** 应用挂载后
  */
  window.onNuxtReady((app) => {
    app.$nuxt.$on('routeChanged', (to, from) => {
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?7acdd17ce6f34101a7f098b2e9a55823";
        hm.id = "baidu_tj";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    })
  })
}
