const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause-button');
const stopButton = document.getElementById('stop-button');
const volumeSlider = document.getElementById('volume-slider');
const volumeDisplay = document.getElementById('volume-display');
const seekSlider = document.getElementById('seek-slider');
const seekDisplay = document.getElementById('seek-display');

let isPlaying = false;

playPauseButton.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playPauseButton.textContent = 'Play';
  } else {
    audio.play();
    playPauseButton.textContent = 'Pause';
  }
  isPlaying = !isPlaying;
});

stopButton.addEventListener('click', () => {
  audio.pause();
  audio.currentTime = 0;
  playPauseButton.textContent = 'Play';
  isPlaying = false;
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
  volumeDisplay.textContent = `${Math.round(volumeSlider.value * 100)}%`;
});

seekSlider.addEventListener('input', () => {
  audio.currentTime = seekSlider.value * audio.duration / 100;
  seekDisplay.textContent = `${formatTime(audio.currentTime)}`;
});

audio.addEventListener('timeupdate', () => {
  seekSlider.value = (audio.currentTime / audio.duration) * 100;
  seekDisplay.textContent = `${formatTime(audio.currentTime)}`;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}