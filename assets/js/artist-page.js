const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);
const artistId = addressBarContent.get("id");
console.log(artistId);

const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const url = apiUrl + artistId;

// funzione per recuperare i dati dell'album tramite il suo id
const getArtistWithId = function () {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento");
      }
    })
    .then((artistsArr) => {
      console.log(artistsArr);
      if (artistsArr) {
      } else {
        console.log("nessun album trovato");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

const getTracksArtist = function () {
  fetch(url + "/top?limit=50")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento");
      }
    })
    .then((tracksArray) => {
      console.log(tracksArray);
      if (tracksArray) {
      } else {
        console.log("nessun album trovato");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};
function toggleSearchInput() {
  let container = document.querySelector(".search-container");
  let cercaText = document.getElementById("cerca").innerText;
  console.log(cercaText);
  if (cercaText === "Cerca") {
    document.getElementById("cerca").innerText = " ";
  } else {
    document.getElementById("cerca").innerText = "Cerca";
  }
  container.classList.toggle("active");
}
getArtistWithId();
getTracksArtist();
