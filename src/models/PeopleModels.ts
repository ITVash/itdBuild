import mongoose, { Schema, Document } from "mongoose"

export interface IPeople extends Document {
	avatar: string
	type: number
	cities: string
	name: string
	desc: string
	body: string
	link: string
	soc: {
		vk: string
		fb: string
		ins: string
		site: string
		you: string
		tw: string
	}
}

const PeopleSchema = new Schema(
	{
		avatar: { type: String, default: "Аватарка" },
		type: { type: Number, default: 0 },
		cities: { type: String, default: "ID cities" },
		name: { type: String, default: "Имя" },
		desc: { type: String, default: "Описание" },
		body: { type: String, default: "Текст" },
		link: { type: String, default: "Ссылка" },
		soc: {
			vk: { type: String, default: null },
			fb: { type: String, default: null },
			ins: { type: String, default: null },
			site: { type: String, default: null },
			you: { type: String, default: null },
			tw: { type: String, default: null },
		},
	},
	{ timestamps: true, versionKey: false },
)

const PeopleModels = mongoose.model<IPeople>("People", PeopleSchema)

export default PeopleModels
