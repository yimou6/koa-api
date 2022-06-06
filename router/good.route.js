/**
 * 商品相关
 * */

const Router = require('@koa/router')
const router = new Router({ prefix: '/good' })

const { validator } = require('../utils')

const {
    addGood,
    deleteGood,
    modifyGood,
    getGoods
} = require('../controller/good.controller')
const { formBaseParams, verifyGoodParams, verifyModifyParams } = require('../midddleware/good.middleware')
const { authToken } = require('../midddleware/user.middleware')

/**
 * 添加商品
 */
router.put(
    '/',
    authToken,
    validator({
        good_name: 'string',
        good_desc: 'string',
        banner: ['0', '1'],
        price: 'string',
        stock: 'string',
        status: ['0', '1']
    }),
    formBaseParams,
    verifyGoodParams,
    addGood
)

/**
 * 删除商品
 */
router.delete(
    '/',
    authToken,
    validator({
        id: 'number'
    }),
    deleteGood
)

/**
 * 修改商品
 */
router.patch(
    '/',
    authToken,
    validator({
        id: 'string',
        good_name: 'string',
        good_desc: 'string',
        banner: ['0', '1'],
        price: 'string',
        stock: 'string',
        status: ['0', '1']
    }),
    formBaseParams,
    verifyModifyParams,
    modifyGood
)

/**
 * 查询商品列表
 */
router.post(
    '/list',
    authToken,
    validator({
        pageNum: 'number',
        pageSize: 'number'
    }),
    getGoods
)

/**
 * 查询商品列表
 */
router.post(
    '/',
    validator({
        pageNum: 'number',
        pageSize: 'number'
    }),
    getGoods
)

module.exports = router