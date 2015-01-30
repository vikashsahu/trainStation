
var times = [["Monday","Wednesday","Friday"],[11,11,11],[13,13,13]];

function dispTrains() {
	console.log('boom');
	var getTimeTable = document.getElementById('timeTable');

	for (var i=0, row; row=getTimeTable.rows[i], i < 1; i++) {
		for (var j=0, col; col=row.cells[j]; j++) {
			getTimeTable.rows[i].cells[j].innerHTML = times[i][j];
		}
	}

	for (var i=1, row; row=getTimeTable.rows[i]; i++) {
		for (var j=0, col; col=row.cells[j]; j++) {
			getTimeTable.rows[i].cells[j].innerHTML = times[i][j] + "-" + (times[i+1][j]-12);
		}
	}
}

function summarize() {
	//No trains today
	if (times[0].indexOf(moment().format("dddd"))===-1) { 
		document.getElementById("turnstile").innerHTML = "No trains today -- check back tomorrow!";
	}	
	else {//it's a day when office hours are held
		if (moment().hour() < times[1][0])//too early
			document.getElementById("turnstile").innerHTML = "You're early! The trains haven't arrived yet."
		else if (moment().hour() >= times[2][0])//too late
			document.getElementById("turnstile").innerHTML = "The trains have departed already!"
		else {

			var boardStr = "Morrill Hall";
			var boardStrLink = boardStr.link("http://www.umd.edu/CampusMaps/bld_detail.cfm?bld_code=MOR");

			document.getElementById("turnstile").innerHTML = "The trains are currently boarding! Catch Vikash at 1102 " + boardStrLink + ".";
		}
	}
}