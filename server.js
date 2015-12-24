var app = require('express')();

var Authenticat = require('authenticat');
var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost/test_authenticat');
var authenticat = new Authenticat(connection);
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use('/api', authenticat.router);

app.get('/someroute', bodyParser.json(), authenticat.tokenAuth, authenticat.roleAuth(),function(req, res) {
  res.json({something: "yaay"});
});


var beersRouter = require(__dirname + '/routes/beers_routes.js');

var nonAPIRouter = require(__dirname + '/routes/non_api_routes.js');
app.use('/' , nonAPIRouter);

app.use('/api', beersRouter);

app.use('/api', authenticat.router);

app.use(function(req, res) {
	res.status(404).send('could not find file');
});

app.listen(PORT, function() {
	console.log('now pouring beer on port: ' + PORT);


});

