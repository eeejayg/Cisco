rccApp.factory('storage', ['$window', '$rootScope', '$interval', function($window, $rootScope, $interval) {
  var storeData = getStore();

  function getStore() {
    return JSON.parse($window.localStorage.getItem('CiscoLive')) || {}
  }

  function getItem(key) {
    return storeData[key];
  }

  function setItem(key, value) {
    var isChanged = (storeData[key] !== value);
    storeData[key] = value;
    $window.localStorage.setItem('CiscoLive', JSON.stringify(storeData));
    if (isChanged) broadcastChange(key, value);
  }

  function detectExternalChange() {
    var key;
    var localStore = getStore();
    for (key in localStore) syncValue(key, storeData[key], localStore[key]);
    for (key in storeData) syncValue(key, storeData[key], localStore[key]);
  }

  function syncValue(key, storeValue, localValue) {
    if (storeValue !== localValue) setItem(key, localValue);
  }

  function broadcastChange(key, newValue) {
    $rootScope.$emit('storage.changed', { key: key, value: newValue });
  }

  $interval(detectExternalChange, 50);

  return {
    setItem: setItem,
    getItem: getItem
    //getKeys: getKeys,
    //removeItem: removeItem,
    //clearAll: clearAll,
  }
}]);
