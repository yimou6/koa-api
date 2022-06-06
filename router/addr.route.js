/**
 * 收货地址相关
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/address' })

const { authToken } = require('../midddleware/user.middleware')
const { validator } = require('../utils')
const {
    addAddress,
    modifyAddress,
    deleteAddress,
    getAddress
} = require('../controller/addr.controller')
const { verifyIsDefault } = require('../midddleware/addr.middleware')

/**
 * 添加地址
 */
router.put(
    '/',
    authToken,
    validator({
        consignee: 'string',
        phone: 'string',
        address: 'string',
        is_default: 'boolean'
    }),
    verifyIsDefault,
    addAddress
)
/**
 * 修改地址
 */
router.patch(
    '/',
    authToken,
    validator({
        id: 'number',
        consignee: 'string',
        phone: 'string',
        address: 'string',
        is_default: 'boolean'
    }),
    verifyIsDefault,
    modifyAddress
)
/**
 * 删除地址
 */
router.delete(
    '/',
    authToken,
    deleteAddress
)
/**
 * 获取地址列表
 */
router.get(
    '/',
    authToken,
    getAddress
)

module.exports = router