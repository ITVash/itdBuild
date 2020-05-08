import mongoose, { Schema, Document } from 'mongoose'

export interface IUsers extends Document {
  login: string,
  password: string
  access: number,
}

const UserSchema = new Schema({
  login: {
    required: 'Login обязателен для заполнения',
    type: String,
    unique: true
  },
  access: {
    type: Number,
    required: 'Access обязателен для заполнения'
  },
  password: {
    type: String,
    required: 'Password обязателен для заполнения'
  }
},
  {
    timestamps: true,
    versionKey: false
})


const UserModel = mongoose.model<IUsers>('Users', UserSchema)

export default UserModel