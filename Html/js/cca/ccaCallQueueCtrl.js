ccaApp.controller('ccaCallQueueCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout){
	$scope.calls = callList;

	$scope.onCallSelect = function(call) {
		var customers = $.grep(customerList, function(item, idx) {
			return item.id == call.customer;
		});

		$rootScope.currentCustomer = customers[0];
		$rootScope.$broadcast('callSelected', call);
	};

	$scope.setListeners = function() {
		$scope.$on('takeCall', function(evt, item){
			$scope.onCallSelect(newCall);
		});
		$scope.$on('appLoaded', function(evt, item){
			$timeout(function(){
				$scope.calls[0].isSelected = false;
				$scope.calls.unshift(newCall);
			}, 2000);
		});
		$scope.$on('callSelected', function(evt, item) {
			$.each($scope.calls, function(idx, call) {
				call.isSelected = call == item ? item.isSelected : 0;
			});
		});
		$scope.$on('resetApp', function(evt, item) {
			$scope.calls.shift();
			$scope.calls[0].isSelected = true;
		});
	};

	$scope.setListeners();
}]);