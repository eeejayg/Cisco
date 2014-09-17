tiApp.controller('tiViewDiagnosticsCtrl', ['$rootScope', '$scope', '$interval', function($rootScope, $scope, $interval){
	$scope.lightIsGood = 0;
	
	$scope.webExUrl = getLocalStorage('webExUrl') || '';

	$scope.launchWebEx = function() {
		window.open($scope.webExUrl);
	};

	$scope.makeCall = function() {
		$rootScope.$broadcast('makeCall');
	};

	$scope.fixBreaker = function() {
		$scope.lightIsGood = true;
	};

	$scope.setListeners = function() {
		$scope.$on('setWebExUrl', function(evt, obj){
			$scope.webExUrl = obj;
		});
		$scope.$on('resetApp', function(evt, obj){
			$scope.lightIsGood = 0;
		});
	};

	$scope.setListeners();
}]);