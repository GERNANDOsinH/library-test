const JWT = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET_KEY

const verify = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return res.status(403).json({ msg: 'Token de acceso no proporcionado'})
    
    try {
        const decoded = JWT.verify(token, SECRET_KEY)
        
        req.payload = decoded
        next()
    }
    catch (e) {
        return res.status(401).json({ msg: 'Token de acceso no válido' })
    }
}

module.exports = verify