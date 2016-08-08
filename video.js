// JavaScript Document

/**/
document.addEventListener("DOMContentLoaded", function()
{
	startVideoPlayer();
}, false);

var videoPlayer;

/*sets the videoPlayer variable to the video ID in the page*/
function startVideoPlayer() {
	videoPlayer = document.getElementById("video");
	
/*runs the updateProgressBar method every millisecond once the videoPlayer is started*/
	videoPlayer.addEventListener("initializeProgressBar", updateProgressBar, false);
}

/* used to set all the button attributes at once */
function changeButton(btn, value) {
	btn.	innerHTML = value;
	btn.title = value;
	btn.className = value;
}

/*handles both play and pause function in one button*/
function togglePlayPause() {
	var button = document.getElementById("play-pause-btn");
	
	/* || is &,  . is = */
	if (videoPlayer.paused || videoPlayer.ended) {
		changeButton(button, "&#10074;&#10074;");
		videoPlayer.play();
		
	} else {
		changeButton(button,"&#9654;");
		videoPlayer.pause();
	}
}
	
function stopVideo() {
	videoPlayer.pause();
	videoPlayer.currentTime = 0;
	
	var button = document.getElementById("play-pause-btn");
	changeButton(button,"&#9654;");
}

function changeVolume() {
	videoPlayer.volume = document.getElementById("volumeSlider").value;
}

function toggleMute() {
	var button = document.getElementById("mute-unmute-btn");
	
	if (videoPlayer.muted) {
		changeButton(button, "Mute");
		videoPlayer.muted = false;
	} else {
		changeButton(button, "Un-mute");
		videoPlayer.muted = true;
	}
}

/*updates progress bar dynamically every millisecond*/
videoPlayer.addEventListener("timeupdate", updateProgressBar, false);

function updateProgressBar() {
	var bar = document.getElementByClassName("progress-bar")[0];
	var percent = Math.floor((100 / videoPlayer.duration) * videoPlayer.currentTime);
	bar.value = percent;
	bar.innerHTML = percent + "% played";
}

function fullScreen() {
	if (videoPlayer.requestFullscreen) {
		videoPlayer.requestFullscreen();
	} else if (videoPlayer.mozRequestFullScreen) {
		videoPlayer.mozRequestFullScreen();
	} else if (videoPlayer.webkitRequestFullscreen) {
		videoPlayer.webkitRequestFullscreen();
	}
	//videoPlayer.webkitRequestFullScreen();
	console.log("Going into full-screen mode.");
}

/*defines the function specified in HTML onclick method*/
function loadVideo(video) {
	videoPlayer.src = "footage/" + video;
	videoPlayer.load();
	
	/*splits the fileName and the file tag with '.'  .split creates an array*/
	var fileName = video.split('.');
	
	/*calls the folder posters + a specific fileName [which is an array] + jpg extension*/
	videoPlayer.poster = "posters/" + fileName[0] + ".jpg";
}

function RWandFFvideo(dir, amt) {
	var pbr = videoPlayer.playbackRate;
	var pbr_lower_btn = document.getElementById("rewind-btn");
	
	/* ? = ternary operator, Acts as is/else statement. 
	'Grays out' btn when it reaches its maximum feature*/
	(pbr == 0.5) ? pbr_lower_btn.disabled = true : pbr_lower_btn.disabled = false;
	
	if (dir === "rw") {
		videoPlayer.playbackRate -= amt;
	} else if (dir === "ff") {
		videoPlayer.playback += amt;
	}
}
