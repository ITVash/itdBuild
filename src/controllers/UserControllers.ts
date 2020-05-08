import { Request, Response } from 'express'

import { createToken } from '../utils'
import { UserModel } from '../models'
import { IUsers } from '../models/UserModels'

class UserControllers {
  create = (req: Request, res: Response) => {
    const data: IUsers = req.body
    const PostData = {
      login: data.login,
      access: data.access,
      password: data.password
    }
    const user = new UserModel(PostData)
    user.save()
      .then((obj: IUsers) => {
        res.status(201).json(obj)
      })
      .catch((err: any) => {
        res.status(500).json({
          status: 'error',
          message: err
        })
      })
  }
  login = (req: Request, res: Response) => {
    const data: IUsers = req.body
    const LoginData = {
      login: data.login,
      password: data.password
    }
    UserModel.findOne({ login: LoginData.login }, (err: any, user: IUsers) => {
      if (err) return res.status(500).json({ status: 500, message: err })
      if (!user) return res.status(404).json({ status: 404, message: 'Пользователь не найден!' })
      if (LoginData.password === user.password) {
        const dataTok = {
          id: user._id,
          login: user.login
        }
        const token = createToken(dataTok)
        res.json({
          id: user._id,
          login: user.login,
          access: user.access,
          token
        })
      } else {
        res.status(403).json({
          status: 403,
          message: 'Неверный логин или пароль!'
        })
      }
    })
  }
  getMe = (req: Request, res: Response) => {
    const id = req.body.uid.user.id
    UserModel.findById(id, (err: any, user: IUsers) => {
      if (err) return res.status(500).json({ status: 500, message: err })
      if (!user) return res.status(404).json({ status: 404, message: `Пользователь ${id} не найден!` })
      const obj = {
        id: user._id,
        login: user.login,
        access: user.access
      }
      res.json(obj)
    })
  }
  update = (req: Request, res: Response) => {}
  delete = (req: Request, res: Response) => {}
}

export default UserControllers