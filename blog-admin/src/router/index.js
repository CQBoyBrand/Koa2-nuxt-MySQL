import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: resolve => require(['@/components/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children:[
        {
          path: '/dashboard',
          component: resolve => require(['@/views/index/index.vue'], resolve),
          meta: { title: '系统首页' }
        },
        {
          // 富文本编辑器组件
          path: '/editor',
          component: resolve => require(['@/views/articleManage/vueEditor.vue'], resolve),
          meta: { title: '富文本编辑器' }
        },
        {
          // markdown组件
          path: '/markdown',
          component: resolve => require(['@/views/articleManage/markdown.vue'], resolve),
          meta: { title: 'markdown编辑器' }
        },
        {
          // 文章列表
          path: '/articleList',
          component: resolve => require(['@/views/articleManage/articleList.vue'], resolve),
          meta: { title: '文章列表' }
        },
        {
          // 友链管理
          path: '/friendsManage',
          component: resolve => require(['@/views/friends/friendsManage.vue'], resolve),
          meta: { title: '友链管理' }
        },
        {
          // 站点收藏管理
          path: '/collectionManage',
          component: resolve => require(['@/views/collection/collectionManage.vue'], resolve),
          meta: { title: '站点收藏管理' }
        },
        {
          // 站点收藏管理
          path: '/tagManage',
          component: resolve => require(['@/views/articleManage/tags.vue'], resolve),
          meta: { title: '标签管理' }
        },
      ]
    },
    {
      path: '/login',
      name:'login',
      component: resolve => require(['@/views/login/login.vue'], resolve)
    },
    {
      path: '/404',
      component: resolve => require(['@/views/error/404.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
