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

module.exports = {
    register,
    login
}