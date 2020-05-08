import express from 'express'
import dotenv from 'dotenv'

import { CreateRoutes, connect } from './core'

const app = express()
dotenv.config()
connect()
CreateRoutes(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу: http://localhost:${PORT}`)
})