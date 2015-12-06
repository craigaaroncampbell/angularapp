var express = require('express');
var usersRouter = module.exports = exports = express.Router();
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user.js');
var handleError = require(__dirname + '/../lib/handleErrors.js');
var httpBasic = require(__dirname + '/../lib/http_basic.js');

var EE = require('events').EventEmitter;
var postEmitter = new EE();
var getEmitter = new EE();

usersRouter.get('/users', function(req, res) {
	User.find({}, function(err, data) {
		if (err) handleError(err, res);
		res.send(data);
	});
});

usersRouter.post('/signup', bodyParser.json(), function(req, res) {
	User.findOne({'username': req.body.username}, function(err, data) {
		if (err) return handleError(err, res);
		if (data && data.basic.username === req.body.username) {
			return console.log('THAT USER IS ALREADY IN THE DATABASE'); // prevent newUser emission if the username is already in the db. NOTHING FURTHER SHOULD HAPPEN WITH THIS REQUEST.
		}
		postEmitter.emit('newUser', req, res); //only if user not in db aleady
	});
});

postEmitter.on('newUser', function(req, res) {
	var newUser = new User();
	newUser.basic.username = req.body.username;
	newUser.username = req.body.username;
	postEmitter.emit('one', newUser, req, res);
});

postEmitter.on('one', function(newUser, req, res) {
	newUser.generateHash(req.body.password, function(err, hash) {
		if (err) return handleError(err, res);
		postEmitter.emit('two', newUser, req, res);
	});
});

postEmitter.on('two', function(newUser, req, res) {
	newUser.save(function(err, data) {// data is NOT just the hash! it is an object with username, basic.username, basic.password (now hashed not plaintext), and the _id: property given to it by mongo during the .save
		if (err) return handleError(err, res);
		postEmitter.emit('three', newUser, req, res);
	});
});

postEmitter.on('three', function(newUser, req, res) {
	newUser.generateToken(function(err, token) {
		if (err) return handleError(err, res);
		res.json({token: token});
	});
});

usersRouter.get('/signin', httpBasic, function(req, res) {
	//does this user exist in the database?
	getEmitter.emit('one', req, res);
});

getEmitter.on('one', function(req, res) {
	User.findOne({'basic.username': req.auth.username}, function(err, user) {
		if (err) return handleError(err,res);

		if (!user) {
			console.log('Could not authenticate the following user: ' + req.auth.username);
			return res.status(401).json({msg: 'Could not authenticate. Maybe you the wrong user name?'});
		}
		getEmitter.emit('two', req, res, user);
	});
});

getEmitter.on('two', function(req, res, user) {
	user.compareHash(req.auth.password, function(err, comparrison) {
		// this is really just bcrypt.compare() so comparrison is from bcrypt and is either "true" or "false" - did the password input match the data decrypted from the hash?
		if (err) handleError(err, res);
		if (comparrison === false) {
			console.log('Could not authinticate: ' + req.auth.username);
			return res.status(401).json({msg: 'Nope!'});
		}
		getEmitter.emit('three', req, res, user);
	});
});

getEmitter.on('three', function(req, res, user) {
	user.generateToken(function(err, token) {
		if (err) return handleError(err, res);
		res.json({token: token});
	});
});
