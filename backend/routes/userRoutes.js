const express = require('express')
//init router
const router = express.Router()
//import controllers
const {
	registerUser,
	loginUser,
	getProfile,
	deleteProfile,
} = require('../controllers/userController')
//import function to protect route
const { protect } = require('../middleware/authMiddleware')

//create routes with imported controllers
router.post('/register', registerUser)
router.post('/login', loginUser)
//create protected route by adding protect as second argument to any route you want to protect
router.route('/:id').get(protect, getProfile).delete(protect, deleteProfile)

//export
module.exports = router
