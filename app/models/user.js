var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.ObjectId
	, shortid = require('shortid')
	, crypto = require('crypto')
	, config = require('../config');

var userSchema = new Schema({
	id: ObjectId,
	email: { type: String, index: { unique: true } },
	password: String,
	firstName: String,
	lastName: String,
	token: { type: String, default: null },
	tokenValidity: { type: Date, default: null },
	lastLogin: { type: Date, default: Date.now },
	createdAt: { type: Date, default: Date.now },
	lastEdit: { type: Date, default: null }
});

userSchema.methods.createNewToken = function createNewToken () {
	var shasum = crypto.createHash('sha512');
	shasum.update(shortid.generate());
	this.token = shasum.digest('hex');
	this.tokenValidity = Date.now() + config.passport.tokenValidity;
};

module.exports = mongoose.model('User', userSchema);
