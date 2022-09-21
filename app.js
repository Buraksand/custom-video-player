const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

//Play and pause video
function toggleVideoStatus() {

    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// update play pause Icon
function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

//update progress and timestamp
function updateProgress() {
    // if the user is monkeying with the progress bar then bail out. 
    if (progress === document.activeElement) return;
    progress.value = (video.currentTime / video.duration) * 100;

    let mins = Math.floor(video.currentTime / 60)
    if (mins < 10) {
        mins = '0' + String(mins);
    } else {
        mins = String(mins);
    }

    let secs = Math.floor(video.currentTime) % 60;
    if (secs < 10) {
        secs = '0' + String(secs)
    } else {
        secs = String(secs)
    }

    timestamp.innerText = `${mins}:${secs}`;

}

//set video time
function setVideoProgress() {
    video.currentTime = +progress.value / 100 * video.duration;
    /*
   be sure to unfocus the progress bar so updateProgress can resume.
   This releases it from being the document.activeElement.
  */
    progress.blur();
}

function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

//Event Listeners
video.addEventListener('click', toggleVideoStatus)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('timeupdate', updateProgress)

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);

