config.stations = [{
  stationId: 'CWI-524',
  trains: [{
    trainId: 'CWI-T182',
    direction: 'Westbound',
    signalStrength: 8,
    status: 'On-Time'
  },{
    trainId: 'CWI-T302',
    direction: 'Eastbound',
    signalStrength: 9,
    status: 'Delayed'
  }],
  agents: [{
    id: 2991,
    name: 'T. Gordon'
  },{
    id: 3806,
    name: 'A. James'
  },{
    id: 4468,
    name: 'F. Percy'
  }]
}];

config.surveillanceTimes = (function() {
  var times = [];
  var startTime = new Date();
  for (var i=0; i<6; i++) {
    stopTime = startTime;
    startTime = new Date(stopTime.valueOf() - 10*60*1000);
    times[i] = {
      date: window.util.getDateString(stopTime),
      stopTime: window.util.getTimeString(stopTime),
      startTime: window.util.getTimeString(startTime),
      peopleCount: _.random(300, 400),
      peopleCrossing: _.random(20, 40)
    }
  }
  return times;
})();

config.infrastructureDevices = [
  { type: 'msg-cdp', name: 'ISR G2', icon: 'isr-g2', value: 8 },
  { type: 'msg-connect', name: 'IP Phones', icon: 'ip-phone', value: 30 },
  { type: 'msg-video', name: 'Video Surveillance Cameras', icon: 'surveillance', value: '43% full' },
  { type: 'signal', name: 'Wireless Access Points', icon: 'wireless-access', value: 8 },
  { type: 'msg-cdp', name: '3750x', icon: 'd3750x', value: 4 },
  { type: 'msg-users', name: 'Customer Information System', icon: 'customer-info', value: 430 },
  { type: 'none', name: 'Security System', icon: 'security', value: 9 },
  { type: 'msg-call', name: 'TelePresence System', icon: 'telepresence', value: 'Not in Call' },
  { type: 'msg-tickets', name: 'iServices Kiosk', icon: 'retail-communications', value: '15 / hr' }
];

window.config.scriptAction = window.config.scriptActionLeft;

rccApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/overview/:menuItem?', {
        templateUrl: 'left-overview',
        controller: 'LeftOverviewController'
      }).
      when('/trains/:trainId/:menuItem?', {
        templateUrl: 'left-train',
        controller: 'LeftTrainController'
      }).
      when('/tracks/:trackId/:menuItem?', {
        templateUrl: 'left-track',
        controller: 'LeftTrackController'
      }).
      when('/stations/:stationId/:menuItem?', {
        templateUrl: 'left-station',
        controller: 'LeftStationController'
      }).
      when('/headquarters/:menuItem?', {
        templateUrl: 'left-headquarters',
        controller: 'LeftHQController'
      }).
      otherwise({
        redirectTo: '/overview'
      });
  }]);

rccControllers.directive('leftMain', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: 'left-main'
  };
});

rccControllers.controller('LeftMenuController', ['$scope', '$location', '$routeParams',
  function ($scope, $location, $routeParams) {
    var index = $scope.menuItems.indexOf($routeParams.menuItem);
    index = Math.max(0, index);
    if ($scope.itemEnabled[index]) $scope.$parent.menuItemSelected = $scope.menuItems[index];
    $scope.selectItem = function(index) {
      var path = $location.path().split('/');
      if ($scope.itemEnabled[index]) {
        path[3] = $scope.menuItems[index];
        $location.path(path.join('/'));
      }
    }
  }]);

rccControllers.controller('LeftOverviewController', ['$scope',
  function ($scope) {
    $scope.menuItems = ['Overview', 'Sensor Data', 'Maintenance', 'Workzones'];
    $scope.itemEnabled = [true, false, false, false];
    $scope.section = 'left-overview';
    $scope.trackVideos = [
      'v14148896.mp4', 'v14160175.mp4', 'v16842040.mp4', 'v19174639.mp4', 'v19175054.mp4',
      'v19179583.mp4', 'v2327874.mp4', 'v6636128.mp4', 'v7211535.mp4', 'v7211856.mp4',
      'v7211882.mp4', 'v9157397.mp4', 'v9157422.mp4'
    ].map(function($){
      return {
        cameraId: 1000 + _.random(500, 2000),
        video: 'video/' + $
      }
    });
    $scope.nextVideo = -1;
    $scope.getNextVideo = function() {
      $scope.nextVideo = ($scope.nextVideo + 1) % $scope.trackVideos.length;
      return $scope.trackVideos[$scope.nextVideo];
    }
  }]);

