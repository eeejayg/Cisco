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

	$scope.watchToggleSelect();
}]);