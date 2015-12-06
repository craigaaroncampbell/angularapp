var express = require('express');
var nonAPIRouter = module.exports = exports = express.Router();
var fs = require('fs');

nonAPIRouter.use(express.static(__dirname + '/../build'));

nonAPIRouter.get('/:filename', function(req, res, next) {
	fs.stat(__dirname + '/../build/' + req.params.filename, function(err, stats) {
		if (err) {
			console.log(err);
			return next();
		}

		if (!stats.isFile()) return next();

		var file = fs.createReadStream(__dirname + '/../build/' + req.params.filename);
		file.pipe(res);
	});
});

