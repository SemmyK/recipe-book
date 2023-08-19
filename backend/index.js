//bring in express
const express = require('express')
const cors = require('cors')
//import dotenv
require('dotenv').config()
//import error handler
const errorHandler = require('./middleware/errorMiddleware')
// Use the cors middleware
const corsOptions = {
	origin: 'https://recipe-book-nine.vercel.app/', // Replace with your frontend's origin
}
app.use(cors(corsOptions))
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
	app.use(express.static(path.resolve(__dirname, '../frontend/build')))
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
