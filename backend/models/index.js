const USUARIO = require('./usuario')
const LIBRO = require('./libro')
const RESENA = require('./resena')
const VENTA = require('./venta')

USUARIO.hasMany(VENTA, { foreignKey: 'id_usuario' })

VENTA.belongsTo(USUARIO, {foreignKey: 'id_usuario' })

LIBRO.hasMany(VENTA, { foreignKey: 'id_libro' })

VENTA.belongsTo(LIBRO, { foreignKey: 'id_libro' })

VENTA.hasOne(RESENA, { foreignKey: 'id_venta' })

RESENA.belongsTo(VENTA, {foreignKey: 'id_venta'})

module.exports = { USUARIO, LIBRO, RESENA, VENTA }
