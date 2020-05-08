import { Request, Response } from "express"
import { NativeError } from "mongoose"

import { AdModels } from "../models"
import { IAd } from "../models/AdModels"

class AdControllers {
	create = (req: Request, res: Response) => {
		const data: IAd = req.body
		const postData = {
			logo: data.logo,
			title: data.title,
			type: data.type,
			city: data.city,
			body: data.body,
			lat: data.lat,
			lng: data.lng,
			link: data.link,
		}
		const count = new AdModels(postData)
		count
			.save()
			.then((obj: IAd) => {
				res.status(201).json(obj)
			})
			.catch((err: any) => {
				res.status(500).json(err)
			})
	}
	show = (_: any, res: Response) => {
		AdModels.find({}, (err: any, obj: IAd) => {
			if (err) return res.status(500).json(err)
			if (!obj) return res.status(404).json({ status: 404, message: "Нет Рекламы для отображения" })
			res.json(obj)
		})
	}
	update = (req: Request, res: Response) => {
		const id = req.params.id
    const data: IAd = req.body
		const postData = {
			logo: data.logo,
			title: data.title,
			type: data.type,
			city: data.city,
			body: data.body,
			lat: data.lat,
			lng: data.lng,
			link: data.link,
		}
		AdModels.findByIdAndUpdate(
			{ _id: id },
			postData,
			{ new: true },
			(err: any, ad: IAd | null) => {
				if (err) return res.status(500).json({ status: 500, message: err })
				if (!ad)
					return res
						.status(404)
						.json({ status: 404, message: `Заказчик ${id} не найден!` })
				res.status(200).json(ad)
			},
		)
	}
	delete = (req: Request, res: Response) => {
		const id = req.params.id
		AdModels.findById(id)
			.remove()
			.exec((err: NativeError, obj: any) => {
        if (err) {
          return res.status(403).json({
            status: 403,
            message: `Ошибка при удалении ${obj}`,
          })
        }
        res.json({
					status: 200,
					message: `Заказчик ${obj} удален`,
				})
			})
	}
}
export default AdControllers
