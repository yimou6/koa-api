const Router = require('@koa/router')
const router = new Router({ prefix: '/cart' })

const { authToken } = require('../midddleware/user.middleware')
const { validator } = require('../utils')
const {
    modifyCart,
    getCarts
} = require('../controller/cart.controller')
const { verifyAddCart } = require('../midddleware/cart.middleware')

/**
 * 添加/修改/删除购物车
 */
router.patch(
    '/',
    authToken,
    validator({
        good_id: 'int',
        number: 'int'
    }),
    modifyCart
)
/**
 * 获取购物车列表
 */
router.get(
    '/',
    authToken,
    getCarts
)

module.exports = router