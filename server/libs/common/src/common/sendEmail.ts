/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/21 22:33
 * Description:
 */
import {timestampToTime} from '@common/common/common/utils.common';
const nodemailer = require('nodemailer'); // 发送邮件

const hljs = require('highlight.js');

const marked = require('marked');
const renderer = new marked.Renderer();
marked.setOptions({
    renderer,
    gfm: true,
    // tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight(code, lang, callback) {
        return hljs.highlightAuto(code).value;
    },
});

let renderComent ;
let times ;
let transporter;
function emailInit(params) {
    renderComent = marked(params.content);
    times = timestampToTime(params.cdate);
    transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        secure: true,
        port: '465',
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PWD, // 授权码,通过QQ获取
        },
    });
}
/**
 * 发送邮件给作者
 * @param params
 */
export function sendToAuthor(params) {
    emailInit(params);
    console.log(process.env.EMAIL_AUTHOR);
    const mailOptionsToAuthor = {
        from: `重庆崽儿Brand <${process.env.EMAIL_ACCOUNT}>`, // 发送者
        to: `${process.env.EMAIL_AUTHOR}`, // 接受者,可以同时发送多个,以逗号隔开
        subject: params.subject, // 标题
        text: `你的博客有来自「${params.nickname}」的留言：${renderComent}`, // 文本
        html: `<div style="border: 1px solid #eee;border-radius: 5px;width: 500px;font-size: 13px;color: #666">
                          <div style="text-align: center;padding: 10px 0;background-color: #1b1f23;color: #fff;">你的博客有新的留言
                          </div>
                          <div style="padding: 20px;">
                              <div style="overflow: hidden;">
                                  <div style="float: left;height: 40px;line-height: 40px;color: #666;font-size: 12px;">
                                      <img src="${params.from_uavatar}" style="width: 40px;height:
                                   40px;border-radius: 50%;float: left;" alt="">
                                      <span style="display: inline-block;width: 100px;white-space: nowrap;overflow: hidden;text-overflow:
                                  ellipsis;padding-left: 10px">${params.nickname}
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
                                  <a href="${params.toURL}" target="_blank" style="padding: 8px 12px;border-radius: 3px;background-color: #eee;color: #666;text-decoration:
                          none;cursor: pointer;display: inline-block;">
                                      去查看</a>
                                  <div style="padding: 15px 0 10px 0;color: #999;font-size: 12px;">感谢你对 <a target="_blank" href="http://www.brandhuang.com"
                                                                                                           style="color: #409EFF;text-decoration:
                          none;cursor: pointer;">重庆崽儿Brand
                                  </a>的关注，如有疑问，请前往博客留言，我会尽快回复。
                                  </div>
                                  <div style="padding: 10px 0 0 0;color: #999;font-size: 12px;">(此邮件由系统自动发送，请勿直接回复！)</div>
                              </div>
                          </div>
                      </div>`,
    };
    transporter.sendMail(mailOptionsToAuthor, function(err, info) {
        if (err) {
            console.log('发送邮件给作者出错了');
            console.log(err);
            return;
        }
        console.log('发送邮件给作者成功');
    });
}

/**
 * 发送邮件给评论的人
 * @param params
 */
export function sendToObserver(params) {
    emailInit(params);
    const mailOptionsToCommentor = {
        from: '重庆崽儿Brand<hellobugworld@qq.com>', // 发送者
        to: `${params.touemail}`, // 接受者,可以同时发送多个,以逗号隔开
        subject: params.subject, // 标题
        text: `${params.nickname} 回复了你：${renderComent}`, // 文本
        html: `<div style="border: 1px solid #eee;border-radius: 5px;width: 500px;font-size: 13px;color: #666">
                          <div style="text-align: center;padding: 10px 0;background-color: #1b1f23;color: #fff;">你在<a target="_blank" href="http://www.brandhuang.com"
                                                                                                          style="padding: 0 6px;color: #409EFF;text-decoration:
                          none;cursor: pointer;">
                              重庆崽儿Brand</a>博客的评论有了新的回复
                          </div>
                          <div style="padding: 20px;">
                              <div style="overflow: hidden;">
                                  <div style="float: left;height: 40px;line-height: 40px;color: #666;font-size: 12px;">
                                      <img src="${params.from_uavatar}" style="width: 40px;height:
                                   40px;border-radius: 50%;float: left;" alt="">
                                      <span style="display: inline-block;width: 100px;white-space: nowrap;overflow: hidden;text-overflow:
                                  ellipsis;padding-left: 10px">${params.nickname}
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
                                  <a href="${params.toURL}" target="_blank" style="padding: 8px 12px;border-radius: 3px;background-color: #eee;color: #666;text-decoration:
                          none;cursor: pointer;display: inline-block;">
                                      去查看</a>
                                  <div style="padding: 15px 0 10px 0;color: #999;font-size: 12px;">感谢你对 <a target="_blank" href="http://www.brandhuang.com"
                                                                                                           style="color: #409EFF;text-decoration:
                          none;cursor: pointer;">重庆崽儿Brand
                                  </a>的关注，如有疑问，请前往博客留言，我会尽快回复。
                                  </div>
                                  <div style="padding: 10px 0 0 0;color: #999;font-size: 12px;">(此邮件由系统自动发送，请勿直接回复！)</div>
                              </div>
                          </div>

                      </div>`,
    };
    transporter.sendMail(mailOptionsToCommentor, function(err, info) {
        if (err) {
            console.log('发送邮件给评论的人出错了');
            console.log(err);
            return;
        }
        console.log('发送邮件给评论的人成功');
    });

}
