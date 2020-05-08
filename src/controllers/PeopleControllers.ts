import { Request, Response } from "express"

import { PeopleModels } from "../models"
import { IPeople } from "../models/PeopleModels"
import { NativeError } from "mongoose"

class PeopleControllers {
  create = (req: Request, res: Response) => {
    //const file = req.file
		const data: IPeople = req.body
    const PostData = {
      avatar: data.avatar,
      type: data.type,
      cities: data.cities,
      name: data.name,
      desc: data.desc,
      body: data.body,
      link: data.link,
      soc: {
        vk: data.soc.vk,
        fb: data.soc.fb,
        ins: data.soc.ins,
        site: data.soc.site,
        you: data.soc.you,
        tw: data.soc.tw
      }
		}
		const routeMap = new PeopleModels(PostData)
		routeMap
			.save()
      .then((obj: IPeople) => {
        res.status(201).json(obj)
      })
      .catch((err: any) => {
        res.status(500).json({
          status: 'error',
          message: err
        })
      })
	}
  show = (_: any, res: Response) => {
    PeopleModels.find({}, (err: any, people: IPeople) => {
      if (err) return res.status(500).json({ status: 500, message: err })
      if (!people) return res.status(404).json({ status: 404, message: 'Нет людей для отображения' })
      res.json(people)
    })
  }
  showID = (req: Request, res: Response) => {
    const id = req.params.id
    PeopleModels.findById(id)
      .exec((err: NativeError, obj: IPeople) => {
        if (err) return res.status(500).json({ status: 500, message: err })
        if (!obj) return res.status(404).json({ status: 404, message: `Город ${id} не найден!` })
        res.json(obj)
      })
  }
  update = (req: Request, res: Response) => {
    const id = req.params.id
    //const file = req.file
    const data: IPeople = req.body
    const UppData = {
      avatar: data.avatar,
      type: data.type,
      cities: data.cities,
      name: data.name,
      desc: data.desc,
      body: data.body,
      link: data.link,
      soc: {
        vk: data.soc.vk,
        fb: data.soc.fb,
        ins: data.soc.ins,
        site: data.soc.site,
        you: data.soc.you,
        tw: data.soc.tw
      }
    }
    PeopleModels.findByIdAndUpdate({ _id: id }, UppData, { new: true }, (err: any, people: IPeople | any) => {
      if (err) return res.status(500).json({ status: 500, message: err })
      if (!people) return res.status(404).json({ status: 404, message: `Человек с ${id} не найден!` })
      res.json(people)
    })
  }
  delete = (req: Request, res: Response) => {
    const id = req.params.id
		PeopleModels.findById(id)
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
					message: `Человек ${obj} удален`,
				})
			})
  }
}

export default PeopleControllers
