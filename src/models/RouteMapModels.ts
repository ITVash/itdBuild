import mongoose, { Schema, Document } from "mongoose"

export interface IRouteMap extends Document {
	city: string
	photo: object
	body: string
	lat: number
	lng: number
	visited: boolean
	images: object
	videos: object
}

const RouteMapSchema = new Schema(
	{
		city: { type: String, default: "Город", unique: true },
		photo: { type: Object, default: null },
		body: {type: String, default: 'Информация о событиях' },
		lat: { type: Number, default: 0 },
		lng: { type: Number, default: 0 },
		visited: { type: Boolean, default: false },
		images: { type: Object, default: null },
		videos: { type: Object, default: null }
	},
	{ timestamps: true, versionKey: false },
)

const RouteMapModels = mongoose.model<IRouteMap>("RouteMap", RouteMapSchema)

export default RouteMapModels
