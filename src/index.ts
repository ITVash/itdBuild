import express from 'express'
//import subdomain from 'express-subdomain'
import dotenv from 'dotenv'
//import http from 'http'

import { CreateRoutes, connect } from './core'

const app = express()
dotenv.config()
connect()
CreateRoutes(app)

//const serv = http.createServer(app)

const PORT:number | any = process.env.PORT || 5051
//const host: string = 'api.itd.company'
const host:string = '192.168.0.76'
app.listen(PORT, host, (e) => {
  console.log(`Сервер запущен по адресу: ${host}:${PORT}`)
  console.log('e', e)
})
/* serv.listen(PORT, host, () => {
  console.log(`Сервер запущен по адресу: http://${host}:${PORT}`)
  //console.log('Адресс: ', serv.address().address)
})
serv.on('listening', () => {
  const address = serv.address()
  console.log('Listen: ', address)
}) */
