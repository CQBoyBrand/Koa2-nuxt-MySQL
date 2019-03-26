/**
 * Author：brand
 * Creation Time：2019-03-10 20:24
 * Email：brandhuang@qq.com
 */
const Tag = require('../model/tag.model')
const {handleSuccess, handleError} = require("../middlewears/handle")

const TagController = {
  // 添加标签
  addTag: async ctx => {
    let {tagname, tagdesc} = ctx.request.body
    let cdate = new Date().getTime()
    await Tag.addTag([tagname, tagdesc, cdate]).then(res => {
      if (res.affectedRows > 0) {
        handleSuccess({ctx, result: '新增标签成功', message: '新增标签成功'})
      }
    }).catch(err => {
      handleError({ctx, message: '新增标签失败', err})
    })
  },
  // 获取标签列表
  getTag: async ctx => {
    let {currentPage, limit} = ctx.request.body
    await Tag.getTag([(currentPage - 1) * limit, limit]).then(res => {
      handleSuccess({ctx, result: res, message: '获取标签成功'})

    }).catch(err => {
      handleError({ctx, message: '获取标签失败', err})
    })
  },
  // 获取所有
  getAllTag: async ctx => {
    await Tag.getAllTag().then(res => {
      handleSuccess({ctx, result: res, message: '获取标签成功'})
    }).catch(err => {
      handleError({ctx, message: '获取标签失败', err})
    })
  },
  // 编辑标签
  editTag: async ctx => {
    let {id, tagname, tagdesc} = ctx.request.body
    await Tag.editTag([tagname, tagdesc, id]).then(res => {
      if (res.affectedRows > 0) {
        handleSuccess({ctx, result: '编辑标签成功', message: '编辑标签成功'})
      }
    }).catch(err => {
      handleError({ctx, message: '编辑标签失败', err})
    })
  },
  /*************前端相关*************/
  getFontTagList: async ctx => {
    await Tag.getFontTagList().then(res => {
        handleSuccess({ctx, result: res, message: '获取标签成功'})
    }).catch(err => {
      handleError({ctx, message: '获取标签失败', err})
    })
  }
}

module.exports = TagController