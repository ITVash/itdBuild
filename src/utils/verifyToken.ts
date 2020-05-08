import jwt from 'jsonwebtoken'
import express from 'express'
import dotenv from 'dotenv'

import { UserModel } from '../models'
import { IUsers } from '../models/UserModels'
dotenv.config()
export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let token: string
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split('Bearer ')[1]
  } else {
    console.error('Токен не найден!')
    return res.status(403).json({
      status: 403,
      message: 'Не указан токен авторизации'
    })
  }
  jwt.verify(token, process.env.VERIFY_KEY || '', (err: jwt.VerifyErrors, decodeJWT: object | any) => {
    if (err || !decodeJWT) {
      console.error('Не удалось расшифровать токен!')
      res.status(403).json({
        status: 403,
        message: `Не удалось расшифровать токен! ${err}`
      })
    } else {
      UserModel.findById(decodeJWT.user.id, (err: any, user: IUsers) => {
        if (err || !user) {
          console.error(`Ид токена не найден в базе!`)
          return res.status(404).json({
            status: 404,
            message: `По данному ключу, пользователь не найден!`
          })
        }
        req.body.uid = decodeJWT 
        next()
      })
    }
  })
}