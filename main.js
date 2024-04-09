// Select all the elements in the HTML page
// and assign them to a variable
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

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
    {
        name: "Rotton To The Core",
        artist: "Descendants 1",
        image: "https://i.pinimg.com/736x/0c/3d/b1/0c3db16c3dddba5a4796d82cc3ed6002.jpg",
        path: "rotton.mp3",
    },
    {
        name: "Evil Like Me",
        artist: "Descendants 1",
        image: "https://i1.sndcdn.com/artworks-000141749073-z49txh-t500x500.jpg",
        path: "evilLike.mp3",
    },
    {
        name: "Did I Mention",
        artist: "Descendants 1",
        image: "1.JPG",
        path: "mention.mp3",
    },
    {
        name: "If Only",
        artist: "Descendants 1",
        image: "https://upload.wikimedia.org/wikipedia/en/d/d1/Dove_Cameron_-_If_Only.jpg",
        path: "only.mp3",
    },
    {
        name: "Be Our Guest",
        artist: "Descendants 1",
        image: "https://c.saavncdn.com/429/Descendants-Original-TV-Movie-Soundtrack-English-2015-500x500.jpg",
        path: "guest.mp3",
    },
    {
        name: "Set It Off",
        artist: "Descendants 1",
        image: "https://cdnimg.spectrum.net/imageserver/program/SH022380750000?sourceType=colorHybrid&twccategory=Poster&width=257",
        path: "setoff.mp3",
    },
    {
        name: "Ways To Be Wicked",
        artist: "Descendants 2",
        image: "https://m.media-amazon.com/images/M/MV5BN2ZjODkzZDktNWYxMC00NzI4LTg0NTEtYmUyZjg4YWY5NTI0XkEyXkFqcGdeQXVyMjAzMjcxNTE@._V1_.jpg",
        path: "wicked.mp3",
    },
    {
        name: "What's My Name",
        artist: "Descendants 2",
        image: "https://i.scdn.co/image/ab67616d0000b273d8a334a6a24255ec3b63ddd3",
        path: "name.mp3",
    },
    {
        name: "Chilln' Like A Villain",
        artist: "Descendants 2",
        image: "https://ih1.redbubble.net/image.1058906179.4242/flat,750x1000,075,f.jpg",
        path: "villain.mp3",
    },
    {
        name: "Space Between",
        artist: "Descendants 2",
        image: "2.JPG",
        path: "space.mp3",
    },
    {
        name: "It's Goin' Down",
        artist: "Descendants 2",
        image: "https://i.ytimg.com/vi/x-crY3_Y0Eo/hqdefault.jpg",
        path: "down.mp3",
    },
    {
        name: "You And Me",
        artist: "Descendants 2",
        image: "https://c-cl.cdn.smule.com/rs-s80/arr/9a/35/8633b7bb-f2cc-409e-8c23-ac886e6edd04.jpg",
        path: "youme.mp3",
    },
    {
        name: "Good To Be Bad",
        artist: "Descendants 3",
        image: "6.JPG",
        path: "good.mp3",
    },
    {
        name: "Queen Of Mean",
        artist: "Descendants 3",
        image: "3.JPG",
        path: "queen.mp3",
    },
    {
        name: "Do What You Gotta Do",
        artist: "Descendants 3",
        image: "4.JPG",
        path: "gotta.mp3",
    },
    {
        name: "Night Falls",
        artist: "Descendants 3",
        image: "5.JPG",
        path: "night.mp3",
    },
    {
        name: "One Kiss",
        artist: "Descendants 3",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIJZ-EaiKm4tN8OqlPuYGLOEV5cEFn9LMZ6ySPQma3xVLHnX4Whc6__zdRO-wKJY2zAmM&usqp=CAU",
        path: "kiss.mp3",
    },
    {
        name: "My Once Upon A Time",
        artist: "Descendants 3",
        image: "https://pbs.twimg.com/media/EYT9p6KXkAA-m29.jpg",
        path: "once.mp3",
    },
    {
        name: "Break This Down",
        artist: "Descendants 3",
        image: "https://m.media-amazon.com/images/M/MV5BYjM2NzY5ZTMtNDNlOS00MmQ3LThlN2YtMjg1NzY0MmJiOTlhXkEyXkFqcGdeQXVyNzY1Njc4ODI@._V1_.jpg",
        path: "tdown.mp3",
    },

];

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
    
    // Apply a random background color
    random_bg_color();
    }
    
    function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    // Construct a color withe the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    // Set the background to the new color
    document.body.style.background = bgColor;
    }
    
    // Function to reset all values to their default
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }

    function playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        // Play the loaded track
        curr_track.play();
        isPlaying = true;
        
        // Replace icon with the pause icon
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        // Pause the loaded track
        curr_track.pause();
        isPlaying = false;
        
        // Replace icon with the play icon
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
        }
        
        function nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        // Go back to the last track if the
        // current one is the first in the track list
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }

        function seekTo() {
            // Calculate the seek position by the
            // percentage of the seek slider
            // and get the relative duration to the track
            seekto = curr_track.duration * (seek_slider.value / 100);
            
            // Set the current track position to the calculated seek position
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {
            // Set the volume according to the
            // percentage of the volume slider set
            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            
            // Check if the current track duration is a legible number
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                // Calculate the time left and the total duration
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                // Add a zero to the single digit time values
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                // Display the updated duration
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }

            // Load the first track in the tracklist
loadTrack(track_index);
