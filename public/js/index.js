(function(ENV, Counter) {
  const client_id = ENV.client_id;
  var playButton = document.getElementById('play-button');
  var pauseButton = document.getElementById('pause-button');
  var nextButton = document.getElementById('next-button');
  var stopButton = document.getElementById('stop-button');
  var titleBox = document.getElementById('title');
  var descriptionBox = document.getElementById('description');
  var genreBox = document.getElementById('genre');
  var releaseDateBox = document.getElementById('releaseDate');
  var artworkBox = document.getElementById('artwork');
  var trackInput = document.getElementById('track-input');
  var submitButton = document.getElementById('submit-button')

  let searchResults = trackInput.value;

  SC.initialize({
    client_id: client_id
  });
  function searchBar(){
    q = searchResults;
  }
  submitButton.addEventListener('click', searchBar)

  SC.get('/tracks', {
    q: null
  }).then(function(tracks) {

    var counter = new Counter(tracks.length)
    let currentTrack = tracks[counter.value];

    function nextSong() {
      let currentTrack = tracks[counter.value];
      SC.stream('/tracks/' + currentTrack.id).then(function(player) {
        player.play();
        let title = currentTrack.title || '¯\\_(ツ)_/¯'
        let description = currentTrack.description || '¯\\_(ツ)_/¯'
        let genre = currentTrack.genre || '¯\\_(ツ)_/¯'
        let releaseDate = currentTrack.release_year || "¯\\_(ツ)_/¯"
        let artwork = currentTrack.artwork_url || '¯\\_(ツ)_/¯'
        let titleLink = currentTrack.permalink_url || '¯\\_(ツ)_/¯'
        let artistLink = currentTrack.user.permalink_url || '¯\\_(ツ)_/¯'

        function playSong() {
          player.play();
        }

        function pauseSong() {
          player.pause();
        }

        function stopSong() {
          player.pause();
          player.seek(0);
        }

        titleBox.innerText = 'TITLE: ' + title;
        titleBox.setAttribute("href", titleLink);
        descriptionBox.innerText = 'DESCRIPTION: ' + description;
        genreBox.innerText = 'GENRE: ' + genre;
        releaseDateBox.innerText = 'RELEASE DATE: ' + releaseDate;
        artworkBox.src = artwork;
        descriptionBox.setAttribute("href", artistLink);

        playButton.addEventListener('click', playSong);
        pauseButton.addEventListener('click', pauseSong);
        nextButton.addEventListener('click', nextSong);
        stopButton.addEventListener('click', stopSong);

        tracks[counter.up()];

      });
    }
    nextSong();
    nextButton.addEventListener('click', nextSong);
  });
})(ENV, Counter);
