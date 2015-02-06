/**
 * User model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var crypto = require('crypto');

// define schema
var schema = new Schema({
  ObjectId: ObjectId,
  email: { type: String, unique: true },
  firstname: { type: String },
  lastname: { type: String },
  password: String,
  last_login: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
  last_modified: { type: Date, default: Date.now },
});

/*
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
*/

// Generate hash
schema.methods.createHash = function(password) {
  var shasum = crypto.createHash('sha1');
  shasum.update(password);
  return shasum.digest('hex');;
};

// password setter
schema.path('password').set(function(v) {
  return this.createHash(v);
});

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
