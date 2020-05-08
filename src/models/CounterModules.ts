import mongoose, { Schema, Document } from "mongoose"

export interface ICounter extends Document {
	type: string
}

const CounterSchema = new Schema(
	{
		type: { type: String, default: "Installed" },
	},
	{ timestamps: true, versionKey: false },
)

const CounterModels = mongoose.model<ICounter>("Counter", CounterSchema)

export default CounterModels
