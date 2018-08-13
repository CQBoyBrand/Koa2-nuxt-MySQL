const Koa = require('koa');
const path = require('path')
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./db/config.js');
const cors = require('koa2-cors');
const jwt = require('koa-jwt')

const errorHandle = require('./middlewears/errorHandler')

const app = new Koa()


// session存储配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
}

// 配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}))

app.use(bodyParser({
    formLimit: '1mb'
}))

app.use(cors());
const secret = ''

app.use(errorHandle.errorHandle)
app.use(jwt({
    secret,
}).unless({
    path: [/\/web/, /\/login/],
}))
//  路由
app.use(require('./routers/admin.js').routes())
app.use(require('./routers/web.js').routes())


app.listen(config.port)

console.log(`listening on port ${config.port}`)
