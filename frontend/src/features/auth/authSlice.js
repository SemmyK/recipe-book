import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

//1.create initial state
const initialState = {
	user: user ? user : null,
	userData: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

//register
export const register = createAsyncThunk(
	'auth/register',
	async (user, thunkAPI) => {
		try {
			return authService.register(user)
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

//login
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return authService.login(user)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//logout
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
	try {
		return authService.logout()
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//get user data
export const getProfile = createAsyncThunk(
	'auth/get',
	async (userId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token

			return authService.getProfile(userId, token)
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

//delete user data
export const deleteProfile = createAsyncThunk(
	'auth/delete',
	async (userId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			console.log(thunkAPI.getState().auth.user)
			return authService.deleteProfile(userId, token)
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

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: state => {
			state.userData = null
			state.isError = false
			state.isLoading = false
			state.isSuccess = false
			state.message = ''
		},
	},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isError = false
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload.authUser
				state.userData = action.payload.userData
				state.message = action.payload.msg
			})
			.addCase(register.rejected, (state, action) => {
				state.isError = false
				state.isLoading = false
				state.isSuccess = true
				state.user = null
				state.userData = null
				state.message = action.payload
			})
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isError = false
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload.authUser
				state.userData = action.payload.userData
				state.message = action.payload.msg
			})
			.addCase(login.rejected, (state, action) => {
				state.isError = false
				state.isLoading = false
				state.isSuccess = true
				state.user = null
				state.userData = null
				state.message = action.payload
			})
			.addCase(logout.pending, state => {
				state.isLoading = true
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.isError = false
				state.isLoading = false
				state.isSuccess = true
				state.user = null
				state.userData = null
				state.message = action.payload.msg
			})
			.addCase(logout.rejected, (state, action) => {
				state.isError = false
				state.isLoading = false
				state.isSuccess = true
				state.message = action.payload
			})
			.addCase(getProfile.pending, state => {
				state.isLoading = true
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.isError = false
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload.authUser
				state.userData = action.payload.userData
			})
			.addCase(getProfile.rejected, (state, action) => {
				state.isError = false
				state.isLoading = false
				state.isSuccess = true
				state.user = null
				state.userData = null
				state.message = action.payload
			})
			.addCase(deleteProfile.pending, state => {
				state.isLoading = true
			})
			.addCase(deleteProfile.fulfilled, (state, action) => {
				state.isError = false
				state.isLoading = false
				state.isSuccess = true
				state.user = null
				state.userData = null
				state.message = action.payload.msg
			})
			.addCase(deleteProfile.rejected, (state, action) => {
				state.isError = false
				state.isLoading = false
				state.isSuccess = true
				state.message = action.payload
			})
	},
})

export default authSlice.reducer
