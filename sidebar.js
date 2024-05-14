// Funzione che stora il contenuto in LocalStorage
function store(dati) {
  const albums = [];
  dati.data.forEach((element) => {
    const albumTitle = element.album.title;
    const artistName = element.artist.name;
    const albumCover = element.album.cover_medium;
    const album = {
      albumTitle: albumTitle,
      artistName: artistName,
      albumCover: albumCover,
    };

    albums.push(album);
  });
  console.log(albums);
  localStorage.setItem("searchResult", JSON.stringify(albums));
}

// Funzione che fa la ricerca con la fetch

function search(searchInput) {
  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + searchInput
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento");
      }
    })
    .then((searchResult) => {
      console.log(searchResult);
      store(searchResult);
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
}

// Aggiungi un listener per l'evento keydown sull'input
document.getElementById("search").addEventListener("keydown", function (event) {
  // Verifica se il tasto premuto è Enter
  if (event.key === "Enter") {
    console.log(this.value);
    search(this.value);
  }
});

let titoloAlbum = document.getElementById("titoloAlbum");
let artistaAlbum = document.getElementsByClassName("artistaAlbum");
let fotoAlbum = document.getElementById("fotoAlbum");

document.addEventListener("DOMContentLoaded", function () {
  const storedData = localStorage.getItem("searchResult");

  const albums = JSON.parse(storedData);
  if (albums.length > 0) {
    const firstAlbum = albums[0];
    let titoloAlbum = document.getElementById("titoloAlbum");
    document.getElementsByClassName("artistaAlbum")[0].textContent =
      firstAlbum.artistName;
    document.getElementsByClassName("artistaAlbum")[1].textContent =
      firstAlbum.artistName;
    let fotoAlbum = document.getElementById("fotoAlbum");

    titoloAlbum.textContent = firstAlbum.albumTitle;
    artistaAlbum.textContent = firstAlbum.artistName;
    fotoAlbum.src = firstAlbum.albumCover;
  }
});
