require('angular/angular');
var angular = window.angular;

var beerApp = angular.module('beerApp', []);

require('./beers/beers.js')(beerApp);
