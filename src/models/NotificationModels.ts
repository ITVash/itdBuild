import mongoose, { Schema, Document } from "mongoose"

export interface INotification extends Document {
	endpoint: string
	expirationTime: string
	keys: {
		auth: string
		p256dh: string
	}
}

const NotificationSchema = new Schema(
	{
		endpoint: { type: String, default: null },
		expirationTime: { type: String, default: null },
		keys: {
			auth: { type: String, default: null },
			p256dh: { type: String, default: null },
		},
	},
	{ timestamps: true, versionKey: false },
)

const NotificationModel = mongoose.model<INotification>("Notification", NotificationSchema)

export default NotificationModel 
