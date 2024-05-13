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
  const realeaseYear = album.release_date.split("-");
  // da sistemare meglio
  const headerAlbumPage = `
        <img class="w-25" src="${album.cover_big}" alt="Foto album"/>
        <div class="d-flex flex-column justify-content-end ms-2">
            <h6>ALBUM</h6>
            <h1>${album.title}</h1>
            <div class="d-flex gap-2">
                <img id="foto-artista" src="${
                  album.artist.picture_small
                }" alt="" />
                <p>${album.artist.name} - ${realeaseYear[0]} - ${
    album.nb_tracks
  } brani, 
                ${Math.floor(album.duration / 60)} min ${
    album.duration % 60
  } sec</p>
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
            <h5 class="m-0">${track.title}</h5>
            <p class="m-0 text-info">${track.artist.name}</p>
        </div>
        <div class="col-4 p-0 d-flex align-items-center">
            <p class="m-0">123</p>
        </div>
        <div class="col-1 p-0 d-flex align-items-center justify-content-center">
            <p class="m-0">${(track.duration / 60).toFixed(2)}</p>
        </div>
        `;
    containerTracks.appendChild(rowTrack);
  });
};

getAlbumWithId();
