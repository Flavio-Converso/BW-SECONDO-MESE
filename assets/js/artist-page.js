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
      console.log(arr);
      if (arr) {
      } else {
        console.log("nessun album trovato");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};
const tracksArtistHtml = function (tracks) {
  tracks.array.forEach((element) => {});
};
getArtistWithId();
getTracksArtist();
