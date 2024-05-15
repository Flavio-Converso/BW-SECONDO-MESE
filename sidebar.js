//`
//<a href="#" class="text-decoration-none">
//    <div class="card mb-3 grey-horizontal-card position-relative">
//        <div class="row g-0">
//            <div class="col">
//                <img src="" class="personal-imG rounded-start"
//                    alt="immagine album" />
//            </div>
//            <div class="col d-flex align-items-center">
//                <div class="card-body">
//                    <h5 id="titoloHorizontalCard"
//                        class="card-title d-flex justify-content-center text-white">
//                    </h5>
//                </div>
//            </div>
//        </div>
//        <div class="play-badge">
//            <img class="playButton" src="/assets/imgs/svg/play-fill.svg"
//                alt="play button" />
//        </div>
//    </div>
//</a>
//</div>`;
//
// Funzione che stora il contenuto in LocalStorage
function store(dati) {
  const albums = [];
  dati.data.forEach((element) => {
    const albumTitle = element.album.title;
    const artistName = element.artist.name;
    const albumCover = element.album.cover_medium;
    const albumId = element.album.id;
    const pictureArtist = element.artist.picture_medium;
    const artistId = element.artist.id;

    const album = {
      albumTitle: albumTitle,
      artistName: artistName,
      albumCover: albumCover,
      albumId: albumId,
      pictureArtist: pictureArtist,
      artistId: artistId,
    };

    albums.push(album);
  });
  console.log(albums);
  localStorage.setItem("searchResult", JSON.stringify(albums));
}

// Funzione che fa la ricerca con la fetch
function search(searchInput, callback) {
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
      callback(); // Call the callback function to reload the page
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
    search(this.value, () => window.location.reload());
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const storedData = localStorage.getItem("searchResult");

  const albums = JSON.parse(storedData);
  if (albums && albums.length > 0) {
    const firstAlbum = albums[0];
    let titoloAlbum = document.getElementById("titoloAlbum");
    let artistaAlbums = document.getElementsByClassName("artistaAlbum");
    const fotofirstAlbum = document.getElementById("first-album");

    titoloAlbum.textContent = firstAlbum.albumTitle;
    Array.from(artistaAlbums).forEach(
      (artista) => (artista.textContent = firstAlbum.artistName)
    );
    fotofirstAlbum.innerHTML = `
      <a href="./album-page.html?id=${firstAlbum.albumId}">
        <img id="fotoAlbum" src="${firstAlbum.albumCover}" alt="immagine album" class="img-fluid py-3"/>
      </a>`;
  }
  //escludere elementi ripetuti nell'array
  for (let i = 0; i < albums.length; i++) {
    for (let n = i + 1; n < albums.length; n++) {
      if (albums[i].albumTitle === albums[n].albumTitle) {
        albums.splice(n, 1);
        n--;
      }
    }
  }
  console.log(albums);

  for (let i = 1; i <= 10; i++) {
    let card = document.createElement("div");
    card.classList.add("col-12", "col-sm-6", "col-lg-3", "col-xl-4", "mt-3");
    card.innerHTML = `
              <a href="./album-page.html?id=${albums[i].albumId}" class="text-decoration-none">
                  <div class="card mb-3 grey-horizontal-card position-relative h-100 ">
                      <div class="row ">
                          <div class="col-lg-12 col-xl d-flex align-items-center">
                              <img src="${albums[i].albumCover}" class="personal-imG rounded-start"
                                  alt="immagine album" />
                          </div>
                          <div>
                            <div class="col d-flex align-items-center">
                                <div class="card-body">
                                    <h5 id="titoloHorizontalCard"
                                        class="card-title d-flex justify-content-center text-white">
                                        ${albums[i].albumTitle}
                                    </h5>
                                </div>
                            </div>
                          </div>
                      </div>
                      <div class="play-badge">
                          <img class="playButton" src="./assets/imgs/svg/play-fill.svg"
                              alt="play button" />
                      </div>
                  </div>
              </a>`;
    document.getElementById("printHorizontalCards").appendChild(card);
  }
  const rowArtistsList = document.getElementById("row-artists-list");
  const selectedArtists = new Set(); // Set per tracciare gli artisti selezionati

  for (let j = 0; j < 4; j++) {
    if (selectedArtists.size >= albums.length) break; // Esci dal ciclo se non ci sono più artisti unici disponibili

    let randomIndex;
    let selectedAlbum;

    // Trova un album con un artista non ancora selezionato
    do {
      randomIndex = Math.floor(Math.random() * albums.length);
      selectedAlbum = albums[randomIndex];
    } while (selectedArtists.has(selectedAlbum.artistName));

    // Aggiungi l'artista selezionato al set
    selectedArtists.add(selectedAlbum.artistName);
    console.log(selectedAlbum);

    const colCardArtist = document.createElement("div");
    colCardArtist.classList.add("col", "mb-3");
    colCardArtist.innerHTML = `
      <a href="./Artist_page_1.html?id=${selectedAlbum.artistId}" class="text-decoration-none">
        <div class="card grey-vertical-card p-2">
          <div class="position-relative">
            <img
              src="${selectedAlbum.pictureArtist}"
              class="card-img-top"
              alt="Foto artista"
            />
            <div class="play-badge2">
              <img
                class="playButton"
                src="./assets/imgs/svg/three-dots.svg"
                alt="play button"
              />
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title text-white text-center ">${selectedAlbum.artistName}</h5>
          </div>
        </div>
      </a>`;

    rowArtistsList.appendChild(colCardArtist);
  }
});
