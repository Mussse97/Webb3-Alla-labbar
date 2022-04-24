
// Initiering av globala variabler och händelsehanterare
function init() {
let viewer = new ImageViewer("#imgViewer");
	
	document.querySelector("#categoryMenu").addEventListener("change",
			function() {
				viewer.requestImages("xml/images" + this.selectedIndex + ".xml");
				this.selectedIndex = 0;
			}
		);
	document.querySelector("#prevBtn").addEventListener("click", function(){ImageViewer.prevImage();});
	document.querySelector("#nextBtn").addEventListener("click", function(){ImageViewer.nextImage();});
	
	// ----- Extramerit -----nextImage prevImage
	/* document.querySelector("#autoBtn").addEventListener("click",
			function(e) {
				autoImage(e,3000);
			}
		);
	*/

	// ----- Guldstjärna -----
	//		Här ska du lägga kod, om du gör guldstjärneuppgiften
	
} // End init
window.addEventListener("load",init);

// ---------------------------------------------------------------
// ----- Funktioner för bildspelet -----
class ImageViewer{

	constructor(id){
		this.titleElem = document.querySelector(id + "h3"); // referens till h3 element
		this.imgElem = document.querySelector(id + "img"); // -//- img element
		this.captionElem = document.querySelector(id + "p"); // -//- p element

		this.list = {
			imgUrls: ["img/blank.png"],
			imgCaptions: [""]
		};
		this.imgIx = 0;
}

// Gör ett Ajax-anrop för att läsa in begärd fil
requestImages(file) { // Parametern nr används i url:en för den fil som ska läsas in
	let thisMuss = this;
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET",file,true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200)thisMuss.getImages(request.responseXML); // status 200 (OK) --> filen fanns
			else document.getElementById("result").innerHTML = "Den begärda resursen fanns inte.";
	};
} // End requestImages

// Funktion för att tolka XML-koden och lägga in innehållet i variablerna för bilderna i bildspelet
getImages(XMLcode) { // Parametern XMLcode är hela den inlästa XML-koden
	this.titleElem.innerHTML = XMLcode.getElementsByTagName("category")[0].firstChild.data;
	let urlElems = XMLcode.getElementsByTagName("url"); // Alla url-element
	let captionElems = XMLcode.getElementsByTagName("caption"); // Alla caption-element
	this.list.imgUrls = [];		// Nya tomma arrayer för bilder
	this.list.imgCaptions = [];	// och bildtexter
	for (let i = 0; i < urlElems.length; i++) {
		this.list.imgUrls.push(urlElems[i].firstChild.data);
		this.list.imgCaptions.push(captionElems[i].firstChild.data);
	}
	this.imgIx = 0;
	this.showImage(); // Visa första bilden
} // End getImages

// Visa bilden med index imgIx
showImage(){
	this.imgElem.src = this.list.imgUrls[this.imgIx];
	this.captionElem.innerHTML = (this.imgIx+1) + ". " + this.list.imgCaptions[this.imgIx];
} // End showImage

// Visa föregående bild
prevImage() {
	if (this.imgIx > 0) this.imgIx--;
	else this.imgIx = this.list.imgUrls.length - 1; // Gå runt till sista bilden
	this.showImage();
} // End prevImage

// Visa nästa bild
nextImage() {
	if (this.imgIx < this.list.imgUrls.length - 1) this.imgIx++;
	else this.imgIx = 0; // Gå runt till första bilden
	this.showImage();
} // End nextImage
}
// ----- Extramerit -----
/* Ta bort kommentaren kring koden, för att testa funktionaliteten för extrameriten
// Starta/stoppa automatisk bildvisning
function autoImage(e,interval) {
	if (timer == null) { // Start
		timer = setInterval(nextImage,interval);
		if (e) e.currentTarget.style.backgroundColor = "green";
	}
	else { // Stopp
		clearInterval(timer);
		timer = null;
		if (e) e.currentTarget.style.backgroundColor = "white";
	}
} // End autoImage
*/
