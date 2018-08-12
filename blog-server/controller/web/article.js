const articleModel = require('../../db/sql/web/articlesql');
const tagAdminModel = require('../../db/sql/tagsql')


// 获取文章列表
exports.getArticleListByType = async ctx => {
    let {type, currentPage, limit} = ctx.request.body
    await articleModel.getArticleNumByType(type).then(async result => {
        let pagenations = {};
        pagenations.totalPage = Math.ceil(result[0].total / limit)
        pagenations.current_page = currentPage
        await articleModel.getArticleList([type, (currentPage - 1) * limit, limit]).then(async res => {
            res.map((item, i) => {
                let tagArr = []
                let tagInfo = item.tagName.split(',')
                tagInfo.map((list, index) => {
                    let id = list.split(':')[0]
                    let name = list.split(':')[1]
                    let tagObj = {}
                    tagObj.id = id
                    tagObj.name = name
                    tagArr.push(tagObj)
                })
                item.tagList = tagArr;
            })
            ctx.body = {
                code: 200,
                articleList: res,
                pagenation: pagenations
            }
        })
    })

}

// 获取文章列表(通过标签id)
exports.getArtListByTagId = async ctx => {
    let {id, currentPage, limit} = ctx.request.body
    let artTagId = id;
    await articleModel.getArticleNumByTagId(id).then(async result => {
        let pagenations = {};
        pagenations.totalPage = Math.ceil(result[0].total / limit)
        pagenations.current_page = currentPage
        await articleModel.getArticleListByTagId([id,artTagId,(currentPage - 1) * limit, limit]).then(async res => {
            res.map((item, i) => {
                let tagArr = []
                let tagInfo = item.tagName.split(',')
                tagInfo.map((list, index) => {
                    let id = list.split(':')[0]
                    let name = list.split(':')[1]
                    let tagObj = {}
                    tagObj.id = id
                    tagObj.name = name
                    tagArr.push(tagObj)
                })
                item.tagList = tagArr;
            })
            ctx.body = {
                code: 200,
                articleList: res,
                pagenation: pagenations
            }
        })
    })

}

// 文章详情
exports.getArtDetail = async ctx => {
    let {id} = ctx.request.body
    await articleModel.getArticleDetail([id]).then(async result => {
       if(result.length> 0){
           let PV = result[0].pv;
           let num = PV + 1;
           result[0].pv = num ;
           await articleModel.updateArtPV([num,id]).then( () => {
               ctx.body = {
                   code: 200,
                   artDetail: result[0],
               }
           });
       }
        /*ctx.body = {
            code: 200,
            artDetail: result[0],
        }*/
    })

}

// 获取热门文章
exports.getHotArt = async ctx => {
    await articleModel.getHotArt().then( res => {
        ctx.body = {
            code: 200,
            hotArt: res
        }
    })
}

// 文章归档
exports.getArticleListByDate = async ctx => {
    let {currentPage, limit} = ctx.request.body
    await articleModel.getArticleNum().then(async result => {
        let pagenations = {};
        pagenations.totalPage = Math.ceil(result[0].total / limit)
        pagenations.current_page = currentPage
        await articleModel.getArticleByDate([(currentPage - 1) * limit, limit]).then(async res => {
            /*var map = {},
                dest = [];
            for (var i = 0; i < res.length; i++) {
                var ai = res[i];
                if (!map[ai.year]) {
                    dest.push({
                        year: ai.year,
                        list: [ai]
                    });
                    map[ai.year] = ai;
                } else {
                    for (var j = 0; j < dest.length; j++) {
                        var dj = dest[j];
                        if (dj.year == ai.year) {
                            dj.list.push(ai);
                            break;
                        }
                    }
                }
            }*/
            ctx.body = {
                code: 200,
                archive: res,
                pagenation: pagenations
            }
        })
    })

}
