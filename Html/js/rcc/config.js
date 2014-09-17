(function(){
  window.config = window.config || {};
  window.config.updateLocalStorage = true;
  window.config.scriptOrder = [
    'blankScreen',
    'overview',
    'train',
    'trainPassengers',
    'track',
    'trackEquipment',
    'trackOpenRouterDetails',
    'trackCloseRouterDetails',
    'station',
    'stationSurveillance',
    'stationSurveillancePeople',
    'stationInfrastructure',
    'headquarters',
    'theEnd'
  ];
  window.config.scriptActionLeft = {
    blankScreen: {
      type: 'navigation',
      action: '/blank/1'
    },
    overview: {
      type: 'navigation',
      action: '/overview'
    },
    train: {
      type: 'navigation',
      action: '/trains/1/Overview'
    },
    trainPassengers: {
      type: 'navigation',
      action: '/trains/1/Passengers'
    },
    track: {
      type: 'navigation',
      action: '/tracks/1/Overview'
    },
    trackEquipment: {
      type: 'navigation',
      action: '/tracks/1/Equipment'
    },
    trackOpenRouterDetails: {
      type: 'click',
      action: '#openRouter819'
    },
    trackCloseRouterDetails: {
      type: 'click',
      action: '#closeRouter819'
    },
    station: {
      type: 'navigation',
      action: '/stations/1/Overview'
    },
    stationSurveillance: {
      type: 'navigation',
      action: '/stations/1/Surveillance'
    },
    stationSurveillancePeople: {
      type: 'click',
      action: '#People2'
    },
    stationInfrastructure: {
      type: 'navigation',
      action: '/stations/1/Infrastructure'
    },
    headquarters: {
      type: 'navigation',
      action: '/headquarters'
    },
    theEnd: {
      type: 'navigation',
      action: '/blank/2'
    }
  };

  window.config.scriptActionMiddle = {
    blankScreen: {
      type: 'navigation',
      action: '/blank/1'
    },
    overview: {
      type: 'navigation',
      action: '/overview'
    },
    train: {
      type: 'click',
      action: '#Train0'
    },
    trainPassengers: null,
    track: {
      type: 'click',
      action: '#Section0'
    },
    trackEquipment: null,
    trackOpenRouterDetails: null,
    trackCloseRouterDetails: null,
    station: {
      type: 'click',
      action: '#Station8'
    },
    stationSurveillance: null,
    stationSurveillancePeople: null,
    stationInfrastructure: null,
    headquarters: {
      type: 'click',
      action: '#Station1'
    },
    theEnd: {
      type: 'navigation',
      action: '/blank/2'
    }
  };

  window.config.scriptActionRight = {
    blankScreen: {
      type: 'navigation',
      action: '/blank/1'
    },
    overview: {
      type: 'navigation',
      action: '/overview'
    },
    train: {
      type: 'navigation',
      action: '/trains/1'
    },
    trainPassengers: { type: 'skip' },
    track: {
      type: 'navigation',
      action: '/tracks/1'
    },
    trackEquipment:  { type: 'skip' },
    trackOpenRouterDetails:  { type: 'skip' },
    trackCloseRouterDetails:  { type: 'skip' },
    station: {
      type: 'navigation',
      action: '/stations/1'
    },
    stationSurveillance:  { type: 'skip' },
    stationSurveillancePeople:  { type: 'skip' },
    stationInfrastructure:  { type: 'skip' },
    headquarters: {
      type: 'navigation',
      action: '/headquarters'
    },
    theEnd: {
      type: 'navigation',
      action: '/blank/2'
    }
  };

  window.config.alerts = _.shuffle([{
    type: 'train',
    icon: 'train',
    message: 'Train arrived at refuel depot'
  },{
    type: 'train',
    icon: 'train',
    message: 'Wheel 3817 replacement by mechanic'
  },{
    type: 'train',
    icon: 'warning_shield',
    message: 'Increased repairs alert – supervisor alerted'
  },{
    type: 'train',
    icon: 'train',
    message: 'Train delivered $2.5M freight load 7981'
  },{
    type: 'train',
    icon: 'electronics',
    message: 'Speed reduced by SpeedCheck at station 4255'
  },{
    type: 'track',
    icon: 'electronics',
    message: 'Connected Successfully with Train WB1244'
  },{
    type: 'track',
    icon: 'electronics',
    message: 'Train WB8872 speed limit set by SpeedCheck station 3241'
  },{
    type: 'track',
    icon: 'warning_shield',
    message: 'SpeedCheck station 3241 selective data upload to regional station 8753 ASR901'
  },{
    type: 'track',
    icon: 'electronics',
    message: 'Train EB7633 speed reduced by SpeedCheck station 3241'
  },{
    type: 'track',
    icon: 'read_message',
    message: 'App update success with regional station 8756'
  },{
    type: 'station',
    icon: 'train',
    message: 'Train WB1555 Arrived on time'
  },{
    type: 'station',
    icon: 'read_message',
    message: 'Agent W.Rollands requested assistance from call center'
  },{
    type: 'station',
    icon: 'warning_shield',
    message: 'Auto-trigger Security send to platform 2 by video analytics'
  },{
    type: 'station',
    icon: 'read_message',
    message: 'Train EB7022 Arrived 5 minutes late'
  },{
    type: 'station',
    icon: 'electronics',
    message: 'Station signs auto-changed to reduce congestion (CMX trigger)'
  }]);

  window.util = {};
  window.util.padDiget = function($) {
    return ($ < 10 ? '0' : '') + $;
  }
  window.util.getTimeString = function($) {
    var hours = $.getHours();
    var minutes = util.padDiget($.getMinutes());
    return hours + ':' + minutes;
  }
  window.util.getDateString = function($) {
    var month = $.getMonth() + 1;
    var day = util.padDiget($.getDate());
    var year = $.getFullYear();
    return month + '/' + day + '/' + year;
  }

  var start = new Date();
  for (var i=0; i < window.config.alerts.length; i++) {
    window.config.alerts[i].timeStamp =
      util.getDateString(start) + ' ' + util.getTimeString(start);
    start = new Date(start.valueOf() - _.random(90000, 60*60*1000));
  }

  window.getAlerts = function(type) {
    var alerts = window.config.alerts;
    if(type) {
      alerts = $.grep(window.config.alerts, function(item, idx) {
        return item.type == type;
      })
    }
    return alerts;
  };
})()
