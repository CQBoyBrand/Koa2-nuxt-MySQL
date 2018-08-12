module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "hello, friends! 欢迎访问我的个人主页",
    titleTemplate: '%s - 重庆崽儿brand个人主页',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'},
      {hid: 'main', name: 'description', content: '重庆崽儿brand的博个人博客，重庆崽儿brand的生活记录,重庆崽儿brand的前端学习'},
      {hid: 'main-author', name: 'author', content: '重庆崽儿brand'},
      {
        hid: 'main-keywords',
        name: 'keywords',
        content: '重庆崽儿brand的博个人博客，vue，nuxt，blog，重庆崽儿，brand，重庆崽儿brand,首页,JavaScript，js，css，html，web前端,前端开发'
      },
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  plugins: ['~/plugins/elementUI', {src: '~/plugins/baidu-Analytics', ssr: false}],
  css: [
    '~assets/css/common.css',
    '~assets/css/markdown.css',
    '~static/css/github-markdown.css'
  ],
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return {x: 0, y: 0}
    }
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['~/plugins/elementUI', 'axios', '~/plugins/baidu-Analytics'],
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

