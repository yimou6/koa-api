/**
 * 用户相关
 */

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

// 用户名
const USER_NAME_REG = /^[a-zA-Z0-9_]{4,16}$/
// 密码
const PASSWORD_REG = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
// 昵称
const NICK_NAME_REG = /^[0-9a-zA-Z\u4E00-\u9FA5\_]{3,16}/
// 邮箱
const EMAIL_REG = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

/**
 * 用户注册
 */
router.post(
    '/register',
    validator({
        user_name: { type: 'string', format: USER_NAME_REG },
        password: { type: 'string', format: PASSWORD_REG },
        nick_name: { type: 'string', format: NICK_NAME_REG },
        sex: [0, 1, 2],
        email: { type: 'string', format: EMAIL_REG }
    }),
    verifyRegister,
    cryptPassword,
    registerUser
)

/**
 * 用户登陆
 */
router.post(
    '/login',
    validator({
        user_name: { type: 'string', format: USER_NAME_REG },
        password: { type: 'string', format: PASSWORD_REG }
    }),
    loginUser
)

/**
 * 获取用户列表
 */
router.post(
    '/users',
    authToken,
    validator({
        pageNum: { type: 'number', min: 0 },
        pageSize: [10, 20, 50],
        user_name: {
            required: false,
            type: 'string'
        },
        nick_name: {
            required: false,
            type: 'string'
        },
        sex: { required: false, type: 'number' },
        email: { required: false, type: 'string' }
    }),
    getUsers
)

/**
 * 添加用户
 */
router.put(
    '/user',
    authToken,
    validator({
        user_name: { type: 'string', format: USER_NAME_REG },
        password: { type: 'string', format: PASSWORD_REG },
        nick_name: { type: 'string', format: NICK_NAME_REG },
        sex: [0, 1, 2],
        email: { type: 'string', format: EMAIL_REG },
        level: [0, 1, 2]
    }),
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
    validator({
        id: 'number',
        password: { required: false, type: 'string', format: PASSWORD_REG },
        nick_name: { required: false, type: 'string', format: NICK_NAME_REG },
        sex: { required: false, type: 'number' },
        email: { required: false, type: 'string', format: EMAIL_REG },
        level: { required: false, type: 'number' }
    }),
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

module.exports = router