ccaApp.controller('ccaStationMapCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout){
  $scope.overlays = [
  	{ label: 'Foot Traffic', name: 'heat', id: 0 },
  	{ label: 'Available Seats', name: 'seats', id: 1 },
  	{ label: 'Available Ticket Agents', name: 'agents', id: 2 },
    { label: 'Available Kiosks', name: 'kiosks', id: 3 }
  ];

  $scope.hideStationMap = function() {
  	 $rootScope.$broadcast('hideStationMap');
  };

  $scope.toggleOverlay = function(overlay) {
    if (!overlay.value) {
      overlay.loading = true;

      $timeout(function() {
        overlay.loading = false;
          overlay.value = true;
      }, 1000);

    } else {
      overlay.value = false;
    }
  };

	$scope.setListeners = function() {
    $scope.$on('resetApp', function(evt, obj){
      $.each($scope.overlays, function(idx, item){
        item.value = false;
      });
    });
	};

  $scope.setListeners();
}]);