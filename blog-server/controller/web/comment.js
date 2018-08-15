const commentModel = require('../../db/sql/web/comment');
var nodemailer = require('nodemailer');//发送邮件

// 添加评论
exports.addNewComment = async ctx => {
    let {nickName, content,oldContent,toWebUrl, articleId, email, toEmail, toNickName, webUrl} = ctx.request.body
    let cdate = new Date().getTime()
    await commentModel.addComment([nickName, content,oldContent,toWebUrl, cdate, articleId, email, toEmail, toNickName, webUrl]).then(async result => {
        ctx.body = {
            code: 200,
            message: "评论成功！"
        }
        var toURL = 'http://www.brandhuang.com/article/'+articleId

        //有评论回复时邮件提醒
        var transporter = nodemailer.createTransport({
            host: 'smtp.qq.com',
            secure: true,
            port:'465',
            auth: {
                user: 'hellobugworld@qq.com',
                pass: '' //授权码,通过QQ获取
            }
        });
        var mailOptionsToAuthor = {
            from: '重庆崽儿Brand <hellobugworld@qq.com>', // 发送者
            to: 'brandhuang@qq.com', // 接受者,可以同时发送多个,以逗号隔开
            subject: '你的博客有新的评论了', // 标题
            text: `来自  ${nickName} 的评论：${content}`, // 文本
            html: `<p> 来自${nickName} 的评论：${content}</p><br><a href="${toURL}" target="_blank">[ 点击查看 ]</a>`
        };
        var mailOptionsToCommentor = {
            from: '重庆崽儿Brand<hellobugworld@qq.com>', // 发送者
            to: `${toEmail}`, // 接受者,可以同时发送多个,以逗号隔开
            subject: 'hello,你在重庆崽儿Brand的博客有新的评论回复,点击查看吧', // 标题
            text: `来自 ${nickName} 的评论回复：${content}`, // 文本
            html: `<p> 来自${nickName} 的评论回复：${content}</p><br><a href="${toURL}" target="_blank">[ 点击查看 ]</a>`
        };
        if(toEmail == null || toEmail == ""){
            transporter.sendMail(mailOptionsToAuthor, function (err, info) {
                if (err) {
                    return;
                }
                console.log('发送成功');
            });
        }else {
            transporter.sendMail(mailOptionsToCommentor, function (err, info) {
                if (err) {
                    return;
                }
                console.log('发送成功');
            });
        }
    }).catch( err => {
        console.log(err)
        ctx.body = {
            code: 500,
            message: "评论失败！"
        }
    })
}
// 获取评论列表
exports.getCommentList = async ctx => {
    let {articleId, currentPage,limit} = ctx.request.body
    await commentModel.getCommentsNumByArtId(articleId).then(async res => {
        let pagenations = {};
        pagenations.totalPage = Math.ceil(res[0].total / limit)
        pagenations.totalNum = res[0].total
        pagenations.current_page = currentPage
        await commentModel.getCommentList([articleId, (currentPage - 1)*limit,limit]).then(async result => {
            ctx.body = {
                code: 200,
                commentList: result,
                pagenation: pagenations
            }
        }).catch( () => {
            ctx.body = {
                code: 500,
                message: "获取评论列表失败！"
            }
        })
    })

}
