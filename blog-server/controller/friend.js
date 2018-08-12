const friendModel = require('../db/sql/friendsql.js');
const checkNotLogin = require('../middlewears/check.js').checkNotLogin
const checkLogin = require('../middlewears/check.js').checkLogin

// 站点收藏页(判断登陆信息)
exports.getFriendPage = async ctx => {
    await checkLogin(ctx)
    await ctx.render('collectionManage', {
        session: ctx.session,
    })
}

// 添加站点
exports.addFriend = async ctx => {
    let {siteName, siteDesc,siteAvatar, siteUrl} = ctx.request.body,
        cdate = new Date().getTime()
    await friendModel.addFriend([siteName, siteDesc,siteAvatar,siteUrl, cdate]).then( () => {
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
exports.editFriend = async ctx => {
    let {siteName, siteDesc,siteAvatar, siteUrl, id} = ctx.request.body
    await friendModel.editFriend([siteName, siteDesc,siteAvatar, siteUrl, id]).then( () => {
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
exports.delFriend = async ctx => {
    let id = ctx.request.body.id
    await friendModel.delFriend(id).then( () => {
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
exports.getFriendList = async ctx => {
    let {currentPage, limit} = ctx.request.body
    await friendModel.getFriendList([(currentPage - 1) * limit, limit]).then( async (res) => {
        await friendModel.getFriendNum().then(result => {
            ctx.body = {
                code: 200,
                FriendList: res,
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
