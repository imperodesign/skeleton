var crypto = require('crypto')
  , shasum = crypto.createHash('sha1')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , User = require('../models/user.js')
  , UserModel = new User()
  , logger = require('../lib/logger')

exports.signup = function(req, res) {

  if(req.method.toLowerCase() !== 'post') {
    res.render('pages/signup', { csrfToken: req.csrfToken(), layout: false });
  }
  else {
    // console.log(req.body);
    new User(req.body).save(function (err) {
      if(err) {
        var e = 'User not created. ' + err;
        logger.debug(e);
        res.status(400).send(e);
        return;
      }
      // saved
      logger.debug('User created');
      res.status(201).send('User created');
    });
  }

}

exports.login = function(req, res) {

  if(req.method.toLowerCase() !== 'post') {
    res.render('pages/login', { csrfToken: req.csrfToken(), layout: false });
  } else {
    User.findOne({email: req.body.email}, function(err, result) {

      if(err) { throw err; }

      if(result === null) {
        res.status(401).send('Invalid username');
      } else {
        auth(result);
      }
    });

    function auth(userRes) {
      if(UserModel.createHash(req.body.password) !== userRes.password) {
        logger.debug('Invalid password');
        res.status(401).send('Invalid password');
      } else {
        User.update({ _id: ObjectId(userRes._id) }, {
          $currentDate: { time: true }
        });
        logger.debug('Auth OK');
        res.status(202).json(userRes);
      }
    }
  }
}
