const express = require('express')
const router = new express.Router()

const {
    registrar_venta,
    get_ventas,
    registrar_resena,
    modificar_resena
} = require('../controllers/venta')

const verify = require('../middleware/auth')

router.post('/ventas', verify, registrar_venta)
router.get('/ventas', verify, get_ventas)
router.post('/resena', verify, registrar_resena)
router.put('/resena/:id', verify, modificar_resena)

module.exports = router