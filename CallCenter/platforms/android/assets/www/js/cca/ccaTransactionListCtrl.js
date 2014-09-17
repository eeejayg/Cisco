ccaApp.controller('ccaTransactionListCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout){
  $scope.showTransactionList = 1;

  $scope.customer = function() {
    return $rootScope.currentCustomer;
  }

  $scope.onTransactionClick = function(trans) {
    trans.showLoader = true;
     $timeout(function() {
      trans.showLoader = false;
      trans.isSelected = !trans.isSelected;
      $scope.showTransactionList = 0;
    }, 500);

    $rootScope.$broadcast('transactionSelected', trans);
  };

  $scope.setListeners = function() {
    $scope.$on('toggleSelectMenu', function(evt, item) {
      $scope.showTransactionList = item.name == 'purchase' ? 1 : 0;
    });
    $scope.$on('hideSeatingChart', function(evt, item) {
      $scope.showTransactionList = 0;
    });
    $scope.$on('resetApp', function(evt, item) {
      $scope.showTransactionList = 1;
    });
  };

  $scope.setListeners();
}]);