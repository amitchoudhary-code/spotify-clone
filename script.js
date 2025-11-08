const playButtons = document.querySelectorAll('.play-btn');
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const popupName = document.getElementById('popup-name');
const songList = document.getElementById('song-list');
const audio = document.getElementById('audio-player');
const musicPlayer = document.getElementById('music-player');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const closePopup = document.getElementById('close-popup');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const likeBtn = document.getElementById('like');
const shuffleBtn = document.getElementById('shuffle');

// Popup player controls
const popupPlayPauseBtn = document.getElementById('popup-play-pause');
const popupPrevBtn = document.getElementById('popup-prev');
const popupNextBtn = document.getElementById('popup-next');
const popupLikeBtn = document.getElementById('popup-like');
const popupShuffleBtn = document.getElementById('popup-shuffle');
const popupProgressBar = document.getElementById('popup-progress-bar');

let currentSongIndex = 0;
let currentPlaylist = [];
let isLiked = false;

// UPDATE THIS SECTION WITH YOUR ACTUAL MUSIC FILE NAMES
// Replace the file names with your actual MP3 file names from each folder
const songsByArtist = {
  "Artist 1": [
    { title: "Song 1", url: "music/New folder/song.mp3" },
    { title: "Song 2", url: "music/New folder/song (2).mp3" },
    { title: "Song 3", url: "music/New folder/song2.mp3" },
    { title: "Song 4", url: "music/New folder/song1.mp3" },
    { title: "Song 5", url: "music/New folder/song3.mp3" }
  ],
  "Artist 2": [
  { title: "Song 1", url: "music/New folder/song.mp3" },
    { title: "Song 2", url: "music/New folder/song (2).mp3" },
    { title: "Song 3", url: "music/New folder/song2.mp3" },
    { title: "Song 4", url: "music/New folder/song1.mp3" },
    { title: "Song 5", url: "music/New folder/song3.mp3" }
  ],
  "Artist 3": [
   { title: "Song 1", url: "music/New folder/song.mp3" },
    { title: "Song 2", url: "music/New folder/song (2).mp3" },
    { title: "Song 3", url: "music/New folder/song2.mp3" },
    { title: "Song 4", url: "music/New folder/song1.mp3" },
    { title: "Song 5", url: "music/New folder/song3.mp3" }
  ],
  "Artist 4": [
 { title: "Song 1", url: "music/New folder/song.mp3" },
    { title: "Song 2", url: "music/New folder/song (2).mp3" },
    { title: "Song 3", url: "music/New folder/song2.mp3" },
    { title: "Song 4", url: "music/New folder/song1.mp3" },
    { title: "Song 5", url: "music/New folder/song3.mp3" }
  ],
  "Artist 5": [
 { title: "Song 1", url: "music/New folder/song.mp3" },
    { title: "Song 2", url: "music/New folder/song (2).mp3" },
    { title: "Song 3", url: "music/New folder/song2.mp3" },
    { title: "Song 4", url: "music/New folder/song1.mp3" },
    { title: "Song 5", url: "music/New folder/song3.mp3" }
  ],
  "Artist 6": [
  { title: "Song 1", url: "music/New folder/song.mp3" },
    { title: "Song 2", url: "music/New folder/song (2).mp3" },
    { title: "Song 3", url: "music/New folder/song2.mp3" },
    { title: "Song 4", url: "music/New folder/song1.mp3" },
    { title: "Song 5", url: "music/New folder/song3.mp3" }
  ],
  "Artist 7": [
 { title: "Song 1", url: "music/New folder/song.mp3" },
    { title: "Song 2", url: "music/New folder/song (2).mp3" },
    { title: "Song 3", url: "music/New folder/song2.mp3" },
    { title: "Song 4", url: "music/New folder/song1.mp3" },
    { title: "Song 5", url: "music/New folder/song3.mp3" }],
  "Artist 8": [
   { title: "Song 1", url: "music/New folder/song.mp3" },
    { title: "Song 2", url: "music/New folder/song (2).mp3" },
    { title: "Song 3", url: "music/New folder/song2.mp3" },
    { title: "Song 4", url: "music/New folder/song1.mp3" },
    { title: "Song 5", url: "music/New folder/song3.mp3" }
  ],
  "Artist 9": [
  { title: "Song 1", url: "music/New folder/song.mp3" },
    { title: "Song 2", url: "music/New folder/song (2).mp3" },
    { title: "Song 3", url: "music/New folder/song2.mp3" },
    { title: "Song 4", url: "music/New folder/song1.mp3" },
    { title: "Song 5", url: "music/New folder/song3.mp3" } ,
 
  ],
  "Artist 10": [
 { title: "Song 1", url: "music/New folder/song.mp3" },
    { title: "Song 2", url: "music/New folder/song (2).mp3" },
    { title: "Song 3", url: "music/New folder/song2.mp3" },
    { title: "Song 4", url: "music/New folder/song1.mp3" },
    { title: "Song 5", url: "music/New folder/song3.mp3" }
  ],
  
};

