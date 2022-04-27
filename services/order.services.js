const Order = require('../model/order.model')
module.exports = {
    async createOrder(order) {
        return Order.create(order)
    },
    async updateOrderStatusById({ id, status }) {
        return Order.update({
            status
        }, {
            where: { id }
        })
    },
    async findOrders({ pageNum, pageSize, status, user_id }) {
        return Order.findAndCountAll({
            where: { status, user_id },
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: pageSize,
            offset: pageSize * (pageNum - 1)
        })
    }
}