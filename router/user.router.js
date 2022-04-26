const Router = require('@koa/router')
const router = new Router()

const { validator } = require('../utils')
const {
    registerUser,
    loginUser,
    getUsers,
    addUser,
    modifyUser,
    deleteUser
} = require('../controller/user.controller')
const {
    cryptPassword,
    authToken,
    verifyRegister
} = require('../midddleware/user.middleware')
const {
    registerParamsRules,
    loginParamsRules,
    usersParamsRules,
    addUserParamsRules,
    modifyUserParamsRules
} = require('../constant/user.params.rules')

/**
 * 用户注册
 */
router.post(
    '/register',
    validator(registerParamsRules),
    verifyRegister,
    cryptPassword,
    registerUser
)

/**
 * 用户登陆
 */
router.post(
    '/login',
    validator(loginParamsRules),
    loginUser
)

/**
 * 获取用户列表
 */
router.post(
    '/users',
    authToken,
    validator(usersParamsRules),
    getUsers
)

/**
 * 添加用户
 */
router.put(
    '/user',
    authToken,
    validator(addUserParamsRules),
    verifyRegister,
    cryptPassword,
    addUser
)

/**
 * 修改用户信息
 */
router.patch(
    '/user',
    authToken,
    validator(modifyUserParamsRules),
    modifyUser
)

/**
 * 删除用户
 */
router.delete(
    '/user',
    authToken,
    validator({
        id: 'number'
    }),
    deleteUser
)

/**
 * 修改密码
 */
router.patch('/user/password', (ctx, next) => {
    ctx.body = {}
})

module.exports = router