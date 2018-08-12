export const state = () => ({

  // 文章列表
  tag: {
    list: []
  },

  fetch: false,
})

export const mutations = {
  GET_TAG_FAIL(state) {
    state.tag = {list: []}
    state.fetch = false
  },

  GET_TAG_SUCCESS(state, data) {
    state.tag = data
    state.fetch = false
  }
}
