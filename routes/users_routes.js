var express = require('express');
var usersRouter = module.exports = exports = express.Router();
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user.js');
var handleError = require(__dirname + '/../lib/handleErrors.js');
var httpBasic = require(__dirname + '/../lib/http_basic.js');

usersRouter.post('/signin', bodyParser.json(), function(req, res) {
  var newUser = new User();
  newUser.basic.username = req.body.username;
  newUser.username = req.body.username;
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) return handleError(err, res);
    newUser.save(function(err, data) {// data is NOT just the hash! it is an object with username, basic.username, basic.password (now hashed not plaintext), and the _id: property given to it by mongo during the .save
      if (err) return handleError(err, res);
      newUser.generateToken(function(err, token) {
        if (err) return handleError(err, res);
        res.json({token: token});
      });
    });
  });
});

usersRouter.get('/signin', httpBasic, function(req, res) {
  //does this user exist in the database?
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if (err) return handleError(err,res);

    if (!user) {
      console.log('Could not authenticate the following user: ' + req.auth.username);
      return res.status(401).json({msg: 'Could not authenticate. Maybe you the wrong user name?'});
    }

    user.compareHash(req.auth.password, function(err, comparrison) {
      // this is really just bcrypt.compare() so comparrison is from bcrypt and is either "true" or "false" - did the password input match the data decrypted from the hash?
      if (err) handleError(err, res);
      if (comparrison === false) {
        console.log('Could not authinticate: ' + req.auth.username);
        return res.status(401).json({msg: 'Nope!'});
      }

      user.generateToken(function(err, token) {
        if (err) return handleError(err, res);
        res.json({token: token});
      });
    });
  });
});
