const CollectionModel = require('../db/sql/collectionsql.js');
const checkNotLogin = require('../middlewears/check.js').checkNotLogin
const checkLogin = require('../middlewears/check.js').checkLogin

// 站点收藏页(判断登陆信息)
exports.getCollectionPage = async ctx => {
    await checkLogin(ctx)
    await ctx.render('collectionManage', {
        session: ctx.session,
    })
}

// 添加站点
exports.addCollection = async ctx => {
    let {siteName, siteDesc, siteUrl} = ctx.request.body,
        cdate = new Date().getTime()
    await CollectionModel.addCollection([siteName, siteDesc, siteUrl, cdate]).then( () => {
        ctx.body = {
            code: 200,
            message: '站点添加成功'
        }
    }).catch( () => {
        ctx.body = {
            code: 500,
            message: '站点添加失败'
        }
    })
}

// 编辑站点
exports.editCollection = async ctx => {
    let {siteName, siteDesc, siteUrl, id} = ctx.request.body
    await CollectionModel.editCollection([siteName, siteDesc, siteUrl, id]).then( () => {
        ctx.body = {
            code: 200,
            message: '站点编辑成功'
        }
    }).catch( () => {
        ctx.body = {
            code: 500,
            message: '站点编辑失败'
        }
    })
}
// 删除站点
exports.delCollection = async ctx => {
    let id = ctx.request.body.id
    await CollectionModel.delCollection(id).then( () => {
        ctx.body = {
            code: 200,
            message: '站点删除成功'
        }
    }).catch( () => {
        ctx.body = {
            code: 500,
            message: '站点删除失败'
        }
    })
}
// 获取标签列表
exports.getCollectionList = async ctx => {
    let {currentPage, limit} = ctx.request.body
    await CollectionModel.getCollectionList([(currentPage - 1) * limit, limit]).then( async (res) => {
        await CollectionModel.getCollectionNum().then(result => {
            ctx.body = {
                code: 200,
                CollectionList: res,
                total: result[0].total
            }
        }).catch( () => {
            ctx.body = {
                code: 500,
                message: '获取列表失败1'
            }
        })
    }).catch( () => {
        ctx.body = {
            code: 500,
            message: '获取列表失败2'
        }
    })
}
