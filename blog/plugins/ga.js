/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/26 20:06
 * Description:
 */
if (process.client && process.env.NODE_ENV === 'production') {
  /*
  ** Google 统计分析脚本
  */
  // (function (i, s, o, g, r, a, m) {
  //   i.GoogleAnalyticsObject = r; i[r] = i[r] || function () {
  //     (i[r].q = i[r].q || []).push(arguments)
  //   }, i[r].l = 1 * new Date(); a = s.createElement(o),
  //     m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
  // })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')
  // /*
  // ** 当前页的访问统计
  // */
  // ga('create', 'UA-137695268-1', 'auto')

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "AW-586413900");
}

export default ({ app: { router }, store }) => {
  /*
  ** 每次路由变更时进行pv统计
  */
  // router.afterEach((to, from) => {
  //   /*
  //   ** 告诉 GA 增加一个 PV
  //   */
  //   ga('set', 'page', to.fullPath)
  //   ga('send', 'pageview')
  // })
}
