var tiApp = angular.module('TI', ['ngAnimate', 'ngTouch']);

tiApp.directive('clock', ['$interval', 'dateFilter', function($interval, dateFilter) {
	function link(scope, element, attrs) {
		var format,
			timeoutId;

		function updateTime() {
			element.text(dateFilter(new Date(), format));
		}

		scope.$watch(attrs.clock, function(value) {
			format = value;
			updateTime();
		});

		element.on('$destroy', function() {
			$interval.cancel(timeoutId);
		});

		timeoutId = $interval(function() {
			updateTime();
		}, 1000);
	};

	return { link: link };
}]);

tiApp.directive('infoBubble', function(){
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			location: '@'
		},
		template: '<div class="info-bubble {{ location }}"><div class="info-bubble-arrow"></div><div ng-transclude></div><div class="clearfix"></div></div>'
	};
});

tiApp.controller('tiMainCtrl', ['$rootScope', '$scope', '$timeout', function($rootScope, $scope, $timeout){
	$scope.currentPage = 'page-0';
	$scope.showSetWebEx = 1;
	$scope.webExUrl = {
		id: 'webExUrl',
		value: getLocalStorage('webExUrl') || 'http://PutYourURLHere.com'
	};

	$scope.setWebExUrl = function(url) {
		setLocalStorage('webExUrl', url);
		$rootScope.$broadcast('setWebExUrl', url);

		// redirect to app & page
		$scope.showSetWebEx = 0;
		$scope.currentApp = 'app-0';
		$scope.currentPage = 'page-0';
	};

	$scope.launchWebEx = function(url) {
		window.open(url);
	};
	$scope.format = 'h:mm a';

	$scope.footerNav = [
		{ icon: 'tunnel', text: 'Track Management', isSelected: true },
		{ icon: 'train', text: 'Train Management' },
		{ icon: 'speedometer', text: 'Speed Control' },
		{ icon: 'road_closure', text: 'Movement Authority' }
	];

	$scope.repairLog = {
		head: [ 'Date', 'Time', 'Tech', 'Alert', 'Fix Details', 'Result' ],
		rows: [
			{ tech: 'Simpson', alert: 'Breaker 3', details: 'View Details', result: 'OK' },
			{ tech: 'Jones', alert: 'Breaker 3', details: 'View Details', result: 'OK' },
			{ tech: 'Chavez', alert: 'Breaker 3', details: 'View Details', result: 'OK' },
			{ tech: 'Simpson', alert: 'Breaker 3', details: 'View Details', result: 'OK' },
			{ tech: 'Simpson', alert: 'Breaker 3', details: 'View Details', result: 'OK' },
			{ tech: 'Chavez', alert: 'Breaker 3', details: 'View Details', result: 'OK' }
		]
	};

	getDateStamp($scope.repairLog.rows, null);
	getTimeStamp($scope.repairLog.rows, null);

	$scope.resetApp = function() {
		$rootScope.$broadcast('resetApp');
		$scope.currentApp = null;
		$scope.currentPage = 'page-0';
		$scope.showSetWebEx = 1;
	};

	$scope.slideApp = function(app) {
		$scope.currentApp = app;
	};

	$scope.showApps = function() {
		$scope.showAllApps = true;
	};

	$scope.selectApp = function(app) {

		if ($('.app').hasClass('zoomOut')) {

			$scope.showAllApps = false;
			$scope.currentApp = app;
		}

	};

	$scope.slidePage = function(page) {
		$scope.currentPage = page;
	};

	$scope.setListeners = function() {
		$scope.$on('viewDiagnostics', function(evt, obj){
			$scope.slidePage('page-1');
		});
		$scope.$on('makeCall', function(evt, obj){
			$scope.slideApp('app-1');
		});
	};
	$scope.setListeners();
}]);