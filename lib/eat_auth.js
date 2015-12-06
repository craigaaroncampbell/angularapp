var eat = require('eat');
var User = require(__dirname + '/../models/user.js');
var handleError = require(__dirname + '/handleErrors.js');

module.exports = exports = function(req, res, next) {
	var encryptedToken =   req.headers.token || ((req.body) ? req.body.token : undefined);

	if (!encryptedToken) {
		return res.status(401).json({msg: 'Could not authenticate, yo!'});
	}
	eat.decode(encryptedToken, process.env.APP_SECRET, function(err, token) {
		if (err) handleError(err, res);

		User.findOne({_id: token.id}, function(err, user) {
			if (err) return handleError(err, res);
			if (!user) return res.status(401).json({msg: 'Could not authenticate, so deal with it!'});
			req.user = user; // if there actually is a user matching the token id, then make req.user be the same
			next();
		});
	});
};

//this is middleware!  it is used when a POST or PUT request is made, and it comes after the body-parser middleware but before the final callback. it decodes the token and looks for a user with _id that matches the id of the token. If it finds such, then it sets req.user to be that same matched user.
