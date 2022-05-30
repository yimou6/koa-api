const {
    createAddr,
    destroyAddr,
    updateAddrById,
    findAddress,
    findAddr
} = require('../services/addr.services')
module.exports = {
    // 添加地址
    async addAddress(ctx) {
        const { consignee, phone, address, is_default } = ctx.request.body
        const user_id = ctx.state.user.id
        try {
            await createAddr({
                user_id,
                consignee,
                phone,
                address,
                is_default
            })
            ctx.body = {
                code: 0,
                msg: '添加成功'
            }
        } catch (e) {
            ctx.app.emit('err', ctx, 500, e)
        }
    },
    // 删除地址
    async deleteAddress(ctx) {
        const { id } = ctx.request.body
        try {
            await destroyAddr(id)
            ctx.body = {
                code: 0,
                msg: '删除成功'
            }
        } catch (e) {
            ctx.app.emit('err', ctx, 500, e)
        }
    },
    // 修改地址
    async modifyAddress(ctx) {
        const { id, consignee, phone, address, is_default } = ctx.request.body
        try {
            await updateAddrById(id, {
                consignee,
                phone,
                address,
                is_default
            })
            ctx.body = {
                code: 0,
                msg: '修改成功'
            }
        } catch (e) {
            ctx.app.emit('err', ctx, 500, e)
        }
    },
    // 查询地址列表
    async getAddress(ctx) {
        const user_id = ctx.state.user.id
        try {
            const { count, rows } = await findAddress(user_id)
            ctx.body = {
                code: 0,
                msg: '查询成功',
                data: rows,
                count
            }
        } catch (e) {
            ctx.app.emit('err', ctx, 500, e)
        }
    }
}