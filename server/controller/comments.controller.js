/**
 * Author：brand
 * Creation Time：2019-03-10 20:26
 * Email：brandhuang@qq.com
 */
const Comment = require('../model/comment.model')
const config = require('../config/index');
const md5 = require('md5')
const nodemailer = require('nodemailer');//发送邮件
const {handleSuccess, handleError} = require("../middlewears/handle")

const CommentControllers = {
// 添加评论
  addComment: async ctx => {
    let {artId, content, nickname, email, webUrl} = ctx.request.body
    let cdate = new Date().getTime()
    let from_uavatar = setAvatar()
    function setAvatar() {
      var url = 'https://www.gravatar.com/avatar/';
       url += md5(email).toLowerCase()
       url += '?s=80&r=g'
      return url
    }
    await Comment.getCommentNumByArtId([artId]).then( async commentNum => {
      let newDiscuss = commentNum[0].total + 1
      await Comment.addComment([artId, content, nickname, email, from_uavatar, webUrl, cdate]).then(async res => {
        if (res.affectedRows > 0) {
          await Comment.updateCommentNumByArtId([newDiscuss, artId]).then( updateNum => {
            if (updateNum.affectedRows > 0) {
              handleSuccess({ctx, result: '添加评论成功', message: '添加评论成功'})
              var toURL = ctx.request.header.referer

              //有评论回复时邮件提醒
              var transporter = nodemailer.createTransport({
                host: 'smtp.qq.com',
                secure: true,
                port:'465',
                auth: {
                  user: config.EMAIL.account,
                  pass: config.EMAIL.password //授权码,通过QQ获取
                }
              });
              var mailOptionsToAuthor = {
                from: '重庆崽儿Brand <hellobugworld@qq.com>', // 发送者
                to: 'brandhuang@qq.com', // 接受者,可以同时发送多个,以逗号隔开
                subject: '你的博客有新的评论了', // 标题
                text: `来自  ${nickname} 的评论：${content}`, // 文本
                html: `<p> 来自${nickname} 的评论：${content}</p><br><a href="${toURL}" target="_blank">[ 点击查看 ]</a>`
              };
              transporter.sendMail(mailOptionsToAuthor, function (err, info) {
                if (err) {
                  console.log('发送邮件出错了')
                  return;
                }
                console.log('发送成功');
              });
            }
          }).catch( err => {
            handleError({ctx, message: '更新文章评论数出错', err})
          })

        }
      }).catch(err => {
        handleError({ctx, message: '添加评论成功', err})
      })
    }).catch( commentErr => {
      handleError({ctx, message: '', err})
    })

  },
// 添加回复
  addReplyComment: async ctx => {
    let {artId, content, nickname, email, webUrl,oldContent,touemail,touweb,touname,touavatar,oldCdate} = ctx.request.body

    let cdate = new Date().getTime()
    let from_uavatar = setAvatar()
    function setAvatar() {
      var url = 'https://www.gravatar.com/avatar/';
       url += md5(email).toLowerCase()
       url += '?s=80&r=g'
      return url
    }
    await Comment.getCommentNumByArtId([artId]).then( async commentNum => {
      let newDiscuss = commentNum[0].total + 1
      await Comment.addReplyComment([artId, content, nickname, email, from_uavatar, webUrl,oldContent,touname,touemail,touavatar, touweb,cdate,oldCdate]).then(async res => {
        if (res.affectedRows > 0) {
          await Comment.updateCommentNumByArtId([newDiscuss, artId]).then( updateNum => {
            if (updateNum.affectedRows > 0) {
              handleSuccess({ctx, result: '添加评论成功', message: '添加评论成功'})

              var toURL = ctx.request.header.referer

              //有评论回复时邮件提醒
              var transporter = nodemailer.createTransport({
                host: 'smtp.qq.com',
                secure: true,
                port:'465',
                auth: {
                  user: config.EMAIL.account,
                  pass: config.EMAIL.password //授权码,通过QQ获取
                }
              });
              var mailOptionsToAuthor = {
                from: '重庆崽儿Brand <hellobugworld@qq.com>', // 发送者
                to: 'brandhuang@qq.com', // 接受者,可以同时发送多个,以逗号隔开
                subject: '你的博客有新的评论了', // 标题
                text: `来自  ${nickname} 的评论：${content}`, // 文本
                html: `<p> 来自${nickname} 的评论：${content}</p><br><a href="${toURL}" target="_blank">[ 点击查看 ]</a>`
              };
              var mailOptionsToCommentor = {
                from: '重庆崽儿Brand<hellobugworld@qq.com>', // 发送者
                to: `${touemail}`, // 接受者,可以同时发送多个,以逗号隔开
                subject: 'hello,你在重庆崽儿Brand的博客有新的评论回复,点击查看吧', // 标题
                text: `来自 ${nickname} 的评论回复：${content}`, // 文本
                html: `<p> 来自${nickname} 的评论回复：${content}</p><br><a href="${toURL}" target="_blank">[ 点击查看 ]</a>`
              };
              if(touemail == null || touemail == ""){
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


            }
          }).catch( err => {
            handleError({ctx, message: '更新文章评论数出错', err})
          })

        }
      }).catch(err => {
        handleError({ctx, message: '添加评论成功', err})
      })
    }).catch( commentErr => {
      handleError({ctx, message: '', err})
    })

  },
// 获取评论
  getComment: async ctx => {
    let {artId, currentPage, limit} = ctx.request.body
    await Comment.getCommentNumByArtId([artId]).then( async commentNum => {
      await Comment.getComment([artId, (currentPage - 1)*limit,limit]).then(res => {
        let data = {
          total: Number(commentNum[0].total),
          result: res,
          currentPage: Number(currentPage),
          limit: Number(limit),
        }
        handleSuccess({ctx, result: data, message: '查询评论成功'})
      }).catch(err => {
        handleError({ctx, message: '查询评论成功', err})
      })
    }).catch( commenterr => {
      handleError({ctx, message: '查询评论数量出错', commenterr})
    })

  },
}

module.exports = CommentControllers