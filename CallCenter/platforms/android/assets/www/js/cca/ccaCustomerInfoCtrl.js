ccaApp.controller('ccaCustomerInfoCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log){
	$scope.customer = customerList[1];

	$scope.trip = $scope.customer.trans[0].legs[0];

	$scope.topInputs = [
		{ label: 'First', type: 'text', value: $scope.customer.firstName, css: 'md' },
		{ label: 'Last', type: 'text', value: $scope.customer.lastName, css: 'md' },
		{ label: 'Middle', type: 'text', value: $scope.customer.middleIn, css: 'xs' },
		{ label: 'Address', type: 'text', value: $scope.customer.address, css: 'lg' },
		{ label: 'City', type: 'text', value: $scope.customer.city, css: 'xs' },
		{ label: 'State', type: 'text', value: $scope.customer.state, css: 'xs' }
	];

	$scope.leftInputs = [
		{ label: 'Depart Date', type: 'text', value: $scope.trip.fromDate, css: 'lg' },
		{ label: 'Return Date', type: 'text', value: $scope.trip.toDate, css: 'lg' },
		{ label: 'Leaving From', type: 'text', value: $scope.trip.fromCity, css: 'xl' },
		{ label: 'To', type: 'text', value: $scope.trip.toCity, css: 'xl' }
	];

	$scope.rightInputs = [
		{ id: 'rt', name: 'tripType', label: 'Round-Trip', type: 'radio', value: 'rt', css: '' },
		{ id: 'oneway', name: 'tripType', label: 'One Way', type: 'radio', value: 'oneway', css: '' },
		{ id: 'multi', name: 'tripType', label: 'Multi-City', type: 'radio', value: 'multi', css: '' }
	];

	$scope.tripType = 'rt';



}]);