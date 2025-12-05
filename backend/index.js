const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();

const routes_usuarios = require('./routes/routes_usuario')
const routes_libros = require('./routes/routes_libros')
const routes_venta = require('./routes/routes_venta')

app.use(morgan('dev'))

const allowedOrigins = new Set(['http://localhost:5173', 'http://127.0.0.1:5173'])
const corsOptions = {
  origin(origin, callback) {
    callback(null, !origin || allowedOrigins.has(origin))
  },
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','Accept','Origin'],
  credentials: false,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(express.json())
app.use(routes_usuarios)
app.use(routes_libros)
app.use(routes_venta)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
