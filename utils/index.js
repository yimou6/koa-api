const validator = rules => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (e) {
            return ctx.app.emit('err', ctx, 20001, e)
        }
        await next()
    }
}

module.exports = {
    validator
}