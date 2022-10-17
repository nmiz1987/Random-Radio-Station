const namef = document.querySelector(".name");
const urlf = document.querySelector(".url");
const full_screenf = document.querySelector(".go2top");
const nav_home = document.querySelector("nav");
const playB = document.querySelector("#play");
const stopB = document.querySelector("#stop");
const nextB = document.querySelector("#next");
const audioP = document.querySelector("#player");
var stations_list = [];
var station;

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

function randomIntFromInterval() {
	// min and max included
	let min = 0;
	let max = stations_list.length;
	var number = Math.floor(Math.random() * (max - min + 1) + min);
	return stations_list[number];
}

const url =
	"https://de1.api.radio-browser.info/json/stations/search?limit=200&countrycode=US&hidebroken=true&order=clickcount&reverse=true";

const data = fetch(url);
data
	.then((res) => res.json())
	.then((res) => {
		stations_list.push(res);
		stations_list = stations_list[0];

		shuffleArray(stations_list);
		loadStation();
	});

function loadStation() {
	try {
		station = randomIntFromInterval();
		namef.innerText = station.name;
		urlf.innerText = station.homepage;
		urlf.setAttribute("href", station.homepage);
	} catch {
		loadStation();
	}
}

playB.addEventListener("click", () => {
	playB.style.display = "none";
	stopB.style.display = "block";
	audioP.setAttribute("src", station.url_resolved);
	// console.log(station.url_resolved)
	audioP.play();
});

stopB.addEventListener("click", () => {
	playB.style.display = "block";
	stopB.style.display = "none";
	audioP.setAttribute("src", stations_list[0].url_resolved);
	audioP.pause();
});

nextB.addEventListener("click", () => {
	stopB.click();
	loadStation();
	playB.click();
});

full_screenf.addEventListener("click", function () {
	if (
		!document.fullscreenElement && // alternative standard method
		!document.mozFullScreenElement &&
		!document.webkitFullscreenElement
	) {
		// current working methods
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(
				Element.ALLOW_KEYBOARD_INPUT
			);
		}
		nav_home.style.display = "none";
	} else {
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
		nav_home.style.display = "block";
	}
});
