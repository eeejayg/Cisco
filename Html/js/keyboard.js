(function(){
  $(document).on('keydown', onKeyDown);

  var key = {
      ESCAPE: 27,
      LEFT_ARROW: 37,
      UP_ARROW: 38,
      RIGHT_ARROW: 39,
      DOWN_ARROW: 40,
      ENTER_KEY: 13,
      LETTER_A: 65,
      LETTER_D: 68,
      LETTER_H: 72,
      TILDE_KEY: 192,
      SPACE: 32,
      BACKSPACE: 8,
      ADD: 107,
      SUBTRACT: 109,
      DASH: 189,
      DASH_FF: 173,
      EQUALS: 187,
      EQUALS_FF: 61
  };

  var config = window.config;
  var fakeStorage = {};
  var storage = {
    getItem: function(k) {
      var v;
      if (window.config.updateLocalStorage) {
        v = window.localStorage.getItem(k);
      } else {
        v = fakeStorage[k];
      }
      return v;
    },
    setItem: function(k, v) {
      if (window.config.updateLocalStorage) {
        window.localStorage.setItem(k,v)
      } else {
        fakeStorage[k] = v;
      }
    }
  };
  var local = {
    hash: '#',
    currentStep: localStorage.getItem('currentStep')
  }

  function onKeyDown(evt) {
    switch (evt.keyCode) {
      case key.LEFT_ARROW:
        evt.preventDefault();
        advanceStep(-1);
        break;
      case key.RIGHT_ARROW:
        evt.preventDefault();
        advanceStep(+1);
        break;
      case key.LETTER_H:
        if (evt.keyCode == 72 && evt.ctrlKey) {
          evt.preventDefault();
          toggleHints();
        }
        break;
      case key.TILDE_KEY:
        gotoStep(0);
        break;
    }
  }

  function advanceStep(direction) {
    var currentStep = storage.getItem('currentStep');
    var index = config.scriptOrder.indexOf(currentStep);
    index = isNaN(index) ? 0 : Math.max(0, Math.min(index + direction, config.scriptOrder.length - 1));
    var actionName = config.scriptOrder[index];
    //local.updateStepHandled = false;
    local.currentDirection = direction;
    storage.setItem('currentStep', actionName);
    console.log(actionName);
  }

  function detectExternalChange() {
    var currentStep = storage.getItem('currentStep');
    if (local.currentStep != currentStep) {
      local.currentStep = currentStep;
      gotoStep(currentStep);
    }
    if (local.hash != window.location.hash) {
      local.hash = window.location.hash;
      updateStepByAction(local.hash.substr(1));
    }
  }

  function updateStepByAction(action) {
    var currentStep = storage.getItem('currentStep');
    var index = window.config.scriptOrder.
      map(function($){
        var step = window.config.scriptAction[$];
        return step ? step.action : null;
      }).
      indexOf(action);
    var step = window.config.scriptOrder[index];
    if (step) {
      local.currentStep = step;
      storage.setItem('currentStep', step);
    }
  }

  $('body').delegate('.hint', 'click', function(evt) {
    updateStepByAction('#' + this.id);
  });

  function gotoStep(actionName) {
    var action = config.scriptAction[actionName];
    if (action) {
      doAction(action);
      // if (local.updateStepHandled) {
      //   local.updateStepHandled = false;
      //   storage.setItem('isStepHandled', false);
      // }
    } else {
      // setTimeout(waitForOtherMonitor, 100);
    }
    //console.log('step', actionName, action ? action.type : 'none');
  }

  function waitForOtherMonitor() {
    var isStepHandled = storage.getItem('isStepHandled');
    if (!isStepHandled) advanceStep(+1);
    console.log('isStepHandled', isStepHandled);
  }

  function doAction(action, update) {
    if (action && action.type == 'navigation') {
      window.location.hash = action.action;
    }
    if (action && action.type == 'click') {
      $(action.action).click();
    }
    if (action && action.type == 'skip') {
      advanceStep(local.currentDirection);
    }
    // if (update) localStorage.setItem('isStepHandled', true);
  }

  setInterval(detectExternalChange, 20);
})();
