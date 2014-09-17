var ccaApp = angular.module('CCA', ['ngAnimate', 'ngTouch','ui.bootstrap']);

ccaApp.controller('ccaMainCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout){
  $scope.startScreen = true;
  $rootScope.currentCustomer = {};

  $scope.toast = {
    isVisible: false,
    text: 'Confirmation Sent'
  };

  $scope.toaster = function(text) {
    $scope.toast.text = text;
    $scope.toast.isVisible = true;

    $timeout(function(){
      $scope.toast.isVisible = false;
    }, 2000);
  };

  $scope.onClickReset = function(){
    $scope.startScreen = true;
    $scope.currentPage = null;
  	$rootScope.$broadcast('resetApp');
  };

  $scope.loader = function() {
    $scope.startScreen = false;
    $scope.currentPage = 3;
    $timeout(function() {
      $scope.currentPage = 0;
      $rootScope.$broadcast('appLoaded');
    }, 1000);

  };

  $scope.setKeyUp = function() {
    $(document).keyup(function(event){
      if (event.keyCode == 54 && event.shiftKey == true){
        $rootScope.$broadcast('resetApp');
      }

      if (event.keyCode == 39) {

        if ($scope.startScreen) {
          $scope.loader();
        }
        if ($scope.currentPage == 0) {
          $rootScope.$broadcast('takeCall');
        }
      }
      $scope.$apply();
    });
  };
  $scope.setKeyUp();

  $scope.setListeners = function(){
  	$scope.$on('callSelected', function(evt, item) {
  		$scope.currentPage = 1;
  	});

  	$scope.$on('showStationMap', function(evt, item){
  		$scope.currentPage = 2;
  		$scope.showHeatMap = 0;
  	});

  	$scope.$on('hideStationMap', function(evt, item){
  		$scope.currentPage = 1;
  		$rootScope.$broadcast('transactionSelected');
  	});

  	$scope.$on('sendConfirmation', function(evt, item) {
  		$scope.toaster(item);
  	});

    $scope.$on('resetApp', function(evt, item){
      $scope.startScreen = true;
      $scope.currentPage = null;
    });
  };

  $scope.setListeners();
}]);