require('angular/angular');
require('angular-route');
var angular = window.angular;

var beerApp = angular.module('beerApp', ['ngRoute']);

require('./beers/beers.js')(beerApp);
require('./users/users.js')(beerApp);

beerApp.config(['$routeProvider', function($route) {
	$route
	.when('/beers', {
		templateUrl: '/templates/beers_view.html',
		controller: 'BeersController'
	})
	.when('/signup', {
		templateUrl: 'templates/users/views/signupin_view.html',
		controller: 'SignupController'
	})
	.when('/signin', {
		templateUrl: 'templates/users/views/signupin_view.html',
		controller: 'SigninController'
	})
	.otherwise({
		redirectTo: '/signup'
	});
}]);
