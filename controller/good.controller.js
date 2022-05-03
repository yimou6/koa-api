const { createGood, destroyGood, updateGoodById, findGoods, findGood } = require('../services/good.services')

module.exports = {
    // 添加商品
    async addGood(ctx) {
        let { good_name, good_desc, status, banner, price, stock } = ctx.request.body
        const { good_img, banner_img } = ctx.request.body.state

        try {
            const good = await findGood({ good_name })
            if (good) {
                return ctx.app.emit('err', ctx, 20201, '')
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }

        try {
            await createGood({
                good_name,
                good_desc,
                good_img,
                price,
                stock,
                status,
                banner,
                banner_img
            })
            ctx.body = {
                code: 0,
                msg: '添加商品成功'
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }
    },
    // 删除商品
    async deleteGood(ctx) {
        const { id } = ctx.request.body
        try {
            await destroyGood(id)
            ctx.body = {
                code: 0,
                msg: '删除商品成功'
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }
    },
    // 修改商品
    async modifyGood(ctx) {
        const { id, good_name, good_desc, status, banner, price, stock } = ctx.request.body
        const { good_img, banner_img } = ctx.request.body.state
        try {
            await updateGoodById(id, {
                good_name,
                good_desc,
                good_img,
                price,
                stock,
                status,
                banner,
                banner_img
            })
            ctx.body = {
                code: 0,
                msg: '修改商品成功'
            }
        } catch (e) {
            return ctx.app.emit('err', ctx, 500, e)
        }
    },
    // 查询商品列表
    async getGoods(ctx) {
        const { pageNum, pageSize } = ctx.request.body
        try {
            const { count, rows } = await findGoods({ pageNum, pageSize })
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

