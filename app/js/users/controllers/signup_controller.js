module.exports = function(app) {
	app.controller('SignupController', ['$scope', '$http', function($scope, $http) {
		$scope.buttonText = 'Create New User';
		$scope.confirmPassword = true;

		$scope.passwordMatch = function(user) {
			return user.password === user.confirmation;
		};

		$scope.createUser = function(user) {
			$http.post('/api/signup', user)
			.then(function(res) {
				console.log(res.data);
				//save token into cookie
			}, function(err) {
				console.log(err);
			}
		);
		};
	}]);
};
