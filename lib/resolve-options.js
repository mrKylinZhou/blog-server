module.exports = async (ctx, next) => {
  if (ctx.method.toUpperCase() === 'OPTIONS') {
    ctx.status = 204
  } else {
    await next()
  }
}
