module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: '欢迎访问我的个人主页 - 重庆崽儿Brand',
    titleTemplate: '%s - 重庆崽儿brand的个人主页',
    meta: [
      {charset: 'utf-8'},
      {
        hid: 'google-site-verification',
        name: 'google-site-verification',
        content: 'wgv4IBDBiQSNfAp7YBzgc5UukUyB1hLAF8X3DhI3wyY'
      },
      {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'},
      {hid: 'description', name: 'description', content: '重庆崽儿brand的个人博客，重庆崽儿brand的生活记录，重庆崽儿brand的前端学习'},
      {hid: 'keywords', name: 'keywords', content: '重庆崽儿brand，vue，nuxt，blog，首页，JavaScript，js，css，html，web前端，前端开发'},
      {hid: 'author', name: 'author', content: '重庆崽儿brand'},
      {hid: 'renderer', name: 'renderer', content: 'webkit|ie-comp|ie-stand'},
      {hid: 'http-equiv', 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      // {rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css'}
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#5183ff'},
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return {x: 0, y: 0}
    }
  },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/style.scss',
    '@/assets/css/github-markdown.css',
    '@/assets/css/darcula.min.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/svg',
    '@/assets/icons/index',
    {src: '@/plugins/baidu-Analytics', ssr: false},
    {src: '@/plugins/baidu-seo-push.js', ssr: false},
    {src: '@/plugins/ga.js', ssr: false},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    extractCSS: {allChunks: true},
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
