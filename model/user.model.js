const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('User', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名'
    },
    nick_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '昵称'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '邮箱'
    },
    sex: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        comment: '性别（0:女性；1:男性；2:保密）'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '密码'
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        comment: '用户等级。0：超级管理员；1：管理员；2普通成员。'
    }
})

module.exports = User