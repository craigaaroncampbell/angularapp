require('angular/angular');
require('angular-route');
var angular = window.angular;

var beerApp = angular.module('beerApp', ['ngRoute']);

require('./beers/beers.js')(beerApp);

beerApp.config(['$routeProvider', function($route) {
	$route
	.when('/beers', {
		templateUrl: '/templates/beers_view.html',
		controller: 'BeersController'
	})
	.otherwise({
		redirectTo: '/beers'
	});
}]);
