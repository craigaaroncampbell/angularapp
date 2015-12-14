var express = require('express');
var bodyParser = require('body-parser');
var Beer = require(__dirname + '/../models/beer.js');
var eatAuth = require(__dirname + '/../lib/eat_auth.js');
var handleError = require(__dirname + '/../lib/handleErrors.js');
var beersRouter = module.exports = exports = express.Router();

beersRouter.get('/allbeers', function(req, res) {
	Beer.find({}, function(err, data) {
		if (err) handleError(err, res);
		res.send(data);
	});
});

beersRouter.get('/beers', bodyParser.json(),  eatAuth, function(req, res) {
	Beer.find({owner: req.user.username}, function(err, data) {
		if (err) handleError(err, res);
		res.send(data);
	});
});

beersRouter.post('/beers', bodyParser.json(),  eatAuth,  function(req, res) {
	var newBeer = new Beer(req.body);
	newBeer.owner = req.user.username;
	newBeer.save(function(err, data) {
		if (err) handleError(err, res);
		res.send(data);
	});
});

beersRouter.put('/beers/:id', bodyParser.json(),  eatAuth,  function(req, res) {
	var beerData = req.body;
	delete beerData._id;
	Beer.update({_id: req.params.id}, beerData, function(err) {
		if (err) return handleError(err, res);
		res.send({msg: 'updated!'});
	});
});

beersRouter.delete('/beers/:id',  bodyParser.json(), eatAuth,  function(req, res) {
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

// updateDocument(db, function() {

// });

// deleteDocument(db, function() {

// });

//db.close();

// ////////// mongo driver stuff///////
// var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/beer_dev';
// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
// var db;
// MongoClient.connect(mongoURI, function(err, DB) {
// 	db = DB;
//   assert.equal(null, err);
//   console.log("Connected correctly to server");
// });
// /////////////////////////////

// var updateDocument = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('beers');
//   // Update document where a is 2, set b equal to 1
//   collection.updateOne({ a : 2 }
//     , { $set: { b : 1 } }, function(err, result) {
//     assert.equal(err, null);
//     assert.equal(1, result.result.n);
//     console.log("Updated the document with the field a equal to 2");
//     callback(result);
//   });
// }

// var deleteDocument = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('beers');
//   // Insert some documents
//   collection.deleteOne({ a : 3 }, function(err, result) {
//     assert.equal(err, null);
//     assert.equal(1, result.result.n);
//     console.log("Removed the document with the field a equal to 3");
//     callback(result);
//   });
// }

// beersRouter.post('/beers', bodyParser.json(), /* eatAuth, */ function(req, res) {
// 		 var collection = db.collection('beers');
// 		 collection.insert({
// 		 	name: req.body.name,
// 		 	brewery: req.body.brewery,
// 		 	style: req.body.style,
// 		 	notes: req.body.notes
// 		 }, function( err, data) {
// 		if (err) handleError(err, res);
// 		res.send(data);
// 	});
// });

// beersRouter.get('/beers', function(req, res) {
// 	 var collection = db.collection('beers');
//   	collection.find({}).toArray(function(err, data) {
// 		if (err) handleError(err, res);
// 		res.send(data);
// 	});
// });
