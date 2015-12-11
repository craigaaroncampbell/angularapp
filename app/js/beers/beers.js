module.exports = function(app) {
	require('./controllers/beers_controller.js')(app);
	require('./services/beers_service.js')(app);
	require('./directives/form_directive.js')(app);
	require('./directives/repeating_stuff_directive.js')(app);
	require('./directives/transclusion_directive.js')(app);
};
