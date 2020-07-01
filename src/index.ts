import express from 'express'
//import subdomain from 'express-subdomain'
import dotenv from 'dotenv'
import https from 'https'
import fs from 'fs'

import { CreateRoutes, connect } from './core'

const app = express()
dotenv.config()
connect()
CreateRoutes(app)

const opt = {
  key: fs.readFileSync('/home/itd.company/conf/web/ssl.api.itd.company.key'),
  cert: fs.readFileSync('/home/itd.company/conf/web/ssl.api.itd.company.crt')
}
const serv = new https.Server(opt, app)

const PORT:number | any = process.env.PORT || 5051
//const host: string = 'api.itd.company'
const host:string = '192.168.0.76'
/* app.listen(PORT, host, (e) => {
  console.log(`Сервер запущен по адресу: ${host}:${PORT}`)
}) */
serv.listen(PORT, host, () => {
  console.log(`Сервер запущен по адресу: http://${host}:${PORT}`)
  //console.log('Адресс: ', serv.address().address)
})
serv.on('listening', () => {
  const address = serv.address()
  console.log('Listen: ', address)
})
