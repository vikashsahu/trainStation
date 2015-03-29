
//var times = [["Monday","Wednesday"],[11,11],[13,13]];
var times = [["Monday"],[11],[14]]; 

function weekStartDay() {
	var startOfWeek = moment().startOf('isoWeek').format("MMMM Do");
	document.getElementById("title").innerHTML += " " + startOfWeek;
}

function dispTrains() {
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
		document.getElementById("cryptic").innerHTML = "The trains aren't running right now!";
		document.getElementById("clarity").innerHTML = "(that means no office hours today)";
	}	
	else {//it's a day when office hours are held
		if (moment().hour() < times[1][0]) {//too early
			document.getElementById("cryptic").innerHTML = "You're early! The trains haven't arrived yet.";
			document.getElementById("clarity").innerHTML = "(that means I'm not in my office yet)";
			$("body").css("background-image", "url(no_train_animated.gif)");
		}
		else if (moment().hour() >= times[2][0]){ //too late
			document.getElementById("cryptic").innerHTML = "The trains have departed already!";
			document.getElementById("clarity").innerHTML = "(that means you've missed office hours)";
			$("body").css("background-image", "url(depart_animated.gif)");
			//wait
			setTimeout(
				function() {
					$("body").css("background-image", "url(no_train_animated.gif)");
				}, 10550);
		}
		else {
			var boardStr = "Morrill Hall";
			var boardStrLink = boardStr.link("http://www.umd.edu/CampusMaps/bld_detail.cfm?bld_code=MOR");

			document.getElementById("cryptic").innerHTML = "The trains are currently boarding! Catch Vikash at 1102 " + boardStrLink + ".";
			document.getElementById("clarity").innerHTML = "(that means I'm in my office)";
			$("body").css("background-image", "url(arrive_animation_stop.gif)");
		}
	}
}