function playSong(index) {
  if (currentPlaylist.length === 0) return;
  currentSongIndex = index;
  const song = currentPlaylist[currentSongIndex];
  audio.src = song.url;
  audio.play().catch(err => console.log('Play error:', err));
  playPauseBtn.textContent = "⏸";
  if (popupPlayPauseBtn) popupPlayPauseBtn.textContent = "⏸";
  musicPlayer.style.display = "flex";
  updateSongListHighlight();
}

function updateSongListHighlight() {
  const allSongItems = songList.querySelectorAll('li');
  allSongItems.forEach((li, idx) => {
    li.style.backgroundColor = idx === currentSongIndex ? '#1db954' : '#222';
    li.style.color = idx === currentSongIndex ? '#000' : '#fff';
  });
}

playButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.artist-card');
    const artist = card.dataset.artist;
    const img = card.dataset.img;

    popup.classList.remove('hidden');
    popupImg.src = img;

    // Restart pop-up animation
    popupImg.style.animation = 'none';
    popupImg.offsetHeight;
    popupImg.style.animation = null;

    popupName.textContent = artist;
    songList.innerHTML = '';

    const artistSongs = songsByArtist[artist] || [];
    currentPlaylist = artistSongs;

    artistSongs.forEach((song, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${song.title}</span><button class="song-play">▶</button>`;
      li.querySelector('.song-play').addEventListener('click', () => playSong(index));
      songList.appendChild(li);
    });
  });
});

closePopup.addEventListener('click', () => popup.classList.add('hidden'));
popup.addEventListener('click', e => { if (e.target === popup) popup.classList.add('hidden'); });

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸";
    if (popupPlayPauseBtn) popupPlayPauseBtn.textContent = "⏸";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶";
    if (popupPlayPauseBtn) popupPlayPauseBtn.textContent = "▶";
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPlaylist.length === 0) return;
  currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  playSong(currentSongIndex);
});

nextBtn.addEventListener('click', () => {
  if (currentPlaylist.length === 0) return;
  currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
  playSong(currentSongIndex);
});

likeBtn.addEventListener('click', () => {
  isLiked = !isLiked;
  likeBtn.style.color = isLiked ? '#ff0000' : '#1db954';
  if (popupLikeBtn) popupLikeBtn.style.color = isLiked ? '#ff0000' : '#1db954';
});

shuffleBtn.addEventListener('click', () => {
  if (currentPlaylist.length === 0) return;
  const shuffled = [...currentPlaylist];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  currentPlaylist = shuffled;
  songList.innerHTML = '';
  currentPlaylist.forEach((song, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${song.title}</span><button class="song-play">▶</button>`;
    li.querySelector('.song-play').addEventListener('click', () => playSong(index));
    songList.appendChild(li);
  });
  shuffleBtn.style.color = '#ffff00';
  if (popupShuffleBtn) popupShuffleBtn.style.color = '#ffff00';
  setTimeout(() => {
    shuffleBtn.style.color = '#1db954';
    if (popupShuffleBtn) popupShuffleBtn.style.color = '#1db954';
  }, 300);
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    if (popupProgressBar) popupProgressBar.value = progress;
  }
});

progressBar.addEventListener('input', e => {
  const seekTime = (e.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

audio.addEventListener('ended', () => {
  if (currentPlaylist.length > 0) {
    currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
    playSong(currentSongIndex);
  }
});

// Popup player controls
if (popupPlayPauseBtn) {
  popupPlayPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = "⏸";
      popupPlayPauseBtn.textContent = "⏸";
    } else {
      audio.pause();
      playPauseBtn.textContent = "▶";
      popupPlayPauseBtn.textContent = "▶";
    }
  });
}

if (popupPrevBtn) {
  popupPrevBtn.addEventListener('click', () => {
    if (currentPlaylist.length === 0) return;
    currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    playSong(currentSongIndex);
  });
}

if (popupNextBtn) {
  popupNextBtn.addEventListener('click', () => {
    if (currentPlaylist.length === 0) return;
    currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
    playSong(currentSongIndex);
  });
}

if (popupLikeBtn) {
  popupLikeBtn.addEventListener('click', () => {
    isLiked = !isLiked;
    likeBtn.style.color = isLiked ? '#ff0000' : '#1db954';
    popupLikeBtn.style.color = isLiked ? '#ff0000' : '#1db954';
  });
}

if (popupShuffleBtn) {
  popupShuffleBtn.addEventListener('click', () => {
    if (currentPlaylist.length === 0) return;
    const shuffled = [...currentPlaylist];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    currentPlaylist = shuffled;
    songList.innerHTML = '';
    currentPlaylist.forEach((song, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${song.title}</span><button class="song-play">▶</button>`;
      li.querySelector('.song-play').addEventListener('click', () => playSong(index));
      songList.appendChild(li);
    });
    shuffleBtn.style.color = '#ffff00';
    popupShuffleBtn.style.color = '#ffff00';
    setTimeout(() => {
      shuffleBtn.style.color = '#1db954';
      popupShuffleBtn.style.color = '#1db954';
    }, 300);
  });
}

if (popupProgressBar) {
  popupProgressBar.addEventListener('input', e => {
    const seekTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  });
}