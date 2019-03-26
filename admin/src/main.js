import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.scss'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Ajax from './api/index'

// use
Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.Ajax = Ajax
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
