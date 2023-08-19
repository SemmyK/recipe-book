import axios from 'axios'

const API_URL = 'https://recipe-book-backend-steel.vercel.app/api/recipes'

//get all recipes
const getAllRecipes = async () => {
	const response = await axios.get(`${API_URL}`)
	return response.data
}

//get all user recipes
const getUserRecipes = async (userId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.get(`${API_URL}?user=${userId}`, config)

	return response.data
}

//search recipes
const searchRecipes = async searchTerm => {
	const response = await axios.get(`${API_URL}?title=${searchTerm}`)

	return response.data
}

//get single recipe
const getRecipe = async recipeId => {
	const response = await axios.get(`${API_URL}/${recipeId}`)

	return response.data
}

//create recipe
const createRecipe = async (recipeData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await axios.post(API_URL, recipeData, config)

	const { recipe, recipes } = response.data

	return { recipe, recipes, msg: 'Successfully created recipe.' }
}

//update recipe
const updateRecipe = async (recipeData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const { id: recipeId, newRecipeCopy: updatedRecipe } = recipeData

	//send get request
	const response = await axios.put(
		`${API_URL}/${recipeId}`,
		updatedRecipe,
		config
	)

	const { recipe, recipes } = response.data

	return { recipe, recipes, msg: 'Successfully updated recipe.' }
}

//delete recipe
const deleteRecipe = async (recipeId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.delete(`${API_URL}/${recipeId}`, config)

	const { recipes } = response.data

	return { msg: 'Successfully deleted recipe.', recipes }
}

const recipeService = {
	getAllRecipes,
	getUserRecipes,
	searchRecipes,
	getRecipe,
	createRecipe,
	updateRecipe,
	deleteRecipe,
}

export default recipeService
