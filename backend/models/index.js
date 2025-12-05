const USUARIO = require('./usuario')
const LIBRO = require('./libro')
const RESENA = require('./resena')

USUARIO.hasMany(RESENA, {
    foreignKey: 'id_usuario'
})

RESENA.belongsTo(USUARIO, {
    foreignKey: 'id_usuario'
})

LIBRO.hasMany(RESENA, {
    foreignKey: 'id_libro'
})

RESENA.belongsTo(LIBRO, {
    foreignKey: 'id_libro'
})

module.exports = { USUARIO, LIBRO, RESENA }