const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressBar = document.getElementById('progress');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeControl = document.getElementById('volume');
const playlist = document.querySelectorAll('#playlist li');
let currentTrackIndex = 0;

// Load selected track
function getTracks(index) {
    const selected = playlist[index];
    const src = selected.getAttribute('data-src');
    const artist = selected.getAttribute('data-artist');

    audio.src = src;
    trackTitle.textContent = selected.textContent;
    trackArtist.textContent = artist;

    playlist.forEach(item => item.classList.remove('active'));
    selected.classList.add('active');
}

// Play/Pause
playButton.addEventListener('click', () => audio.play());
pauseButton.addEventListener('click', () => audio.pause());

// Prev/Next
prevButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    getTracks(currentTrackIndex);
    audio.play();
});

nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    getTracks(currentTrackIndex);
    audio.play();
});

// Progress bar update
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
});

// Seek on progress bar input
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Volume control
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value / 100;
});

// Playlist click
playlist.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentTrackIndex = index;
        getTracks(currentTrackIndex);
        audio.play();
    });
});

// Auto next track when ended
audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    getTracks(currentTrackIndex);
    audio.play();
});

// Format time helper
function formatTime(time) {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Initialize after DOM ready
document.addEventListener('DOMContentLoaded', () => {
    getTracks(currentTrackIndex);
});
