import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
      hidden: true
    },
    {
      path: '/login',
      name: 'login',
      hidden:true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/login/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/dashboard',
      meta: {
        title: 'Home',
        icon: '',
        roles: '0',
        leaf: true // 没有子节点
      },
      component: () => import(/* webpackChunkName: "about" */ './components/Home.vue'),
      children: [
        {
          path: '/dashboard',
          component: () => import(/* webpackChunkName: "about" */ './components/dashboard.vue'),
          name: 'index',
          meta: {
            title: 'dashboard',
            icon: '',
            roles: '0',
            leaf: true
          }
        }
      ]
    },
    {
      path: '/article',
      name: 'article',
      meta: {
        title: 'Article',
        icon: '',
        roles: '0',
        leaf: false
      },
      component: () => import(/* webpackChunkName: "about" */ './components/Home.vue'),
      children: [
        {
          path: '/article/list',
          component: () => import(/* webpackChunkName: "about" */ './views/article/list.vue'),
          name: 'artlist',
          meta: {
            title: 'Article List',
            icon: '',
            roles: '0',
            leaf: true
          }
        },
        {
          path: '/article/add',
          component: () => import(/* webpackChunkName: "about" */ './views/article/add.vue'),
          name: 'artadd',
          meta: {
            title: 'New Article',
            icon: '',
            roles: '0',
            leaf: true
          }
        }
      ]
    },
    {
      path: '/tag',
      name: 'tag',
      meta: {
        title: 'Tags',
        icon: '',
        roles: '0',
        leaf: true
      },
      component: () => import(/* webpackChunkName: "about" */ './components/Home.vue'),
      children: [
        {
          path: '/tag',
          component: () => import(/* webpackChunkName: "about" */ './views/tag/list.vue'),
          name: 'taglist',
          meta: {
            title: '',
            icon: '',
            roles: '0',
            leaf: true
          }
        }
      ]
    },
    {
      path: '/category',
      name: 'category',
      meta: {
        title: 'Category',
        icon: '',
        roles: '0',
        leaf: true
      },
      component: () => import(/* webpackChunkName: "about" */ './components/Home.vue'),
      children: [
        {
          path: '/category',
          component: () => import(/* webpackChunkName: "about" */ './views/category/list.vue'),
          name: 'categorylist',
          meta: {
            title: '',
            icon: '',
            roles: '0',
            leaf: true
          }
        }
      ]
    },
    {
      path: '/friends',
      name: 'friends',
      meta: {
        title: 'Friends',
        icon: '',
        roles: '0',
        leaf: true
      },
      component: () => import(/* webpackChunkName: "about" */ './components/Home.vue'),
      children: [
        {
          path: '/friends',
          component: () => import(/* webpackChunkName: "about" */ './views/link/link.vue'),
          name: 'friendslist',
          meta: {
            title: '',
            icon: '',
            roles: '0',
            leaf: true
          }
        }
      ]
    },
    {
      path: '/setting',
      name: 'setting',
      meta: {
        title: 'Setting',
        icon: '',
        roles: '0',
        leaf: true
      },
      component: () => import(/* webpackChunkName: "about" */ './components/Home.vue'),
      children: [
        {
          path: '/setting',
          component: () => import(/* webpackChunkName: "about" */ './views/setting/setting.vue'),
          name: 'settings',
          meta: {
            title: '',
            icon: '',
            roles: '0',
            leaf: true
          }
        }
      ]
    },
    {
      path: '/404',
      name: 'error',
      component: () => import(/* webpackChunkName: "about" */ './views/error/error.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.path === '/login') {
    next()
  } else {
    if (token && token.length > 22) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

export default router
