module.exports = function(app) {
	app.controller('SignupController', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$scope.buttonText = 'Create New User';
		$scope.confirmPassword = true;
		console.log($location.path()); // gives current path if no argument  ()

		$scope.passwordMatch = function(user) {
			return user.password === user.confirmation;
		};

		$scope.sendToServer = function(user) {
			$http.post('/api/signup', user)
			.then(function(res) {
				console.log(res.data);

				//save token into cookie

				$location.path('/beers'); // passing a path in redirects ot that path
			}, function(err) {
				console.log(err);
			}
			});
		};
	}]);
};
