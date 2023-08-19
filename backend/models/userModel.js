const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Please add username'],
		},
		firstName: {
			type: String,
			required: [true, 'Please add first name'],
		},
		lastName: {
			type: String,
			required: [true, 'Please add last name'],
		},
		birthday: {
			type: Date,
		},
		email: {
			type: String,
			required: [true, 'Please add email'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please add password'],
		},
		theme: {
			type: String,
			default: '#58249c',
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('User', userSchema)
