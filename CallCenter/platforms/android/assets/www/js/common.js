function getDateStamp(array, offset) {
	var timestamp = new Date();
	if (array) {
		for (var i=0; i < array.length; i++) {

			var month = timestamp.getMonth() + 1,
					day = timestamp.getDate(),
					year = timestamp.getFullYear().toString().substring(2,4);

	    array[i].datestamp = month + '/' + day + '/' + year;
	    var deltaDays = _.random(6,7) * (24*60*60*1000);
	    timestamp = new Date(timestamp.valueOf() - deltaDays);
	  }

	} else if (offset) {
		var month = timestamp.getMonth() + 1,
					day = timestamp.getDate() + offset,
					year = timestamp.getFullYear().toString().substring(2,4);

		timestamp = month + '/' + day + '/' + year;
		return timestamp;

	} else {
		var month = timestamp.getMonth() + 1,
				day = timestamp.getDate(),
				year = timestamp.getFullYear().toString().substring(2,4);
		timestamp = month + '/' + day + '/' + year;
		return timestamp;
	}
};

function getTimeStamp(array, offset){
	var timestamp = new Date();

	if (array) {
		for (var i=0; i < array.length; i++) {

		var min = timestamp.getMinutes();
		min = min < 10 ? '0' + min : min;

	    array[i].timestamp = timestamp.getHours() + ':' + min;
	    timestamp = new Date(timestamp.valueOf() - _.random(90000, 60*60*1000));
	  }
	} else if (offset) {
		timestamp.setHours(timestamp.getHours() + offset);

		var min = timestamp.getMinutes(),
			hours = timestamp.getHours(),
			ampm = hours < 13 ? 'AM' : 'PM';
		min = min < 10 ? '0' + min : min;
		hours = hours < 13 ? hours : hours - 12;
		hours = hours == 0 ? 12 : hours;

		timestamp = hours + ':' + min + ' ' + ampm;
		return timestamp;
	} else {
		var min = timestamp.getMinutes(),
			hours = timestamp.getHours(),
			ampm = hours < 13 ? 'AM' : 'PM';
		min = min < 10 ? '0' + min : min;
		hours = hours < 13 ? hours : hours - 12;

		timestamp = hours + ':' + min + ' ' + ampm;
		return timestamp;
	}
};

function getDateTimeStamp(array, offset){
	var timestamp = new Date();

	if (array) {
		for (var i=0; i < array.length; i++) {

		var min = timestamp.getMinutes();
		min = min < 10 ? '0' + min : min;

	    array[i].datetimestamp = timestamp.getMonth() + '/' + timestamp.getDate() + '/' + timestamp.getFullYear() + ' ' + timestamp.getHours() + ':' + min;
	    timestamp = new Date(timestamp.valueOf() - _.random(90000, 60*60*1000));
	  }
	} else if (offset) {

		var min = timestamp.getMinutes();
		min = min < 10 ? '0' + min : min;

		timestamp.setDate(timestamp.getDate() + offset);
		timestamp = timestamp.getMonth() + '/' + timestamp.getDate() + '/' + timestamp.getFullYear() + ' ' + timestamp.getHours() + ':' + min;
		return timestamp;
	} else {

		var min = timestamp.getMinutes();
		min = min < 10 ? '0' + min : min;

		timestamp = timestamp.getMonth() + '/' + timestamp.getDate() + '/' + timestamp.getFullYear() + ' ' + timestamp.getHours() + ':' + min;
		return timestamp;
	}
};

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

function setLocalStorage(key, value) {
	if ('localStorage' in window && window['localStorage'] !== null) {
		localStorage[key] = value;
	}
};

function getLocalStorage(key) {
	if ('localStorage' in window && window['localStorage'] !== null) {
		return localStorage[key];
	}
};