document.addEventListener("DOMContentLoaded", function () {
    const playPauseButton = document.querySelector(".play-pause");
    const progressBar = document.querySelector(".progress");
    const progressContainer = document.querySelector(".progress-container");
    const currentTime = document.querySelector(".current-time");
    const volumeBar = document.querySelector(".volume-bar .progress");
    const volumeIcon = document.querySelector(".volume-bar i");
    const randomButton = document.querySelector(".fa-random");
    const heartButton = document.querySelector(".far.fa-heart");
    const rewindButton = document.querySelector(".fa-undo-alt");
    const audioElement = document.querySelector("audio");

    let isPlaying = false;
    let isMuted = false;
    let isLiked = false;
    let isRandom = false;

    playPauseButton.addEventListener("click", togglePlayPause);
    volumeIcon.addEventListener("click", toggleMute);
    randomButton.addEventListener("click", toggleRandom);
    heartButton.addEventListener("click", toggleHeart);
    rewindButton.addEventListener("click", rewind);

    progressBar.addEventListener("click", setProgress);
    volumeBar.addEventListener("click", setVolume);
    //logica per il play e pause
    function togglePlayPause() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            audioElement.play();
            playPauseButton.classList.remove("fa-play");
            playPauseButton.classList.add("fa-pause", "active");
        } else {
            audioElement.pause();
            playPauseButton.classList.remove("fa-pause", "active");
            playPauseButton.classList.add("fa-play");
        }
    }
    //logia per il muto
    function toggleMute() {
        isMuted = !isMuted;
        if (isMuted) {
            audioElement.volume = 0;
            volumeIcon.classList.remove("fa-volume-down");
            volumeIcon.classList.add("fa-volume-mute", "active");
        } else {
            audioElement.volume = 1;
            volumeIcon.classList.remove("fa-volume-mute", "active");
            volumeIcon.classList.add("fa-volume-down");
        }
    }
    //logica random da implementare
    function toggleRandom() {
        isRandom = !isRandom;
        if (isRandom) {
            randomButton.classList.add("active");
            // Logica per riproduzione casuale
        } else {
            randomButton.classList.remove("active");
            // Logica per riproduzione normale
        }
    }
    //logica like da implementare ( se la vogliamo implementare)
    function toggleHeart() {
        isLiked = !isLiked;
        if (isLiked) {
            heartButton.classList.remove("far");
            heartButton.classList.add("fas", "active");
            // Logica per like
        } else {
            heartButton.classList.remove("fas", "active");
            heartButton.classList.add("far");
            // Logica per rimuovere il like
        }
    }

    function rewind() {
        // Logica per riavvolgere (se vogliamo implementarla)
    }
    //logica progressBar da fixare (prende come reference la barra verde, ci ho sbattuto la testa per un'oretta ma non riesco a venirne a capo)
    function setProgress(e) {
        const progressBarWidth = progressBar.clientWidth;
        const clickX = e.clientX - progressBar.getBoundingClientRect().left;
        const relativeClickX = Math.min(1, Math.max(0, clickX / progressBarWidth));
        const duration = audioElement.duration;
        const currentTimeValue = relativeClickX * duration;

        currentTime.textContent = formatTime(currentTimeValue);
        progressBar.style.width = `${relativeClickX * 100}%`;
        audioElement.currentTime = currentTimeValue;
    }
    //logica volume, da fixare come la progressBar
    function setVolume(e) {
        const volumeBarWidth = volumeBar.clientWidth;
        const clickX = e.clientX - volumeBar.getBoundingClientRect().left;
        const relativeClickX = Math.min(1, Math.max(0, clickX / volumeBarWidth));
        const newVolume = relativeClickX;

        audioElement.volume = newVolume;
        volumeBar.style.width = `${newVolume * 100}%`;
    }

    // Aggiorna il tempo corrente e totale ogni secondo
    setInterval(updateTimeDisplays, 1000);

    function updateTimeDisplays() {
        const currentTimeDisplay = document.querySelector(".current-time");
        const totalTimeDisplay = document.querySelector(".total-time");
        const currentTime = audioElement.currentTime;
        const totalTime = audioElement.duration;
        const formattedCurrentTime = formatTime(currentTime);
        const formattedTotalTime = formatTime(totalTime);
        currentTimeDisplay.textContent = formattedCurrentTime;
        totalTimeDisplay.textContent = formattedTotalTime;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
});
