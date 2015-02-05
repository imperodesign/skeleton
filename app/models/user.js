/**
 * User model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var bCrypt = require('bcrypt-nodejs');

// define schema
var schema = new Schema({
  ObjectId: ObjectId,
  email: {type: String, unique: true},
  firstname: {type: String},
  lastname: {type: String},
  password: String,
  created_at: {type: Date, default: Date.now},
});


// compares password hash
schema.methods.validPassword = function(password){
  return bCrypt.compareSync(password, this.password);
};

// Generates hash using bCrypt
schema.methods.createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

// update email
schema.methods.updateEmail = function(email, cb) {
  this.email = email;
  return this.save(cb);
};

// update password
schema.methods.updatePassword = function(pass, cb) {
  if ( this.validPassword(pass.current) ) {
    this.password = this.createHash(pass.new);
    return this.save(cb);
  } else {
    return cb(new Error('Invalid password'), null);
  }
};

// password setter
schema.path('password').set(function(v) {
  return this.createHash(v);
});

// create model
var User = mongoose.model('users', schema);

// validate repeat password
schema.pre('save', function(next, done) {
  var self = this;
/*
  if(this.password !== this.repeat_password) {
    console.log('Error: Password mismatch')
    next(new Error('Password mismatch'));
  }
*/
  next();
});

module.exports = User;
