require(__dirname + '/../../app/js/entry.js');
require('angular-mocks');

describe('beers controller', function() {
	var $httpBackend;
	var $ControllerConstructor;
	var $scope;

	beforeEach(angular.mock.module('beerApp'));

	beforeEach(angular.mock.inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$ControllerConstructor = $controller;

	}));

	it('should be able to create a controller', function() {
		var controller = new $ControllerConstructor('BeersController', {$scope: $scope});
		expect(typeof $scope).toBe('object');
		expect(typeof controller).toBe('object');
		expect(Array.isArray($scope.beers)).toBe(true);
	});

	// CRUD TESTS
	describe('REST requests', function() {
		beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
			$httpBackend = _$httpBackend_;
			$scope = $rootScope.$new();
			$ControllerConstructor('BeersController', {$scope: $scope});
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		// GET
		it('should make a get request when getAll() is called', function() {
			$httpBackend.expectGET('/api/beers').respond(200, [{name: 'test beer'}]);
			$scope.getAll();
			$httpBackend.flush();
			expect($scope.beers[0].name).toBe('test beer');
		});

		// POST
		it('should be able to create a beer', function() {
			var sentdata = {name: 'test beer res', brewery: 'some other brewery', style: 'ipa', notes: 'not bad'};
			var resdata = {name: 'test beer res', brewery: 'some brewery', style: 'stout', notes: 'none right now'};
			$httpBackend.expectPOST('/api/beers', sentdata).respond(200, resdata);

			$scope.newBeer =  sentdata;  //this is different than what is "sent back" because there is no server in this test. so we are mocking it, and I chose a differnet response to test that it is CLEARLY pushing what is "sent back" in to the beers "database" array

			expect($scope.beers.length).toBe(0);
			// expect($scope.newBear).toEqual($scope.defaults)
			$scope.createBeer($scope.newBeer); // this is needed to CALL the function so tht the pushing into beers array actually happens

			$httpBackend.flush();
			//these expects are for the pushing part of the create function
			expect($scope.beers[0].name).toBe('test beer res');
			expect($scope.beers[0].brewery).toBe('some brewery');
			expect($scope.beers[0].style).toBe('stout');
			expect($scope.beers[0].notes).toBe('none right now');

			//this expect statement is for resetting newBeer back to null when the function is done

			expect($scope.newBeer).toBe(null);
		});

		// PUT
		it('should modify a bear when update() is called', function() {

			$scope.beers[0] = {name: 'A new name', brewery: 'some brewery', style: 'ipa', notes: 'nada', _id: 7}; //the beer passed in is the MODIFIED beer. We don't care what it used to be once we hit the submit button

			$httpBackend.expectPUT('/api/beers/7', $scope.beers[0]).respond(200);

			$scope.updateBeer($scope.beers[0]);

			$httpBackend.flush();

			expect($scope.beers[0].name).toBe('A new name');
			expect($scope.beers[0]._id).toBe(7);
			expect($scope.beers[0].editing).toBe(false);

		});

		// DELETE
		it('should delete a bear when remove() is called', function() {
			$scope.beers[0] = {name: 'some name', brewery: 'some brewery', style: 'ipa', notes: 'nada', _id: 1};
			$scope.beers[1] = {name: 'something else', brewery: 'some other brewery', style: 'lager', notes: 'nah', _id: 2};

			$httpBackend.expectDELETE('/api/beers/1').respond(200); //no data sent from server on successful delete

			$scope.deleteBeer($scope.beers[0]);

			$httpBackend.flush();

			expect($scope.beers[0].name).toBe('something else');
			expect($scope.beers[0].brewery).toBe('some other brewery');
			expect($scope.beers[0].style).toBe('lager');
			expect($scope.beers[0].notes).toBe('nah');
			expect($scope.beers[0]._id).toBe(2); //the beer who was at [0] is spliced out so the beer who was at [1] is now at [0]

		});
	});

});

