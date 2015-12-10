module.exports = function(app) {
	app.directive('beerEditform', function() {
		return {
			restrict: 'AC',
			templateUrl: 'templates/beer_editform.html',
			controller: 'BeersController',
		};
	});
};
