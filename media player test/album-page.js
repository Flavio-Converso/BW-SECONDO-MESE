document.addEventListener("DOMContentLoaded", function () {
  const addressBarContent = new URLSearchParams(location.search);
  console.log(addressBarContent);
  const albumId = addressBarContent.get("id");
  console.log(albumId);

  const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
  const url = apiUrl + albumId;

  let alb; // Definizione della variabile alb al livello superiore

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
      .then((album) => {
        console.log(album);
        if (album) {
          alb = album; // Assegna il valore della variabile album alla variabile alb
          albumHtml(album);
        } else {
          console.log("nessun album trovato");
        }
      })
      .catch((err) => {
        console.log("ERRORE", err);
      });
  };

  let tracksArray;

  // funzione che riporta l'album con tutte le tracce in html
  const albumHtml = function (album) {
    const colBodyAlbumPage = document.getElementById("header-album-page");
    const realeaseYear = album.release_date ? album.release_date.split("-") : ["N/D"];
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
      ${album.artist.name} <span class="">- ${realeaseYear[0]} - ${album.nb_tracks
      } brani, <span class="grey-light">${Math.floor(album.duration / 60)} min ${album.duration % 60
      } sec</span></span>
      `;
    setColorGradient(albumCoverBig, "bgDinamico");
    //descriptionMobile.innerHTML = `<p>Album &middot; ${realeaseYear[0]}<p>`;
    // Genera tutte le tracce dell'album all'interno della sezione rowTrack
    const containerTracks = document.getElementById("container-tracks");

    // Creiamo un array di oggetti rappresentanti le tracce dell'album
    // Creiamo un array di oggetti rappresentanti le tracce dell'album
    tracksArray = [];
    for (let i = 0; i < album.tracks.data.length; i++) {
      const track = album.tracks.data[i];
      tracksArray.push({
        trackNumber: i + 1,
        title: track.title,
        artist: track.artist.name,
        duration: track.duration,
        preview: track.preview // Aggiungiamo la proprietà preview
      });
    }
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

    // Salviamo l'array delle tracce in localStorage
    localStorage.setItem('albumTracks', JSON.stringify(tracksArray));

    // Ora possiamo anche creare l'HTML per ogni traccia e aggiungerlo al container
    // Ora possiamo anche creare l'HTML per ogni traccia e aggiungerlo al container
    tracksArray.forEach((track, i) => {
      const rowTrack = document.createElement("div");
      rowTrack.classList.add("row", "mt-3");
      rowTrack.innerHTML = `
      <div class="col-1 ms-3 d-flex justify-content-end align-items-center">
          <p class="ms-0">${track.trackNumber}</p>
      </div>
      <div class="col-1 p-0 d-flex align-items-center justify-content-center">
        <button class="bg-transparent text-white border-0 play-button" type="button" data-index="${i}"> play </button>
      </div>
      <div class="col-6 p-0">
        <h5 class="m-0 fw-bold">${track.title}</h5>
        <p class="m-0 grey-light">${track.artist}</p>
      </div>
      <div class="col-3 p-0 d-flex align-items-center">
        <p class="m-0">123</p>
      </div>
      <div class="col-1 p-0 d-flex align-items-center justify-content-center">
        <p class="m-0">${(track.duration / 60).toFixed(2)}</p>
      </div>
  `;
      containerTracks.appendChild(rowTrack);
    });
  };


  // Al click del bottone di riproduzione della traccia
  document.getElementById("container-tracks").addEventListener("click", function (event) {
    // Verifica se l'elemento cliccato è un bottone di riproduzione
    if (event.target.matches(".play-button")) {
      // Ottieni l'indice della traccia dal suo attributo data-index
      const trackIndex = event.target.closest(".row").querySelector(".play-button").getAttribute("data-index");

      // Assicurati che tracksArray sia definito e che contenga almeno un elemento
      if (tracksArray && tracksArray.length > trackIndex && tracksArray[trackIndex].preview) {
        // Ottieni l'URL della preview della traccia selezionata
        const previewUrl = tracksArray[trackIndex].preview;
        const title = tracksArray[trackIndex].title;
        const artist = tracksArray[trackIndex].artist;

        // Assicurati che alb sia definito prima di accedere alle sue proprietà
        if (alb && alb.cover_small) {
          // Ottieni l'URL della cover_small dell'album
          const coverUrl = alb.cover_small;
          document.querySelector(".title").textContent = title;
          document.querySelector(".artist").textContent = artist;
          // Seleziona l'elemento audio del media player
          const audioPlayer = document.querySelector("audio");

          // Assegna l'URL della preview all'attributo src dell'elemento audio
          audioPlayer.src = previewUrl;

          // Imposta l'URL della cover_small dell'album nell'elemento img del media player
          const mediaPlayerImg = document.getElementById("media-image");
          mediaPlayerImg.setAttribute("src", coverUrl);
          mediaPlayerImg.style.display = "block";
          // Avvia la riproduzione dell'audio
          audioPlayer.play();

          // Log per verificare se tutto è a posto
          console.log("Preview della traccia caricata nel media player:", previewUrl);
          console.log("Cover_small dell'album caricata nel media player:", coverUrl);
        } else {
          console.error("Errore: L'elemento alb non è definito o non contiene una proprietà 'cover_small'");
        }
      } else {
        console.error("Errore: L'elemento tracksArray non è definito o non contiene un elemento con la proprietà 'preview'");
      }
    }
  });

  getAlbumWithId();
});
