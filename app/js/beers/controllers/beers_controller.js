module.exports = function(app) {
	app.controller('BeersController', ['$scope', '$http', function($scope, $http) {
		$scope.beers = [];
		$scope.newBeer =  null;
		$scope.original = {};

		$scope.getAll = function() {
			$http.get('/api/beers') //returns a promise
			.then(function(res) { //success function first in this promise
				$scope.beers = res.data;
			}, function(err) { //err function 2nd in this promise
				console.log(err.data);
			});
		};

		$scope.createBeer = function(beer) {
			$http.post('/api/beers', beer)
			.then(function(res) {
				$scope.beers.push(res.data);
				$scope.newBeer =  null;
			}, function(err) {
				console.log(err);
			});
		};

		$scope.updateBeer = function(beer) {
			$http.put('/api/beers/' + beer._id, beer)
			.then(function(res) {
				beer.editing = false;
			}, function(err) {
				console.log(err);
				beer.editing = false;
			});
		};

		$scope.deleteBeer = function(beer) { //assync UI
			$scope.beers.splice($scope.beers.indexOf(beer), 1); // BEFORE the AJAX call
			$http.delete('/api/beers/' + beer._id)
			.then(function(res) {
				//do nothing on success
			}, function(err) {
				$scope.getAll();
				console.log(err);
			});
		};

		$scope.cancel = function(beer) {
			beer.name = $scope.original.name;
			beer.brewery = $scope.original.brewery;
			beer.style =  $scope.original.style;
			beer.notes = $scope.original.notes;
			beer.editing = false;
		};

		$scope.edit = function(beer) {
			$scope.original.name = beer.name;
			$scope.original.brewery = beer.brewery;
			$scope.original.style = beer.style;
			$scope.original.notes = beer.notes;
			beer.editing = true;
		};

	}]);
};
