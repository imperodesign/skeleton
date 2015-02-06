var crypto = require('crypto');
var shasum = crypto.createHash('sha1');
var User = require('../models/user.js');
var UserModel = new User();

exports.signup = function(req, res) {

  if(req.method.toLowerCase() !== 'post') {
    res.render('pages/signup', {layout: false});
  }
  else {
    // console.log(req.body);
    new User(req.body).save(function (err) {
      if(err) {
        //return handleError(err);
        res.send('User not created. ' + err + '.', {'Content-type' : 'text/plain'}, 400);
        return;
      }
      // saved
      res.send('User created', {'Content-type' : 'text/plain'}, 201);
    });
  }

}

exports.login = function(req, res) {

  if(req.method.toLowerCase() !== 'post') {
    res.render('pages/login', { layout: false });
  } else {
    User.findOne({email: req.body.email}, function(err, result) {

      console.log(result);

      if(err) { throw err; }

      if(result === null) {
        res.send('Invalid username', {'Content-type' : 'text/plain'}, 401);
      } else {
        auth(result);
      }
    });

    function auth(userRes) {

      if(UserModel.createHash(req.body.password) !== userRes.password) {
        res.send('Invalid password', {'Content-type' : 'text/plain'}, 401);
      } else {
        // TODO: find out why update doesn't work
        User.update({ _id: userRes._id }, { '$set': { last_login: Date.now() } });
        res.status(202).json(userRes);
      }
    }
  }
}
