const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const { findUser } = require('../services/user.services')

module.exports = {
    // 加密密码
    async cryptPassword(ctx, next) {
        const { password } = ctx.request.body
        const salt = bcrypt.genSaltSync(10)
        ctx.request.body.password = bcrypt.hashSync(password, salt)
        await next()
    },
    // 验证token
    async authToken(ctx, next) {
        const { authorization } = ctx.request.headers
        if (!authorization) {
            return ctx.app.emit('err', ctx, 401, '')
        }
        let token = ''
        try {
            token = authorization.replace('Bearer ', '')
        } catch (e) {
            return ctx.app.emit('err', ctx, 401, '')
        }
        try {
            ctx.state.user = jwt.verify(token, JWT_SECRET)
        } catch (e) {
            switch (e.name) {
                case 'TokenExpiredError':
                    return ctx.app.emit('err', ctx, 401, e)
                case 'JsonWebTokenError':
                    return ctx.app.emit('err', ctx, 401, e)
                default:
                    return ctx.app.emit('err', ctx, 401, e)
            }
        }
        await next()
    },
    // 验证用户是否已注册
    async verifyRegister(ctx, next) {
        const { user_name } = ctx.request.body
        // 通过用户名和邮箱判断用户是否被注册
        try {
            const user = await findUser({ user_name })
            if (user) {
                return ctx.app.emit('err', ctx, 20101, JSON.stringify(ctx.request.body))
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }
        await next()
    }
}