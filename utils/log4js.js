const log4js = require('log4js')
const { log4jsConfig } = require('../config')

log4js.configure(log4jsConfig)

const defaultLogger = log4js.getLogger()
const errorLogger = log4js.getLogger('error')

module.exports = {
    debug: (msg) => defaultLogger.debug(msg),
    info: (msg) => defaultLogger.info(msg),
    warn: (msg) => defaultLogger.warn(msg),
    error: (msg) => {
        defaultLogger.error(msg)
        errorLogger.error(msg)
    }
}