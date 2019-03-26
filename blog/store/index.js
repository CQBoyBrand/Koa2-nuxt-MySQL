import service from '../api'

const LIMIT = 9;
const CURRENT_PAGE = 1;
export const actions = {
  nuxtServerInit(store, {params, route, req}) {
    const initAppData = [
      store.dispatch('getArticleHot'),
      store.dispatch('getFontTagList'),
      store.dispatch('getFontCategoryList'),
      store.dispatch('getlinkList'),
    ]

    return Promise.all(initAppData)
  },
  // 获取文章列表
  async getAllArtList({commit, state}, params) {
    let postParam = {
      currentPage: params.currentPage || CURRENT_PAGE,
      limit: LIMIT
    }
    const res = await service.getArtAll(postParam).catch(err => {
      console.log(err)
    })
    if (res && res.code == 1) {
      commit('article/GET_ART_SUCCESS', res.result)
    }
  },
  // 按标签获取文章列表
  async getArtListByTag({commit, state}, params) {
    let postParam = {
      tagname:params.tagname,
      currentPage: params.currentPage || CURRENT_PAGE,
      limit: LIMIT
    }
    const res = await service.getArticleListByTag(postParam).catch(err => {
      console.log(err)
    })
    if (res && res.code == 1) {
      commit('article/GET_ART_BY_TAG_SUCCESS', res.result)
    }
  },
  // 按标分类取文章列表
  async getArtByCategory({commit, state}, params) {
    let postParam = {
      categoryname:params.categoryname,
      currentPage: params.currentPage || CURRENT_PAGE,
      limit: LIMIT
    }
    const res = await service.getArtByCategory(postParam).catch(err => {
      console.log(err)
    })
    if (res && res.code == 1) {
      commit('article/GET_ART_BY_CATEGORY_SUCCESS', res.result)
    }
  },
  // 按标搜索取文章列表
  async getArtByKeyword({commit, state}, params) {
    let postParam = {
      artTitle:params.keywords,
      currentPage: params.currentPage || CURRENT_PAGE,
      limit: LIMIT
    }
    const res = await service.getArtByTitle(postParam).catch(err => {
      console.log(err)
    })
    if (res && res.code == 1) {
      commit('article/GET_ART_BY_KEYWORDS_SUCCESS', res.result)
    }
  },
  // 获取文章详情
  async getArtDetail({commit, state}, params) {
    const res = await service.getArtDetail(params).catch(err => {
      console.log(err)
    })
    if (res && res.code == 1) {
      commit('article/GET_ART_DETAIL_SUCCESS', res.result)
    }
  },
  // 获取文章详情
  async getArticleHot({commit, state}, params) {
    const res = await service.getArticleHot().catch(err => {
      console.log(err)
    })
    if (res && res.code == 1) {
      commit('article/GET_ART_HOT_SUCCESS', res.result)
    }
  },
  // 获取标签
  async getFontTagList({commit, state}, params) {
    const res = await service.getFontTagList().catch(err => {
      console.log(err)
    })
    if (res && res.code == 1) {
      commit('tag/GET_TAG_SUCCESS', res.result)
    }
  },
  // 获取友链
  async getlinkList({commit, state}, params) {
    const res = await service.getlinkList().catch(err => {
      console.log(err)
    })
    if (res && res.code == 1) {
      commit('link/GET_LINK_SUCCESS', res.result)
    }
  },
  // 根据标签获取文章
  async getFontCategoryList({commit, state}, params) {
    const res = await service.getFontCategoryList().catch(err => {
      console.log(err)
    })
    if (res && res.code == 1) {
      commit('category/GET_CATEGORY_SUCCESS', res.result)
    }
  },
  // 文章归档
  async getArchive({commit, state}, params) {
    const res = await service.getArchive().catch(err => {
      console.log(err)
    })
    if (res && res.code == 1) {
      commit('article/GET_ART_ARCHIVE_SUCCESS', res.result)
    }
  },
  // 获取评论
  async getComment({commit, state}, params) {
    let postParam = {
      artId:params.id,
      currentPage: params.currentPage || CURRENT_PAGE,
      limit: LIMIT
    }
    const res = await service.getComment(postParam).catch(err => {
      console.log(err)
    })
    if (res && res.code == 1) {
      commit('comment/GET_COMMENT_SUCCESS', res.result)
    }
  },
  // 添加评论
  async addComment({commit, state}, params) {
    const res = await service.addComment(params).catch(err => {
      console.log(err)
    })
    return res
  },
  // 添加回复
  async addReplyComment({commit, state}, params) {
    const res = await service.addReplyComment(params).catch(err => {
      console.log(err)
    })
    return res
  },
}
