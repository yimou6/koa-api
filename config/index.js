const path = require('path')
const defaultConfig = {
    // 环境
    ENV: 'dev',
    // 项目启动端口
    PORT: 8000,
    // MySQL 数据库配置
    MYSQL_DB: 'simple_shop',
    MYSQL_USER: 'root',
    MYSQL_PWD: '12345678',
    MYSQL_HOST: 'localhost',
    // token 加密
    JWT_SECRET: 'jsc123',
    // 图片文件保存地址
    IMG_PATH: path.join(__dirname, '../upload'),
    // 文件服务地址
    IMG_SERVER: 'http://localhost:8000/',
    // log4js配置
    log4jsConfig: {
        appenders: {
            'STDOUT': {
                type: 'stdout'
            },
            'FILE_ALL': {
                type: 'datefile',
                filename: 'log.log',
                daysToKeep: 30,
                keepFileExt: true
            },
            'FILE_ERROR': {
                type: 'datefile',
                filename: 'error.log',
                daysToKeep: 30,
                keepFileExt: true
            }
        },
        categories: {
            default: {
                appenders: ['STDOUT', 'FILE_ALL'],
                level: 'debug'
            },
            error: {
                appenders: ['FILE_ERROR'],
                level: 'error'
            }
        }
    }
}

const prodConfig = {
    ENV: 'prod',
    // 其他生产环境配置
    // 与defaultConfig的字段一致，生产环境配置覆盖默认配置
}


module.exports = process.argv[2] === 'prod' ? { ...defaultConfig, ...prodConfig } : defaultConfig