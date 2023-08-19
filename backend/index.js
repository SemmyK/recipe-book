//bring in express
const express = require('express')
//import colors to style terminal messages
const colors = require('colors')
//import dotenv
require('dotenv').config()
//import error handler
const errorHandler = require('./middleware/errorMiddleware')
//import connectDB
const connectDB = require('./config/db')
//define port
const PORT = process.env.PORT || 8000

//initialize app
const app = express()
app.get('/', (req, res) => {
	res.status(200).send('hello')
})
//add middleware (body-parser)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Your code
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	app.use(express.static(path.resolve(__dirname, 'frontend', 'build')))
	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, 'frontend', 'build', 'index.html'),
			function (err) {
				if (err) {
					res.status(500).send(err)
				}
			}
		)
	})
}
// Your code

//use route created in routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/recipes', require('./routes/recipeRoutes'))

//allow app to use errorHandler
app.use(errorHandler)

const startApp = async () => {
	try {
		//connect to DB
		await connectDB().then(() => {
			app.listen(PORT, (req, res) => {
				console.log(`Connected to db successfully. Server listening at ${PORT}`)
			})
		})
	} catch (error) {
		console.log(error)
	}
}

startApp()
