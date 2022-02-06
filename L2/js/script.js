// Globala variabler
var subjectMenuElem, courseMenuElem;	// Referenser till select-elementen för menyerna
var subjectInfoElem, courseListElem;	// Referenser till div-elementen där inläst data ska skrivas

// Initiering av globala variabler och händelsehanterare
function init() {
	subjectMenuElem = document.getElementById("subjectMenu");
	courseMenuElem = document.getElementById("courseMenu");
	subjectInfoElem = document.getElementById("subjectInfo");
	courseListElem = document.getElementById("courseList");
	subjectMenuElem.addEventListener("change", selectSubject);
	courseMenuElem.addEventListener("change", selectCourses);
} // End init
window.addEventListener("load", init); // init aktiveras då sidan är inladdad

// ----- Meny 1 -----

// Avläs menyn för val av ämne

// avläser index från this som är vald kurs och anropar requestData
function selectSubject() {
	let info = this.selectedIndex; // avläsning av index
	requestData(info); // anrop
}
// Hör så hämtar vi informationen som ligger i php servern, när läsningen av information är klar så anropas getData
function requestData(infoElem) {
	let request = new XMLHttpRequest();
	request.open("GET", "getSubInfo.php?file=https://medieteknik.lnu.se/1me323/subjects.xml&id=" + infoElem, true);
	request.send(null);

	request.onreadystatechange = function () {

		if (request.readyState == 4)
			if (request.status == 200) getData(request.responseXML);
			else subjectInfoElem.innerHTML = "";
	}
}

// Här så hämtar vi all text som ligger i de olika xml taggarna och skriver ut dom.
function getData(XMLcode) {
	let HTMLcode = ""; // Definerar Htmlcode med tom sträng
	let nameTag = XMLcode.getElementsByTagName("name")[0]; // Hämtar text från name
	let infoTag = XMLcode.getElementsByTagName("info")[0];// Hämtar text från info
	HTMLcode += "<h3>" + nameTag.firstChild.data + "</h3>"; // Skriver ut namn som h3
	HTMLcode += "<p>" + infoTag.firstChild.data + "</p>"; // skriver ut i p element

	subjectInfoElem.innerHTML = HTMLcode; // lägger HTMLcode i subjectinfoElem så vi kan referera till det när vi vill att texten ska synas på sidan.
}

// End selectSubject


// ----- Meny 2 -----

// Avläs menyn för val av ämne för kurser

// Likts första så lägger vi indexet som finns i this i courses och anropar requestData2
function selectCourses() {
	let courses = this.selectedIndex;
	requestData2(courses);

}
// Hämtar data  är när det är redo så anropas getData2
function requestData2(courses) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "xml/" + "courselist" + courses + ".xml", true);
	xhr.send(null);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4)
			if (xhr.status == 200) getData2(xhr.responseXML);
			else courseListElem.innerHTML = "";
	}
}
// först i funktionen hämtar vi ut subject och då går jag igenom courseList eftersom subject är dotter element till courselist
function getData2(XMLcode) {
	let courseElem = XMLcode.getElementsByTagName("courselist");
	let HTMLcode = "";
	for (let i = 0; i < courseElem.length; i++) {

		let subjectTag = XMLcode.getElementsByTagName("subject")[0]; // Hämtar text från subject.
		HTMLcode += "<h3>" + subjectTag.firstChild.data + "</h3>"; // skriver ut i h3.
	}
	// När jag refererar till title, code osv från courselist så får jag bara fram ett av de flera elementen som finns. Därför tar jag det från course då dom är dotter element till course.
	let courseElemm = XMLcode.getElementsByTagName("course");
	for (let i = 0; i < courseElemm.length; i++) {
		let titleElemm = courseElemm[i].getElementsByTagName("title")[0];
		let codeElem = courseElemm[i].getElementsByTagName("code")[0];
		let creditElem = courseElemm[i].getElementsByTagName("credits")[0];

		HTMLcode += "<span>" + codeElem.firstChild.data + "</span>" + ", ";
		HTMLcode += "<span>" + titleElemm.firstChild.data + "</span>" + ", ";
		HTMLcode += "<span>" + creditElem.firstChild.data + "</span>" + "hp" + " <hr> ";

	}
	courseListElem.innerHTML = HTMLcode; // Samma sak så använder vi HTMLcode och lägger det som courselistelem.innerHTML så vi kan skriva ut texten 

} 
