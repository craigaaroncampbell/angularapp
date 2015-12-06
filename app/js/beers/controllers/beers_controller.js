module.exports = function(app) {
	app.controller('BeersController', ['$scope', '$http', 'beerResource', function($scope, $http, beerResource) {
		$scope.beers = [];
		$scope.newBeer =  null;
		$scope.original = {};
		var beersResource = beerResource('beers');

		$scope.getAll = function() {
			beersResource.getAll(function(err, data) {
				if (err) return err;
				$scope.beers = data;
			});
		};

		$scope.create = function(beer) {
			beersResource.create(beer, function(err, data) {
				if (err) return err;
				$scope.beers.push(data);
				$scope.newBeer =  null;
			});
		};

		$scope.update = function(beer) {
			beersResource.update(beer, function(err, data) {
				beer.editing = false;
				if (err) return err;
			});
		};

		$scope.delete = function(beer) {
			$scope.beers.splice($scope.beers.indexOf(beer), 1);
			beersResource.delete(beer, function(err, data) {
				if (err) {
					$scope.getAll();
					return err;
				}
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
