var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.ObjectId;

module.exports = mongoose.model('User',{
	id: ObjectId,
	email: { type: String, index: { unique: true } },
	password: String,
	firstName: String,
	lastName: String,
	lastLogin: { type: Date, default: Date.now },
	createdAt: { type: Date, default: Date.now },
	lastEdit: { type: Date, default: null }
});
