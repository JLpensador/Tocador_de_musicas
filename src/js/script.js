let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: "src/image/paint_in_black.png",
    name: "Paint In Black",
    artist: "The Rolling Stones",
    music:
      "src/music/The_Rolling_Stones_-_Paint_It_Black_(ColdMP3.com).mp3",
  },
  
  {
    img: "src/image/come_as_you_are.png",
    name: "Come as you are",
    artist: "Nirvana",
    music: "src/music/Nirvana_-_Come_As_You_Are_(BornMP3.com).mp3",
  },

  {
    img: "src/image/burn_it_down.png",
    name: "Burn it Down",
    artist: "Link Park",
    music: "src/music/Linkin_Park_-_BURN_IT_DOWN_(ColdMP3.com).mp3",
  },

  {
    img: "src/image/the_trooper.png",
    name: "The Trooper",
    artist: "Iron Maiden",
    music:
      "src/music/Iron_Maiden_-_The_Trooper_1998_Remastered_Version_1998_Remastered_Version_(ColdMP3.com).mp3",
  },

  {
    img: "src/image/the_kids_aren´t_alright.png",
    name: "The Kids Aren´t Alright",
    artist: "The Offspring",
    music:
      "src/music/The_Offspring_-_The_Kids_Aren_t_Alright_(ColdMP3.com).mp3",
  },

{
  img: "src/image/iron_man.png",
  name: "Iron Man",
  artist: "Black Sabbath",
  music: "src/music/Black_Sabbath_-_Iron_Man_(ColdMP3.com).mp3",
},

  {
    img: "src/image/eye_of_the_tiger.png",
    name: "Eye of the Tiger",
    artist: "Survivor",
    music:
      "src/music/Survivor_-_Eye_of_the_Tiger_(ColdMP3.com).mp3",
  },

  {
    img: "src/image/carry_on_wayward_son.png",
    name: "Carry on Wayward Son",
    artist: "Kansas",
    music:
      "src/music/Kansas_-_Carry_On_Wayward_Son_(ColdMP3.com).mp3",
  },

  {
    img: "src/image/tornado_of_souls.png",
    name: "Tornado Of Souls",
    artist: "Megadeth",
    music:
      "src/music/Megadeth_-_Tornado_Of_Souls_(ColdMP3.com).mp3",
  },

  {
    img: "src/image/house_of_the_rising_sun.png",
    name: "The house of rising sun",
    artist: "The Animals",
    music:
      "src/music/The_Animals_-_The_House_of_the_Rising_Sun_(ColdMP3.com).mp3",
  },

];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  now_playing.textContent =
    "Tocando Musica " + (track_index + 1) + " de " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function random_bg_color() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];
  let a;

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let Color1 = populate("#");
  let Color2 = populate("#");
  var angle = "to right";

  let gradient =
    "linear-gradient(" + angle + "," + Color1 + ", " + Color2 + ")";
  document.body.style.background = gradient;
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
