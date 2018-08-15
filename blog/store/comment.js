export const state = () => ({

  // 评论列表
  comment: {
    list: [],
    pagenation: {}
  },

  fetch: false,
})

export const mutations = {
  FETCH_COMMENT(state) {
    state.fetch = true
  },
  GET_COMMENT_FAIL(state) {
    state.comment = {list: []}
    state.fetch = false
  },

  GET_COMMENT_SUCCESS(state, data) {
    state.comment = data
  }
}
