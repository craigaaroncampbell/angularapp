module.exports = function(app) {
	require('./controllers/beers_controller.js')(app);
	require('./services/beers_services.js')(app);
	require('./directives/beers_directives.js')(app);
};
