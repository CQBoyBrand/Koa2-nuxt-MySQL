/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/21 01:29
 * Description:
 */
const md5 = require('md5');
const htmlparser = require('htmlparser2');

/**
 * XSS 过滤
 * @param str
 * @constructor
 */
export function FilterContent(str) {
    let commentTranseRes = '';
    const parser = new htmlparser.Parser({
        onopentag(name, attribs) {
            if (name === 'script' || name === 'style' || name === 'img' || name === 'frame' || name === 'iframe') {
                // alert('小朋友不乖哟，不要乱输入！')
            }
        },
        ontext(text) {
            commentTranseRes += text;
        },
        onclosetag(tagname) {
            if (tagname === 'script' || tagname === 'style' || tagname === 'frame' || tagname === 'iframe') {

            }
        },
    }, {decodeEntities: true});
    parser.write(str);
    parser.end();
    return commentTranseRes;
}

export function pad(str) {
    return +str >= 10 ? str : '0' + str;
}
export function timestampToTime(timestamp) {
    const dateObj = new Date(+timestamp); // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
    const year = dateObj.getFullYear(); // 获取年，
    const month = dateObj.getMonth() + 1; // 获取月，必须要加1，因为月份是从0开始计算的
    const date = dateObj.getDate(); // 获取日，记得区分getDay()方法是获取星期几的。
    const hours = this.pad(dateObj.getHours());  // 获取时, pad函数用来补0
    const minutes =  this.pad(dateObj.getMinutes()); // 获取分
    const seconds =  this.pad(dateObj.getSeconds()); // 获取秒
    return year + '/' + this.pad(month) + '/' + this.pad(date) + ' ' + hours + ':' + minutes + ':' + seconds;
}

/**
 * 生成头像
 * @param email
 */
export function setAvatar(email) {
    let url = 'https://www.gravatar.com/avatar/';
    url += md5(email).toLowerCase();
    url += '?s=80&r=g';
    return url;
}
