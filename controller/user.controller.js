const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const { info } = require('../utils/log4js')
const {
    createUser,
    findUser,
    findUsers,
    updateUserById,
    destroyUser
} = require('../services/user.services')

module.exports = {
    // 用户注册
    async registerUser(ctx) {
        const { user_name, password, nick_name, sex, email } = ctx.request.body
        try {
            await createUser({ user_name, password, nick_name, sex, email })
            ctx.body = {
                code: 0,
                msg: '注册成功!'
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }
    },
    // 用户登陆
    async loginUser(ctx) {
        const { user_name, password } = ctx.request.body
        try {
            const user = await findUser({
                user_name,
                attributes: ['id', 'user_name', 'nick_name', 'password', 'email', 'sex', 'level']
            })
            if (user) {
                const { password: pwd, ...userInfo } = user
                // 匹配密码
                if (!bcrypt.compareSync(password, pwd)) {
                    return ctx.app.emit('err', ctx, 20102, JSON.stringify(ctx.request.body))
                } else {
                    ctx.state.user = userInfo
                    // 设置token
                    const token = jwt.sign(userInfo, JWT_SECRET, { expiresIn: '1d' })
                    ctx.body = {
                        code: 0,
                        msg: '登陆成功!',
                        data: userInfo,
                        token
                    }
                }
            } else {
                return ctx.app.emit('err', ctx, 20103, JSON.stringify(ctx.request.body))
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }
    },
    // 用户列表
    async getUsers(ctx) {
        const { pageNum, pageSize, orderBy, sort, user_name, level } = ctx.request.body

        try {
            const { count, rows } = await findUsers({ pageNum, pageSize, orderBy, sort, user_name, level })
            ctx.body = {
                code: 0,
                msg: '查询成功',
                data: rows,
                count
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }
    },
    // 添加用户
    async addUser(ctx) {
        const { user_name, nick_name, sex, email, password, level } = ctx.request.body
        try {
            await createUser({ user_name, password, nick_name, sex, email, level })
            ctx.body = {
                code: 0,
                msg: '添加用户成功!'
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }
    },
    // 修改用户
    async modifyUser(ctx) {
        console.log(1)
        const { id, nick_name, sex, email, password, level } = ctx.request.body
        try {
            await updateUserById(id, { nick_name, sex, email, password, level  })
            ctx.body = {
                code: 0,
                msg: '修改成功'
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }
    },
    // 删除用户
    async deleteUser(ctx) {
        const { id } = ctx.request.body
        try {
            await destroyUser(id)
            ctx.body = {
                code: 0,
                msg: '删除成功'
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }
    }
}
