/**
 * Author：brand
 * Creation Time：2019-03-10 20:27
 * Email：brandhuang@qq.com
 */
const Link = require('../model/link.model')
const {handleSuccess, handleError} = require("../middlewears/handle")

const LinkController = {
  // 增加友链
  addLink: async ctx => {
    let {siteName,siteUrl} = ctx.request.body
    let cdate = new Date().getTime()
    await Link.addLink([siteName,siteUrl,cdate]).then( res => {
      if (res.affectedRows > 0) {
        handleSuccess({ctx, result: '添加友链成功', message: '添加友链成功'})
      }
    }).catch( err => {
      handleError({ctx, message: '添加友链失败', err})
    })


  },
  // 编辑友链
  editLink: async ctx => {
    let {id, siteName, siteUrl} = ctx.request.body
    await Link.editLink([siteName,siteUrl,id]).then( res => {
      if (res.affectedRows > 0) {
        handleSuccess({ctx, result: '编辑友链成功', message: '编辑友链成功'})
      }
    }).catch( err => {
      handleError({ctx, message: '编辑友链失败', err})
    })
  },
  // 获取友链列表
  getLink: async ctx => {
    let {currentPage, limit} = ctx.request.body
    await Link.getlink([(currentPage - 1)*limit, limit]).then( res => {
        handleSuccess({ctx, result: res, message: '获取友链成功'})
    }).catch( err => {
      handleError({ctx, message: '获取友链失败', err})
    })
  },
  // 获取友链列表
  getlinkList: async ctx => {
    await Link.getlinkList().then( res => {
      console.log('link=',res)
        handleSuccess({ctx, result: res, message: '获取友链成功'})
    }).catch( err => {
      handleError({ctx, message: '获取友链失败', err})
    })
  },
  // 改变友链状态
  updateLinkStatus: async ctx => {
    let {id, status} = ctx.request.body
    await Link.updateLinkStatus([status, id]).then( res => {
      if (res.affectedRows > 0) {
        handleSuccess({ctx, result: '删除友链成功', message: '删除友链成功'})
      }
    }).catch( err => {
      handleError({ctx, message: '删除友链失败', err})
    })
  },
}

module.exports = LinkController