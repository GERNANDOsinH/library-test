const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const bcrypt = require('bcrypt')

const USUARIO = sequelize.define('USUARIO', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    saldo: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            const saltRounds = 10
            user.password = await bcrypt.hash(user.password, saltRounds)
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const saltRounds = 10
                user.password = await bcrypt.hash(user.password, saltRounds)
            }
        }
    }
})

USUARIO.prototype.valid_password = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = USUARIO