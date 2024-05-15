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
  const title = document.querySelector("#header-album-page #title");
  title.innerHTML = album.title;
  const imgArtist = document.querySelector("#description > img");
  imgArtist.setAttribute("src", album.artist.picture);
  const description = document.querySelector("#description > p");
  const descriptionMobile = document.querySelector("#description > p");
  description.innerHTML = `
    ${album.artist.name} <span class="">- ${realeaseYear[0]} - ${
    album.nb_tracks
  } brani, <span class="grey-light">${Math.floor(album.duration / 60)} min ${
    album.duration % 60
  } sec</span></span>
    `;
  //setColorFromImage(albumCoverBig, "bgDinamico");
  setColorGradient(albumCoverBig, "bgDinamico");
  //descriptionMobile.innerHTML = `<p>Album &middot; ${realeaseYear[0]}<p>`;
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

function setColorGradient(albumCoverBig, elementId) {
  const element = document.getElementById(elementId);

  new Vibrant(albumCoverBig)
    .getPalette()
    .then((palette) => {
      const colors = [
        palette.Vibrant.getRgb(),
        palette.DarkVibrant.getRgb(),
        palette.LightVibrant.getRgb(),
        palette.Muted.getRgb(),
      ];

      // Calcola la media dei colori RGB
      let avgR = 0,
        avgG = 0,
        avgB = 0;
      colors.forEach((color) => {
        avgR += color[0];
        avgG += color[1];
        avgB += color[2];
      });
      avgR /= colors.length;
      avgG /= colors.length;
      avgB /= colors.length;

      // Converti RGB mediato in HEX
      const avgColorHex = rgbToHex(
        Math.round(avgR),
        Math.round(avgG),
        Math.round(avgB)
      );

      // Applica un gradiente lineare
      element.style.backgroundImage = `linear-gradient(to right, ${palette.Vibrant.getHex()}, ${avgColorHex})`;
    })
    .catch((err) => {
      console.error("Errore nell'estrazione dei colori: ", err);
    });
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

//function setColorFromImage(albumCoverBig, bgDinamico) {
//  const element = document.getElementById(bgDinamico);
//
//  new Vibrant(albumCoverBig)
//    .getPalette()
//    .then((palette) => {
//      console.log(palette); // Questo loggherà tutti i colori disponibili
//      const vibrantColor = palette.Vibrant.getHex(); // Colore vibrante principale
//      const lightVibrantColor = palette.LightVibrant.getHex(); // Colore vibrante chiaro
//      const darkVibrantColor = palette.DarkVibrant.getHex(); // Colore vibrante scuro
//      // Applica il colore di tua scelta
//      element.style.backgroundColor = lightVibrantColor; // Qui puoi cambiare quale colore usare
//    })
//    .catch((err) => {
//      console.error("Errore nell'estrazione dei colori: ", err);
//    });
//}
//
