//import express async handler which will wrap all controllers
const asyncHandler = require('express-async-handler')
//import models
const User = require('../models/userModel')
const Recipe = require('../models/recipeModel')

//controller for getting recipes
// @desc   Get all recipes
// @route  GET /api/recipes
// @access Public
const getAllRecipes = asyncHandler(async (req, res) => {
	//add querying
	const { user, title } = req.query
	const queryObject = {}

	if (title) {
		queryObject.title = { $regex: title, $options: 'i' }
	}

	if (user) {
		queryObject.user = user
	}

	const recipes = await Recipe.find(queryObject).sort({ createdAt: 'desc' })

	res.status(200).json(recipes)
})

//controller for getting single recipe
// @desc   Get single recipe
// @route  GET /api/recipes/:id
// @access Public
const getSingleRecipe = asyncHandler(async (req, res) => {
	const recipe = await Recipe.findById(req.params.id)

	if (!recipe) {
		res.status(404)
		throw new Error('Recipe not found')
	}

	res.status(200).json(recipe)
})

//controller for creating recipe
// @desc   Create recipe
// @route  POST /api/recipes
// @access Private

const createRecipe = asyncHandler(async (req, res) => {
	//get user using the id in JWT
	const user = await User.findById(req.user._id)

	//destructure product and description from req body
	const { title, cookingTime, method, type, ingredients } = req.body

	if (!title || !cookingTime || !method || !ingredients) {
		res.status(400)
		throw new Error('Please fill all fields')
	}

	if (!user) {
		//if user does not exist send back error
		res.status(401)
		throw new Error('Unauthorized access.User not found.')
	} else {
		//if user exists
		const recipe = await Recipe.create(
			{
				title,
				cookingTime,
				method,
				type,
				ingredients,
				user: user._id,
			},
			{ new: true }
		)

		const recipes = await Recipe.find()

		res.status(201).json({ recipe, recipes })
	}
})

//controller for updating single recipe
// @desc   Update single recipe
// @route  PUT /api/recipes/:id
// @access Private
const updateRecipe = asyncHandler(async (req, res) => {
	//get user using the id in JWT
	const user = await User.findById(req.user._id)

	if (!user) {
		//if user does not exist send back error
		res.status(401)
		throw new Error('Unauthorized access.User not found.')
	} else {
		//if user exists and given password is the same as registered password
		const recipe = await Recipe.findById(req.params.id)

		if (!recipe) {
			res.status(404)
			throw new Error('Ticket not found')
		}

		if (recipe.user.toString() !== req.user._id.toString()) {
			res.status(401)
			throw new Error('Not authorized')
		}

		const updatedRecipe = await Recipe.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)

		const recipes = await Recipe.find().sort('createdAt')

		res.status(200).json({ recipe: updatedRecipe, recipes })
	}
})

//controller for deleting single recipe
// @desc   Delete single recipe
// @route  DELETE /api/recipes/:id
// @access Private
const deleteRecipe = asyncHandler(async (req, res) => {
	//get user using the id in JWT
	const user = await User.findById(req.user._id)

	if (!user) {
		//if user does not exist send back error
		res.status(401)
		throw new Error('Unauthorized access.User not found.')
	}
	//if user exists and given password is the same as registered password
	const recipe = await Recipe.findById(req.params.id)

	if (!recipe) {
		res.status(404)
		throw new Error('Ticket not found')
	}

	if (recipe.user.toString() !== req.user._id.toString()) {
		res.status(401)
		throw new Error('Not authorized')
	}

	await Recipe.findByIdAndRemove(req.params.id)

	const recipes = await Recipe.find()

	res.status(200).json({ success: true, recipes })
})

module.exports = {
	getAllRecipes,
	getSingleRecipe,
	createRecipe,
	updateRecipe,
	deleteRecipe,
}
