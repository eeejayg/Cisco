ccaApp.controller('ccaSeatingChartCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log){
  $scope.showHeatMap = 0;
  $scope.overlays = [
  	{ 'name': 'Heat Map' },
  	{ 'name': 'Seating Chart' },
  	{ 'name': 'Kiosk Info' },
  ];

  $scope.hideSeatingChart = function() {
  	 $rootScope.$broadcast('hideSeatingChart');
  };

  $scope.toggleOverlay = function(overlay) {
  	overlay.isSelected = !overlay.isSelected;
  };

	$scope.setListeners = function() {
	};

  $scope.setListeners();
}]);