tiApp.controller('tiMapCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout) {
	$scope.trainObjects = [
		{ type: 'train', id: 0, infoBubble: 'above', title: 'CWI-486 Northbound', stats: [{ name: 'Occupancy Load', value: '84' }, { name: 'KPM Speed', value: '45' }, { name: 'Fuel Levels', value: '100' }]},
		{ type: 'train', id: 1, infoBubble: 'right', title: 'CWI-908 Southbound', stats: [{ name: 'Occupancy Load', value: '10' }, { name: 'KPM Speed', value: '37' }, { name: 'Fuel Levels', value: '75' }]},
		{ type: 'train', id: 2, infoBubble: 'right', title: 'CWI-315 Eastbound', stats: [{ name: 'Occupancy Load', value: '52' }, { name: 'KPM Speed', value: '40' }, { name: 'Fuel Levels', value: '80' }]}
	];

	$scope.stationObjects = [
		{ type: 'station', id: 0, 'routes': [1,3], title: 'Station 13 Eastbound', infoBubble: 'below', stats: [{ name: 'Trains Approaching', value: '4' }, { name: 'Trains Departing', value: '2' }, { name: 'Signal', value: 'Good' }] },
		{ type: 'station', id: 1, 'routes': [2,4], title: 'Station 13 Eastbound', infoBubble: 'left', stats: [{ name: 'Trains Approaching', value: '4' }, { name: 'Trains Departing', value: '2' }, { name: 'Signal', value: 'Good' }] },
		{ type: 'station', id: 2, 'routes': [1,6], title: 'Station 13 Eastbound', infoBubble: 'above', stats: [{ name: 'Trains Approaching', value: '4' }, { name: 'Trains Departing', value: '2' }, { name: 'Signal', value: 'Good' }] },
		{ type: 'station', id: 3, 'routes': [7,8], title: 'Station 13 Eastbound', infoBubble: 'left', stats: [{ name: 'Trains Approaching', value: '4' }, { name: 'Trains Departing', value: '2' }, { name: 'Signal', value: 'Good' }] }
	];

	$scope.lightObjects = [
		{ type: 'light', id: 0, title: 'Traffic Safety Light 11', infoBubble: 'above',  stats: [{ name: 'Current Signal', value: 'Clear' }, { name: 'Max Speed Limit', value: '40KPM' }] }
	];

	$scope.routeObjects = [
		{ type: 'route', id: 0, 
			sections: [
				{	id: 0, legs: [{	id: 0 }]}
			]
		},
		{ type: 'route', id: 1,
			stations: [0,2],
			alerts: [0],
			sections: [
				{id: 0, legs: [{id: 0}, {id: 1}], stations: [0]},
				{id: 1, legs: [{id: 0}], stations: [0,2]},
				{id: 2, legs: [{id: 0}], stations: [2]}
			]
		},
		{ type: 'route', id: 2,
			sections: [
				{id: 0, legs: [{id: 0}], stops: [{id: 0}], stations: [1]},
				{id: 1, legs: [{id: 0}, {id: 1}], stops: [{id: 0}, {id: 1}], stations: [1]}
			]
		},
		{ type: 'route', id: 3,
			sections: [
				{id: 0, legs: [{id: 0}], stops: [{id: 0}, {id: 1}, {id: 2}], stations: [0]}
			]
		},
		{ type: 'route', id: 4,
			sections: [
				{id: 0, legs: [{id: 0}], stations: [1]}
			]
		},
		{ type: 'route', id: 5,
			sections: [
				{id: 0, legs: [{id: 0}]}
			]
		},
		{ type: 'route', id: 6,
			sections: [
				{id: 0, legs: [{id: 0}, {id: 1}, {id: 2}], stops: [{id: 0}], stations: [2]}
			]
		},
		{ type: 'route', id: 7,
			sections: [
				{id: 0, legs: [{id: 0}], stops: [{id: 0}], stations: [3]},
				{id: 1, legs: [{id: 0}], stops: [{id: 0}], stations: [3]}
			]
		},
		{ type: 'route', id: 8,
			sections: [
				{id: 0,legs: [{id: 0}], stations: [3] }
			]
		}
	];

	$scope.alertObjects = [
		{ type: 'alert', id: 0, routes: [1], infoBubble: 'left', title: 'Breaker 3 Out', details: 'Panel 32' }
	];

	$scope.toggleSelect = function(obj) {
		obj.isSelected = !obj.isSelected;
		$rootScope.$broadcast('toggleSelect', obj);
	};

	$scope.disableSection = function(section, bool) {
		section.isSelected = false;
		section.isPulseDisabled = bool;
	};

	$scope.selectSection = function(section, bool) {
		section.isPulseSelected = bool;
	};

	$scope.clickAlertInfoBubble = function(alert){
		$rootScope.$broadcast('alertInfoBubble', alert);
	};

	$scope.setListeners = function() {
		$scope.$on('closePullOut', function(evt, obj){
			$scope.inspectorWalks = true;
		});

		$scope.$on('alertInfoBubble', function(evt, obj) {

			$scope.toggleSelect($scope.routeObjects[1].sections[1]);
		});

		$scope.$on('toggleSelect', function(evt, obj){

			// check trains
			$.each($scope.trainObjects, function(idx, train){
				train.isSelected = train == obj ? obj.isSelected : false;
				train.showInfoBubble = train == obj;
			});

			// check stations
			$.each($scope.stationObjects, function(idx, station){
				var toggle = (station == obj) || (obj.stations ? (obj.stations.indexOf(station.id) > -1) : false);
				station.isSelected = toggle ? obj.isSelected : false;
				station.showInfoBubble = station == obj;
			});

			// check lights
			$.each($scope.lightObjects, function(idx, light){
				var toggle = (light == obj) || (obj.lights ? (obj.lights.indexOf(light.id) > -1) : false);
				light.isSelected = toggle ? obj.isSelected : false;
				light.showInfoBubble = light == obj;
			});

			// check alerts
			$.each($scope.alertObjects, function(idx, alert){
				alert.isSelected = alert == obj ? obj.isSelected : false;
				alert.showInfoBubble = alert == obj;
			});

			// check routes
			$.each($scope.routeObjects, function(idx, route){
				$.each(route.sections, function(index, section) {
					var toggle = (section == obj) || (obj.sections ? (obj.sections.indexOf(section.id) > -1) : false);
					section.isSelected = toggle ? obj.isSelected : false;
				});
			});
			
		});

		$scope.$on('toggleTaskSelect', function(evt, task){
			if (task.type == 'urgent') {
				var alerts = $.grep($scope.alertObjects, function(alert, idx) {
					return alert.id == task.objId;
				});

				$scope.toggleSelect(alerts[0]);
			}
		});

		$scope.$on('divertTrains', function(evt, obj) {
			$scope.disableSection($scope.routeObjects[1].sections[1], true);
			$scope.selectSection($scope.routeObjects[6].sections[0], true);
		});

		$scope.$on('trackCleared', function(evt, obj) {
			$scope.inspectorWalks = true;
			$scope.trainMoves = true;
			$scope.toggleSelect($scope.routeObjects[6].sections[0]);
		});

		$scope.$on('resetApp', function(evt, obj){
			$scope.toggleSelect({});
			$scope.inspectorWalks = false;
			$scope.trainMoves = false;
			$scope.disableSection($scope.routeObjects[1].sections[1], false);
			$scope.selectSection($scope.routeObjects[6].sections[0], false);
		});
	};

	$scope.setListeners();

}]);