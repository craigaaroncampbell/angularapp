var express = require('express');
var bodyParser = require('body-parser');
var Authenticat = require('authenticat');
var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost/test_authenticat');
var authenticat = new Authenticat(connection);


var Beer = require(__dirname + '/../models/beer.js');
var handleError = require(__dirname + '/../lib/handleErrors.js');
var beersRouter = module.exports = exports = express.Router();

beersRouter.get('/allbeers', function(req, res) {
	Beer.find({}, function(err, data) {
		if (err) handleError(err, res);
		res.send(data);
	});
});

beersRouter.get('/beers', bodyParser.json(), authenticat.tokenAuth, function(req, res) {
	console.log("before", req.user.username)
	Beer.find({owner: req.user.username}, function(err, data) {
		console.log("after")
		if (err) handleError(err, res);
		res.send(data);
	});
});

beersRouter.post('/beers', bodyParser.json(), authenticat.tokenAuth,  function(req, res) {
	var newBeer = new Beer(req.body);
	newBeer.owner = req.user.username;
	newBeer.save(function(err, data) {
		if (err) handleError(err, res);
		res.send(data);
	});
});

beersRouter.put('/beers/:id', bodyParser.json(), authenticat.tokenAuth,  function(req, res) {
	var beerData = req.body;
	delete beerData._id;
	Beer.update({_id: req.params.id}, beerData, function(err) {
		if (err) return handleError(err, res);
		res.send({msg: 'updated!'});
	});
});

beersRouter.delete('/beers/:id',  bodyParser.json(), authenticat.tokenAuth, function(req, res) {
	Beer.remove({_id: req.params.id}, function(err) {
		if (err) return handleError(err, res);
		res.send({msg: 'deleted!'});
	});
});

beersRouter.get('/beers/:brewery', function(req, res) {
	/// get route that that will search the DB  by brewery name, and pull up all the beers for that brewery
	Beer.find({brewery: req.params.brewery}, function(err, data) {
		if (err) return handleError(err, res);
		res.send(data);
	});
});
