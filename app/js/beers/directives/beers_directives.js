module.exports = function(app) {
	app.directive('beerforms', function() {
		return {
			templateUrl: 'templates/beerforms.html',
			controller: "BeersController",
			replace: true
		};
	})
};
