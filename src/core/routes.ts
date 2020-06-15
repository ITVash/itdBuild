import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import multer from "multer"
import path from "path"
import webpush from 'web-push'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

/* import {
	UserControllers,
	RouteMapControllers,
	PeopleControllers,
	NewsControllers,
	NotificationControllers,
	CounterControllers,
	AdControllers
} from "../controllers"
import { verifyToken } from "../utils" */

dotenv.config()

/* const userCtrl = new UserControllers()
const routeMapCtrl = new RouteMapControllers()
const peopleCtrl = new PeopleControllers()
const newsCtrl = new NewsControllers()
const notifiCtrl = new NotificationControllers()
const countCtrl = new CounterControllers()
const adCtrl = new AdControllers() */

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
	//app.use("/", express.static(path.join("client")))
	
	/* app.get("/", (req: express.Request, res: express.Response) => {
		res.sendFile(path.resolve("client", "index.html"))
		
	}) */
			/* app.get("/manager/", (req: express.Request, res: express.Response) => {
				res.sendFile(path.resolve("client", "index.html"))
				
			}) */
	app.get("/api", (req: express.Request, res: express.Response) => {
		res.send("Тут все роуты нашего сервера!!!")
	})

	/**
	 * Send Mail
	 */
	app.post("/api/sendform", async (req: express.Request, res: express.Response) => {
		const data:{name: string, phone: string, email: string, text: string} = req.body
		if (!data.name || !data.phone || !data.email || !data.text) return res.status(400).json({ message: "Поля не могут быть пустыми" })
		const transport = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "vashdns@gmail.com",
				pass: "ragnarok1985"
			}
		})
		await transport.sendMail({
			from: "robot@itd.company",
			to: "itdwebcompany@gmail.com",
			subject: "Обратная связь с сайта",
			text: `${data.text}`,
			html: `<p>Имя отправителя: ${data.name}</p>
			<p>Телефон отправителя: ${data.phone}</p>
			<p>Почта отправителя: ${data.email}</p>
			<p>Сообщение: <br /> ${data.text}</p>`
		}, (error, info) => {
				if (error) {
					console.log('Ошибка отправки почты!', error)
					res.status(400).json('Ошибка отправки почты!')
				} else {
					console.log('Почта отправлена!', info)
					res.status(200).json('Почта отправлена!')
				}
		})
		//console.log('data', data)
	})

	app.post("/api/sendclick", async (req: express.Request, res: express.Response) => {
		const data = req.body
		console.log('data', data)
		console.log('req', req.body)
		if (!data.forms[0] || !data.forms[1] || !data.forms[2] || !data.forms[3]) return res.status(400).json({ message: "Поля не могут быть пустыми", data })
		const transport = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "vashdns@gmail.com",
				pass: "ragnarok1985"
			}
		})
		await transport.sendMail({
			from: "robot@itd.company",
			to: "itdwebcompany@gmail.com",
			subject: "Чеклист с сайта",
			text: `${data.forms[3]}`,
			html: `<p>Имя отправителя: ${data.forms[0]}</p>
			<p>Телефон отправителя: ${data.forms[1]}</p>
			<p>Почта отправителя: ${data.forms[2]}</p>
			<p>Сообщение: <br /> ${data.forms[3]}</p>
			<p>Данные чекбокса:</p>
			<p>Тип сайта: ${data.list1}</p>
			<p>Языки: ${data.list2}</p>
			<p>Сроки: ${data.list3}</p>
			<p>Наличие логотипа или фирменного стиля: ${data.list4}</p>`
		}, (error, info) => {
				if (error) {
					console.log('Ошибка отправки почты!', error)
					res.status(400).json('Ошибка отправки почты!')
				} else {
					console.log('Почта отправлена!', info)
					res.status(200).json('Почта отправлена!')
				}
		})
	})

	/**
	 * Attachments
	 */
	/* app.post(
		"/api/attachments",
		upload.array("file"),
		(req: express.Request, res: express.Response) => {
			const file = req.files
			res.json({
				status: "file is upload",
				data: file,
			})
		},
	) */
	/**
	 * User Routers
	 */
	/* app.post("/api/signup", userCtrl.create)
	app.post("/api/login", userCtrl.login)
	app.get("/api/getMe", verifyToken, userCtrl.getMe)
	app.put("/api/user/:id", verifyToken, userCtrl.update)
	app.delete("/api/user/:id", verifyToken, userCtrl.delete) */

	/**
	 * RouteMap Routers
	 */
	/* app.post("/api/routeMap", routeMapCtrl.create)
	app.get("/api/routeMap", routeMapCtrl.show)
	app.get("/api/routeMap/:id", routeMapCtrl.showID)
	app.put("/api/routeMap/:id", routeMapCtrl.update)
	app.delete("/api/routeMap/:id", routeMapCtrl.delete) */

	/**
	 * People Routers
	 */
	/* app.post("/api/people", peopleCtrl.create)
	app.put("/api/people/:id", peopleCtrl.update)
	app.get("/api/people", peopleCtrl.show)
	app.get("/api/people/:id", peopleCtrl.showID)
	app.delete("/api/people/:id", peopleCtrl.delete) */

	/**
	 * News Routers
	 */
	/* app.post("/api/news", newsCtrl.create)
	app.put("/api/news/:id", newsCtrl.update)
	app.get("/api/news", newsCtrl.show)
	app.get("/api/news/:id", newsCtrl.showID)
	app.delete("/api/news/:id", newsCtrl.delete) */

	/**
	 * Ad Routers
	 */
	/* app.post("/api/ads", adCtrl.create)
	app.put("/api/ads/:id", adCtrl.update)
	app.get("/api/ads", adCtrl.show)
	app.delete("/api/ads/:id", adCtrl.delete) */

	/**
	 * Notification Routers 
	 */
	/* app.post('/notifications/subscribe', notifiCtrl.create)
	app.post('/api/notifications/send', notifiCtrl.sendAll) */

	/**
	 * Counter Router
	 */
	/* app.get('/api/count/add', countCtrl.create)
	app.get('/api/count', countCtrl.show) */
}
export default CreateRoutes
