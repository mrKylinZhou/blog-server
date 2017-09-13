module.exports = async (ctx, next) => {
    const startTime = Date.now();
    await next();
    const endTime = Date.now();
    const requestTime = (endTime - startTime) / 1000;
    console.log(`Koa-proxy : request time is : ${requestTime} s`.help);
};
