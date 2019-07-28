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

const htmlparser = require('htmlparser2')

// XSS过滤
function XSSPrevent( str) {
  let commentTranseRes = ''
  let parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
      if(name === "script" || name === 'style' || name === "img" || name === 'frame' || name ==='iframe'){
        // alert('小朋友不乖哟，不要乱输入！')
      }
    },
    ontext: function(text){
      commentTranseRes +=text
    },
    onclosetag: function(tagname){
      if(tagname === "script" || tagname === "style" || tagname === "frame" || tagname === "iframe"){

      }
    }
  }, {decodeEntities: true})
  parser.write(str)
  parser.end()
  return commentTranseRes
}

// 时间戳转换

function timestampToTime (timestamp) {
  const dateObj = new Date(+timestamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
  const year = dateObj.getFullYear() // 获取年，
  const month = dateObj.getMonth() + 1 // 获取月，必须要加1，因为月份是从0开始计算的
  const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。
  const hours = pad(dateObj.getHours())  // 获取时, pad函数用来补0
  const minutes =  pad(dateObj.getMinutes()) // 获取分
  const seconds =  pad(dateObj.getSeconds()) // 获取秒
  return year + '/' + pad(month) + '/' + pad(date) + ' ' + hours + ':' + minutes + ':' + seconds
}

function pad(str) {
  return +str >= 10 ? str : '0' + str
}


let toc = require('markdown-it-toc')
// 表情
let emoji = require('markdown-it-emoji');
// 下标
let sub = require('markdown-it-sub')
// 上标
let sup = require('markdown-it-sup')
// <dl/>
let deflist = require('markdown-it-deflist')
// <abbr/>
let abbr = require('markdown-it-abbr')
// footnote
let footnote = require('markdown-it-footnote')
// insert 带有下划线 样式 ++ ++
let insert = require('markdown-it-ins')
// mark
let mark = require('markdown-it-mark')
// taskLists
let taskLists = require('markdown-it-task-lists')
let miip = require('markdown-it-images-preview');
let markdown_config = {
  html: true,        // Enable HTML tags in source
  xhtmlOut: true,        // Use '/' to close single tags (<br />).
  breaks: true,        // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
  linkify: false,        // 自动识别url
  typographer: true,
  quotes: '“”‘’',
}

let md = require('markdown-it')(markdown_config)
    .use(emoji)
    .use(taskLists)
    .use(sup)
    .use(sub)
    .use(deflist)
    .use(abbr)
    .use(footnote)
    .use(insert)
    .use(mark)
    .use(miip)
    .use(toc)


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
    await Comment.getCommentNumByArtId([XSSPrevent(artId)]).then( async commentNum => {
      let newDiscuss = commentNum[0].total + 1
      await Comment.addComment([XSSPrevent(artId), XSSPrevent(content), XSSPrevent(nickname), XSSPrevent(email), XSSPrevent(from_uavatar), XSSPrevent(webUrl), XSSPrevent(cdate)]).then(async res => {
        if (res.affectedRows > 0) {
          if(artId.toString().length >1) {
            await Comment.updateCommentNumByArtId([newDiscuss, XSSPrevent(artId)]).then( updateNum => {

              if (updateNum.affectedRows > 0) {
                handleSuccess({ctx, result: '添加评论成功', message: '添加评论成功'})
                var toURL = ctx.request.header.referer

                let renderComent = md.render(XSSPrevent(content))
                let times = timestampToTime(cdate)
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
                  text: `来自  ${nickname} 的评论：${renderComent}`, // 文本
                  // html: `<div> 来自${nickname} 的评论：${renderComent}</div><br><a href="${toURL}" target="_blank">[ 点击查看 ]</a>`
                  html: `<div style="border: 1px solid #eee;border-radius: 5px;width: 500px;font-size: 13px;color: #666">
                          <div style="text-align: center;padding: 10px 0;background-color: #1b1f23;color: #fff;">你的博客文章有了新的评论
                          </div>
                          <div style="padding: 20px;">
                              <div style="overflow: hidden;">
                                  <div style="float: left;height: 40px;line-height: 40px;color: #666;font-size: 12px;">
                                      <img src="${from_uavatar}" style="width: 40px;height:
                                   40px;border-radius: 50%;float: left;" alt="">
                                      <span style="display: inline-block;width: 100px;white-space: nowrap;overflow: hidden;text-overflow:
                                  ellipsis;padding-left: 10px">${nickname}
                                  </span>
                                  </div><div style="float: right;line-height: 40px;font-size: 12px;color: #666;">${times}</div>
                              </div>
                                <style>
                                    .comment img{
                                        width: 100%;
                                    }
                                </style>
                              <div class="comment" style="padding: 15px;box-sizing: border-box;margin-bottom: 10px;background-color: #eee;margin-top: 15px;">
                                  ${renderComent}
                              </div>
                              <div>
                                  <a href="${toURL}" target="_blank" style="padding: 8px;border-radius: 3px;background-color: #eee;color: #666;text-decoration:
                          none;cursor: pointer;display: inline-block;">
                                      去回复</a
                              </div>
                          </div>

                      </div>`
                };
                transporter.sendMail(mailOptionsToAuthor, function (err, info) {
                  if (err) {
                    console.log('发送邮件出错了')
                    return;
                  }
                  console.log('发送成功');
                });
              }else {
                handleError({ctx, message: '添加评论失败', err})
              }
            }).catch( err => {
              handleError({ctx, message: '更新文章评论数出错', err})
            })
          }else {
            handleSuccess({ctx, result: '留言成功', message: '留言成功'})
            var toURL = ctx.request.header.referer

            let renderComent = md.render(XSSPrevent(content))
            let times = timestampToTime(cdate)
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
              subject: '你的博客有新的留言了', // 标题
              text: `来自  ${nickname} 的留言：${renderComent}`, // 文本
              // html: `<div> 来自${nickname} 的评论：${renderComent}</div><br><a href="${toURL}" target="_blank">[ 点击查看 ]</a>`
              html: `<div style="border: 1px solid #eee;border-radius: 5px;width: 500px;font-size: 13px;color: #666">
                          <div style="text-align: center;padding: 10px 0;background-color: #1b1f23;color: #fff;">你的博客有了新的留言
                          </div>
                          <div style="padding: 20px;">
                              <div style="overflow: hidden;">
                                  <div style="float: left;height: 40px;line-height: 40px;color: #666;font-size: 12px;">
                                      <img src="${from_uavatar}" style="width: 40px;height:
                                   40px;border-radius: 50%;float: left;" alt="">
                                      <span style="display: inline-block;width: 100px;white-space: nowrap;overflow: hidden;text-overflow:
                                  ellipsis;padding-left: 10px">${nickname}
                                  </span>
                                  </div><div style="float: right;line-height: 40px;font-size: 12px;color: #666;">${times}</div>
                              </div>
                                <style>
                                    .comment img{
                                        width: 100%;
                                    }
                                </style>
                              <div class="comment" style="padding: 15px;box-sizing: border-box;margin-bottom: 10px;background-color: #eee;margin-top: 15px;">
                                  ${renderComent}
                              </div>
                              <div>
                                  <a href="${toURL}" target="_blank" style="padding: 8px;border-radius: 3px;background-color: #eee;color: #666;text-decoration:
                          none;cursor: pointer;display: inline-block;">
                                      去回复</a
                              </div>
                          </div>

                      </div>`
            };
            transporter.sendMail(mailOptionsToAuthor, function (err, info) {
              if (err) {
                console.log('发送邮件出错了')
                return;
              }
              console.log('发送成功');
            });
          }


        }
      }).catch(err => {
        handleError({ctx, message: '添加评论失败', err})
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
    await Comment.getCommentNumByArtId([XSSPrevent(artId)]).then( async commentNum => {
      let newDiscuss = commentNum[0].total + 1
      await Comment.addReplyComment([XSSPrevent(artId), XSSPrevent(content), XSSPrevent(nickname), XSSPrevent(email), XSSPrevent(from_uavatar), XSSPrevent(webUrl),XSSPrevent(oldContent),XSSPrevent(touname),XSSPrevent(touemail),XSSPrevent(touavatar), XSSPrevent(touweb),XSSPrevent(cdate),XSSPrevent(oldCdate)]).then(async res => {
        if (res.affectedRows > 0) {
          if(artId.toString().length > 1){
          await Comment.updateCommentNumByArtId([newDiscuss, artId]).then( updateNum => {
            if (updateNum.affectedRows > 0) {
              handleSuccess({ctx, result: '添加评论成功', message: '添加评论成功'})

              var toURL = ctx.request.header.referer
              let renderComent = md.render(XSSPrevent(content))
              let times = timestampToTime(cdate)
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
                text: `来自  ${nickname} 的评论：${renderComent}`, // 文本
                html: `<div style="border: 1px solid #eee;border-radius: 5px;width: 500px;font-size: 13px;color: #666">
                          <div style="text-align: center;padding: 10px 0;background-color: #1b1f23;color: #fff;">你的博客文章评论有了新的回复
                          </div>
                          <div style="padding: 20px;">
                              <div style="overflow: hidden;">
                                  <div style="float: left;height: 40px;line-height: 40px;color: #666;font-size: 12px;">
                                      <img src="${from_uavatar}" style="width: 40px;height:
                                   40px;border-radius: 50%;float: left;" alt="">
                                      <span style="display: inline-block;width: 100px;white-space: nowrap;overflow: hidden;text-overflow:
                                  ellipsis;padding-left: 10px">${nickname}
                                  </span>
                                  </div><div style="float: right;line-height: 40px;font-size: 12px;color: #666;">${times}</div>
                              </div>
                              <style>
                                    .comment img{
                                        width: 100%;
                                    }
                                </style>
                              <div class="comment" style="padding: 15px;box-sizing: border-box;margin-bottom: 10px;background-color: #eee;margin-top: 15px;">
                                  ${renderComent}
                              </div>
                              <div>
                                  <a href="${toURL}" target="_blank" style="padding: 8px;border-radius: 3px;background-color: #eee;color: #666;text-decoration:
                          none;cursor: pointer;display: inline-block;">
                                      去回复</a
                              </div>
                          </div>
                      
                      </div>`
              };
              var mailOptionsToCommentor = {
                from: '重庆崽儿Brand<hellobugworld@qq.com>', // 发送者
                to: `${touemail}`, // 接受者,可以同时发送多个,以逗号隔开
                subject: '你好,你在重庆崽儿Brand的博客有新的评论回复,点击查看吧', // 标题
                text: `来自 ${nickname} 的评论回复：${renderComent}`, // 文本
                // html: `<p> 来自${nickname} 的评论回复：${renderComent}</p><br><a href="${toURL}" target="_blank">[ 点击查看 ]</a>`
                html: `<div style="border: 1px solid #eee;border-radius: 5px;width: 500px;font-size: 13px;color: #666">
                          <div style="text-align: center;padding: 10px 0;background-color: #1b1f23;color: #fff;">你在<a target="_blank" href="http://www.brandhuang.com"
                                                                                                          style="padding: 0 6px;color: #409EFF;text-decoration:
                          none;cursor: pointer;">
                              重庆崽儿Brand</a>博客的评论有了新的回复
                          </div>
                          <div style="padding: 20px;">
                              <div style="overflow: hidden;">
                                  <div style="float: left;height: 40px;line-height: 40px;color: #666;font-size: 12px;">
                                      <img src="${from_uavatar}" style="width: 40px;height:
                                   40px;border-radius: 50%;float: left;" alt="">
                                      <span style="display: inline-block;width: 100px;white-space: nowrap;overflow: hidden;text-overflow:
                                  ellipsis;padding-left: 10px">${nickname}
                                  </span>
                                  </div><div style="float: right;line-height: 40px;font-size: 12px;color: #666;">${times}</div>
                              </div>
                              <style>
                                    .comment img{
                                        width: 100%;
                                    }
                                </style>
                              <div class="comment" style="padding: 15px;box-sizing: border-box;margin-bottom: 10px;background-color: #eee;margin-top: 15px;">
                                  ${renderComent}
                              </div>
                              <div>
                                  <a href="${toURL}" target="_blank" style="padding: 8px;border-radius: 3px;background-color: #eee;color: #666;text-decoration:
                          none;cursor: pointer;display: inline-block;">
                                      去回复</a>
                                  <div style="padding: 15px 0 10px 0;color: #999;font-size: 12px;">感谢你对 <a target="_blank" href="http://www.brandhuang.com"
                                                                                                           style="color: #409EFF;text-decoration:
                          none;cursor: pointer;">重庆崽儿Brand
                                  </a>的关注，如有疑问，请前往博客留言，我会尽快回复。
                                  </div>
                                  <div style="padding: 10px 0 0 0;color: #999;font-size: 12px;">(此邮件由系统自动发送，请勿直接回复！)</div>
                              </div>
                          </div>
                      
                      </div>`
              };
              if(touemail == null || touemail == ""){
                transporter.sendMail(mailOptionsToAuthor, function (err, info) {
                  if (err) {
                    console.log('发送邮件出错了')
                    return;
                  }
                  console.log('发送成功');
                });
              }else {
                transporter.sendMail(mailOptionsToCommentor, function (err, info) {
                  if (err) {
                    console.log('发送邮件出错了')
                    return;
                  }
                  console.log('发送成功');
                });
              }


            }
          }).catch( err => {
            handleError({ctx, message: '更新文章评论数出错', err})
          })
          }else {
            handleSuccess({ctx, result: '留言成功', message: '留言成功'})
              var toURL = ctx.request.header.referer
              let renderComent = md.render(XSSPrevent(content))
              let times = timestampToTime(cdate)
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
                  text: `来自  ${nickname} 的评论：${renderComent}`, // 文本
                  html: `<div style="border: 1px solid #eee;border-radius: 5px;width: 500px;font-size: 13px;color: #666">
                          <div style="text-align: center;padding: 10px 0;background-color: #1b1f23;color: #fff;">你的博客文章评论有了新的回复
                          </div>
                          <div style="padding: 20px;">
                              <div style="overflow: hidden;">
                                  <div style="float: left;height: 40px;line-height: 40px;color: #666;font-size: 12px;">
                                      <img src="${from_uavatar}" style="width: 40px;height:
                                   40px;border-radius: 50%;float: left;" alt="">
                                      <span style="display: inline-block;width: 100px;white-space: nowrap;overflow: hidden;text-overflow:
                                  ellipsis;padding-left: 10px">${nickname}
                                  </span>
                                  </div><div style="float: right;line-height: 40px;font-size: 12px;color: #666;">${times}</div>
                              </div>
                              <style>
                                    .comment img{
                                        width: 100%;
                                    }
                                </style>
                              <div class="comment" style="padding: 15px;box-sizing: border-box;margin-bottom: 10px;background-color: #eee;margin-top: 15px;">
                                  ${renderComent}
                              </div>
                              <div>
                                  <a href="${toURL}" target="_blank" style="padding: 8px;border-radius: 3px;background-color: #eee;color: #666;text-decoration:
                          none;cursor: pointer;display: inline-block;">
                                      去回复</a
                              </div>
                          </div>
                      
                      </div>`
              };
              var mailOptionsToCommentor = {
                  from: '重庆崽儿Brand<hellobugworld@qq.com>', // 发送者
                  to: `${touemail}`, // 接受者,可以同时发送多个,以逗号隔开
                  subject: '你好,你在重庆崽儿Brand的博客有新的评论回复,点击查看吧', // 标题
                  text: `来自 ${nickname} 的评论回复：${renderComent}`, // 文本
                  // html: `<p> 来自${nickname} 的评论回复：${renderComent}</p><br><a href="${toURL}" target="_blank">[ 点击查看 ]</a>`
                  html: `<div style="border: 1px solid #eee;border-radius: 5px;width: 500px;font-size: 13px;color: #666">
                          <div style="text-align: center;padding: 10px 0;background-color: #1b1f23;color: #fff;">你在<a target="_blank" href="http://www.brandhuang.com"
                                                                                                          style="padding: 0 6px;color: #409EFF;text-decoration:
                          none;cursor: pointer;">
                              重庆崽儿Brand</a>博客的评论有了新的回复
                          </div>
                          <div style="padding: 20px;">
                              <div style="overflow: hidden;">
                                  <div style="float: left;height: 40px;line-height: 40px;color: #666;font-size: 12px;">
                                      <img src="${from_uavatar}" style="width: 40px;height:
                                   40px;border-radius: 50%;float: left;" alt="">
                                      <span style="display: inline-block;width: 100px;white-space: nowrap;overflow: hidden;text-overflow:
                                  ellipsis;padding-left: 10px">${nickname}
                                  </span>
                                  </div><div style="float: right;line-height: 40px;font-size: 12px;color: #666;">${times}</div>
                              </div>
                              <style>
                                    .comment img{
                                        width: 100%;
                                    }
                                </style>
                              <div class="comment" style="padding: 15px;box-sizing: border-box;margin-bottom: 10px;background-color: #eee;margin-top: 15px;">
                                  ${renderComent}
                              </div>
                              <div>
                                  <a href="${toURL}" target="_blank" style="padding: 8px;border-radius: 3px;background-color: #eee;color: #666;text-decoration:
                          none;cursor: pointer;display: inline-block;">
                                      去回复</a>
                                  <div style="padding: 15px 0 10px 0;color: #999;font-size: 12px;">感谢你对 <a target="_blank" href="http://www.brandhuang.com"
                                                                                                           style="color: #409EFF;text-decoration:
                          none;cursor: pointer;">重庆崽儿Brand
                                  </a>的关注，如有疑问，请前往博客留言，我会尽快回复。
                                  </div>
                                  <div style="padding: 10px 0 0 0;color: #999;font-size: 12px;">(此邮件由系统自动发送，请勿直接回复！)</div>
                              </div>
                          </div>
                      
                      </div>`
              };
              if(touemail == null || touemail == ""){
                  transporter.sendMail(mailOptionsToAuthor, function (err, info) {
                      if (err) {
                          console.log('发送邮件出错了')
                          return;
                      }
                      console.log('发送成功');
                  });
              }else {
                  transporter.sendMail(mailOptionsToCommentor, function (err, info) {
                      if (err) {
                          console.log('发送邮件出错了')
                          return;
                      }
                      console.log('发送成功');
                  });
              }
          }
        }
      }).catch(err => {
        handleError({ctx, message: '添加评论成功', err})
      })
    }).catch( commentErr => {
      handleError({ctx, message: '', commentErr})
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