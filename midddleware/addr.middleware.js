const {
    findAddr,
    updateAddrById
} = require('../services/addr.services')

module.exports = {
    // 当新增或修改 is_default 为true时，将原有的is_default为true的改为false
    async verifyIsDefault(ctx, next) {
        const { is_default } = ctx.request.body
        const user_id = ctx.state.user.id
        // 已有默认地址时，取消原有默认地址
        if (is_default) {
            const addr = await findAddr({ user_id, is_default })
            if (addr) {
                await updateAddrById(addr.id, { is_default: false })
            }
        }
        await next()
    }
}