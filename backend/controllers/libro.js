const LIBRO = require('../models/libro')

const post_libro = async (req, res) => {
    const { title, author, quantity, price } = req.body;

    try {
        const libro = await LIBRO.create({
            title: title,
            author: author,
            quantity: quantity,
            popularity_score: 0,
            price: price
        })

        return res.status(201).json({ 'msg': 'Libro creado' })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ 'msg': 'Error interno del servidor' })
    }
}

const get_libros = async (req, res) => {
    const { limit, offset } = req.query
    
    try {
        const libros = await LIBRO.findAll({
            limit: limit,
            offset: offset
        })

        if (!libros) return res.status(404).json({ 'msg': 'No hay libros' })

        return res.status(200).json({books: libros})
    }
    catch (e) {
        console.log(e)
        res.status(500)
    }
}

const get_libro = async (req, res) => {
    const { id } = req.params

    try {
        const libro = await LIBRO.findOne({ where: { id } })
        if (!libro) return res.status(404).json({ 'msg': 'No existe este libro' })
        
        return res.status(200).json({book: libro})
    }
    catch (e) {
        console.log(e)
        res.status(500)
    }
}

const get_populares = async (req, res) => {
    const { limit, offset } = req.query

    try {
        const top_libros = await LIBRO.findAll({
            order: ['popularity_score', 'DESC'],
            limit: limit,
            offset: offset
        })

        if (top_libros.length === 0) return res.status(404).json({ 'msg': 'No hay libros' })
        
        return res.status(200).json({books: top_libros})
    }
    catch (e) {
        console.log(e)
        return res.status(500)
    }
}

module.exports = {
    post_libro,
    get_libros,
    get_libro,
    get_populares
}