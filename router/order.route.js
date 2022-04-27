const Router = require('@koa/router')
const router = new Router({ prefix: '/order' })
const { authToken } = require('../midddleware/user.middleware')
const { validator } = require('../utils')
const { addOrder, modifyOrder, getOrders } = require('../controller/order.controller')

/**
 * 添加订单
 */
router.put(
    '/',
    authToken,
    validator({
        address_id: 'int',
        goods_info: 'string',
        total: 'number'
    }),
    addOrder
)

/**
 * 修改订单状态
 */
router.patch(
    '/',
    authToken,
    validator({
        id: 'int',
        status: [0, 1, 2, 3, 4]
    }),
    modifyOrder
)

router.post(
    '/',
    authToken,
    validator({
        pageNum: 'int',
        pageSize: 'int',
        status: [0, 1, 2, 3, 4]
    }),
    getOrders
)

module.exports = router