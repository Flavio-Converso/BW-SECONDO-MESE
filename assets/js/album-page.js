const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);
const albumId = addressBarContent.get("id");
console.log(albumId);

const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const url = apiUrl + albumId;

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
      if (albumId) {
        albumHtml(alb);
      } else {
        console.log("nessun album trovato");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

// funzione che riporta l'album con tutte le tracce in html
const albumHtml = function (album) {
  const colBodyAlbumPage = document.getElementById("header-album-page");
  const realeaseYear = album.release_date.split("-");
  const imgAlbum = document.querySelector("#header-album-page > img");
  const albumCoverBig = album.cover_big;
  imgAlbum.setAttribute("src", albumCoverBig);
  const title = document.querySelector("#header-album-page #titlE");
  title.innerHTML = album.title;
  const imgArtist = document.querySelector("#description > img");
  imgArtist.setAttribute("src", album.artist.picture);
  const description = document.querySelector("#description > p");
  const descriptionMobile = document.querySelector("#description > p");
  description.innerHTML = `
    ${album.artist.name} <span class="">- ${realeaseYear[0]} - ${album.nb_tracks
    } brani, <span class="grey-light">${Math.floor(album.duration / 60)} min ${album.duration % 60
    } sec</span></span>
    `;
  //setColorFromImage(albumCoverBig, "bgDinamico");
  setColorGradient(albumCoverBig, "bgDinamico");
  //descriptionMobile.innerHTML = `<p>Album &middot; ${realeaseYear[0]}<p>`;
  // Genera tutte le tracce dell'album all'interno della sezione rowTrack
  const containerTracks = document.getElementById("containeR-trackS");
  album.tracks.data.forEach((track, i) => {
    console.log(track);
    const rowTrack = document.createElement("div");
    rowTrack.classList.add("row", "mt-3");
    rowTrack.innerHTML = `
        <div class="col-1 ps-0 d-flex justify-content-end align-items-center">
            <p class="m-0">${i + 1}</p>
        </div>
        <div class="col-6 p-0">
            <h5 class="m-0 fw-bold">${track.title}</h5>
            <p class="m-0 grey-light">${track.artist.name}</p>
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

function setColorGradient(albumCoverBig, bgDinamico) {
  const element = document.getElementById(bgDinamico);

  new Vibrant(albumCoverBig)
    .getPalette()
    .then((palette) => {
      // Preparazione della stringa del gradiente
      const gradientColors = [
        palette.Vibrant.getHex(),
        palette.DarkVibrant.getHex(),
        palette.LightVibrant.getHex(),
        palette.Muted.getHex(),
      ].join(", ");

      // Applica un gradiente lineare che include tutti i colori
      element.style.backgroundImage = `linear-gradient(to top, ${gradientColors})`;
    })
    .catch((err) => {
      console.error("Errore nell'estrazione dei colori: ", err);
    });
}

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
