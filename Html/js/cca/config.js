
(function(){
  window.config = window.config || {};
  window.config.scriptOrder = [];
  window.config.scriptAction = {};
})();


	var RobertsLegs = [
		{ fromCity: 'Los Angeles', toCity: 'Phoenix', datestamp: '', timestamp: '', mode: 'train' },
		{ fromCity: 'Phoenix', toCity: 'Los Angeles', datestamp: '', timestamp: '', mode: 'train' }
	];

	var RobertsTransactions = [
		{ id: 24000481, station: 'Station CWI-3250', kiosk: 'Kiosk #24', tripType: 'Round Trip', status: 'In Progress', legs: RobertsLegs},
		{ id: 13010009, station: 'Station CWI-3250', kiosk: 'Kiosk 08', tripType: 'Round Trip', status: 'Complete', legs: RobertsLegs},
		{ id: 90283999, station: 'Station CWI-3250', kiosk: 'Station Store 12', tripType: 'Round Trip', status: 'Complete', legs: RobertsLegs},
		{ id: 18920376, station: 'Station CWI-3250', kiosk: 'Check In Kiosk 14', tripType: 'Round Trip', status: 'Complete', legs: RobertsLegs},
		{ id: 24023481, station: 'Station CWI-3250', kiosk: 'Kiosk #02', tripType: 'Round Trip', status: 'Complete', legs: RobertsLegs},
		{ id: 38000469, station: 'Station CWI-3250', kiosk: 'Kiosk #125', tripType: 'Round Trip', status: 'Complete', legs: RobertsLegs}
	];

	var AmysLegs = [
		{ fromCity: 'Philadelphia', toCity: 'New York', fromDate: getDateStamp(null, 0), toDate: getDateStamp(null, 3), mode: 'train' }
	];
	
	var AmysTransactions = [
		{ id: 24000481, station: 'Station CWI-3250', kiosk: 'Kiosk #24', tripType: 'One Way', status: 'Complete', legs: AmysLegs},
		{ id: 13010009, station: 'Station CWI-3250', kiosk: 'Kiosk 08', tripType: 'One Way', status: 'Complete', legs: AmysLegs},
		{ id: 90283999, station: 'Station CWI-3250', kiosk: 'Station Store 12', tripType: 'One Way', status: 'Complete', legs: AmysLegs},
		{ id: 18920376, station: 'Station CWI-3250', kiosk: 'Check In Kiosk 14', tripType: 'One Way', status: 'Complete', legs: AmysLegs},
		{ id: 24023481, station: 'Station CWI-3250', kiosk: 'Kiosk #02', tripType: 'One Way', status: 'Complete', legs: AmysLegs},
		{ id: 38000469, station: 'Station CWI-3250', kiosk: 'Kiosk #125', tripType: 'One Way', status: 'Complete', legs: AmysLegs}
	];

  getDateStamp(RobertsTransactions, null);
  getDateStamp(AmysTransactions, null);

  var callList = [
		{ type: 'Kiosk', location: 'Kiosk #02', customer: 2, isSelected: true },
		{ type: 'Mobile', location: '', customer: 3 },
		{ type: 'Mobile', location: '', customer: 4 },
		{ type: 'Mobile', location: '', customer: 5 },
		{ type: 'Kiosk', location: 'Kiosk #125', customer: 6 },
		{ type: 'Mobile', location: '', customer: 7 },
		{ type: 'Kiosk', location: 'Kiosk #31', customer: 8 }
	];

	var newCall = { type: 'Kiosk', location: 'Kiosk #24', customer: 1, isSelected: true };

	var customerList = [
		{ id: 1, firstName: 'Amy', lastName: 'Sanders', middleIn: '', address: '1241 Sunset Blvd', city: 'Los Angeles', state: 'CA', zip: '90066', trans: RobertsTransactions },
		{ id: 2, firstName: 'Chelsey', lastName: 'Jones', middleIn: '', address: '3421 Roosevelt Street', city: 'Philadelphia', state: 'PA', zip: '19104', trans: AmysTransactions },
		{ id: 3, firstName: 'Julia', lastName: 'Johnson', middleIn: 'S', address: '4235 6th Ave', city: 'Seattle', state: 'WA', zip: '98109', trans: RobertsTransactions },
		{ id: 4, firstName: 'Anders', lastName: 'McGrath', middleIn: '', address: '1789 29th St Apt 2', city: 'New York', state: 'NY', zip: '', trans: RobertsTransactions },
		{ id: 5, firstName: 'Boo', lastName: 'Radley', middleIn: '', address: '23 Spruce St', city: 'Phoenix', state: 'AZ', zip: '', trans: RobertsTransactions },
		{ id: 6, firstName: 'Bilbo', lastName: 'Baggins', middleIn: 'A', address: '14523 Culver Blvd', city: 'Culver City', state: 'CA', zip: '90066', trans: RobertsTransactions },
		{ id: 7, firstName: 'Krista', lastName: 'Now', middleIn: 'G', address: '6232 Tonch St', city: 'Denver', state: 'CO', zip: '', trans: RobertsTransactions },
		{ id: 8, firstName: 'Emma', lastName: 'Hill', middleIn: 'C', address: '523 First Ave', city: 'Baton Rouge', state: 'LA', zip: '', trans: RobertsTransactions }
	];