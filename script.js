const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById ('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');

function showPlayIcon () {
    playBtn.classList.replace("icon-pause", "icon-play");
    playBtn.setAttribute('title', 'Play');
}


// Play & Pause ----------------------------------- //
function togglePlay () {
    if (video.paused) {
        video.play();
        playBtn.classList.replace("icon-play", "icon-pause");
        playBtn.setAttribute('title', 'Pause');
    } else { 
        video.pause();
        showPlayIcon();
    }  
} 

//  On video ended, change the "Pause" icon to "Play"
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime (time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = (seconds < 10)? seconds = `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}

// Update progress bar as viseo play
function updateProgress () {
    progressBar.style.width = `${(video.currentTime/video.duration*100)}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} / `;
    duration.textContent = `${displayTime(video.duration)}`;

}

// Click to seek within the video
function setProgress (e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}% `;
    video.currentTime = newTime * video.duration;



}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Volume bar
function changeVolume (e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    //  Rounding volume up/down
    (volume < 0.1) ? volume = 0 : (volume > 0.9) ? volume = 1 : volume;
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    // change icon base on volume
    (volume < 0.09) ? 
    volumeIcon.classList.replace('icon-volume-up', 'icon-volume-off') : 
    volumeIcon.classList.replace('icon-volume-off', 'icon-volume-up') ;
    lastVolume = volume;
}

// Mute / unmute
function toggleMute () {
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.replace('icon-volume-up', 'icon-volume-off') ;
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.replace('icon-volume-off', 'icon-volume-up') ;
    }
}



// Change Playback Speed -------------------- //
function changeSpeed () {
    video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }

let fullscreen = false;

//  Toggle full screen
function toggleFullscreen () {
!fullscreen ? openFullscreen(player) : closeFullscreen();
fullscreen = !fullscreen;
}

//  Event listener
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);




