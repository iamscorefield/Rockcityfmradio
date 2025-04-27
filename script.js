const radioGif = document.getElementById('radio-gif');
const audioPlayer = document.getElementById('audio-player');
const sideMenu = document.getElementById('sideMenu');
const playPauseBtn = document.getElementById('play-pause-btn');
const errorMessage = document.getElementById('error-message');

if (!radioGif || !audioPlayer || !sideMenu || !playPauseBtn || !errorMessage) {
    throw new Error('Required DOM elements are missing.');
}

function updatePlayPauseButton(isPlaying) {
    const icon = playPauseBtn.querySelector('i');
    icon.classList.remove(isPlaying ? 'fa-play' : 'fa-pause');
    icon.classList.add(isPlaying ? 'fa-pause' : 'fa-play');
}

function toggleMenu() {
    sideMenu.classList.toggle('open');
}

function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play().then(() => {
            updatePlayPauseButton(true);
            errorMessage.style.display = 'none';
        }).catch(error => {
            errorMessage.textContent = 'Failed to play stream: ' + error.message;
            errorMessage.style.display = 'block';
            updatePlayPauseButton(false);
        });
    } else {
        audioPlayer.pause();
        updatePlayPauseButton(false);
        errorMessage.style.display = 'none';
    }
}

// Make the entire GIF clickable for play/pause
radioGif.addEventListener('click', togglePlayPause);

// Also keep the play/pause button functional for accessibility
playPauseBtn.addEventListener('click', togglePlayPause);

audioPlayer.addEventListener('error', (e) => {
    errorMessage.textContent = 'Stream error: Unable to load the audio stream. Please try again later.';
    errorMessage.style.display = 'block';
    updatePlayPauseButton(false);
});
