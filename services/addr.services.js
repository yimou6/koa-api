const Addr = require('../model/addr.model')
module.exports = {
    // 创建收货地址
    async createAddr(addr) {
        await Addr.create(addr)
    },
    // 删除收货地址
    async destroyAddr(id) {
        await Addr.destroy({
            where: { id }
        })
    },
    // 修改收货地址
    async updateAddrById(id, addr) {
        await Addr.update(addr, {
            where: { id }
        })
    },
    // 查询收货地址
    async findAddress({ pageNum, pageSize }) {
        const { count, rows } = await Addr.findAndCountAll({
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
    // 查询收货地址信息
    async findAddr({ id, user_id, is_default }) {
        let where = {}
        id && Object.assign(where, { id })
        user_id && Object.assign(where, { user_id })
        is_default && Object.assign(where, { is_default })
        return await Addr.findOne({ where })
    }
}