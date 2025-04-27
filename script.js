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

playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play().then(() => {
            updatePlayPauseButton(true);
            errorMessage.style.display = 'none';
        }).catch(() => {
            errorMessage.style.display = 'block';
        });
    } else {
        audioPlayer.pause();
        updatePlayPauseButton(false);
    }
});

audioPlayer.addEventListener('error', () => {
    errorMessage.style.display = 'block';
    updatePlayPauseButton(false);
});