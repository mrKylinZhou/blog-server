module.exports = async (ctx, next) => {
    if (ctx.session && ctx.session.login) {
        await next();
    } else {
        ctx.status = 401;
        ctx.body = '还没有登录, 请先登录';
    }
};
