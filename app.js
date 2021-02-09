// const inputSongs = () => {
//     const searchField = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchField}`;
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displaySongs(data.data))
// }


//applyingAsync
const inputSongs = async () => {
    const searchField = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchField}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displaySongs(data.data);
    }
    catch (error) {
        //displayError(error);
        displayError("SomeThing went wrong please try again later")
    }

}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerText = '';
    songs.forEach(song => {
        // console.log(songs);
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="displayLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songContainer.appendChild(songDiv);
    });
}

// const displayLyrics = (artist, title) => {

//     fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
//         .then(res => res.json())
//         .then(data => showLyrics(data.lyrics))
//         .catch(error => displayError("Something went wrong please try again later"))
// }


//using async and await
const displayLyrics = async (artist, title) => {
    try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        const data = await response.json();
        showLyrics(data.lyrics)
    }
    catch(error)
    {
        displayError("Something went wrong please try again later");
    }
}

const showLyrics = (data) => {
    const showLyrics = document.getElementById('lyrics');
    showLyrics.innerText = (data);
    const songContainer = document.getElementById('song-container');
    songContainer.style.display = 'none';
}

const displayError = error => {
    const errorTag = document.getElementById('error-handle');
    errorTag.innerText = error;
}