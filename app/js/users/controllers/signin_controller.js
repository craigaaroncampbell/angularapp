module.exports = function(app) {
	app.controller('SigninController', ['$scope', '$http', '$base64', '$location', '$cookies', function($scope, $http, $base64, $location, $cookies) {
		$scope.buttonText = 'Log In';
		$scope.confirmPassword = false;
		$scope.user = {};
		$scope.changePlacesText = 'Or Create A New User';

		$scope.changePlaces = function() {
			$location.path('/signup');
		};

		$scope.sendToServer = function(user) {
			$http({
				method: 'GET',
				url: '/api/signin',
				headers: {
					'Authorization': 'Basic ' + $base64.encode(user.username + ':' + user.password)
				}
			})
			.then(function(res) {
				console.log(res.data.token);
				$cookies.put('token', res.data.token);
				$location.path('/beers');
			}, function(err) {
				console.log(err);
			});
		};
	}]);
};
