ccaApp.controller('ccaTransactionInfoCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout){
	var tripLegOptions = [
			{ id: 'from', label: 'From', type: 'text', value: '', css: 'sm' },
			{ id: 'to', label: 'To', type: 'text', value: '', css: 'sm' },
			{ id: 'date', label: 'Date', type: 'text', value: '', css: 'xs' },
			{ id: 'time', label: 'Time', type: 'text', value: '', css: 'xs' },
		];

	  $scope.customer = function() {
	    return $rootScope.currentCustomer;
	  }

	$scope.showTransactionInfo = 0;

	$scope.currentTrans = null;

	//+++++++++++++++++++
	// DATE PICKER

	$scope.today = new Date();

	$scope.toggleMin = function(datepicker) {
		$scope.minDate = $scope.minDate ? null : $scope.today;
	};
	$scope.toggleMin();

	$scope.open = function(input, $event) {
		$event.preventDefault();
		$event.stopPropagation();

		input.opened = true;
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	$scope.initDate = new Date('2016-15-20');
	$scope.format = 'shortDate';

	//+++++++++++++++++++++++++
	// TIME PICKER

	$scope.myTime = new Date();

	$scope.hstep = 1;
	$scope.mstep = 1;

	$scope.ismeridian = true;

	$scope.clear = function() {
		$scope.myTime = null;
	};

	$scope.passengerCount = [
		{ name: '1 Adult', value: 1 },
		{ name: '2 Adults', value: 2 },
		{ name: '3 Adults', value: 3 },
		{ name: '4 Adults', value: 4 },
		{ name: '5 Adults', value: 5 },
		{ name: '6 Adults', value: 6 },
		{ name: '7 Adults', value: 7 },
		{ name: '8 Adults', value: 8 },
		{ name: '9 Adults', value: 9 },
		{ name: '10 Adults', value: 10 }
	];

	$scope.myCount = $scope.passengerCount[0];

	$scope.travelClasses = [
		{ name: 'Economy', value: 'Economy' },
		{ name: 'Business', value: 'Business' },
		{ name: 'First Class', value: 'First Class' }
	];

	$scope.myClass = $scope.travelClasses[0];

	var createTripLegs = function(num) {
		var tripLegs = [];
		for (var i = 0; i < num; i++) {
			var leg = {};
			angular.copy({ id: tripLegs.length, options: tripLegOptions }, leg);
			tripLegs.push(leg);
		}
		
		tripLegs[0].options[0].value = $scope.customer().city;
		tripLegs[0].options[1].value = 'Phoenix';
		tripLegs[0].options[2].value = getDateStamp();
		tripLegs[0].options[3].value = getTimeStamp();

		if (tripLegs[1]) {
			tripLegs[1].options[0].value = tripLegs[0].options[1].value;
			tripLegs[1].options[1].value = 'Tempe';
			tripLegs[1].options[2].value = getDateStamp(null, 3);
			tripLegs[1].options[3].value = getTimeStamp(null, 3);
		}
			
		if (tripLegs[2]) {
			tripLegs[2].options[0].value = tripLegs[1].options[1].value;
			tripLegs[2].options[1].value = $scope.customer().city;
			tripLegs[2].options[2].value = getDateStamp(null, 5);
			tripLegs[2].options[3].value = getTimeStamp(null, 5);
		}
		return tripLegs;
	};

	$scope.loadTab = function() {
		console.log('loader')
		$scope.showLoader = true;
		$timeout(function() {
			$scope.showLoader = false;
		}, 100);
	};

	$scope.addTripLeg = function() {
		var leg = {};
		angular.copy({ id: $scope.tripTabs[2].tripLegs.length, options: tripLegOptions }, leg);
		$scope.tripTabs[2].tripLegs.push(leg);
	};

	$scope.removeTripLeg = function(index) {
		$scope.tripTabs[2].tripLegs.splice(index, 1);
	};

	$scope.confirmPurchase = function() {
		$rootScope.$broadcast('confirmPurchase');
	};

	$scope.setListeners = function() {
		$scope.$on('toggleSelectMenu', function(evt, item) {
	      $scope.showTransactionInfo = 0;
	    });

		$scope.$on('transactionSelected', function(evt, item){
			$scope.currentTrans = item;

			$scope.tripTabs = [
				{ title: 'Round Trip', tripLegs: createTripLegs(2), showAddLeg: 0 },
				{ title: 'One Way', tripLegs: createTripLegs(1), showAddLeg: 0 },
				{ title: 'Multi City', tripLegs: createTripLegs(3), showAddLeg: 1 }
			];

			$scope.showTransactionInfo = 1;
		});

		$scope.$on('resetApp', function(evt, item) {
      	$scope.currentTrans = null;
    });
	};

	
	$scope.setListeners();
}]);