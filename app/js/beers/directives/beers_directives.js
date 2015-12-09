module.exports = function(app) {
	app.directive('beerforms', function() {
		return {
			restrict: 'AC',
			templateUrl: 'templates/beerforms.html',
			controller: 'BeersController',
			replace: true
		};
	});
};
