window.config.scriptAction = window.config.scriptActionRight;
window.config.updateLocalStorage = false;

rccApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/overview', {
        templateUrl: 'right-overview',
        controller: 'RightOverviewController'
      }).
      when('/trains/:trainId', {
        templateUrl: 'right-overview',
        controller: 'RightTrainController'
      }).
      when('/tracks/:trackId', {
        templateUrl: 'right-overview',
        controller: 'RightTrackController'
      }).
      when('/stations/:stationId', {
        templateUrl: 'right-overview',
        controller: 'RightStationController'
      }).
      when('/headquarters', {
        templateUrl: 'right-overview',
        controller: 'RightHQController'
      }).
      otherwise({
        redirectTo: '/overview'
      });
  }]);

rccControllers.controller('BlankScreenController', ['$routeParams', 'storage',
  function ($routeParams, storage) {
    var step = (parseInt($routeParams.id) == 2) ? 'TheEnd' : 'BlankScreen';
    localStorage.setItem('currentStep', step);
  }]);

rccControllers.controller('RightOverviewController', ['$scope', 'storage',
  function ($scope, storage) {

    $scope.alertBox = {
      title: 'System Alerts',
      alerts:  window.getAlerts()
    };

    $scope.statusBox = {
      title: 'Data Center Status',
      statuses: [
        { type: 'icon', icon: 'cloud', title: 'Cloud Capacity', details: 'Online'},
        { type: 'percent', value: 82, title: 'Current Capacity', details: 'Optimum'},
        { type: 'signal', strength: 'good', title: 'System Health', details: 'Good'}
      ]
    };

    $scope.waysideApp1 = {
      title: 'PTC System Status',
      statuses: [
        { name: 'Status', signal: 9 },
        { name: 'Stations Reporting', value: '432/432'}
      ]
    };

    $scope.waysideApp2 = {
      title: 'Enterprise Apps',
      statuses: [
        { name: 'Apps', value: '5,783 active /', value2: '231 inactive'},
        { name: 'Users Online', value: '113,233'}
      ]
    };
  }]);

rccControllers.controller('RightTrainController', ['$scope', '$rootScope', 'storage',
  function ($scope, $rootScope, storage) {
    $scope.alertBox = {
      title: 'Train Alerts',
      alerts:  window.getAlerts('train')
    };

    $scope.statusBox = {
      title: 'Onboard Systems Status',
      statuses: [
        { type: 'icon', icon: 'online', title: '819', details: '4G'},
        { type: 'percent', value: 23, title: 'Data Storage Capacity', details: ''},
        { type: 'signal', strength: 'good', title: 'System Health', details: 'Good'}
      ]
    };

    var start = new Date(Date.now() - 11*60*1000);

    $scope.waysideApp1 = {
      title: 'SpeedCheck App',
      statuses: [
        {name: 'Status', value: 'Online'},
        {name: 'Last Wayside Station', value: 'WB23 ' + util.getDateString(start) + ' ' + util.getTimeString(start)},
        {name: 'Operator', value: 'W. Johnson'},
        {name: 'Connect Speed', value: '132ms'}
      ]
    };

    $scope.waysideApp2 = {
      title: 'Passenger Info Systems',
      statuses: [
        {name: 'Status', value: 'Online'},
        {name: 'Active Users', value: '213'},
        {name: 'Train Network', value: '45% capacity'}
      ]
    };

  }]);

rccControllers.controller('RightTrackController', ['$scope', '$rootScope', 'storage',
  function ($scope, $rootScope, storage) {
    $scope.alertBox = {
      title: 'Track Alerts',
      alerts: window.getAlerts('track')
    };

    $scope.statusBox = {
      title: 'Local Systems Status',
      statuses: [
        { type: 'icon', icon: 'online', title: 'Messaging Server', details: 'Online'},
        { type: 'icon', icon: 'connected_no_data', title: 'Modules Reporting', details: '5/5'},
        { type: 'signal', strength: 'good', title: 'System Health', details: 'Good'}
      ]
    };

    $scope.waysideApp1 = {
      title: 'Local Apps',
      statuses: [
        {name: 'Status', signal: 8},
        {name: 'Stations Reporting', value: '432/432'}
      ]
    };

    $scope.waysideApp2 = {
      title: 'Connection Towers',
      statuses: [
        {name: 'Mast 441 220MHz', value: 'Online'},
        {name: 'Mast 442 220MHz', value: 'Online'},
        {name: 'Mast 61 3G', value: 'Online'},
        {name: 'SCADA 5231', value: 'Last Connect - 5 sec ago'}
      ]
    };

  }]);

rccControllers.controller('RightStationController', ['$scope', '$rootScope', 'storage',
  function ($scope, $rootScope, storage) {
    $scope.stationId = 2;

    $scope.alertBox = {
      title: 'Station Alerts',
      alerts: window.getAlerts('station')
    };

    $scope.statusBox = {
      title: 'Station Systems Status',
      statuses: [
        { type: 'percent', value: 67, title: 'Infrastructure', details: 'Online'},  // / 67% Capacity
        { type: 'percent', value: 72, title: 'Current Capacity', details: 'Optimum'},
        { type: 'signal', strength: 'fair', title: 'Kiosk Status', details: 'High Usage'}
      ]
    };

    $scope.waysideApp1 = {
      title: 'Local App Status @ ISR G2',
      statuses: [
        {name: 'Kiosk Helper', value: '23%'},
        {name: 'Agent Terminals', value: '15%'},
        {name: 'Digital Signage', value: '10%'},
        {name: 'Passenger App Service', value: '40%'}
      ]
    };

    $scope.waysideApp2 = {
      title: 'Infrastructure Status',
      statuses: [
        {name: 'ACI Policy', value: 'Station_PassengerPolicy_East'},
        {name: 'WAN', value: '50 Mbps Max'},
        {name: 'Access', value: '8 of 8 WAP\'s online'}
        // {name: 'Collaboration Endpoints', value: '7 online (5 IP Phone, 2 DX80)'}
      ]
    };

  }]);

rccControllers.controller('RightHQController', ['$scope', '$rootScope', 'storage',
  function ($scope, $rootScope, storage) {
    $scope.alertBox = {
      title: 'Headquarter Alerts ',
      alerts: window.getAlerts()
    };

    $scope.statusBox = {
      title: 'Data Center Status',
      statuses: [
        { type: 'percent', value: 87, title: 'Compute'},
        { type: 'percent', value: 56, title: 'Storage'},
        { type: 'percent', value: 87, title: 'Network'}
      ]
    };

    $scope.waysideApp1 = {
      title: 'WAN Status',
      statuses: [
        {name: 'ACI Policy', value: 'WAN_CWITrak_Policy'},
        {name: 'Infrastructure Components', value: '621'}
      ]
    };

    $scope.waysideApp2 = {
      title: 'Access Status',
      statuses: [
        {name: 'ACI Policy', value: 'Access_CWITrak_Policy'},
        {name: 'Infrastructure Components', value: '1672'}
      ]
    };

  }]);
