const tracks = document.querySelectorAll(".track");
const audios = document.querySelectorAll("audio");
let current = 0;

// Only one plays + highlight
audios.forEach((audio, i) => {
  audio.addEventListener("play", () => {
    audios.forEach(a => {
      if (a !== audio) {
        a.pause();
        a.currentTime = 0;
      }
    });

    tracks.forEach(t => t.classList.remove("playing"));
    tracks[i].classList.add("playing");
    current = i;
  });

  audio.addEventListener("ended", () => {
    nextSong();
  });
});

// Next / Previous
function nextSong() {
  audios[current].pause();
  audios[current].currentTime = 0;
  current = (current + 1) % audios.length;
  audios[current].play();
}

function prevSong() {
  audios[current].pause();
  audios[current].currentTime = 0;
  current = (current - 1 + audios.length) % audios.length;
  audios[current].play();
}

document.getElementById("next").onclick = nextSong;
document.getElementById("prev").onclick = prevSong;

// Search
document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  tracks.forEach(track => {
    track.style.display = track.innerText.toLowerCase().includes(value)
      ? "flex"
      : "none";
  });
});
