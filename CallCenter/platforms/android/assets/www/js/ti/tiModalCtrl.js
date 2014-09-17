tiApp.controller('tiModalCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout){
	$scope.showModal = false;
	
	$scope.closeModal = function(){
		$scope.showModal = false;
	};

	$scope.confirmDivert= function() {
		$scope.showModal = false;
		$rootScope.$broadcast('trackCleared');
	};

	$scope.watchDivertTrains = function() {
		$scope.$on('divertTrains', function(evt, obj){
			$timeout(function() {
				$scope.showModal = true;
			}, 2000);
		});
	};

	$scope.watchDivertTrains();
}]);