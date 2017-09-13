const isLogin = ctx => Boolean.call(Boolean, ctx.session && ctx.session.login);

const whitePath = [
    '/api/login',
    '/api/register'
]

module.exports = async (ctx, next) => {
    if (isLogin(ctx) || ~whitePath.indexOf(ctx.path)) {
        await next();
    } else {
        ctx.status = 401;
        ctx.body = '还没有登录, 请先登录';
    }
};
