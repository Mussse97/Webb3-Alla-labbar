var resElem;	// Referens till elementet för resultat

// Initiering av globala variabler och händelsehanterare.
function init() {
	resElem = document.getElementById("result");
	let btnElems = document.getElementById("countryButtons").getElementsByTagName("button");
	for (let i = 0; i < btnElems.length; i++) {
		btnElems[i].addEventListener("click",selectCountry);
	}
} // End init
window.addEventListener("load",init);

function selectCountry() {
	let country = this.value; // Land i vald knapp
	requestData("json/game.json");
} // End selectCountry

function requestData(filename) { // filname är namnet (utan ändelse) på den fil som ska hämtas
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET",  filename  ,true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) getData(request.responseText); // status 200 (OK) --> filen fanns
												// Obs! responseText, då det är JSON
			else resElem.innerHTML = "Den begärda resursen finns inte.";
	};
} // End requestDepartmentinfo

// Tolka XML-koden och skriv ut på önskad form
function getData(JSONtext) {
	let games_objects = JSON.parse(JSONtext).games_objects; // Listan (array) accommodation
	console.log(games_objects)
	let HTMLcode = ""; // Sträng med HTML-kod som skapas
	for (let i = 0; i < games_objects.length; i++) {
		// Referenser till olika egenskaper i aktuellt accomodation-objekt
		let type = games_objects.type;
		switch (type) { // Översätt från engelska till svenska
			case "apartment": type = "riot"; break;
			case "cottage": type = "fromsoftware"; break;
		}
		HTMLcode += 
			"<p><b>Beskrivning:</b> " + games_objects[0].developer.type + "</p>";
	}
	resElem.innerHTML = HTMLcode;
} // End getData
