const Koa = require('koa');
const path = require('path')
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./db/config.js');
const cors = require('koa2-cors');
const app = new Koa()


// session存储配置
const sessionMysqlConfig= {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
}

// 配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig),
    cookie: {                   // 与 cookie 相关的配置
        domain: 'localhost',    // 写 cookie 所在的域名
        path: '/',              // 写 cookie 所在的路径
        maxAge: 1000 * 300,      // cookie 有效时长
        httpOnly: true,         // 是否只用于 http 请求中获取
        overwrite: false        // 是否允许重写
    }
}))

app.use(bodyParser({
    formLimit: '1mb'
}))

const ALLOW_ORIGIN = [ // 域名白名单
    'http://localhost:8081',
    'http://localhost:8080'
]
app.use(ctx => {
    console.log('ctx====',ctx)
})
app.use(cors({
    origin: ctx => {
        //console.log('ctx==',ctx)
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
//  路由
app.use(require('./routers/admin.js').routes())
app.use(require('./routers/web.js').routes())


app.listen(config.port)

console.log(`listening on port ${config.port}`)
