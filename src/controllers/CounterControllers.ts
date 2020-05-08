import { Request, Response } from "express"

import { CounterModels } from "../models"
import { ICounter } from "../models/CounterModules"

class CounterControllers {
	create = (_: any, res: Response) => {
    const post = {
      type: "Installed"
    }
		const count = new CounterModels(post)
		count
			.save()
			.then((obj: ICounter) => {
				res.status(201).json(obj)
			})
			.catch((err: any) => {
				res.status(500).json(err)
			})
	}
  show = (_: any, res: Response) => {
    CounterModels.find({}, (err: any, obj: ICounter) => {
      if (err) return res.status(500).json(err)
      res.json(obj)
    })
  }
}
export default CounterControllers
