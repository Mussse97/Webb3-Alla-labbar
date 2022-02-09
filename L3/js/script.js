// Globala variabler
var linkListElem;	// Referens till div-elementet för länkarna
var courseListElem;	// Referens till div-element där valda kurser ska läggas.

// Initiering av globala variabler och händelsehanterare.
function init() {
	linkListElem = document.getElementById("linkList");
	document.getElementById("linkBtn").addEventListener("click", listLinks);

	// Array med referenser till alla li-element i den andra section
	let courseElems = document.querySelectorAll("main section:nth-of-type(2) div:first-of-type li");
	for (let i = 0; i < courseElems.length; i++) {
		courseElems[i].addEventListener("click", addCourse);
		courseElems[i].style.cursor = "pointer";
	}
	courseListElem = document.getElementById("courseList");

	document.getElementById("teacherBtn").addEventListener("click", addTeachers); // Används i extramerit
} // End init
window.addEventListener("load", init); // init aktiveras då sidan är inladdad
// ---------------------------------------------------------------
// Kopiera alla länkar ur huvudtexten och lägg upp dem i en lista.
function listLinks() {
	let links = document.querySelectorAll("section:nth-of-type(1) div:nth-of-type(1) a"); // Hämtar ut alla a-element
	for (let i = 0; i < links.length; i++) {
		let copiedLinks = links[i].cloneNode(true); // kopierar alla a-element
		let newElem = document.createElement("p");
		linkListElem.appendChild(newElem);
		newElem.appendChild(copiedLinks);
		copiedLinks.setAttribute("target", "_blank");
	}

} // End listLinks
// ---------------------------------------------------------------
// Den kurs användaren klickat på, läggs in överst i kurslistan.
function addCourse() {
	let links = this.innerHTML;
	let courses = document.querySelectorAll(" #courseList p");


	for (i = 0; i < courses.length; i++) {
		if (links == courses[i].innerHTML) {
			return;
		}


	}

	let newElem = document.createElement("p");
	let newText = document.createTextNode(links);
	let p = courseListElem.querySelector("p");
	newElem.appendChild(newText);
	courseListElem.insertBefore(newElem, p);
	newElem.addEventListener("click", removeCourse);
	newElem.style.cursor = "pointer";




} // End addCourse

// Den kurs användaren klickat på i kurslistan, tas bort.
function removeCourse() {
	this.parentNode.removeChild(this);
} // End removeCourse
// ---------------------------------------------------------------
// ----- Extramerit -----
// Funktion som lägger till kursansvariglärare i kurslistan
function addTeachers() {
	const teachers = ["Romain Herault", "Rune Körnefors", "Jorge Zapico"];
	const teacherLinks = ["https://lnu.se/personal/romain.herault", "http://lnu.se/personal/rune.kornefors", "https://lnu.se/personal/jorgeluis.zapico/"];

} // End addTeachers
