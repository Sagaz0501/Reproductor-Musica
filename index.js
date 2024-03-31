const image = document.querySelector("img");
const titulo = document.getElementById("titulo");
const artista = document.getElementById("artista");

const progressContainer = document.getElementById("progressBar");
const  progress = document.getElementById("progress");

const tiempoActual = document.getElementById("tiempoActual");
const duracion = document.getElementById("tiempoDuracion");

const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");


// playlist//

const songs = [
    {
        name: 'song1',
        displayName: 'Planet Earth',
        artista: 'JeremMusic70'
    },
    {
        name: 'song2',
        displayName: 'SuspensefulMoon',
        artista: 'Sagaz'
    },
    {
        name: 'song3',
        displayName: 'Moonlight Sonata',
        artista: 'TimKuling'
    },
]

//para verificar si la musica se esta reproduciendo//
let isPlaying = false;
//function PlaY//
function playSong(){
    isPlaying = true;
    playBtn.setAttribute('name', 'pause');
    playBtn.setAttribute('titulo', 'pasue');
    music.play();
}
//function pause//
function pauseSong(){
    isPlaying = false;
    playBtn.setAttribute('name', 'play');
    playBtn.setAttribute('titulo', 'play');
    music.pause();
}
//Al hacer click en el boton play activa las fuciones de pause o play, dependiendo si esta activo o no//
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()))

//funcion leer cancion//
function loadSong(song){
    titulo.textContent = song.displayName;
    artista.textContent = song.artista;
    music.src = `./musica/${song.name}.mp3`;
    image.src = `./imagenes/${song.name}.jpg`;
}

// Cancion Actual//
let songIndex = 0;

// Anterior Cancion//

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.lenght - 1;
    }
    loadSong(songs[songIndex])
    playSong()
}
//siguente CAncion//
function nextSong(){
    songIndex++;
    if(songIndex > songs.lenght - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Al cargar las canciones, se leera la primera cancion//
loadSong(songs[songIndex]);

//actualixar la barra de progreso//
function updateProgressBar(e){
    if(isPlaying){
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100; //Actualiza la barra de progreso
        progress.style.width = `${progressPercent}%`; // Esta Linea cambua la propiedad css de progress
        const durationMinutes = Math.floor(duration / 60); // Clacula la duracion total en minutos
        let durationSeconds = Math.floor(duration % 60);

        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }
        if(durationSeconds){
            duracion.textContent = `${durationMinutes} : ${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60); //calcula la duracion total del recorrudo de la cancion
        let currentSeconds = Math.floor(currentTime % 60);

        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`
        }

        if(currentSeconds){
            tiempoActual.textContent = `${currentMinutes} : ${currentSeconds}`
        }
    }
}
//mostrar la barra de progreso//
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
