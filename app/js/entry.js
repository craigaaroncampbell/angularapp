require('angular/angular');
var angular = window.angular; //so jshint will stop complaining

var bearApp = angular.module('bearstream', [] ); //empty array will hold dependencies for angular

bearApp.controller('GreetingController', ['$scope', function($scope) {
	$scope.greeting = 'This app allows users to sign in and write a log of the beers he/she has tried';
}]);
