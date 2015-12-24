var handleSuccess = function(callback) {
	return function(res) {
		console.log("what????", res.data
			)
		callback(null, res.data);
	};
};

var handleFail = function(callback) {
	return function(res) {
		console.log("why the fuck?", res.data)
		callback(res.data);
	};
};

module.exports = function(app) {
	app.factory('someResource', ['$http', '$cookies', function($http, $cookies) {
		return function(resourceName) {
			var resource = {};

			resource.getAll =  function(callback) {
				$http.defaults.headers.get = {'token': $cookies.get('token')};
				console.log("stuff! ", $http.defaults.headers.get.token)

				$http.get('/api/' + resourceName)
					.then(handleSuccess(callback), handleFail(callback));
			};

			resource.create = function(data, callback) {
				$http.defaults.headers.post.token = $cookies.get('token');
				$http.post('/api/' + resourceName, data)
					.then(handleSuccess(callback), handleFail(callback));
			};

			resource.update = function(data, callback) {
				$http.defaults.headers.put.token = $cookies.get('token');
				$http.put('/api/' + resourceName + '/' +  data._id, data)
					.then(handleSuccess(callback), handleFail(callback));
			};

			resource.delete = function(data, callback) {
				$http.defaults.headers.delete = {'token': $cookies.get('token')};
				$http.delete('/api/' + resourceName + '/' + data._id , data)
					.then(handleSuccess(callback), handleFail(callback));
			};

			return resource;
		};
	}]);
};
