const {
    MYSQL_DB,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_HOST
} = require('../config')

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql'
})

module.exports = sequelize
