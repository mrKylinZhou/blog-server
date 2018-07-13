const crypto = require('crypto')

const isAuthorization = ({ path, method, authorization }) => {
  if (!authorization) return false
  const auth = crypto.createHmac('sha1', 'kylin')
    .update(`${path}${method}`)
    .digest()
    .toString('base64')
  if (auth === authorization) return true
  return false
}


module.exports = async (ctx, next) => {
  const path = ctx.path
  const method = ctx.method.toUpperCase()
  const { authorization } = ctx.headers
  if (isAuthorization({ path, method, authorization })) {
    await next()
  } else {
    ctx.status = 401
  }
}
