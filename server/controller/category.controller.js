/**
 * Author：brand
 * Creation Time：2019-03-10 20:24
 * Email：brandhuang@qq.com
 */
const Category = require('../model/category.model')
const {handleSuccess, handleError} = require("../middlewears/handle")

const CategoryController = {
  // 添加分类
  addCategory: async ctx => {
    let {categoryname,categorydesc} = ctx.request.body
    let cdate = new Date().getTime()
    await Category.addCategory([categoryname, categorydesc, cdate]).then( res => {
      if(res.affectedRows > 0){
        handleSuccess({ctx, result: '新增分类成功', message: '新增分类成功'})
      }
    }).catch( err => {
      handleError({ctx, message: '新增分类失败', err})
    })
  },
  // 获取分类列表
  getCategory: async ctx => {
    let {currentPage, limit} = ctx.request.body
    await Category.getCategory([(currentPage - 1)*limit,limit]).then( res => {
        handleSuccess({ctx, result: res, message: '获取分类成功'})

    }).catch( err => {
      handleError({ctx, message: '获取分类失败', err})
    })
  },
  // 获取分类列表(所有)
  getAllCategory: async ctx => {
    await Category.getAllCategory().then( res => {
      handleSuccess({ctx, result: res, message: '获取分类成功'})

    }).catch( err => {
      handleError({ctx, message: '获取分类失败', err})
    })
  },
  // 编辑分类
  editCategory: async ctx => {
    let {id, categoryname, categorydesc} = ctx.request.body
    await Category.editCategory([categoryname, categorydesc, id]).then( res => {
      if(res.affectedRows > 0){
        handleSuccess({ctx, result: '编辑分类成功', message: '编辑分类成功'})
      }
    }).catch( err => {
      handleError({ctx, message: '编辑分类失败', err})
    })
  },

  /***********前端相关*****/
  getFontCategoryList: async ctx => {
    await Category.getFontCategoryList().then( res => {
        handleSuccess({ctx, result: res, message: '获取分类成功'})
    }).catch( err => {
      handleError({ctx, message: '获取分类失败', err})
    })
  }
}

module.exports = CategoryController