const {
    findCarts
} = require('../services/cart.services')

module.exports = {
    // 购物车最多添加10件商品
    async verifyAddCart(ctx, next) {
        const { id, number } = ctx.request.body
        if (id && number > 0) {
            try {
                const { count } = await findCarts(ctx.state.user.id)
                if (count >= 10) {
                    return ctx.app.emit('err', ctx, 20301, '')
                }
            } catch (e) {
                return ctx.app.emit('err', ctx, 500, e)
            }
        }
        await next()
    }
}