const Koa = require('koa');
const path = require('path')
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const cors = require('koa2-cors');
const jwt = require('koa-jwt')
const config = require('./config/index')
const router = require('./routers')
const whitelistAPI = require('./routers/whitelistAPI')

const app = new Koa()


// session存储配置
const sessionMysqlConfig = {
    user: config.MYSQL.USERNAME,
    password: config.MYSQL.PASSWORD,
    database: config.MYSQL.DATABASE,
    host: config.MYSQL.HOST,
}

// 配置session中间件
// app.use(session({
//     key: 'USER_SID',
//     store: new MysqlStore(sessionMysqlConfig)
// }))

app.use(bodyParser({
    formLimit: '1mb'
}))

// app.use(cors());
app.use(async (ctx, next) => {
    // 拦截器
    const allowedOrigins = ['http://www.brandhuang.com', 'http://admin.brandhuang.com', 'https://www.brandhuang.com', 'https://admin.brandhuang.com', 'file://'];
    const origin = ctx.request.headers.origin || '';
    if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
        ctx.set('Access-Control-Allow-Origin', origin);
    }
    ctx.set({
        'Access-Control-Allow-Headers': 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With',
        'Access-Control-Allow-Methods': 'PUT,PATCH,POST,GET,DELETE,OPTIONS',
        'Access-Control-Max-Age': '1728000',
        'Content-Type': 'application/json;charset=utf-8'
    });

    // OPTIONS
    if (ctx.request.method == 'OPTIONS') {
        ctx.status = 200;
        return false;
    }

    if (Object.is(process.env.NODE_ENV, 'production')) {
        const { origin, referer } = ctx.request.headers;
        if (origin !== 'file://') {
            const originVerified = (!origin	|| origin.includes('brandhuang.com')) &&
            (!referer || referer.includes('brandhuang.com'))
            if (!originVerified) {
                ctx.throw(403, { code: 0, message: '身份验证失败！' })
                return false;
            };
        }
    }
    await next();
})
const secret = config.AUTH.jwtTokenSecret


// token错误处理
app.use((ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401){
            ctx.status = 401;
            ctx.body = 'token已过期！，请重新登录';
        }else{
            throw err;
        }
    })
})
app.use(jwt({
    secret,
}).unless({
    path: whitelistAPI,
}))
//  路由
app.use(router.routes())
.use(router.allowedMethods())


app.listen(config.APP.PORT)

console.log(`listening on port ${config.APP.PORT}`)
