const fs = require('fs')
const path = require('path')

fs.readdirSync(path.join(__dirname, '../model')).forEach(file => {
    if (file.indexOf('model') > -1) {
        console.log(`同步表[${file}]:-----\n`)
        require('../model/' + file).sync({ alter: true })
    } else {
        console.log('同步表的关联关系-------\n')
    }
})