//import express async handler which will wrap all controllers
const asyncHandler = require('express-async-handler')
//import bcrypt to hash the password
const bcrypt = require('bcryptjs')
//import JWT
const jwt = require('jsonwebtoken')
//import model
const User = require('../models/userModel')

//controller for registering user
// @desc   Register a new user
// @route  POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	//destructure data from request body
	const { username, email, password, firstName, lastName, birthday, theme } =
		req.body

	//validation
	if (
		!username ||
		!email ||
		!password ||
		!firstName ||
		!lastName ||
		!birthday
	) {
		//send error with 400 status code
		//OPTION 1
		// return res.status(400).json({ message: 'Please include all fields' })
		//OPTION2
		res.status(400)
		throw new Error('Please include all fields.')
	}

	//if there is no error and all fields are there
	//check if user already exists
	const userExists = await User.findOne({ email })
	if (userExists) {
		res.status(400)
		throw new Error('User already exists.')
	}

	// HASH THE PASSWORD
	//step 1: get salt
	const salt = await bcrypt.genSalt(12)
	//step 2 hash password with provided salt
	const hashedPassword = await bcrypt.hash(password, salt)

	//CREATE USER
	const user = await User.create({
		username,
		email,
		firstName,
		lastName,
		birthday,
		theme,
		password: hashedPassword,
	})

	if (user) {
		//if user was created send data back
		res.status(201).json({
			authUser: {
				_id: user._id,
				email: user.email,
				theme: user.theme,
				token: generateToken(user._id),
			},
			userData: user,
		})
	} else {
		//if user was not created send back error
		res.status(400)
		throw new Error('Invalid user data')
	}
})

//controller for login in user
// @desc   Login user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	//destructure email and pass from req body
	const { email, password } = req.body
	//check if user exists in db
	const user = await User.findOne({ email })

	if (user && (await bcrypt.compare(password, user.password))) {
		//if user exists and given password is the same as registered password
		res.status(200).json({
			authUser: {
				_id: user._id,
				email: user.email,
				theme: user.theme,
				token: generateToken(user._id),
			},
			userData: user,
		})
	} else {
		//if user does not exist send back error
		res.status(401)
		throw new Error('Invalid credentials')
	}
})

//controller for getting user info
// @desc   Get current user
// @route  GET /api/users/:id
// @access Private
const getProfile = asyncHandler(async (req, res) => {
	//get all user data from db (without password becase we put '-password' in authMiddleware)

	const { id } = req.params

	//choose what we want to send back from allData

	const userData = await User.findById(id).select('-password')

	if (!userData) {
		res.status(404)
		throw new Error('Profile not found')
	} else {
		if (req.user._id.toString() !== userData._id.toString()) {
			res.status(401)
			throw new Error('Not authorized')
		}

		res.status(200).json({ authUser: req.user, userData })
	}
})

//controller for deleting user profile
// @desc   Delete current user
// @route  DELETE /api/users/:id
// @access Private
const deleteProfile = asyncHandler(async (req, res) => {
	//get all user data from db (without password becase we put '-password' in authMiddleware)
	console.log(req)
	const { id } = req.params

	const userData = await User.findById(id)

	if (req.user._id.toString() !== userData._id.toString()) {
		res.status(401)
		throw new Error('Not authorized')
	} else {
		await User.findByIdAndDelete(req.user._id)
	}

	res.status(200).json({ msg: 'Successfully deleted user.' })
})

//function to generate token JWT
const generateToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	})
}

module.exports = {
	registerUser,
	loginUser,
	getProfile,
	deleteProfile,
}
