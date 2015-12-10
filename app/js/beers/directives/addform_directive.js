module.exports = function(app) {
	app.directive('beerAddform', function() {
		return {
			restrict: 'AC',
			templateUrl: 'templates/beer_addform.html',
			controller: 'BeersController',
		};
	});
};
