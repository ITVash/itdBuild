import { Request, Response } from "express"
import { NativeError } from "mongoose"

import { NewsModels } from "../models"
import { INews } from "../models/NewsModel"

class NewsControllers {
	create = (req: Request, res: Response) => {
		const data: INews = req.body
		const PostDaa = {
			title: data.title,
			body: data.body,
			images: data.images,
			videos: data.videos,
		}
		const news = new NewsModels(PostDaa)
		news
			.save()
			.then((obj: INews) => {
				res.status(201).json(obj)
			})
			.catch((err: any) => {
				res.status(500).json({
					status: "error",
					message: err,
				})
			})
	}
	show = (_: any, res: Response) => {
		NewsModels.find()
			.sort({"createdAt":"desc"})
			.exec((err: NativeError, obj: INews) => {
				if (err) return res.status(500).json({ status: 500, message: err })
				if (!obj)
					return res
						.status(404)
						.json({ status: 404, message: `Нет новостей для отображения!` })
				res.json(obj)
			})
	}
	showID = (req: Request, res: Response) => {
		const id = req.params.id
		NewsModels.find({ id: id })
			.sort("createdAt")
			.exec((err: NativeError, obj: INews) => {
				if (err) return res.status(500).json({ status: 500, message: err })
				if (!obj)
					return res
						.status(404)
						.json({ status: 404, message: `Нет новости для отображения!` })
				res.json(obj)
			})
	}
	update = (req: Request, res: Response) => {
		const id = req.params.id
		const data = req.body
		const updData = {
			title: data.title,
			body: data.body,
			images: data.images,
			videos: data.videos,
		}
		NewsModels.findOneAndUpdate({ _id: id }, updData, { new: true }, (err: any, obj: INews | any) => {
			if (err) return res.status(500).json({ status: 500, message: err })
				if (!obj)
					return res
						.status(404)
						.json({ status: 404, message: `Нет новости для обновления!` })
				res.json(obj)
		})
	}
	delete = (req: Request, res: Response) => {
		const id = req.params.id
		NewsModels.findById(id).remove().exec((err: NativeError, obj: any) => {
			if (err) {
				return res.status(403).json({
					status: 403,
					message: `Ошибка при удалении ${obj}`,
				})
			}
			res.json({
				status: 200,
				message: `Новость ${obj} удалена!`,
			})
		})
	}
}

export default NewsControllers
