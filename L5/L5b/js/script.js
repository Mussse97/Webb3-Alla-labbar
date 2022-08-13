var resElem; // Referens till elementet för resultat

// Initiering av globala variabler och händelsehanterare.
function init() {
  resElem = document.getElementById("result");
  let btnElems = document
    .getElementById("gameButtons")
    .getElementsByTagName("button");
  for (let i = 0; i < btnElems.length; i++) {
    btnElems[i].addEventListener("click", selectGame);
  }
} // End init
window.addEventListener("load", init);
// När man klickat på knappen anropas requestdata då de gör förfrågan till jsopnfilen
function selectGame() {
  requestData("json/game.json");
} // End selectCountry

function requestData(filename) {
  // filname är namnet (utan ändelse) på den fil som ska hämtas
  let request = new XMLHttpRequest();
  request.open("GET", filename, true);
  request.send(null); // Skicka begäran till servern
  request.onreadystatechange = function () {
    // Funktion för att avläsa status i kommunikationen
    if (request.readyState == 4)
      if (request.status == 200)
        // readyState 4 --> kommunikationen är klar
        getData(request.responseText); // status 200 (OK) --> filen fanns
      // Obs! responseText, då det är JSON
      else resElem.innerHTML = "Den begärda resursen finns inte.";
  };
} //

// I denna funktion går jag igenom all infomation som finns i jsonfilerna och skriver ut de med HTMLcode
function getData(JSONtext) {
  let games_objects = JSON.parse(JSONtext).games_objects.developer; //
  let HTMLcode = ""; // Sträng med HTML-kod som skapas
  for (let i = 0; i < games_objects.length; i++) {
    // går igenom de två valen i gameobjects

    HTMLcode += "<p><b>Skapare:</b> " + games_objects[i].type + "</p>";
    HTMLcode += "<p><b> Spel:</b> " + games_objects[i].games.game + "</p>";
    HTMLcode +=
      "<p><b>Beskrivning:</b> " + games_objects[i].description + "</p>";
    HTMLcode +=
      "<p><b>Antal spelare och solda kopior:</b> " +
      games_objects[i].games.playerbase +
      "</p>";
    HTMLcode +=
      "<p><b>Du känner dig sugen på att spela, här får du en länk till spelet eller wikin så du kan lära dig mer om spelet:</b></p><p>" +
      games_objects[i].games.url +
      "</p><br>";
  }
  resElem.innerHTML = HTMLcode;
} // End getData
