const Koa = require('koa')
const path = require('path')
const router = require('koa-router')()
const body = require('koa-body')
const json = require('koa-json')
const redis = require('koa-redis')
const session = require('koa-generic-session')
const requireAll = require('require-all')
const errorHandle = require('./lib/error-handle')
// const baAuth = require('./lib/ba-auth')

const app = new Koa()

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
  console.log(`${error}`)
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
// app.use(baAuth)
app.use(body())
app.use(json())
app.use(router.routes())

app.listen(config.appPort, config.appHost)

console.log(`Koa server listener on ${config.appHost} : ${config.appPort}`.info)
