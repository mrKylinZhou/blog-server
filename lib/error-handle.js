module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(`发生了一个错误--->${err.message}`)
    ctx.status = 500
    ctx.body = {
      code: 500,
      msg: err.message
    }
  }
}
