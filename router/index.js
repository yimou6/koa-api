const fs = require('fs')

const Router = require('@koa/router')
const router = new Router({ prefix: '/api' })

// 通过fs自动读取router下的文件
fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
        router.use(require('./' + file).routes())
    }
})

module.exports = router