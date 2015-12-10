module.exports = function(app) {
	require('./controllers/beers_controller.js')(app);
	require('./services/beers_service.js')(app);
	require('./directives/addform_directive.js')(app);
	require('./directives/editform_directive.js')(app);
	require('./directives/transclusion_directive.js')(app);
};
