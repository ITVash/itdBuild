import mongoose, { Schema, Document } from 'mongoose'

export interface INews extends Document {
  title: string
  body: string
  images: object
  videos: object
}

const NewsSchema = new Schema({
  title: {type: String, default: 'Название новости'},
  body: {type: String, default: 'Содержимое новости'},
  images: {type: Object, default: null},
  videos: {type: Object, default: null},
}, { timestamps: true, versionKey: false })

const NewsModels = mongoose.model<INews>('News', NewsSchema)

export default NewsModels