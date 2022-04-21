// Globala variabler
var myMap;				// Objekt för kartan
var myMarkers = [];		// Array med markeringar
var userMarker;			// Objekt för markering där användaren klickar
const markerData = [	// Data för markeringar som hör till knapparna
			{position:{lat:59.18078661933195,lng:17.621362156198703},title:"Silverstigen"},
			{position:{lat:59.19482108197934,lng:17.630566327363972},title:"Barrollo"},
			{position:{lat:59.202388837338866,lng:17.609108712023428},title:"Max hamburgare"},
			{position:{lat:59.18966236245761,lng:17.63592068018244},title:"Sydpolen"},
			{position:{lat:59.18328105201948,lng:17.630275971669175},title:"McDonald`s"}
		];
var mapLocationElem;			// Element för utskrift av koordinater
var myApiKey = "DIN-API-KEY";	// Ersätt DIN-API-KEY med din egen Flickr API key
var flickrImgElem;				// Referens till element där bilderna ska visas

// Initiering av programmet
function init() {
	initMap();
	mapLocationElem = document.getElementById("mapLocation");
	flickrImgElem = document.getElementById("flickrImg");
	for (let i=0; i < markerData.length; i++){
		
	}
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Skapa en karta och markeringar
function initMap() {
	myMap = new google.maps.Map(
			document.getElementById('map'),
			{
				center: {lat:59.19796353674416, lng:17.620253028308003},
				zoom: 14,
				styles: [
					{featureType:"poi", stylers:[{visibility:"off"}]},  // No points of interest.
					{featureType:"transit.station",stylers:[{visibility:"off"}]}  // No bus stations, etc.
				]
			}
		);
	for (let i = 0; i < markerData.length; i++) {
		let newMarker = new google.maps.Marker(markerData[i]); // Objekt för markering
		myMarkers.push(newMarker);
	}
	userMarker = null;
	google.maps.event.addListener(myMap,"click",newUserMarker);
} // End initMap

// Sätt markerns position till var användaren klickade och lägg in markern på kartan.
function newUserMarker(e) {
	hideMarkers();
	userMarker = new google.maps.Marker();
	userMarker.setPosition(e.latLng);
	userMarker.setMap(myMap);
} // End newUserMarker

// Visa marker för den adressknapp som användaren klickat på
function showAddrMarker() {
	
} // End showAddrMarker

// Dölj alla markeringar
function hideMarkers() {
	for (let i = 0; i < myMarkers.length; i++) {
		myMarkers[i].setMap(null);
	}
	if (userMarker) userMarker.setMap(null);
} // End hideMarkers

// ----- Foton från Flickr ----- Extramerit

// Ajax-begäran av nya bilder
function requestImgsByLocation(lat,lon) {
	
} // End requestImgsByLocation

// Tolka svaret och visa upp bilderna.
function showMoreImgs(response) {
	
} // End showMoreImgs
