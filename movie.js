
  function searchMovies() {
    const apiKey = 'dd3fb3bb';
    const searchInput = document.getElementById('searchInput').value;

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`).then(response => 
    response.json()).then(data => displayMovies(data.Search)).catch(error =>
         console.error('Error:', error));
  }

  function displayMovies(movies) {
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = '';

    movies.forEach(movie => {
      const movieCard = ` <div class="col-md-4  mb-3 ">
          <div class="card">
            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body">
              <h5 class="card-title">${movie.Title}</h5>
              <p class="card-text">${movie.Year}</p>
              <button style="background-color: black;color: white;width: 80px;height: 40px;border-radius:10px" onclick="showMovieDetails('${movie.imdbID}')">Details</button>
            </div>
          </div>
        </div>  `;
      moviesList.innerHTML += movieCard;
    });
  }

  function showMovieDetails(imdbID) {
    const apiKey = 'dd3fb3bb';

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`).then(response =>
     response.json()).then(data => {
        const modalTitle = document.getElementById('movieModalTitle');
        const modalBody = document.getElementById('movieModalBody');
        modalTitle.innerText = data.Title;
        modalBody.innerHTML = `
          <p>${data.Plot}</p>
          <p><strong>Type:</strong> ${data.Type}</p>
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>Released:</strong> ${data.Released}</p>
          <p><strong>Runtime:</strong> ${data.Runtime}</p>
          <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
        `;

        $('#movieModal').modal('show');
      })
      .catch(error => console.error('Error:', error));
  }
