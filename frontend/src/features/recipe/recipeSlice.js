import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recipeService from './recipeService'

//1.create initial state
const initialState = {
	recipes: null,
	recipe: null,
	userRecipes: null,
	searchedRecipes: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

//get all recipes
export const getAllRecipes = createAsyncThunk(
	'recipes/getAll',
	async (_, thunkAPI) => {
		try {
			const recipes = await recipeService.getAllRecipes()
			return recipes
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

//get all user recipes
export const getUserRecipes = createAsyncThunk(
	'recipe/userRecipes',
	async (userId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token

			return recipeService.getUserRecipes(userId, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

//search recipes
export const searchRecipes = createAsyncThunk(
	'recipe/search',
	async (searchTerm, thunkAPI) => {
		try {
			return recipeService.searchRecipes(searchTerm)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

//get single recipe
export const getRecipe = createAsyncThunk(
	'recipes/get',
	async (recipeId, thunkAPI) => {
		try {
			return recipeService.getRecipe(recipeId)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const createRecipe = createAsyncThunk(
	'recipe/create',
	async (recipeData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			return recipeService.createRecipe(recipeData, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

//update recipe
export const updateRecipe = createAsyncThunk(
	'recipe/update',
	async (recipeData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token

			return recipeService.updateRecipe(recipeData, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

//delete recipe
export const deleteRecipe = createAsyncThunk(
	'recipe/delete',
	async (recipeId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			return recipeService.deleteRecipe(recipeId, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const recipeSlice = createSlice({
	name: 'recipe',
	initialState,
	reducers: {
		reset: state => initialState,
	},
	extraReducers: builder => {
		builder
			.addCase(getAllRecipes.pending, state => {
				state.isLoading = true
			})
			.addCase(getAllRecipes.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.recipes = action.payload
			})
			.addCase(getAllRecipes.rejected, (state, action) => {
				state.isLoading = false
				state.recipes = null
				state.isError = true
				state.message = action.payload
			})
			.addCase(getUserRecipes.pending, state => {
				state.isLoading = true
			})
			.addCase(getUserRecipes.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.userRecipes = action.payload
			})
			.addCase(getUserRecipes.rejected, (state, action) => {
				state.isLoading = false
				state.userRecipes = null
				state.isError = true
				state.message = action.payload
			})
			.addCase(searchRecipes.pending, state => {
				state.isLoading = true
			})
			.addCase(searchRecipes.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.searchedRecipes = action.payload
			})
			.addCase(searchRecipes.rejected, (state, action) => {
				state.isLoading = false
				state.searchedRecipes = null
				state.isError = true
				state.message = action.payload
			})
			.addCase(getRecipe.pending, state => {
				state.isLoading = true
			})
			.addCase(getRecipe.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.recipe = action.payload
			})
			.addCase(getRecipe.rejected, (state, action) => {
				state.isLoading = false
				state.recipe = null
				state.isError = true
				state.message = action.payload
			})
			.addCase(createRecipe.pending, state => {
				state.isLoading = true
			})
			.addCase(createRecipe.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.recipe = action.payload.recipe
				state.recipes = action.payload.recipes
				state.message = action.payload.msg
			})
			.addCase(createRecipe.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(updateRecipe.pending, state => {
				state.isLoading = true
			})
			.addCase(updateRecipe.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.recipes = action.payload.recipes
				state.recipe = action.payload.recipe
				state.message = action.payload.msg
			})
			.addCase(updateRecipe.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(deleteRecipe.pending, state => {
				state.isLoading = true
			})
			.addCase(deleteRecipe.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.recipes = action.payload.recipes
				state.recipe = null
				state.message = action.payload.msg
			})
	},
})

export default recipeSlice.reducer
