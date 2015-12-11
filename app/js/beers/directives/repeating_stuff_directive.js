module.exports = function(app) {
	app.directive('repeatingStuff', function() {
		return {
			restrict: 'AC',
			templateUrl: 'templates/repeat_template.html',
			controller: 'BeersController'
		};
	});
};
