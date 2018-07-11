const UserModel = require('../db/models/user')
const validator = require('validator')
const ErrorRes = require('../models/error')
const SuccessRes = require('../models/success')

const usernameValidator = username => {
  if (validator.isByteLength(username, 6, 16)) return true
  return false
};

const passwordValidator = password => {
  if (validator.isByteLength(password, 6, 16)) return true
  return false
};

const emailValidator = email => {
  if (validator.isEmail(email)) return true
  return false
};

const register = async ctx => {
  const { username, password, email } = ctx.request.body
  if (!usernameValidator(username) || !passwordValidator(password) || !emailValidator(email)) {
    ctx.body = new ErrorRes({
      code: -1,
      msg: '非法注册'
    })
  } else {
    const UserEntity = new UserModel({
      username,
      password,
      email
    })
    try {
      await UserEntity.save()
      ctx.body = new SuccessRes({
        code: 0,
        msg: '注册成功'
      })
    } catch (err) {
      ctx.body = new ErrorRes({
        code: -1,
        msg: `${err}`
      })
    }
  }
};

module.exports = router => {
  router.post('/api/register', register)
}
