const USUARIO = require('../models/usuario')

const JWT = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET_KEY

const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) return res.status(400).json({ 'msg': 'Faltan datos' })

    try {
        const usuario = await USUARIO.create({
            first_name,
            last_name,
            email,
            password,
            saldo: 0
        })
        return res.status(201)
    }
    catch (e) {
        console.log(e)
        if (e.name === 'SequelizeUniqueConstraintError') {
            return res.status(401).json({'msg': 'El email ya esta en uso'})
        }

        return res.status(500)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await USUARIO.findOne({ where: { email } })
        
        if (!usuario) return res.status(404).json({ 'msg': 'Usuario no encontrado' })
        
        const is_valid = await usuario.valid_password(password)
        if (!is_valid) return res.status(401).json({ 'msg': 'Contraseña incorrecta' })
        
        const PAYLOAD = {
            id: usuario.id,
            email: usuario.email
        }

        const token = JWT.sign(PAYLOAD, SECRET_KEY, { expiresIn: '2h' })

        return res.status(200).json({ token: token })
    }
    catch (e) {
        console.log(e)
        res.status(500)
    }
}

const get_saldo = async (req, res) => {
    const id_usuario = req.payload.id
    
    if (!id_usuario) return res.status(400).json({ 'msg': 'Debes iniciar sesión' })
    
    try {
        const usuario = await USUARIO.findOne({ where: { id: id_usuario } })

        return res.status(200).json({saldo: usuario.saldo})
    }
    catch (e) {
        console.log(e)
        return res.status(500)
    }
}

const update_saldo = async (req, res) => {
    const id_usuario = req.payload.id
    const saldo = req.body.saldo

    if (!id_usuario || !saldo) return res.status(400).json({ 'msg': 'Faltan datos' })

    try {
        await USUARIO.update({ saldo: saldo }, { where: { id: id_usuario } })

        return res.status(200).json({ 'msg': 'Saldo actualizado' })
    }
    catch (e) {
        console.log(e)
        return res.status(500)
    }
}

const change_password = async (req, res) => {
    const { old_password, new_password } = req.body
    const id_usuario = req.payload.id

    try {
        const usuario = await USUARIO.findOne({ where: { id: id_usuario } })
        
        if (!usuario) return res.status(404).json({ 'msg': 'Usuario no encontrado' })
        
        const is_valid = await usuario.valid_password(old_password)
        if (!is_valid) return res.status(401).json({ 'msg': 'Contraseña incorrecta' })

        usuario.update({ password: new_password })

        return res.status(200).json({ 'msg': 'Contraseña actualizada' })
    }
    catch (e) {
        console.log(e)
        return res.status(500)
    }
}

module.exports = {
    register,
    login,
    get_saldo,
    update_saldo,
    change_password
}