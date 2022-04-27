const { updateCart, findCarts } = require('../services/cart.services')
module.exports = {
    async modifyCart(ctx) {
        console.log(1)
        const { id, good_id, number, selected } = ctx.request.body
        console.log('id', id)
        const user_id = ctx.state.user.id
        try {
            await updateCart({ id, good_id, user_id, number, selected })
            ctx.body = {
                code: 0,
                msg: '操作成功'
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }
    },
    async getCarts(ctx) {
        try {
            const { count, rows } = await findCarts(ctx.state.user.id)
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