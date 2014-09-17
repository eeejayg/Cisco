tiApp.controller('tiAlertPullOutCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout){
	$scope.showAlertPullOut = false;

	$scope.chartConnection = [
		{ connected: false },
		{ connected: false },
		{ connected: true },
		{ connected: true }
	];

	$scope.closePullOut = function() {
		$rootScope.$broadcast('closePullOut', alert);
		$scope.showAlertPullOut = false;
	}

	$scope.divertTrains = function() {
		$rootScope.$broadcast('divertTrains', alert);
	}

	$scope.viewDiagnostics = function(alert) {
		$rootScope.$broadcast('viewDiagnostics', alert);

		$scope.showAlertPullOut = false;
	};

	$scope.toggleChartConnection = function() {

		(function loop() {
			var rand = getRandomInt(0, 2000);
			$timeout(function() {
				$scope.chartConnection[3].connected = !$scope.chartConnection[3].connected;
				loop();
			}, rand);
		}());
	};

	$scope.setListeners = function() {
		$scope.$on('alertInfoBubble', function(evt, obj) {
			obj.showInfoBubble = false;
			$scope.showAlertPullOut = true;
			$scope.alert = obj;
		});

		$scope.$on('resetApp', function(evt, obj){
			$scope.showAlertPullOut = false;
		});
	};

	$scope.toggleChartConnection();
	$scope.setListeners();
}]);