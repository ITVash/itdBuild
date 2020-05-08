import mongoose, { Schema, Document } from "mongoose"

export interface IAd extends Document {
	logo: string
	title: string
	type: string
	city: string
	body: string
	lat: number
	lng: number
	link: string
}

const AdSchema = new Schema(
	{
		logo: { type: String, default: "Логотип" },
		title: { type: String, default: "Название" },
		type: { type: String, default: "Тип" },
		city: { type: String, default: "Город" },
		body: { type: String, default: "Текст" },
		lat: { type: Number, default: 0 },
		lng: { type: Number, default: 0 },
		link: { type: String, default: "Ссылка" },
	},
	{ timestamps: true, versionKey: false },
)

const AdModels = mongoose.model<IAd>("Ad", AdSchema)

export default AdModels
