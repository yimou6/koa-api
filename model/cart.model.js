const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const Good = require('../model/good.model')
const Cart = sequelize.define('Cart', {
    good_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品的id',
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户的id',
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '商品的数量',
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否选中',
    },
})
Cart.belongsTo(Good, {
    foreignKey: 'good_id',
    as: 'good_info'
})

module.exports = Cart