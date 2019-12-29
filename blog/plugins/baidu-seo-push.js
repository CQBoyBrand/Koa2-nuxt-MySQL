/*
** 只在生产模式的客户端中使用
*/
if (process.env.NODE_ENV === 'production') {
  /*
  ** 百度seo-自动push脚本
  ** https://zz.bdstatic.com/linksubmit/push.js
  */
  (function() {
    var bp = document.createElement('script');
    bp.id = "baidu_push";
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https'){
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else{
      bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
  })();
  /*
  ** 应用挂载后
  */
  window.onNuxtReady((app) => {
    app.$nuxt.$on('routeChanged', (to, from) => {
      (function() {
        document.getElementById('baidu_push') && document.getElementById('baidu_push').remove()
        var bp = document.createElement('script');
        bp.id = "baidu_push";
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https'){
          bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        }
        else{
          bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
      })();
    })
  })
}
