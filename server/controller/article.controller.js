/**
 * Author：brand
 * Creation Time：2019-03-10 20:26
 * Email：brandhuang@qq.com
 */
const Article = require('../model/article.model')
const {handleSuccess, handleError} = require("../middlewears/handle")
const request = require('request')
const config = require('../config/index')

const ArticleController = {
  /******************后台管理相关api******************************/
  // 添加文章
  addArticle: async ctx => {
    let {artTitle, abstract, category, tag, thumbnail, content,cdate} = ctx.request.body
    let id = new Date().getTime()
    await Article.addArt([artTitle, abstract, category, tag, thumbnail, content,cdate,id]).then( res => {
      if(res.affectedRows > 0){
        handleSuccess({ctx, result: '发布成功', message: '发布成功'})
        // 百度 seo push
        request.post({
          url: `http://data.zz.baidu.com/urls?site=${config.BAIDU.site}&token=${config.BAIDU.token}`,
          headers: { 'Content-Type': 'text/plain' },
          body: `${config.INFO.site}/article/${id}`
        }, (error, response, body) => {
          console.log('推送结果：', body)
        })
      }
    }).catch( err => {
      handleError({ctx, message: '添加文章出错',err})
    })
  },
  // 编辑文章
  editArticle: async ctx => {
    let {artTitle, abstract, category, tag, thumbnail, content, id} = ctx.request.body
    await Article.editArt([artTitle, abstract, category, tag, thumbnail, content, id]).then( res => {
      if(res.affectedRows > 0){
        handleSuccess({ctx, result: '修改成功', message: '修改成功'})
        // 百度推送
        request.post({
          url: `http://data.zz.baidu.com/update?site=${config.BAIDU.site}&token=${config.BAIDU.token}`,
          headers: { 'Content-Type': 'text/plain' },
          body: `${config.INFO.site}/article/${id}`
        }, (error, response, body) => {
          console.log('百度更新结果：', body);
        })
      }
    }).catch( err => {
      handleError({ctx, message: '修改文章出错',err})
    })
  },
  // 获取文章列表
  getArticleList: async ctx => {
    let {currentPage, limit} = ctx.request.body
    await Article.articleList([(currentPage - 1) * limit, limit]).then( res => {
       handleSuccess({ctx, result: res, message: '获取文章列表成功'})
    }).catch( err => {
      handleError({ctx, message: '获取文章列表出错',err})
    })
  },
  // 获取文章详情
  articleDetail: async ctx => {
    let {id} = ctx.request.body
    await Article.articleDetail([id]).then( res => {
        handleSuccess({ctx, result: res[0], message: '获取文章详情成功'})
    }).catch( err => {
      handleError({ctx, message: '获取文章详情出错',err})
    })
  },

  // 更改文章状态
  updateArtStatus: async ctx => {
    let {id, status} = ctx.request.body
    await Article.updateStatus([status, id]).then( res => {
      if(res.affectedRows > 0){
        handleSuccess({ctx, result: '修改文章状态成功', message: '修改文章状态成功'})
        // 百度推送
        request.post({
          url: `http://data.zz.baidu.com/del?site=${config.BAIDU.site}&token=${config.BAIDU.token}`,
          headers: { 'Content-Type': 'text/plain' },
          body: `${config.INFO.site}/article/${id}`
        }, (error, response, body) => {
          console.log('百度删除结果：', body);
        })
      }
    }).catch( err => {
      handleError({ctx, message: '修改文章状态出错',err})
    })
  },
  /**********************************前端相关api******************************************/
  getArticleListAll: async ctx => {
    let {currentPage, limit} = ctx.request.body
    await Article.getArtAllNum().then( async artNum => {
      await Article.getArtAll([(currentPage - 1) * limit, limit]).then( res => {
        let data = {
          data:res,
          total: artNum[0].total,
          currentPage: Number(currentPage),
          limit: Number(limit),
        }
        handleSuccess({ctx, result: data, message: '获取文章列表成功'})
      }).catch( err => {
        handleError({ctx, message: '获取文章列表出错',err})
      })
    }).catch(  err => {
      handleError({ctx, message: '获取文章数量出错',err})
    })

  },
  getArticleListByTag: async ctx => {
    let {currentPage, limit,tagname} = ctx.request.body
    await Article.getArtByTagName([tagname,(currentPage - 1) * limit, limit]).then( async res => {
      await Article.getArtNumByTagName([tagname]).then( async artNum => {
        let data = {
          data:res,
          total: artNum[0].total,
          currentPage: Number(currentPage),
          limit: Number(limit),
        }
        handleSuccess({ctx, result: data, message: '按标签获取文章成功'})
      }).catch( artErr => {
        handleError({ctx, message: '按标签获取文章数量出错',err})
      })

    }).catch( err => {
      handleError({ctx, message: '按标签获取文章出错',err})
    })
  },
  getArtByCategory: async ctx => {
    let {currentPage, limit,categoryname} = ctx.request.body
    await Article.getArtByCategory([categoryname,(currentPage - 1) * limit, limit]).then( async res => {
      await Article.getArtNumByCategory([categoryname]).then( async artNum => {
        let data = {
          data:res,
          total: artNum[0].total,
          currentPage: Number(currentPage),
          limit: Number(limit),
        }
        handleSuccess({ctx, result: data, message: '按分类获取文章成功'})
      }).catch( artErr => {
        handleError({ctx, message: '按分类获取文章数量出错',err})
      })

    }).catch( err => {
      handleError({ctx, message: '按分类获取文章出错',err})
    })
  },
  getArtByTitle: async ctx => {
    let {currentPage, limit,artTitle} = ctx.request.body
    await Article.getArtByTitle([artTitle,(currentPage - 1) * limit, limit]).then( async res => {
      await Article.getArtNumByTitle([artTitle]).then( async artNum => {
        let data = {
          data:res,
          total: artNum[0].total,
          currentPage: Number(currentPage),
          limit: Number(limit),
        }
        handleSuccess({ctx, result: data, message: '按搜索获取文章成功'})
      }).catch( artErr => {
        handleError({ctx, message: '按搜索获取文章数量出错',err})
      })

    }).catch( err => {
      handleError({ctx, message: '按分类获取文章出错',err})
    })
  },
  getArticleDetail: async ctx => {
    let {id} = ctx.request.body
      await Article.getArtDetail([id]).then( async res => {
        let pv = res[0].pv + 1
        res[0].pv = pv
        await Article.updateArtPv([pv,id]).then( updateres => {
          handleSuccess({ctx, result: res[0], message: '获取文章详情成功'})
        }).catch( updateErr => {
          handleError({ctx, message: '更新文章浏览数出错',err})
        })

      }).catch( err => {
        handleError({ctx, message: '获取文章详情出错',err})
      })
  },
  getArticleHot: async ctx => {
    await Article.getArtHot().then( async res => {
      handleSuccess({ctx, result: res, message: '获取热门文章成功'})
    }).catch( err => {
      handleError({ctx, message: '获取热门文章出错',err})
    })
  },
}

module.exports = ArticleController