const Good = require('../model/good.model')
module.exports = {
    // 创建商品
    async createGood(good) {
        await Good.create(good)
    },
    // 删除商品
    async destroyGood(id) {
        await Good.destroy({
            where: { id }
        })
    },
    // 修改商品
    async updateGoodById(id, good) {
        await Good.update(good, {
            where: { id }
        })
    },
    // 查询商品列表
    async findGoods({ pageNum, pageSize }) {
        const { count, rows } = await Good.findAndCountAll({
            limit: pageSize,
            offset: pageSize * (pageNum - 1)
        })
        if (count > 0) {
            let data = []
            // 需要这样转换一下才能拿到model中定义的get方法返回的good_img值
            for (const { dataValues, good_img } of rows) {
                data.push({
                    ...dataValues,
                    good_img
                })
            }
            return { count, rows: data }
        }
        return { count, rows: [] }
    },
    // 查询商品信息
    async findGood({ id, good_name }) {
        let where = {}
        id && Object.assign(where, { id })
        good_name && Object.assign(where, { good_name })
        return await Good.findOne({ where })
    }
}