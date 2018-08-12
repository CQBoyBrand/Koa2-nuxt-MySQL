export const state = () => ({

  // 文章列表
  collectionList: {
    list: [],
    pagenation:{}
  },

  fetch: false,
})

export const mutations = {
  FETCH_COLLECTION(state) {
    state.fetch = true
  },
  GET_COLLECTION_FAIL(state) {
    state.collectionList = {collectionList: [],pagenation:{}}
    state.fetch = false
  },

  GET_COLLECTION_SUCCESS(state, data) {
    state.collectionList = data
  }
}
