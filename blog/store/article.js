export const state = () => ({

  // 文章列表
  art: {
    list: [],
    pagenation: {}
  },
  archive:{
    list:[],
    pagenation: {}
  },
  hotArt:{
    list: [],
  },
  tagArtList:{
    list: [],
    pagenation: {}
  },
  fetch: false,
  fetchArchive: false,
  fetchTagArt: false,
  //详情
  details: {},


})

export const mutations = {
  FETCH_ART(state) {
    state.fetch = true
  },
  FETCH_ARCHIVE(state) {
    state.fetchArchive = true
  },
  FETCH_TAGARTLIST(state) {
    state.fetchTagArt = true
  },
  GET_DETAIL_FAIL(state) {
    state.details = {}
  },
  GET_DETAIL_SUCCESS(state,data) {
    state.details = data
  },

  // 文章列表
  GET_ART_SUCCESS(state, data) {
    state.art = data
  },
  GET_ART_FAIL(state) {
    state.art = {list: [],pagenation:{}}
    state.fetch = false
  },

  // 查询归档文章
  GET_ARCHIVE_SUCCESS(state, data) {
    state.archive = data
  },
  GET_ARCHIVE_FAIL(state) {
    state.archive = {list: [],pagenation:{}}
    state.fetchArchive = false
  },

  // 根据标签查文章列表
  GET_TAGARTLIST_SUCCESS(state, data) {
    state.tagArtList = data
  },
  GET_TAGARTLIST_FAIL(state) {
    state.tagArtList = {list: [],pagenation:{}}
    state.fetchTagArt = false
  },
  // 获取热门文章
  GET_HOTART_SUCCESS(state, data) {
    state.hotArt = data
  },
  GET_HOTART_FAIL(state) {
    state.hotArt = {list: []}
    state.fetchTagArt = false
  },
}
