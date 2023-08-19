import axios from 'axios'
import { config } from 'dotenv'

const API_URL = 'https://recipe-book-backend-steel.vercel.app/api/users'

//register user
const register = async userInfo => {
	const config = {
		headers: {
			AccessControlAllowHeaders: '*',
		},
	}
	const response = await axios.post(`${API_URL}/register`, userInfo, config)

	const { authUser, userData } = response.data

	if (authUser) {
		localStorage.setItem('user', JSON.stringify(authUser))
	}
	console.log(authUser, userData)
	return {
		authUser,
		userData,
		msg: `Welcome to the community, ${userData.username}`,
	}
}

//login user
const login = async userInfo => {
	const config = {
		headers: {
			AccessControlAllowHeaders: '*',
		},
	}
	const response = await axios.post(`${API_URL}/login`, userInfo, config)

	const { authUser, userData } = response.data

	if (authUser) {
		localStorage.setItem('user', JSON.stringify(authUser))
	}
	console.log(authUser, userData)
	return { authUser, userData, msg: `Welcome back, ${userData.username}` }
}

//logout user
const logout = () => {
	localStorage.removeItem('user')

	return { msg: 'Successfully logged out' }
}

//get user profile
const getProfile = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			AccessControlAllowHeaders: '*',
		},
	}

	//send get request
	const response = await axios.get(`${API_URL}/${id}`, config)

	return response.data
}

//delete user profile
const deleteProfile = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			AccessControlAllowHeaders: '*',
		},
	}

	//send get request
	const response = await axios.delete(`${API_URL}/${id}`, config)

	localStorage.removeItem('user')

	return {
		data: response.data,
		msg: 'Sorry to see you go. Successfully deleted profile.',
	}
}

const authService = { register, login, logout, getProfile, deleteProfile }

export default authService
