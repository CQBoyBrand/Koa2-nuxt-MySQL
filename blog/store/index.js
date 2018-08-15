import service from '../api'

export const actions = {
  nuxtServerInit(store, {params, route, req}) {
    const initAppData = [
      store.dispatch('getTag'),
      store.dispatch('getHotArt'),
      store.dispatch('getLink'),
    ]

    return Promise.all(initAppData)
  },
  // 获取文章
  async getArtList({commit, state}, params) {
    commit('article/FETCH_ART')
    const res = await service.getArts(params).catch(err => {
      console.log(err)
    })
    if (res && res.code == 200) {
      let list
      if (res.pagenation.current_page === 1) list = res.articleList
      else list = [...state.article.art.list, ...res.articleList]
      commit('article/GET_ART_SUCCESS', {
        list,
        pagenation: res.pagenation
      })
    }
  },

  // 获取热门文章
  async getHotArt({commit, state}) {
    const res = await service.getHotArt().catch(err => {
      console.log(err)
    })
    if (res && res.code == 200) {
      let list = res.hotArt
      commit('article/GET_HOTART_SUCCESS', {
        list
      })
    }
  },

  // 通过标签获取文章
  async getArtListByTagId({commit, state}, params) {
    commit('article/FETCH_TAGARTLIST')
    const res = await service.getArtByTagId(params).catch(err => {
      console.log(err)
    })
    if (res && res.code == 200) {
      let list
      if (res.pagenation.current_page === 1) list = res.articleList
      else list = [...state.article.tagArtList.list, ...res.articleList]
      commit('article/GET_TAGARTLIST_SUCCESS', {
        list,
        pagenation: res.pagenation
      })
    }else {
      commit('article/GET_TAGARTLIST_FAIL')
    }
  },

  // 获取文章详情
  async getArtDetail({commit, state},params) {
    const res = await service.getArtDetail(params).catch(err => {
      console.log(err)
    })
    if (res && res.code == 200) {
      let list = res.artDetail
      commit('article/GET_DETAIL_SUCCESS', list)
    }else {
      commit('article/GET_DETAIL_FAIL')
    }
  },

  // 获取文章归档
  async getArchiveList({commit, state}, params) {
    commit('article/FETCH_ARCHIVE')
    const res = await service.getArtByDate(params).catch(err => {
      console.log(err)
    })
    if (res.code == 200) {
      let list
      if (res.pagenation.current_page === 1) {
        list = res.archive
      } else {
        list = [...state.article.archive.list, ...res.archive]
      }
      commit('article/GET_ARCHIVE_SUCCESS', {
        list,
        pagenation: res.pagenation
      })
    }
  },

  // 获取收藏
  async getCollection({commit, state}, params) {
    commit('collections/FETCH_COLLECTION')
    const res = await service.getCollection(params).catch(err => {
      console.log(err)
    })
    if (res.code == 200) {
      let list
      if (res.pagenation.current_page === 1) list = res.collectionList
      else list = [...state.collections.collectionList.list, ...res.collectionList]
      commit('collections/GET_COLLECTION_SUCCESS', {
        list,
        pagenation: res.pagenation
      })
    }
  },
  // 获取友链
  async getLink({commit, state}) {
    const res = await service.getLink().catch(err => {
      console.log(err)
    })
    if (res && res.code == 200) {
      let list = res.friendsList
      commit('friends/GET_LINK_SUCCESS', {
        list
      })
    }
  },
  // 获取标签
  async getTag({commit, state}) {
    const res = await service.getTag().catch(err => {
      console.log(err)
    })
    if (res && res.code == 200) {
      let list = res.tagList
      commit('tag/GET_TAG_SUCCESS', {
        list
      })
    }
  },
  // 添加评论
  async addNewComment({commit},params){
    const res = await service.addNewComment(params).catch(err => {
      console.log(err)
    })
    return res
  },
  // 获取评论列表
  async getCommentList({commit,state},params){
    commit('comment/FETCH_COMMENT')
    const res = await service.getCommentList(params).catch(err => {
      console.log(err)
    })
    if (res && res.code == 200) {
      let list
      if (res.pagenation.current_page === 1) list = res.commentList
      else list = [...state.comment.comment.list, ...res.commentList]
      commit('comment/GET_COMMENT_SUCCESS', {
        list,
        pagenation: res.pagenation
      })
    }
  }
}
