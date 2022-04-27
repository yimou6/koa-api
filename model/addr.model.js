const { DataTypes } = require('sequelize')
const sequelize = require('../db')

module.exports = sequelize.define('Addr', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id',
    },
    consignee: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货人姓名',
    },
    phone: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        comment: '收货人的手机号',
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货人的地址',
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否为默认地址, 0:不是(默认值) 1: 是',
    },
})