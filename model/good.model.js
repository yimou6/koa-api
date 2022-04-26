const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const { IMG_SERVER } = require('../config')

module.exports = sequelize.define('Good', {
    good_name: {
        type: DataTypes.STRING,
        comment: '商品名称'
    },
    good_desc: {
        type: DataTypes.STRING,
        comment: '商品描述'
    },
    good_img: {
        type: DataTypes.TEXT,
        comment: '商品描述图片，已逗号分割',
        // 读取图片时返回 图片服务器地址+图片名
        get: function () {
            const rawValue = this.getDataValue('good_img')
            const raw = rawValue.split(',')
            return raw.map(img => {
                return `${IMG_SERVER}${img}`
            }).filter(it => it)
        }
    },
    banner: {
        type: DataTypes.INTEGER,
        default: false,
        comment: '是否在首页轮播展示(0是1否)'
    },
    banner_img: {
        type: DataTypes.STRING,
        comment: '轮播图片'
    },
    price: {
        type: DataTypes.FLOAT,
        comment: '商品价格'
    },
    stock: {
        type: DataTypes.INTEGER,
        comment: '库存'
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '商品状态。0:上架,1:下架'
    }
})