var express = require('express');
var app = express();
var beersRouter = require(__dirname + '/routes/beers_routes.js');
var nonAPIRouter = require(__dirname + '/routes/non_api_routes.js');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/beer_dev';

mongoose.connect(mongoURI);

app.use('/' , nonAPIRouter);

app.use('/api', beersRouter);

app.listen(port, function(){
  console.log('now pouring beer on port: ' + port);
});
