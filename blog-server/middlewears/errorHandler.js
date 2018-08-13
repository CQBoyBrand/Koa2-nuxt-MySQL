module.exports ={
    errorHandle: (ctx, next) => {
        return next().catch((err) => {
            if (err.status === 401) {
                ctx. status = 401,
                ctx.body = {
                    status: 401,
                    error: '登录信息已过期，请重新登录',
                };
            } else {
                throw err;
            }
        });
    }
}