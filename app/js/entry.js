require('angular/angular');
require('angular-route');
var angular = window.angular;

var beerApp = angular.module('beerApp', ['ngRoute']);

require('./beers/beers.js')(beerApp);
