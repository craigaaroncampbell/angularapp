var express = require('express');
var nonAPIRouter = module.exports = exports = express.Router();

nonAPIRouter.get('/:name', function(req, res) {//craig's non-CRUDDY route
  res.send('My name is ' + req.params.name.toUpperCase() + ', and I love me some beer.');
});
