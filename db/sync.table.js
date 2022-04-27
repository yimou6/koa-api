const fs = require('fs')
const path = require('path')

// 读取定义表结构的model文件
const files = fs.readdirSync(path.join(__dirname, '../model'))
const modelFiles = files.filter(file => file !== 'relation.js')

initTablesSync(modelFiles)

/**
 * 同步表结构
 * todo 要先建好表再建立表之间的关系，后续优化
 * @param list
 * @param index
 */
async function initTablesSync(list, index = 0) {
    if (list[index]) {
        // console.log(`同步表[${list[index]}] start:-----\n`)
        await require('../model/' + list[index]).sync({ alter: true })
        await initTablesSync(list, index + 1)
    }
}