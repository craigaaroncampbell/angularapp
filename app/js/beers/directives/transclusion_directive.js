module.exports = function(app) {
	app.directive('beerTransclusion', function() {
		return {
			restrict: 'AC',
			transclude: true,
			replace: true,
			templateUrl: 'templates/transclusion_template.html'
		};
	});
};
