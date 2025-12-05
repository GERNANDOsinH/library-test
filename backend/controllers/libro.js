const LIBRO = require('../models/libro')

const get_libros = async (req, res) => {
    try {
        const libros = await LIBRO.findAll()

        if (!libros) return res.status(404).json({ 'msg': 'No hay libros' })

        return res.status(200).json(libros)
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
        
        return res.status(200).json(libro)
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
        
        return res.json(200).json(top_libros)
    }
    catch (e) {
        console.log(e)
        return res.status(500)
    }
}

module.exports = {
    get_libros,
    get_libro,
    get_populares
}