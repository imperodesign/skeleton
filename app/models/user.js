/**
 * User model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bCrypt = require('bcrypt-nodejs');

// define schema
var schema = new Schema({
  email: String,
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

// create model
var User = mongoose.model('users', schema);

// validate unique email address
schema.pre('save', function(next, done) {
  var self = this;
  this.model('users').find({ email: self.email }, function(err, resp) {
    if (err) done(err);

    // success: if email is unregistered, or queried self document
    if (!resp.length || resp[0]._id.equals(self._id) )
      next();
    else
      done(new Error('Email is already registered'));
  }).limit(1);
});

module.exports = User;
