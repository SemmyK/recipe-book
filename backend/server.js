//bring in express
const express = require('express')
//import colors to style terminal messages
const colors = require('colors')
//add cors
const cors = require('cors')
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

//add middleware (body-parser)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
	cors({
		// origin: ['https://mern-recipe-book.onrender.com/', 'http://localhost:3000'],
		methods: ['GET', 'PUT', 'POST', 'DELETE'],
	})
)

//create the route
app.get('/', (req, res) => {
	res.send(
		'<div style=" text-align:center;display:flex;justify-conten:center;align-items:center;height:80vh"> <h1 style="margin:0 auto;">Welcome to RecipeBook server side</h1></div>'
	)
})

//use route created in routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/recipes', require('./routes/recipeRoutes'))

//allow app to use errorHandler
app.use(errorHandler)

const startApp = async () => {
	try {
		//connect to DB
		await connectDB()
		app.listen(PORT, (req, res) => {
			console.log(`Connected to db successfully. Server listening at ${PORT}`)
		})
	} catch (error) {
		console.log(error)
	}
}

startApp()
