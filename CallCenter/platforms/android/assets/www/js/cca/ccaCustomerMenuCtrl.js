ccaApp.controller('ccaCustomerMenuCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log){
	$scope.customer = function() {
   		return $rootScope.currentCustomer;
  	}

	$scope.menuItems = [
		{ name: 'purchase', icon: 'receipt', text: 'Purchase History', isSelected: 1 },
		{ name: 'payment', icon: 'creditcard', text: 'Payment History' },
		{ name: 'trip', icon: 'suitcase', text: 'Trip History' },
		{ name: 'contact', icon: 'contactcard', text: 'Customer Contact Information' }
	];

	$scope.toggleSelectMenu = function(item) {
		item.isSelected = !item.isSelected;
		$rootScope.$broadcast('toggleSelectMenu', item);
	};

	$scope.setListeners = function() {

		$scope.$on('toggleSelectMenu', function(evt, item){
			$.each($scope.menuItems, function(idx, obj) {
				obj.isSelected = obj == item ? 1 : 0;
			});
		});
	};

	$scope.setListeners();
}]);