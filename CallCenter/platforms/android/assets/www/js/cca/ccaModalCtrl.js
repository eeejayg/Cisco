ccaApp.controller('ccaModalCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout) {
  $scope.showModal = 0;

  $scope.customer = function() {
    return $rootScope.currentCustomer;
  }

  $scope.details = [
    { 'label': 'Departure Time', 'value': '14:36' },
    { 'label': 'ETA at Destination', 'value': '17:01' },
    { 'label': 'Number of Stops', 'value': '3' },
    { 'label': 'Boarding From', 'value': 'Platforms 8, 9, & 12' },
    { 'label': 'Current Tickets Sold', 'value': '65%' }
  ];

  $scope.sendConfirmation = function(text) {
    $rootScope.$broadcast('sendConfirmation', text);
  };

  $scope.onClickReset = function(){
    $rootScope.$broadcast('resetApp');
  };
 
  $scope.openModal = function() {
		$scope.showModal = 1;
  };

  $scope.closeModal = function() {
  	$scope.showModal = 0;
  };

  $scope.viewStationMap = function() {
  	$scope.closeModal();
  	$rootScope.$broadcast('showStationMap');
  };

  $scope.setListeners = function() {
  	$scope.$on('confirmPurchase', function(evt, item){
  		$scope.showModal = 1;
  	});
  	$scope.$on('hideStationMap', function(evt, item) {
  		$scope.showModal = 1;
  	});
  	$scope.$on('resetApp', function(evt, item) {
  		$scope.showModal = 0;
  	});
  };

  $scope.setListeners();
}]);
