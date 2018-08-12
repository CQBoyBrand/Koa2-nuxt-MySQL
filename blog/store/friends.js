export const state = () => ({

  // 文章列表
  link: {
    list: []
  },

  fetch: false,
})

export const mutations = {
  GET_LINK_FAIL(state) {
    state.link = {list: []}
    state.fetch = false
  },

  GET_LINK_SUCCESS(state, data) {
    state.link = data
    state.fetch = false
  }
}
