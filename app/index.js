const path = require('path')
const fs = require('fs')

const Koa = require('koa')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const parameter = require('koa-parameter')

const router = require('../router')
const { IMG_PATH, ENV } = require('../config')
const errType = require('./err.type')
const { error, warn, info } = require('../utils/log4js')

const app = new Koa()

app.use(koaBody({
    multipart: true,
    strict: false,
    formidable: {
        uploadDir: IMG_PATH,
        keepExtensions: true,
        onFileBegin: function () {
            // 如果文件夹不存在则创建文件夹
            !fs.existsSync(IMG_PATH) && fs.mkdirSync(IMG_PATH)
        }
    }
}))

app.use(koaStatic(IMG_PATH))
app.use(parameter(app))
app.use(router.routes())
app.use(router.allowedMethods())

// 统一错误处理
app.on('err', (ctx, code, err) => {
    if (code < 1000) {
        ctx.status = code
    } else {
        ctx.status = 200
    }
    error(err)
    // 生产环境返回"系统错误"，开发环境返回具体错误信息。
    ctx.body = {
        code,
        msg: code > 1000
            ? errType[code]
            : ENV === 'prod'
                ? errType[code]
                : err
    }
})

module.exports = app