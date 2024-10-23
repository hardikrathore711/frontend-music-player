console.log("Welcome to Ridmm");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let shuffleButton = document.getElementById('shuffleButton');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let volume_slider = document.getElementById("volume_slider");


let songs = [
    {songName: "Unstoppable - Sia ", filePath: "songs/1.mp3", coverPath: "covers/1.webp"},
    {songName: "Sunflower - Spiderman into the Spiderverse", filePath: "songs/2.mp3", coverPath: "covers/2.webp"},
    {songName: "Blinding Lights - The Weeknd", filePath: "songs/3.mp3", coverPath: "covers/3.webp"},
    {songName: "Close - The Prophec", filePath: "songs/4.mp3", coverPath: "covers/4.webp"},
    {songName: "Baarishein - Anuv Jain", filePath: "songs/5.mp3", coverPath: "covers/5.webp"},
    {songName: "Hawa Banke - Darshan Raval", filePath: "songs/2.mp3", coverPath: "covers/6.webp"},
    {songName: "Excuses - AP Dhillon", filePath: "songs/2.mp3", coverPath: "covers/7.webp"},
    {songName: "Back to you - Selena Gomez", filePath: "songs/2.mp3", coverPath: "covers/8.webp"},
    {songName: "Kaala Jaadu - Arijit Singh (Freddy bgm)", filePath: "songs/2.mp3", coverPath: "covers/9.webp"},
    {songName: "Nakhre - Zack Knight", filePath: "songs/4.mp3", coverPath: "covers/10.webp"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        makeAllPlays();
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
shuffleButton.addEventListener('click', () => {
    
    songIndex = Math.floor(Math.random() * 10);
    makeAllPlays();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');


  });
  
window.addEventListener('keydown', (event) => {
    const keyName = event.code;

    if (keyName === 'Space') {
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            makeAllPlays();
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    }

})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    if(progress === 100)
    {
        if(songIndex>=9){
            songIndex = 0
        }
        else{
            songIndex += 1;
        }
        makeAllPlays();
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
volume_slider.addEventListener('change', ()=>{
    audioElement.volume = volume_slider.value / 100;
})

const makeAllPlays = ()=>{
    let jkl=0;
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        if(jkl === songIndex)
        {
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
        jkl=jkl+1;
        
    })
}
// const smallPlay = ()=>{
//     Array.from(document.getElementsByClassName('songItemPlay')).forEach((elemen)=>{
//         elemen = songIndex;
//         elemen.classList.remove('fa-play-circle');
//         elemen.classList.add('fa-pause-circle');
//         return;
//     })
// }
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        makeAllPlays();
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
// function setVolume() {
//     // Set the volume according to the
//     // percentage of the volume slider set
//     audioElement.volume = volume_slider.value / 100;
//   }