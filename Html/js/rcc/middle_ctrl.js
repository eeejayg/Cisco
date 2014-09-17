window.config.scriptAction = window.config.scriptActionMiddle;

rccApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/overview', {
        templateUrl: 'middle-overview',
        controller: 'MiddleOverviewController'
      });
  }]);

rccControllers.controller('MiddleOverviewController', ['$rootScope', '$scope', 'storage', function ($rootScope, $scope, storage) {
  $scope.trainObjects = [
    {
      type: 'train',
      id: 0,
      infoBubble: 'right',
      title: 'CWI-829 Eastbound',
      stats: [
        {
          name: 'Current Speed',
          value: '40',
          percent: '40',
          units: 'kph'
        },{
          name: 'Allowed Speed',
          value: '70',
          percent: '70',
          units: 'kph'
        },{
          name: 'Current Weight',
          value: '11k',
          percent: '80',
          units: 'in kilos'
        },{
          name: 'Current Fuel',
          value: '38',
          percent: '60',
          units: 'x100 li'
        }
      ]
    },{
      'type': 'train',
      'id': 1,
      'infoBubble': 'right',
      'title': 'CWI-495 Northbound',
      'stats': [
        {
          'name': 'Current Speed',
          'value': '46',
          'units': 'kph'
        },{
          'name': 'Allowed Speed',
          'value': '45',
          'units': 'kph'
        },{
          'name': 'Current Weight',
          'value': '11k',
          'units': 'in kilos'
        },{
          'name': 'Current Fuel',
          'value': '38',
          'units': 'x100 li'
        }
      ]
    },{
      'type': 'train',
      'id': 2,
      'infoBubble': 'above',
      'title': 'CWI-192 Northbound',
      'stats': [
        {
          'name': 'Current Speed',
          'value': '46',
          'units': 'kph'
        },{
          'name': 'Allowed Speed',
          'value': '45',
          'units': 'kph'
        },{
          'name': 'Current Weight',
          'value': '11k',
          'units': 'in kilos'
        },{
          'name': 'Current Fuel',
          'value': '38',
          'units': 'x100 li'
        }
      ]
    }
  ];

  $scope.stationObjects = [
    { 'type': 'station', 'id': 0, 'title': 'CWI-425D', 'infoBubble': 'right', 'stats': [{ 'name': 'Passenger Station ID', 'value': 'CWI-524' }, { 'name': 'Occupancy', 'value': 'High' }, { 'name': 'Ticketing', 'value': '92%' }] },
    { 'type': 'station', 'id': 1, 'title': 'RCC Headquarters', 'infoBubble': 'above', 'stats': [{ 'name': 'Occupancy', 'value': 'High' }, { 'name': 'Infrastructure', 'value': 'Online' }] },
    { 'type': 'station', 'id': 2, 'title': 'CWI-425D', 'infoBubble': 'left', 'stats': [{ 'name': 'Passenger Station ID', 'value': 'CWI-524' }, { 'name': 'Occupancy', 'value': 'Medium' }, { 'name': 'Ticketing', 'value': '92%' }] },
    { 'type': 'station', 'id': 3, 'title': 'CWI-425D', 'infoBubble': 'right', 'stats': [{ 'name': 'Passenger Station ID', 'value': 'CWI-524' }, { 'name': 'Occupancy', 'value': 'Low' }, { 'name': 'Ticketing', 'value': '92%' }] },
    { 'type': 'station', 'id': 4, 'title': 'CWI-425D', 'infoBubble': 'left', 'stats': [{ 'name': 'Passenger Station ID', 'value': 'CWI-524' }, { 'name': 'Occupancy', 'value': 'Low' }, { 'name': 'Ticketing', 'value': '92%' }] },
    { 'type': 'station', 'id': 5, 'title': 'CWI-425D', 'infoBubble': 'right', 'stats': [{ 'name': 'Passenger Station ID', 'value': 'CWI-524' }, { 'name': 'Occupancy', 'value': 'High' }, { 'name': 'Ticketing', 'value': '92%' }] },
    { 'type': 'station', 'id': 6, 'title': 'CWI-425D', 'infoBubble': 'left', 'stats': [{ 'name': 'Passenger Station ID', 'value': 'CWI-524' }, { 'name': 'Occupancy', 'value': 'High' }, { 'name': 'Ticketing', 'value': '92%' }] },
    { 'type': 'station', 'id': 7, 'title': 'CWI-425D', 'infoBubble': 'right', 'stats': [{ 'name': 'Passenger Station ID', 'value': 'CWI-524' }, { 'name': 'Occupancy', 'value': 'Medium' }, { 'name': 'Ticketing', 'value': '92%' }] },
    { 'type': 'station', 'id': 8, 'title': 'Passenger Station ID: CWI-524', 'infoBubble': 'above', 'stats': [{ 'name': 'Occupancy', 'value': 'Low' }, { 'name': 'Ticketing', 'value': 'Online' }] },
    { 'type': 'station', 'id': 9, 'title': 'CWI-425D', 'infoBubble': 'above', 'stats': [{ 'name': 'Passenger Station ID', 'value': 'CWI-524' }, { 'name': 'Occupancy', 'value': 'High' }, { 'name': 'Ticketing', 'value': '92%' }] }
  ];

  $scope.routeObjects = [{
    'type': 'route',
    'id': 0,
    'sections': [{
      'id': 0,
      'legs': [{ 'id': 0 }, { 'id': 1 }, { 'id': 2 }, { 'id': 3 }, { 'id': 4 }],
      'stops': [{ 'id': 0 }],
      'stations': [4,5],
      'infoBubble': 'above',
      'title': 'Track CWI-210',
      'stats': [
        { 'name': 'Direction', 'value': 'East/West Bound' },
        { 'name': 'Trains en Route', 'value': '5' },
        { 'name': 'Maximum Allowed Speed', 'value': '82KPM' }]
    }]
  }];

  $scope.watchClosePullOut = function() {
    $scope.$on('closePullOut', function(evt, obj){

      $scope.inspectorWalks = true;

    });
  };

  $scope.toggleSelect = function(obj) {
    var isValidTrain = (obj.type == 'train') && (obj.id == 0);
    var isValidStation = (obj.type == 'station') && (obj.id == 1 || obj.id == 8);
    var isValidTrack = (obj.type === undefined) && (obj.id == 0);
    console.log(obj.type, obj.id);
    if (isValidTrain || isValidTrack || isValidStation) {
      obj.isSelected = !obj.isSelected;
      $rootScope.$broadcast('toggleSelect', obj);
    }
  };

  $scope.disableSection = function(section) {
    section.isDisabled = true;
    section.isSelected = false;
  };

  $scope.setListeners = function() {
    // WATCH TOGGLE SELECT
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

      // check routes
      $.each($scope.routeObjects, function(idx, route){
        $.each(route.sections, function(index, section) {
          var toggle = (section == obj) || (obj.sections ? (obj.sections.indexOf(section.id) > -1) : false);
          section.isSelected = toggle ? obj.isSelected : false;
          section.showInfoBubble = section == obj;
        });
      });

    });
  };

  $scope.setListeners();

}]);

rccControllers.controller('MiddleTrainController', ['$scope','notify', function ($scope, notify) {
    // $scope.trains = [];

    $scope.callNotify = function (msg) {
        notify(msg);
    };
}]);

// rccApp.directive('infoBubble', function() {
//   return {
//     restrict: 'E',
//     transclude: true,
//     scope: {
//       location: '@'
//     },
//     templateUrl: 'info-bubble.html'
//   };
// });
