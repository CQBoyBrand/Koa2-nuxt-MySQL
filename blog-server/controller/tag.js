const tagModel = require('../db/sql/tagsql.js');
const checkNotLogin = require('../middlewears/check.js').checkNotLogin
const checkLogin = require('../middlewears/check.js').checkLogin

// 标签页(判断登陆信息)
exports.getTagPage = async ctx => {
    await checkLogin(ctx)
    await ctx.render('tagManage', {
        session: ctx.session,
    })
}

// 添加标签
exports.addTag = async ctx => {
    let {tagName, tagDesc} = ctx.request.body,
        cdate = new Date().getTime();
    await tagModel.findTagByName(tagName).then( async res => {
        if(res.length){
            try {
                throw Error('标签已经存在')
            } catch (error) {
                //处理err
                console.log(error)
            }
            // 用户存在
            ctx.body = {
                code: 500,
                message: '标签已经存在'
            };;
        }else {
            await tagModel.addTag([tagName, tagDesc, cdate]).then( () => {
                ctx.body = {
                    code: 200,
                    message: '标签添加成功'
                }
            }).catch( () => {
                ctx.body = {
                    code: 500,
                    message: '标签添加失败'
                }
            })
        }
    })

}

// 编辑标签
exports.editTag = async ctx => {
    let {tagName, tagDesc, id} = ctx.request.body
    await tagModel.editTag([tagName, tagDesc, id]).then( () => {
        ctx.body = {
            code: 200,
            message: '标签编辑成功'
        }
    }).catch( () => {
        ctx.body = {
            code: 500,
            message: '标签编辑失败'
        }
    })
}
// 删除标签
exports.delTag = async ctx => {
    let id = ctx.request.body.id
    await tagModel.delTag(id).then( () => {
        ctx.body = {
            code: 200,
            message: '标签删除成功'
        }
    }).catch( () => {
        ctx.body = {
            code: 500,
            message: '标签删除失败'
        }
    })
}
// 获取标签列表
exports.getTagList = async ctx => {
    let {currentPage, limit} = ctx.request.body
    await tagModel.getTagList([(currentPage - 1) * limit, limit]).then( async (res) => {
        await tagModel.getTagNum().then(result => {
            ctx.body = {
                code: 200,
                tagList: res,
                total: result[0].total
            }
        }).catch( () => {
            ctx.body = {
                code: 500,
                message: '获取列表失败'
            }
        })
    }).catch( () => {
        ctx.body = {
            code: 500,
            message: '获取列表失败'
        }
    })
}
