// Globala variabler


// Initiering av globala variabler och händelsehanterare
function init() {
 let viewer = new ImageViewer("imgViewer");
	
	document.querySelector("#categoryMenu").addEventListener("change",
			function() {
				ImageViewer.requestImages("xml/images" + this.selectedIndex + ".xml");
				this.selectedIndex = 0;
			}
		);
	document.querySelector("#prevBtn").addEventListener("click",function(){
		ImageViewer.prevImage();
	});
	document.querySelector("#nextBtn").addEventListener("click",function(){
		ImageViewer.nextImage();
	});
	
	// ----- Extramerit -----
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

function ImageViewer(){

	this.imgElem = document.querySelector("#imgViewer img");
	this.captionElem = document.querySelector("#imgViewer p");
	this.imgUrls = ["img/blank.png"]; // Initiera med den tomma bilden
	this.imgCaptions = [""]; // Tom bildtext för den tomma bilden
	this.imgIx = 0;
	this.timer = null;
}

ImageViewer.requestImages = function(file){
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET",file,true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200)getImages(request.responseXML); // status 200 (OK) --> filen fanns
			else document.getElementById("result").innerHTML = "Den begärda resursen fanns inte.";
}

ImageViewer.getImages = function(XMLcode){
	this.titleElem.innerHTML = XMLcode.getElementsByTagName("category")[0].firstChild.data;
	let urlElems = XMLcode.getElementsByTagName("url"); // Alla url-element
	let captionElems = XMLcode.getElementsByTagName("caption"); // Alla caption-element
	this.imgUrls = [];		// Nya tomma arrayer för bilder
	this.imgCaptions = [];	// och bildtexter
	for (let i = 0; i < urlElems.length; i++) {
		this.imgUrls.push(urlElems[i].firstChild.data);
		this.imgCaptions.push(captionElems[i].firstChild.data);
	}
	this.imgIx = 0;
	showImage(); // Visa första bilden
}
ImageViewer.showImage = function(){
	this.imgElem.src = imgUrls[imgIx];
	this.captionElem.innerHTML = (imgIx+1) + ". " + imgCaptions[imgIx];
}

ImageViewer.prevImage = function(){
	if (imgIx > 0) imgIx--;
	else this.imgIx = this.imgUrls.length - 1; // Gå runt till sista bilden
	showImage();
}

ImageViewer.nextImage = function(){
	if (this.imgIx < this.imgUrls.length - 1) this.imgIx++;
	else this.imgIx = 0; // Gå runt till första bilden
	showImage();
}

// Gör ett Ajax-anrop för att läsa in begärd fil
/*function requestImages(file) { // Parametern nr används i url:en för den fil som ska läsas in
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET",file,true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) getImages(request.responseXML); // status 200 (OK) --> filen fanns
			else document.getElementById("result").innerHTML = "Den begärda resursen fanns inte.";
	};
} // End requestImages*/

// Funktion för att tolka XML-koden och lägga in innehållet i variablerna för bilderna i bildspelet
/*function getImages(XMLcode) { // Parametern XMLcode är hela den inlästa XML-koden
	titleElem.innerHTML = XMLcode.getElementsByTagName("category")[0].firstChild.data;
	let urlElems = XMLcode.getElementsByTagName("url"); // Alla url-element
	let captionElems = XMLcode.getElementsByTagName("caption"); // Alla caption-element
	imgUrls = [];		// Nya tomma arrayer för bilder
	imgCaptions = [];	// och bildtexter
	for (let i = 0; i < urlElems.length; i++) {
		imgUrls.push(urlElems[i].firstChild.data);
		imgCaptions.push(captionElems[i].firstChild.data);
	}
	imgIx = 0;
	showImage(); // Visa första bilden
} // End getImages*/

// Visa bilden med index imgIx
/*function showImage() {
	imgElem.src = imgUrls[imgIx];
	captionElem.innerHTML = (imgIx+1) + ". " + imgCaptions[imgIx];
} // End showImage

// Visa föregående bild
function prevImage() {
	if (imgIx > 0) imgIx--;
	else imgIx = imgUrls.length - 1; // Gå runt till sista bilden
	showImage();
} // End prevImage

// Visa nästa bild
function nextImage() {
	if (imgIx < imgUrls.length - 1) imgIx++;
	else imgIx = 0; // Gå runt till första bilden
	showImage();
} // End nextImage

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
} // End autoImage*/
}