rccControllers.directive('trackVideo', function () {
  return {
    restrict: 'E',
    scope: true,
    replace: true,
    templateUrl: 'track-video',
    link: function($scope, $element) {
      _.extend($scope, $scope.getNextVideo());
      $element.find('video').bind('ended', function(){
        _.extend($scope, $scope.getNextVideo());
        $scope.$apply();
      });
      $element.find('video').get(0).muted = true;
    }
}});

rccControllers.controller('LeftTrainController', ['$scope', '$rootScope', 'storage',
  function ($scope, $rootScope, storage) {
    $scope.menuItems = ['Overview', 'Sensor Data', 'Maintenance', 'Passengers'];
    $scope.itemEnabled = [true, false, false, true];
    $scope.menuItemSelected = 'Overview';
    $scope.section = 'left-train';

    $scope.trainId = 'CWI-829';
    $scope.cars = [
      { id: 244, passengerCount: 23 },
      { id: 245, passengerCount: 40 },
      { id: 255, passengerCount: 32 },
      { id: 356, passengerCount: 54 },
      { id: 301, passengerCount: 12 },
      { id: 321, passengerCount:  9 },
      { id: 360, passengerCount: 18 },
      { id: 365, passengerCount: 28 },
      { id: 380, passengerCount: 20 },
    ];
    $scope.passengerCount = $scope.cars.reduce(function(p, c){
      return p + c.passengerCount;
    }, 0);
    $scope.conductors = [
      { name: 'C. Henry', location: 244 },
      { name: 'F. Murdoch', location: 365 }
    ];
    $scope.alert = {
      count: 1,
      location: 245,
      seat: '13D'
    };
  }]);

rccControllers.controller('LeftTrainOverviewController', ['$scope', '$rootScope', 'storage',
  function ($scope, $rootScope, storage) {
    $scope.isSelected = function() { return $scope.menuItemSelected == 'Overview' };
  }]);

rccControllers.controller('LeftTrainPassengersController', ['$scope', '$rootScope', '$interval', 'storage',
  function ($scope, $rootScope, $interval, storage) {
    $scope.isSelected = function() { return $scope.menuItemSelected == 'Passengers' };
  }]);


rccControllers.controller('LeftTrackController', ['$scope', '$rootScope', 'storage',
  function ($scope, $rootScope, storage) {
    $scope.menuItems = ['Overview', 'Equipment', 'Maintenance', 'Workzones'];
    $scope.itemEnabled = [true, true, false, false];
    $scope.menuItemSelected = 'Overview';
    $scope.section = 'left-track';
  }]);

rccControllers.controller('LeftTrackOverviewController', ['$scope', '$rootScope', 'storage',
  function ($scope, $rootScope, storage) {
    $scope.isSelected = function() { return $scope.menuItemSelected == 'Overview' };
    $scope.data = [{
      id: '4250',
      direction: 'Eastbound',
      signalStrength: 8,
      monitors: [{
        min: 0,
        max: 100,
        value: 46,
        title: 'Current Speed',
        units: '(kph)'
      },{
        min: 0,
        max: 100,
        value: 50,
        title: 'Allowed Speed',
        units: '(kph)'
      },{
        min: 0,
        max: 50,
        value: '11',
        mark: 'k',
        title: 'Current Weight',
        units: '(in kilos)'
      },{
        min: 0,
        max: 45,
        value: 38,
        title: 'Current Fuel',
        units: '(x100 li)'
      }]
    },{
      id: '1423',
      direction: 'Westbound',
      signalStrength: 7,
      monitors: [{
        min: 0,
        max: 100,
        value: 46,
        title: 'Current Speed',
        units: '(kph)'
      },{
        min: 0,
        max: 100,
        value: 50,
        title: 'Allowed Speed',
        units: '(kph)'
      },{
        min: 0,
        max: 50,
        value: '11',
        mark: 'k',
        title: 'Current Weight',
        units: '(in kilos)'
      },{
        min: 0,
        max: 45,
        value: 38,
        title: 'Current Fuel',
        units: '(x100 li)'
      }]
    }];
  }]);

