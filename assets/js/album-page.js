const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const idAlbum = "54852182";
const url = apiUrl + idAlbum;

// funzione per recuperare i dati dell'album tramite il suo id
const getAlbumWithId = function () {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento");
      }
    })
    .then((alb) => {
      console.log(alb);
      albumHtml(alb);
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

// funzione che riporta l'album con tutte le tracce in html
const albumHtml = function (album) {
  const colBodyAlbumPage = document.getElementById("header-album-page");
  const headerAlbumPage = `
        <img class="w-25" src="./assets/imgs/main/image-1.jpg" alt="Foto album"/>
        <div class="d-flex flex-column justify-content-end ms-2">
            <h6>ALBUM</h6>
            <h1>Titolo album</h1>
            <div class="d-flex align-items-start align-content-end">
                <img id="foto-artista" src="./assets/imgs/main/image-12.jpg" alt="" />
                <p>Descrizione</p>
            </div>
        </div>`;
  colBodyAlbumPage.innerHTML = headerAlbumPage;
  // Genera tutte le tracce dell'album all'interno della sezione rowTrack
  const containerTracks = document.getElementById("container-tracks");
  album.tracks.data.forEach((track, i) => {
    console.log(track);
    const rowTrack = document.createElement("div");
    rowTrack.classList.add("row", "mt-3");
    rowTrack.innerHTML = `
        <div class="col-1 ps-0 d-flex justify-content-end align-items-center">
            <p class="m-0">${i + 1}</p>
        </div>
        <div class="col-6 p-0">
            <p class="m-0">${track.title}</p>
            <p class="m-0">nome artista</p>
        </div>
        <div class="col-4 p-0 d-flex align-items-center">
            <p class="m-0">123</p>
        </div>
        <div class="col-1 p-0 d-flex align-items-center justify-content-center">
            <span>or</span>
        </div>
        `;
    containerTracks.appendChild(rowTrack);
  });
};

getAlbumWithId();
