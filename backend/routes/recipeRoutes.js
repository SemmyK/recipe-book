const express = require('express')
//init router
const router = express.Router()
//import controllers
const {
	getAllRecipes,
	getSingleRecipe,
	createRecipe,
	updateRecipe,
	deleteRecipe,
} = require('../controllers/recipeController')
//import function to protect route
//create protected route by adding protect as second argument to any route you want to protect
const { protect } = require('../middleware/authMiddleware')

//create routes with imported controllers
router.get('/', getAllRecipes)
router.post('/', protect, createRecipe)

router
	.route('/:id')
	.get(getSingleRecipe)
	.put(protect, updateRecipe)
	.delete(protect, deleteRecipe)

//export
module.exports = router
