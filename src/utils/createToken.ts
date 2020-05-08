import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
interface payload {
  id: Number,
  login: String
}
dotenv.config()
const config:string|any = process.env.SECRET_KEY
export default (user: payload) => {
  const token = jwt.sign({
    user
  }, config, { expiresIn: "7d" })
  return token
}
