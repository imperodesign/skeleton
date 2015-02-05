var bCrypt = require('bcrypt-nodejs');
var User = require("../models/user.js");
var UserModel = new User();

exports.signup = function(req, res) {

  // console.log(req.method.toLowerCase());

  if(req.method.toLowerCase() != "post") {
    res.render("pages/signup", {layout: false});
  }
  else {
    // console.log(req.body);
    new User(req.body).save(function (err) {
      if(err) {
        //return handleError(err);
        res.status(400).send("User not created");
        return;
      }
      // saved
      res.status(201).send("User created");
    });
  }

}

exports.login = function(req, res) {

  if(req.method.toLowerCase() != "post") {
    res.render("pages/login", {layout: false});
  } else {
    user.findOne({email: req.body.email}, function(err, result) {

      if(err) console.log(err);

      if(result == null) {
        res.send('invalid username', {'Content-type' : 'text/plain'}, 403);
      } else {
        auth(result);
      }
    });

    function auth(userRes) {
      if(!UserModel.createHash(req.body.password) == userRes.password) {
         res.send('invalid password', {'Content-type' : 'text/plain'}, 403);
      } else {
         console.log(userRes._id);
         user.update({_id : userRes._id}, {'$set' : {token : Date.now}});
         res.status(200).send(userRes);
      }
    }
  }
}
