/**
 * @Author: brand
 * @Date: 2019-07-13 21:25
 * @Email: brandhuang@qq.com
 */
import marked from "marked";
import emoji from 'node-emoji'
import hljs from 'highlight.js'
const renderer = new marked.Renderer();
marked.setOptions({
  renderer: renderer,
  gfm: true,
  // tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code, lang, callback) {
    return hljs.highlightAuto(code).value;
  }
});

export function mdRender(val){
  const replacer = (match) => emoji.emojify(match)
  return marked(val.replace(/(:.*:)/g, replacer)).replace(/<a/g, '<a target="_blank"')
}

export function timestampToTime (timestamp) {
  let date = new Date(parseInt(timestamp))// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D + h + m + s
}
