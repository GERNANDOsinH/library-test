const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const LIBRO = sequelize.define('LIBRO', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    popularity_score: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = LIBRO