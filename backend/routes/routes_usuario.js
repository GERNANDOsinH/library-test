const express = require('express')
const router = new express.Router()

const {
    register,
    login,
    get_saldo,
    update_saldo,
    change_password
} = require('../controllers/usuario')

const verify = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/saldo', verify, get_saldo)
router.put('/saldo', verify, update_saldo)
router.put('/me', verify, change_password)

module.exports = router