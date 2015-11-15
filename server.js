var express = require('express');
var app = express();
var beersRouter = require(__dirname + '/routes/beers_routes.js');
var usersRouter = require(__dirname + '/routes/users_routes.js');
var nonAPIRouter = require(__dirname + '/routes/non_api_routes.js');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/authentication_dev';

var tempAppSecret = 'ThisReallyNeedsToBeChanged';

process.env.APP_SECRET = process.env.APP_SECRET || tempAppSecret ;

mongoose.connect(mongoURI);

app.use('/' , nonAPIRouter);

app.use('/api', beersRouter);

app.use('/api', usersRouter);

app.listen(port, function() {
  console.log('now pouring beer on port: ' + port);

  if (process.env.APP_SECRET === tempAppSecret) {
    console.log('DUDE, YOU NEED TO CHANGE THE APP SECRET ENV VARIABLE!', process.env.APP_SECRET);
  }
});
