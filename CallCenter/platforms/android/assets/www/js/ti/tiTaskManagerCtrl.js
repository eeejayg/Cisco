tiApp.controller('tiTaskManagerCtrl', ['$scope', '$rootScope', '$log', '$interval', function($scope, $rootScope, $log, $interval){
	$scope.tasks = [
		{ type: 'urgent', icon: 'warning_shield', title: 'Urgent Alert', objId: 0 },
		{ type: 'electrical', icon: 'electricity', title: 'Check Panel 15 Status' },
		{ type: 'engineer', icon: 'engineering', title: 'Engineer Alert' },
		{ type: 'electrical', icon: 'electricity', title: 'Electrical Alert' },
		{ type: 'program', icon: 'electronics', title: 'Updates on Panel 20' },
		{ type: 'program', icon: 'electronics', title: 'Maintenance Light 5' },
		{ type: 'connectivity', icon: 'connected_no_data', title: 'Check Connectivity' }
	];

	$scope.taskClick = function(task) {
		task.isSelected = !task.isSelected;
		$rootScope.$broadcast('toggleTaskSelect', task);
	};

	$scope.watchToggleSelect = function(obj) {
		$scope.$on('toggleSelect', function(evt, obj){
			if (obj.type == 'alert') {
				var tasks = $.grep($scope.tasks, function(task, idx) {
					return task.objId == obj.id;
				});

				tasks[0].isSelected = obj.isSelected;
			} else {
				$.each($scope.tasks, function(idx, itm) {
					itm.isSelected = false;
				});
			}
		});
	};

	$scope.taskManagerAutoPush = function() {
		$scope.taskPool = taskPool;
		$scope.tasks= $scope.taskPool.slice(0, 5);
		$scope.tasks.push(alertTask);

		// $interval(function(){
		// 	$scope.tasks.shift();
		// }, 5000000);

		// $interval(function(){
		// 	var start = getRandomInt(1, $scope.taskPool.length - 1),
		// 		end = start + 1,
		// 		task = angular.copy($scope.taskPool.slice(start, end));
		// 	$scope.tasks.push(task[0]);
		// }, 100000);
	};

	//$scope.taskManagerAutoPush();
	$scope.watchToggleSelect();
}]);