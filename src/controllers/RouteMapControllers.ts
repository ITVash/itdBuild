import { Request, Response } from "express"

import { RouteMapModels } from "../models"
import { IRouteMap } from "../models/RouteMapModels"
import { NativeError } from "mongoose"

class RouteMapControllers {
	create = (req: Request, res: Response) => {
		//const file = req.files
		const data: IRouteMap = req.body
		const PostData = {
			city: data.city,
			photo: data.photo,
			body: data.body,
			lat: data.lat,
			lng: data.lng,
			visited: data.visited,
			images: data.images,
			videos: data.videos,
		}
		const routeMap = new RouteMapModels(PostData)
		routeMap
			.save()
			.then((obj: IRouteMap) => {
				res.status(201).json({ data: obj })
			})
			.catch((err: any) => {
				res.status(500).json({
					status: "error",
					message: err,
				})
			})
	}
	show = (_: any, res: Response) => {
		RouteMapModels.find({}, (err: any, routeMap: IRouteMap) => {
			if (err) return res.status(500).json({ status: 500, message: err })
			if (!routeMap)
				return res
					.status(404)
					.json({ status: 404, message: "Нет городов для отображения" })
			res.json(routeMap)
		})
			.sort("city")
			.exec()
	}
	showID = (req: Request, res: Response) => {
		const id = decodeURI(req.params.id)
		RouteMapModels.find({ city: id }).exec(
			(err: NativeError, obj: IRouteMap) => {
				if (err) return res.status(500).json({ status: 500, message: err })
				if (!obj)
					return res
						.status(404)
						.json({ status: 404, message: `Город ${id} не найден!` })
				res.json(obj)
			},
		)
	}
	update = (req: Request, res: Response) => {
		const id = req.params.id
		//const file = req.files
		const data: IRouteMap = req.body
		const UppData = {
			city: data.city,
			photo: data.photo,
			body: data.body,
			lat: data.lat,
			lng: data.lng,
			visited: data.visited,
			images: data.images,
			videos: data.videos,
		}
		RouteMapModels.findByIdAndUpdate(
			{ _id: id },
			UppData,
			{ new: true },
			(err: any, routeMap: IRouteMap | any) => {
				if (err) return res.status(500).json({ status: 500, message: err })
				if (!routeMap)
					return res
						.status(404)
						.json({ status: 404, message: `Город ${id} не найден!` })
				res.json(routeMap)
			},
		)
	}
	delete = (req: Request, res: Response) => {
		const id = req.params.id
		RouteMapModels.findById(id)
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
					message: `Город ${obj} удален`,
				})
			})
	}
}

export default RouteMapControllers
