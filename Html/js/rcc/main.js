var rccApp = angular.module('RCC', [
  'ngRoute',
  'rccControllers'
]);

rccApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/blank/:id', {
        template: ' ',
        controller: 'BlankScreenController'
      }).
      otherwise({
        redirectTo: '/overview'
      });
  }]);

var rccControllers = angular.module('rccControllers', []);

rccControllers.controller('BlankScreenController', ['$routeParams', 'storage', function($routeParams, storage) {}]);

rccControllers.directive('signalStrength', ['$interval', function($interval) {
  return {
    restrict: 'E',
    scope: {
      strength: '=?'
    },
    replace: true,
    template: '<span class="signal-strength {{strength}}"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>',
    link: function($scope) {
      var getSafeStrength = function(value) {
        return 'strength-' + Math.max(0, Math.min(value, 10));
      }
      var base = $scope.strength;
      if (isNaN(base)) base = _.random(8, 10);
      $scope.baseStrength = base;
      $scope.strength = getSafeStrength(0);
      $scope.start = Date.now();
      $scope.delay = _.random(500, 3000);
      var interval = setInterval(function() {
        var newStrength;
        var now = Date.now();
        if (now < ($scope.start + $scope.delay)) {
          newStrength = Math.floor($scope.baseStrength * (now - $scope.start) / $scope.delay);
          $scope.strength = getSafeStrength(newStrength);
        } else {
          clearTimeout(interval);
        }
      }, 200);
      setInterval(function() {
        var newStrength;
        var now = Date.now();
        if (now > ($scope.start + $scope.delay)) {
          newStrength = $scope.baseStrength + _.random(-1, 1);
          $scope.strength = getSafeStrength(newStrength);
        }
      }, 1500);
    }
  }
}]);

rccControllers.directive('infoBox', ['$interval', function($interval) {
  return {
    restrict: 'E',
    scope: { boxType: '=?' },
    replace: true,
    transclude: true,
    templateUrl: 'left-info-box',
    link: function($scope) {
      $scope.isLoaded = false;
      $interval(function() {
        $scope.isLoaded = true;
      }, _.random(500, 1500), 1);
    }
  }
}]);
