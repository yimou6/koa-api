const { Op } = require('sequelize')
const User = require('../model/user.model')

module.exports = {
    // 创建用户
    async createUser(user) {
        await User.create(user)
    },
    // 查询用户信息
    async findUser({ user_name, email, password, attributes }) {
        const where = {}
        user_name && Object.assign(where, { user_name })
        email && Object.assign(where, { email })
        password && Object.assign(where, { password })

        const findOptions = {
            where,
            raw: true
        }
        attributes && Object.assign(findOptions, { attributes })

        return await User.findOne(findOptions)
    },
    // 查询用户列表
    async findUsers({ pageNum, pageSize, orderBy, sort, user_name, level }) {
        let where = {}
        user_name && Object.assign(where, {
            user_name: {
                [Op.like]: `%${user_name}%`
            }
        })
        level && Object.assign(where, { level })

        let order = [
            ['createdAt', 'DESC']
        ]
        if (orderBy && sort) {
            order = [
                [orderBy, sort]
            ]
        }

        return await User.findAndCountAll({
            attributes: { exclude: ['password'] },
            where,
            order,
            limit: pageSize,
            offset: pageSize * (pageNum - 1),
            raw: true
        })
    },
    // 修改用户信息
    async updateUserById(id, { nick_name, password, level, email, sex }) {
        const newUser = { id }
        nick_name && Object.assign(newUser, { nick_name })
        password && Object.assign(newUser, { password })
        level && Object.assign(newUser, { level })
        email && Object.assign(newUser, { email })
        sex && Object.assign(newUser, { sex })
        return await User.update(newUser, { where: { id } })
    },
    // 删除用户
    async destroyUser(id) {
        await User.destroy({
            where: { id }
        })
    }

}