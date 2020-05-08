import { Request, Response } from "express"
import { NativeError } from "mongoose"
import webpush from "web-push"

import { NotificationModels } from "../models"
import { INotification } from "../models/NotificationModels"

class NotificationControllers {
	create = (req: Request, res: Response) => {
		const data: INotification = req.body
		const PostData = {
			endpoint: data.endpoint,
			expirationTime: data.expirationTime,
			keys: {
				auth: data.keys.auth,
				p256dh: data.keys.p256dh,
			},
		}

		const notification = new NotificationModels(PostData)
		notification
			.save()
			.then((obj: INotification) => {
				res.status(201).json({ data: obj })
			})
			.catch((err: any) => {
				res.status(500).json({
					status: "error",
					message: err,
				})
			})
	}
	sendAll = (req: Request, res: Response) => {
		const data = req.body
		const subject = JSON.stringify({
			title: data.title,
			body: data.body,
		})
		const user: INotification[] = []
		NotificationModels.find()
			.then(notifi => {
				notifi.forEach((doc: INotification) => {
					user.push(doc)
				})
				return user
			})
			.then(notifiUser => {
				notifiUser.forEach(pushUser => {
					webpush
						.sendNotification(pushUser, subject)
						.then((result: any) => {
							console.log(result)
							res.json({
								status: 200,
								message: 'Сообщения отправлены!'
							})
						})
						.catch((err: any) => {
							console.log(err)
							res.json({
								status: 404,
								message: 'Сообщения не отправлены!'
							})
						})
				})
			})
	}
}

export default NotificationControllers
