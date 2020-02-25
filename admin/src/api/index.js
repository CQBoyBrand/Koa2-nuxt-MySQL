/**
 * Author：brand
 * Creation Time：2019-03-10 21:17
 * Email：brandhuang@qq.com
 */
import * as user from './modules/user'
import * as article from './modules/article'
import * as qn from './modules/qn'
import * as tag from './modules/tag'
import * as category from './modules/category'
import * as link from './modules/link'
import * as config from './modules/config'

export default {
  ...user,
  ...article,
  ...qn,
  ...tag,
  ...category,
  ...link,
  ...config
}
