module.exports = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', `*`)
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  ctx.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  ctx.set('Access-Control-Allow-Credentials', true)
  await next()
}
