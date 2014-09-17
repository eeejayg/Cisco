ccaApp.controller('ccaStationPanelCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log){
	$scope.stats = [
		{ 'icon': 'doublecloud', 'data': [{ 'label': 'Temp', 'value': '59' }, { 'label': 'Weather', 'value': 'Cloudy' }, { 'label': 'Humidity', 'value': '30%' }, { 'label': 'Rain', 'value': '10%' }] },
		{ 'icon': 'pos_terminal', 'data': [{ 'value': '7 Online' }, { 'value': '3 In Use' }, { 'value': '1 Offline' }] },
		{ 'icon': 'groups', 'data': [{ 'label': 'Occupancy', 'value': '212' }, { 'label': 'At Platform', 'value': '57' }, { 'label': 'At Info Desk', 'value': '4' }] },
		{ 'icon': 'map', 'data': [{ 'value': 'View Station Maps' }] }
	];

	$scope.trains = [
		{ 'data': [{ 'value': 'SEA to PDX' }, { 'value': 'CWI-T232' }, { 'value': 'Arrival' }, { 'value': '14:36' }, { 'value': 'On-Time', 'class': 'primary' }] },
		{ 'data': [{ 'value': 'LAX to SFO' }, { 'value': 'CWI-T250' }, { 'value': 'Arrival' }, { 'value': '05:42' }, { 'value': 'On-Time', 'class': 'primary' }] },
		{ 'data': [{ 'value': 'ATL to NYT' }, { 'value': 'CWI-T401' }, { 'value': 'Departure' }, { 'value': '13:15' }, { 'value': 'Delay', 'class': 'warning' }] },
		{ 'data': [{ 'value': 'SJE to DNV' }, { 'value': 'CWI-T421' }, { 'value': 'Arrival' }, { 'value': '13:15' }, { 'value': 'Cancelled', 'class': 'bad' }] },
		{ 'data': [{ 'value': 'PSP to TUS' }, { 'value': 'CWI-T480' }, { 'value': 'Departure' }, { 'value': '11:01' }, { 'value': 'On-Time', 'class': 'primary' }] }
	];
}]);