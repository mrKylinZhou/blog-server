const Koa = require('koa')
const path = require('path')
const router = require('koa-router')()
const body = require('koa-body')
const json = require('koa-json')
const requireAll = require('require-all')
const errorHandle = require('./lib/error-handle')
const cors = require('./lib/cors')
// const baAuth = require('./lib/ba-auth')

const app = new Koa()

const config = require('./config/config.json')

app.keys = config.keys

requireAll({
  dirname: path.join(__dirname, '/route'),
  filter: /\.js$/,
  resolve(route) {
    route(router)
  }
})

app.use(errorHandle)
app.use(cors);
// app.use(baAuth)
app.use(body())
app.use(json())
app.use(router.routes())

app.listen(config.appPort, config.appHost)

console.log(`Koa server listener on ${config.appHost} : ${config.appPort}`)
