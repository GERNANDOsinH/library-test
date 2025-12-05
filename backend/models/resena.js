const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')

const RESENA = sequelize.define('RESEÑA', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_libro: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = RESENA