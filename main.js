const images = document.querySelectorAll('.zoom-fade');
const audio = document.getElementById("bg-audio");
const muteBtn = document.getElementById("mute-btn");

audio.volume = 0.5;

window.addEventListener('beforeunload', function() {
    localStorage.setItem('audioCurrentTime', audio.currentTime);
    localStorage.setItem('audioIsPlaying', !audio.paused);
    localStorage.setItem('audioMuted', audio.muted);
});

window.addEventListener('load', function() {
    const savedTime = localStorage.getItem('audioCurrentTime');
    const wasPlaying = localStorage.getItem('audioIsPlaying') === 'true';
    const wasMuted = localStorage.getItem('audioMuted') === 'true';
    
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }
    
    audio.muted = wasMuted;
    muteBtn.textContent = audio.muted ? "♪ ▶" : "♪ ❚❚";
    
    if (wasPlaying && !audio.muted) {
        audio.play().catch(error => {
            console.log("Autoplay prevented - user interaction required");
        });
    }
});

images.forEach((image) => {
    image.addEventListener('click', (event) => {
        event.preventDefault();

        const nextPageLink = image.parentElement.href;

        fadeAudio(audio, 0, 300);
        
        image.classList.add('zoomed');
        document.body.classList.add('fade-out');
        
        setTimeout(() => {
            window.location.href = nextPageLink;
        }, 1000);
    });
});

// Mute button
muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "♪ ▶" : "♪ ❚❚";
    localStorage.setItem('audioMuted', audio.muted);
    
    if (!audio.muted && audio.paused) {
        audio.play().catch(error => {
            console.log("Playback failed");
        });
    }
});

function fadeAudio(audioElement, targetVolume, duration) {
    const initialVolume = audioElement.volume;
    const delta = targetVolume - initialVolume;
    const startTime = performance.now();
    
    function fadeStep() {
        const currentTime = performance.now();
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        audioElement.volume = initialVolume + delta * progress;
        
        if (progress < 1) {
            requestAnimationFrame(fadeStep);
        }
    }
    
    fadeStep();
}

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        audio.volume = 0;
    } else {
        audio.volume = 0.5;
    }
});