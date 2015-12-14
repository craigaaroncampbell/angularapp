module.exports = function(app) {
	app.controller('SignupController', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies) {
		$scope.buttonText = 'Create New User';
		$scope.confirmPassword = true;
		$scope.nameTaken = false;
		$scope.user = {};
		$scope.changePlacesText = 'Or Sign Into An Existing User';
		console.log($location.path());

		$scope.passwordMatch = function(user) {
			return user.password === user.confirmation;
		};

		$scope.changePlaces = function() {
			$location.path('/signin');
		};

		$scope.sendToServer = function(user) {
			$http.post('/api/signup', user)
			.then(function(res) {
				console.log(res.data.nameTaken);
				$scope.nameTaken = res.data.nameTaken;
				console.log(res.data.token);
				$cookies.put('token', res.data.token);
				if ($scope.nameTaken === false) $location.path('/beers');
			}, function(err) {
				console.log(err);
			})	;
		};
	}]);
};
