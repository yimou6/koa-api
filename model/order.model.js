const { DataTypes } = require('sequelize')
const sequelize = require('../db')

module.exports = sequelize.define('Order', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id',
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '地址id',
    },
    goods_info: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '商品信息',
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '订单总金额',
    },
    order_number: {
        type: DataTypes.CHAR(16),
        allowNull: false,
        comment: '订单号',
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: '订单状态(0: 未支付,1: 已支付, 2: 已发货, 3: 已签收, 4: 取消)',
    },
})