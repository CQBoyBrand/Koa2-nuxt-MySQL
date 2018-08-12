const articleModel = require('../db/sql/articlesql');
const userModel = require('../db/sql/usersql');
const checkNotLogin = require('../middlewears/check.js').checkNotLogin
const checkLogin = require('../middlewears/check.js').checkLogin
const qnconfig = require('../middlewears/upload.js')


// 文章页(判断登陆信息)
exports.getArticlePage = async ctx => {
    await checkLogin(ctx)
    await ctx.render('articleManage', {
        session: ctx.session,
    })
}

// 上传图片鉴权
exports.uploadTolen = async ctx => {
    ctx.body = {
        code: 200,
        data: qnconfig.uploadToken
    }
}
//添加文章
exports.addArticle = async ctx => {
    let {title, abstract, thumbnail, md, publishDate, type, tagId} = ctx.request.body,
        // TODO
        uid = ctx.session.id || 7,
        author = '';
    await userModel.findDataById(7).then(async res => {
        author = res[0].nickName
        await articleModel.addArticle([author, title, type, tagId, abstract, thumbnail, md, uid, publishDate]).then(() => {
            ctx.body = {
                code: 200,
                message: '发表文章成功'
            }
        }).catch(() => {
            ctx.body = {
                code: 500,
                message: '发表文章失败'
            }
        })
    })
}
// 更改文章状态
exports.changeArticleStatus = async ctx => {
    let {status, id} = ctx.request.body
    await articleModel.updateArticleStatus([status, id]).then( () => {
        ctx.body = {
            code: 200,
            message: '状态更改成功'
        }
    }).catch( () => {
        ctx.body = {
            code: 500,
            message: '状态更改失败'
        }
    })
}

// 编辑文章
exports.editArticle = async ctx => {
    let {title,type , tagId , abstract ,thumbnail ,md, id} = ctx.request.body
    await articleModel.editArticle([title,type , tagId , abstract ,thumbnail ,md, id]).then( async () => {
        ctx.body = {
            code: 200,
            message: '文章编辑成功'
        }
    }).catch( () => {
        ctx.body = {
            code: 500,
            message: '文章编辑失败'
        }
    })
}
// 编辑文章获取详情
exports.editArticleDetail = async ctx => {
    let {id} = ctx.request.body
    await articleModel.editArticleDetail([id]).then( res => {
        ctx.body = {
            code: 200,
            articleDetail: res[0],
        }
    })
}
// 查询文章列表
exports.getArticleList = async ctx => {
    let {currentPage, limit} = ctx.request.body;
    await articleModel.getArticleList([(currentPage - 1) * limit, limit]).then(async res => {
        await articleModel.getArticleNum().then(result => {
            ctx.body = {
                code: 200,
                ArticleList: res,
                total: result[0].total
            }
        })

    })

}
// 获取写文章页面标签
exports.getTagList = async ctx => {
    await articleModel.getTagList().then((res) => {
        ctx.body = {
            code: 200,
            tagList: res
        }
    }).catch(() => {
        ctx.body = {
            code: 500,
            message: '发布文章获取标签失败'
        }
    })
}

