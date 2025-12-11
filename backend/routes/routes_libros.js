const express = require('express')
const router = new express.Router()

const {
    get_libros,
    get_libro,
    get_populares,
    post_libro
} = require('../controllers/libro')

router.post('/libros', post_libro)
router.get('/libros/:id', get_libro)
router.get('/libros', get_libros)
router.get('/libros/populares', get_populares)

module.exports = router