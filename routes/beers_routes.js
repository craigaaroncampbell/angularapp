var express = require('express');
var bodyParser = require('body-parser');
var Beer = require(__dirname + '/../models/beer.js');

var handleError = require(__dirname + '/../lib/handleErrors.js');
var beersRouter = module.exports = exports = express.Router();

beersRouter.get('/beers', function(req,res){
  Beer.find({}, function(err, data){
    if (err) handleError(err, res);
    res.send(data);
  });
});

beersRouter.post('/beers', bodyParser.json(), function(req, res){
  var newBeer = new Beer(req.body);
  newBeer.save(function(err, data){
    if (err) handleError(err, res);
    res.send(data);
  });
});

beersRouter.put('/beers/:id', bodyParser.json(), function(req, res){
  var beerData = req.body;
  delete beerData._id;
  Beer.update({_id: req.params.id}, beerData, function(err){
    if (err) return handleError(err, res);
    console.log(req.body);
    res.send({msg: 'updated!'});
  });
});

beersRouter.delete('/beers/:id', function(req, res){
  Beer.remove({_id: req.params.id}, function(err){
    if (err) return handleError(err, res);
    res.send({msg: 'deleted!'});
  });
});

beersRouter.get('/beers/:brewery', function(req, res){
  /// get route that that will search the DB  by brewery name, and pull up all the beers for that brewery
  Beer.find({brewery: req.params.brewery}, function(err, data){
    if (err) return handleError(err, res);
    res.send(data);
  });

});

