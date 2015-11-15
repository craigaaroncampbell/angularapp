var mongoose = require('mongoose');

var beerSchema = new mongoose.Schema({
  name: String,
  brewery: String,
  style: {type: String, default: 'not specified'},
  notes: {type: String, default: 'have yet to try'}
});

module.exports = mongoose.model('Beer', beerSchema);
