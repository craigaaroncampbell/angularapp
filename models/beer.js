var mongoose = require('mongoose');

var beerSchema = new mongoose.Schema({
	name: String,
	brewery: {type: String, default: 'not specified'},
	style: {type: String, default: 'not specified'},
	notes: {type: String, default: 'have yet to try'}
});

module.exports = mongoose.model('Beer', beerSchema);
