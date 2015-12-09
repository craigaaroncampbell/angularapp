module.exports = function(app) {
	app.directive('beerForms', function() {
		return {
			restrict: 'AC',
			templateUrl: 'templates/beerforms.html',
			controller: 'BeersController',
		};
	});
};
