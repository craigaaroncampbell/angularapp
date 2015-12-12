require(__dirname + '/../../app/js/entry.js');
require('angular-mocks');

describe('beers service', function() {
	var $ControllerConstructor;
	var $scope;

	beforeEach(angular.mock.module('beerApp'));

	beforeEach(angular.mock.inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$ControllerConstructor = $controller;
	}));

	it('should return an resource object with CRUD methods', function() {
		var controller = new $ControllerConstructor('BeersController', {$scope: $scope});
		expect(typeof $scope.beersResource).toBe('object');
	});

});

// describe('handleSuccess()', function() {
// 	var $ControllerConstructor;
// 	var $scope;

// 	beforeEach(angular.mock.module('beerApp'));

// 	beforeEach(angular.mock.inject(function($rootScope, $controller) {
// 		$scope = $rootScope.$new();
// 		$ControllerConstructor = $controller;
// 	}));

// 	it('should executed when the request is successful', function() {
// var controller = new $ControllerConstructor('BeersController', {$scope: $scope});
// var beer = {name: "somebeer"}
// var err = new Error();

// 		// call getAll with a successful request
// 		$scope.beersResource.getAll(function(err, data) {
// 				if (err) return err;
// 				$scope.beers = data;
// 			});
// 	// if no err then the res.data should be an array
// 			expect(Array.isArray($scope.beers)).toBe(true);

// 		// PUT
// 			var called = $scope.beersResource.update(beer, function(err, data) {
// 				beer.editing = false;
// 				if (err) return err;
// 			});

// 			// nothing should be returned  if there is no error, so the expression should be undefined
// 			expect(called).toBe(undefined);
// 	});
// });

// describe('handleFail()', function() {
// 	var $ControllerConstructor;
// 	var $scope;

// 	beforeEach(angular.mock.module('beerApp'));

// 	beforeEach(angular.mock.inject(function($rootScope, $controller) {
// 		$scope = $rootScope.$new();
// 		$ControllerConstructor = $controller;
// 	}));

// 	it('should executed when there is an error', function() {
// 		var controller = new $ControllerConstructor('BeersController', {$scope: $scope});
// 		var beer = {};
// 		var err = new Error();

// 		// call getAll with an error
// 		var called = $scope.beersResource.update(beer, function(err, data) {
// 				beer.editing = false;
// 				if (err) return err;

// 			});
// 			expect(called).toBe(err);
// 	});

// });
