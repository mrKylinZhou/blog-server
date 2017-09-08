const Koa = require('koa');
const path = require('path');
const router = require('koa-router')();
const body = require('koa-body');
const json = require('koa-json');
const serve = require('koa-static');
const redis = require('koa-redis');
const session = require('koa-generic-session');
const requireAll = require('require-all');
const errorHandle = require('./lib/errorHandle');

const app = new Koa();

const isDev = process.env.NODE_ENV === 'development';

const config = require('./config/config.json');

app.keys = config.keys;

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
    console.error(error);
});

requireAll({
    dirname: path.join(__dirname, '/route'),
    filter: /\.js$/,
    resolve(route) {
        route(router);
    }
});

app.use(errorHandle);
app.use(session(sessionConfig));
app.use(body());
app.use(json());
if (isDev) {
    const reqTimeLogger = require('./lib/reqTimeLogger');
    const logger = require('koa-logger');
    app.use(logger());
    app.use(reqTimeLogger);
}
app.use(serve(path.join(__dirname, '/static')));
app.use(router.routes());

app.listen(config.appPort, config.appHost);

if (isDev) {
    console.log('现在处于开发环境~~!');
    console.log(`Koa server listener on ${config.appHost} : ${config.appPort}\n`);
}