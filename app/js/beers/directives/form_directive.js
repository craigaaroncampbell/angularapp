module.exports = function(app) {
	app.directive('beerForm', function() {
		return {
			restrict: 'AC',
			replace: true,
			transclude: true,
			templateUrl: 'templates/beer_form.html',
			controller: 'BeersController',
			scope: {
				buttonText: '@',
				formName: '@',
				beer: '=',
				save: '&'
			}
		};
	});
};
