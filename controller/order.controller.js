const { createOrder, updateOrderStatusById, findOrders } = require('../services/order.services')
module.exports = {
    async addOrder(ctx) {
        const { address_id, goods_info, total } = ctx.request.body
        const user_id = ctx.state.user.id
        const order_number = 'DH' + Date.now()
        try {
            await createOrder({
                user_id,
                address_id,
                goods_info,
                total,
                order_number,
                status: 0
            })
            // const goodInfo = JSON.parse(goods_info)

            ctx.body = {
                code: 0,
                msg: '订单添加成功'
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }
    },
    async modifyOrder(ctx) {
        const { id, status } = ctx.request.body
        try {
            await updateOrderStatusById({ id, status })
            ctx.body = {
                code: 0,
                msg: '修改成功'
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }
    },
    async getOrders(ctx) {
        const { pageNum, pageSize, status } = ctx.request.body
        const user_id = ctx.state.user.id
        try {
            const { count, rows } = await findOrders({ pageNum, pageSize,status, user_id })
            ctx.body = {
                code: 0,
                msg: '查询成功',
                data: rows,
                count
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }
    }
}