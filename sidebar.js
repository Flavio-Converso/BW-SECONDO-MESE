class Artists {
  constructor(_albumTitle, _artistName, _coverUrl) {
    this.albumTitle = _albumTitle;
    this.artistName = _artistName;
    this.coverUrl = _coverUrl;
  }
}

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
      console.log("dati salvati", searchResult);
      const artist = new Artists();
      artist.albumTitle = searchResult.album.title;
      artist.artistName = searchResult.album.artist.name;
      artist.coverUrl = searchResult.album.cover_medium;
      console.log(artist);
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
