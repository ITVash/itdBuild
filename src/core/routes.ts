import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import multer from "multer"
import path from "path"
import webpush from 'web-push'
import dotenv from 'dotenv'

import {
	UserControllers,
	RouteMapControllers,
	PeopleControllers,
	NewsControllers,
	NotificationControllers,
	CounterControllers,
	AdControllers
} from "../controllers"
import { verifyToken } from "../utils"

dotenv.config()

const userCtrl = new UserControllers()
const routeMapCtrl = new RouteMapControllers()
const peopleCtrl = new PeopleControllers()
const newsCtrl = new NewsControllers()
const notifiCtrl = new NotificationControllers()
const countCtrl = new CounterControllers()
const adCtrl = new AdControllers()

//const vapidKey = webpush.generateVAPIDKeys()
//console.log('VapidKey', vapidKey)
webpush.setVapidDetails('mailto:vashdns@gmail.com', `${process.env.PUBLIC_KEY}`, `${process.env.PRIVATE_KEY}`)
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "upload")
	},
	filename: (req, file, cb) => {
		cb(null, `${file.originalname}`)
	},
})
let upload = multer({ storage: storage })

const CreateRoutes = (app: express.Express) => {
	app.use(cors())
	app.use("/upload", express.static("upload"))
	app.use(bodyParser.json())
	app.use("/", express.static(path.join("client")))
	
	app.get("/", (req: express.Request, res: express.Response) => {
		res.sendFile(path.resolve("client", "index.html"))
		//res.send("Добро пожаловать на сервер!!!")
	})
	app.get("/manager/", (req: express.Request, res: express.Response) => {
		res.sendFile(path.resolve("client", "index.html"))
		//res.send("Добро пожаловать на сервер!!!")
	})
	app.get("/api", (req: express.Request, res: express.Response) => {
		res.send("Тут все роуты нашего сервера!!!")
	})

	/**
	 * Attachments
	 */
	app.post(
		"/api/attachments",
		upload.array("file"),
		(req: express.Request, res: express.Response) => {
			const file = req.files
			res.json({
				status: "file is upload",
				data: file,
			})
		},
	)
	/**
	 * User Routers
	 */
	app.post("/api/signup", userCtrl.create)
	app.post("/api/login", userCtrl.login)
	app.get("/api/getMe", verifyToken, userCtrl.getMe)
	app.put("/api/user/:id", verifyToken, userCtrl.update)
	app.delete("/api/user/:id", verifyToken, userCtrl.delete)

	/**
	 * RouteMap Routers
	 */
	app.post("/api/routeMap", routeMapCtrl.create)
	app.get("/api/routeMap", routeMapCtrl.show)
	app.get("/api/routeMap/:id", routeMapCtrl.showID)
	app.put("/api/routeMap/:id", routeMapCtrl.update)
	app.delete("/api/routeMap/:id", routeMapCtrl.delete)

	/**
	 * People Routers
	 */
	app.post("/api/people", peopleCtrl.create)
	app.put("/api/people/:id", peopleCtrl.update)
	app.get("/api/people", peopleCtrl.show)
	app.get("/api/people/:id", peopleCtrl.showID)
	app.delete("/api/people/:id", peopleCtrl.delete)

	/**
	 * News Routers
	 */
	app.post("/api/news", newsCtrl.create)
	app.put("/api/news/:id", newsCtrl.update)
	app.get("/api/news", newsCtrl.show)
	app.get("/api/news/:id", newsCtrl.showID)
	app.delete("/api/news/:id", newsCtrl.delete)

	/**
	 * Ad Routers
	 */
	app.post("/api/ads", adCtrl.create)
	app.put("/api/ads/:id", adCtrl.update)
	app.get("/api/ads", adCtrl.show)
	app.delete("/api/ads/:id", adCtrl.delete)

	/**
	 * Notification Routers 
	 */
	app.post('/notifications/subscribe', notifiCtrl.create)
	app.post('/api/notifications/send', notifiCtrl.sendAll)

	/**
	 * Counter Router
	 */
	app.get('/api/count/add', countCtrl.create)
	app.get('/api/count', countCtrl.show)
}
export default CreateRoutes
