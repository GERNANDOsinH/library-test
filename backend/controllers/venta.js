const { USUARIO, LIBRO, VENTA, RESENA } = require('../models/index')

const registrar_venta = async (req, res) => {
    const { id_libro, quantity } = req.body
    const id_usuario = req.payload.id

    if (!id_libro || !quantity || id_usuario) return res.status(400).json({ 'msg': 'Faltan datos'})

    try {
        const libro = await LIBRO.findOne({ where: { id: id_libro } })
        const usuario = await USUARIO.findOne({ where: { id: id_usuario } })

        if (!usuario || usuario.saldo < libro.price * quantity)
            return res.status(400).json({ 'msg': 'Saldo insuficiente' })

        if (!libro || libro.quantity < quantity)
            return res.status(400).json({ 'msg': 'No hay suficiente stock' })

        await usuario.update({ saldo: usuario.saldo - libro.price * quantity })
        await libro.update({ quantity: libro.quantity - quantity, popularity_score: libro.popularity_score + quantity})

        await VENTA.create({ id_usuario: id_usuario, id_libro: id_libro, price: libro.price, quantity: quantity })

        return res.status(201).json({msg: "Venta registrada con exito"})
        
    }
    catch (e) {
        console.log(e)
        return res.status(500)
    }
}

const get_ventas = async (req, res) => {
    const id_usuario = req.payload.id
    const { limit, offset } = req.body

    try {
        const ventas = await VENTA.findAll({
            where: { id_usuario: id_usuario },
            include: [
                {
                    model: RESENA,
                    required: false
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            limit: limit,
            offset: offset
        })

        if (ventas.length === 0)
            return res.status(404).json({ 'msg': 'No hay ventas registradas' })

        return res.status(200).json(ventas)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ 'msg': 'Error interno del servidor' })
    }
}

const registrar_resena = async (req, res) => {
    const {score, id_venta, comment} = req.body

    if (!id_venta || !comment || !id_usuario)
        return res.status(401).json({ 'msg': 'Faltan datos' })

    try {
        const venta = await VENTA.findOne({ where: { id: id_venta } })

        if (!venta)
            return res.status(404).json({ 'msg': 'No existe esta venta' })



        await RESENA.create({ score: score, id_venta: id_venta, comment: comment })
    }
    catch (e) {
        console.log(e)
        return res.status(500)
    }
}

const modificar_resena = async (req, res) => {
    const { score, comment } = req.body
    const { id } = req.params

    if (!id || !score || !comment)
        return res.status(400).json({ 'msg': 'Faltan datos' })

    try {
        const resena = await RESENA.findOne({ where: { id: id } })

        if (!resena)
            return res.status(404).json({ 'msg': 'No existe esta reseña' })

        await resena.update({ score: score, comment: comment })

        return res.status(200).json({ 'msg': 'Reseña modificada' })
    }
    catch (e) {
        console.log(e)
        return res.status(500)
    }
}

module.exports = {
    registrar_venta,
    get_ventas,
    registrar_resena,
    modificar_resena
}