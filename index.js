const Koa = require('koa')
const path = require('path')
const router = require('koa-router')()
const body = require('koa-body')
const json = require('koa-json')
const redis = require('koa-redis')
const session = require('koa-generic-session')
const requireAll = require('require-all')
const errorHandle = require('./lib/error-handle')
const loginCheck = require('./lib/login-check')
const baAuth = require('./lib/ba-auth')
const colors = require('./service/colors')

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

const config = require('./config/config.json')

app.keys = config.keys

const sessionConfig = {
  key: `${config.appName}.sid`,
  prefix: `${config.appName}:sess:`,
  cookie: {
    domain: '.zhouqilin.cn'
  }
};

sessionConfig.store = redis({
  host: config.redis.host,
  port: config.redis.port
});

sessionConfig.store.on('error', error => {
  console.log(`${error}`.error)
});

requireAll({
  dirname: path.join(__dirname, '/route'),
  filter: /\.js$/,
  resolve(route) {
      route(router)
  }
})

app.use(errorHandle)
app.use(session(sessionConfig))
app.use(loginCheck)
app.use(baAuth)
app.use(body())
app.use(json())
if (isDev) {
  const reqTimeLogger = require('./lib/req-time-logger')
  const logger = require('koa-logger')
  app.use(logger())
  app.use(reqTimeLogger)
}
app.use(router.routes())

app.listen(config.appPort, config.appHost)

if (isDev) {
  console.log('现在处于开发环境~~!'.info)
  console.log(`Koa server listener on ${config.appHost} : ${config.appPort}`.info)
}
