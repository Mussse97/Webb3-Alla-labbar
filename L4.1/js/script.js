// Initiering av globala variabler och händelsehanterare
function init() {
  const imageViewer = new ImageViewer("imgViewer"); //Skapa ett objekt av imageveiwer

  document
    .querySelector("#categoryMenu")
    .addEventListener("change", function () {
      imageViewer.requestImages("xml/images" + this.selectedIndex + ".xml");
      this.selectedIndex = 0;
    });
  document.querySelector("#prevBtn").addEventListener("click", function () {
    imageViewer.prevImage();
  });
  document.querySelector("#nextBtn").addEventListener("click", function () {
    imageViewer.nextImage();
  });
} // End init
window.addEventListener("load", init);


class ImageViewer {
  titleElem; // Referens till element för bildspelets titel
  imgElem; // Referens till img-element för bildspelet
  captionElem; // Referens till element för bildtext
  imgIx; // Index för aktuell bild
  timer; // Referens till timern för bildspelet
  imgList;
  
  // id för html-element som innehållet bildspel
  constructor(id) {
    this.titleElem = document.querySelector("#" + id + " h3");
    this.imgElem = document.querySelector("#" + id + " img");
    this.captionElem = document.querySelector("#" + id + " p");
    this.imgIx = 0;
    this.timer = null;
    this.imgList = [];
  }

  requestImages(file) {
    var self = this; //Referera till denna klassen i annan funktion
    let request = new XMLHttpRequest(); // Object för Ajax-anropet
    request.open("GET", file, true);
    request.send(null); // Skicka begäran till servern
    request.onreadystatechange = function () {
      // Funktion för att avläsa status i kommunikationen
      if (request.readyState == 4)
        if (request.status == 200)
          // readyState 4 --> kommunikationen är klar
          self.getImages(
            request.responseXML
          ); // status 200 (OK) --> filen fanns
        else
          document.getElementById("result").innerHTML =
            "Den begärda resursen fanns inte.";
    };
  } // End requestImages

  requestImages(file) {
    // Parametern nr används i url:en för den fil som ska läsas in
    var self = this; //Referera till denna klassen i en annan funktion
    let request = new XMLHttpRequest(); // Object för Ajax-anropet
    request.open("GET", file, true);
    request.send(null); // Skicka begäran till servern
    request.onreadystatechange = function () {
      // Funktion för att avläsa status i kommunikationen
      if (request.readyState == 4)
        if (request.status == 200)
          // readyState 4 --> kommunikationen är klar
          self.getImages(
            request.responseXML
          ); // status 200 (OK) --> filen fanns
        else
          document.getElementById("result").innerHTML =
            "Den begärda resursen fanns inte.";
    };
  } // End requestImages
  getImages(XMLcode) {
    // Parametern XMLcode är hela den inlästa XML-koden
    this.titleElem.innerHTML =
      XMLcode.getElementsByTagName("category")[0].firstChild.data;
    let urlElems = XMLcode.getElementsByTagName("url"); // Alla url-element
    let captionElems = XMLcode.getElementsByTagName("caption"); // Alla caption-element
    this.imgList = [];
    for (let i = 0; i < urlElems.length; i++) {
      this.imgList.push({
        imgUrl: urlElems[i].firstChild.data,
        imgCaption: captionElems[i].firstChild.data,
      });
    }
    this.imgIx = 0;
    this.showImage(); // Visa första bilden
  } // End getImages

  // Visa bilden med index imgIx
  showImage() {
    this.imgElem.src = this.imgList[this.imgIx].imgUrl;
    this.captionElem.innerHTML =
      this.imgIx + 1 + ". " + this.imgList[this.imgIx].imgCaption;
  } // End showImage

  // Visa föregående bild
  prevImage() {
    if (this.imgIx > 0) this.imgIx--;
    else this.imgIx = this.imgList.length - 1; // Gå runt till sista bilden
    this.showImage();
  } // End prevImage

  // Visa nästa bild
  nextImage() {
    if (this.imgIx < this.imgList.length - 1) this.imgIx++;
    else this.imgIx = 0; // Gå runt till första bilden
    this.showImage();
  } // End nextImage
}