rccControllers.controller('LeftTrackEquipmentController', ['$scope', '$rootScope', '$interval', 'storage',
  function ($scope, $rootScope, $interval, storage) {
    $scope.isSelected = function() { return $scope.menuItemSelected == 'Equipment' };
    $scope.isModalVisible = false;
    $scope.setModalVisible = function(isVisible) {
      $scope.isModalVisible = isVisible;
      if (isVisible) {
        //set script to open
      } else {
        //set script to close
      }
    }
    $scope.devices = [{
      name: 'ASR901',
      icon: 'asr901',
      connections: 22
    },{
      name: 'IE2000',
      icon: 'ie2000',
      connections: 6
    },{
      name: 'IE3010',
      icon: 'ie3010',
      connections: 10
    },{
      id: 'openRouter819',
      name: '819h Router',
      icon: 'router819',
      connections: 3
    },{
      name: '3750X',
      icon: '',
      connections: 0
    },{
      name: 'ISR-G2',
      icon: '',
      connections: 0
    }];
    $scope.device = {
      ip: '10.5.16.12',
      aci: 'Access_Edge_TrackSide',
      connectType: '4G, 4G, WiFi (connected)',
      connectTime: 25,
      speedCheck: 112,
      trackSwitch: 'Sleep',
      messaging: 'Standby',
      axel: '2 of 5',
      weather: '0 of 5',
      electrical: '1 of 3',
      scada: '42 of 53'
    };
    $scope.startTime = Date.now() - 56000;
    $interval(function(){
      $scope.device.connectTime = Math.floor((Date.now() - $scope.startTime) / 60000) + 25;
      $scope.device.speedCheck = 112 + _.random(-4, 4);
    }, 2000);
  }]);


rccControllers.controller('LeftStationController', ['$scope', '$rootScope', '$routeParams', 'storage',
  function ($scope, $rootScope, $routeParams, storage) {
    $scope.menuItems = ['Overview', 'Map', 'Surveillance', 'Infrastructure'];
    $scope.itemEnabled = [true, false, true, true];
    $scope.menuItemSelected = 'Overview';
    $scope.section = 'left-station';

    $scope.trackVideos = ['video1.mp4', 'video2.mp4', 'video3.mp4', 'video4.mp4'];
    $scope.nextVideo = -1;
    $scope.getNextVideo = function() {
      $scope.nextVideo = ($scope.nextVideo + 1) % $scope.trackVideos.length;
      return 'video/' + $scope.trackVideos[$scope.nextVideo];
    }

    _.extend($scope, config.stations[$routeParams.stationId - 1]);
  }]);

rccControllers.controller('LeftStationOSController', ['$scope', '$rootScope', '$interval',
  function ($scope, $rootScope, $interval) {
    $scope.isSelected = function() {
      $scope.isOverview = $scope.menuItemSelected == 'Overview';
      $scope.isSurveillance = $scope.menuItemSelected == 'Surveillance';
      return $scope.isOverview || $scope.isSurveillance;
    };
    $scope.isSelected();
    $scope.times = config.surveillanceTimes;
    $scope.timeSelected = null;
    $scope.selectTime = function(index) {
      $scope.timeSelected = index;
      startVideo();
      startRedBox();
    }
    $('.surveillance video').bind('ended', startVideo);
    function startVideo() {
      var video = $('.surveillance video').get(0);
      video.currentTime = 0;
      video.muted = true;
      video.play();
    };
    setTimeout(startVideo, 500);
    var start, stop, interval;
    function startRedBox() {
      start = Date.now();
      stop = stop + 30000;
      if (interval) $interval.cancel(interval);
      interval = $interval(updateBoxes, 400, Math.floor(30000 / 400) + 5);
    };
    var boxes = (function() {
      var top, left, randBox = [];
      for (var i=0; i<32000; i+=2000) {
        top = _.random(82 + 20, 250 - 25);
        left = (top < 133) ?
          _.random(25 + 663 - 4.4 * top, 270 + 7 * (top - 110) - 25) :
          _.random(25 + 10, 545-top - 25);
        randBox.push({
          time: i,
          left: left,
          top: top
        });
      }
      return randBox;
    })();
    function updateBoxes() {
      $scope.boxes = boxes.filter(function($){
        var delta = Date.now() - start;
        return (delta < $.time && $.time < delta + 6000);
      }).map(function($){
        $.top += _.random(-10, 10);
        $.left += _.random(-10, 10);
        return $;
      });
    }
  }]);

rccControllers.controller('LeftStationInfrastructureController', ['$scope', '$rootScope', 'storage',
  function ($scope, $rootScope, storage) {
    $scope.isSelected = function() { return $scope.menuItemSelected == 'Infrastructure' };
    $scope.devices = config.infrastructureDevices;
  }]);

rccControllers.controller('LeftHQController', ['$scope', '$rootScope', '$routeParams', 'storage',
  function ($scope, $rootScope, $routeParams, storage) {
    $scope.menuItems = ['Overview', 'Map', 'Surveillance', 'Infrastructure'];
    $scope.itemEnabled = [true, false, false, false];
    $scope.menuItemSelected = 'Overview';
    $scope.section = 'left-station';

    $scope.responseLT100 = 45;
    $scope.responseGT100 = 23;
    $scope.minimalResource = 31;
    $scope.cloudBurst = 140;
    $scope.interCloud = 30;
    $scope.cloudConnect = 23;
    $scope.employees = '6,784';
    $scope.technicians = '3,241';
  }]);

