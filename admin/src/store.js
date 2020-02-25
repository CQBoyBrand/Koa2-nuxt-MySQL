import Vue from 'vue'
import Vuex from 'vuex'
import service from './api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {}
  },
  mutations: {
    INIT_AUTH (state, params) {
      state.auth = params
    }
  },
  actions: {
    async authInit ({ commit }, params) {
      const res = await service.userInfo(params).catch(err => {
        console.log(err)
      })
      commit('INIT_AUTH', res.data)
    }
  }
})
