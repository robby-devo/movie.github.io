const api_url =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3379e2e0994553fc1d0d3c5fac2bfca1&page=1";

// page=1 this will give first 30results

const img_path = "https://image.tmdb.org/t/p/w1280";

const search_url =
  'https://api.themoviedb.org/3/search/movie?api_key=3379e2e0994553fc1d0d3c5fac2bfca1&query=""';

const form = document.getElementById("form");

const search = document.getElementById("search");

const main = document.getElementById("main");

//   get initial movies
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  //   console.log(movies);this is giving us an array of results
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");

    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      
      
      
        <img
          src="${img_path + poster_path}"
          alt="${title}"
        /> -->
     <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
          <h3>Overview</h3>
         ${overview}
        </div>
        `;

    main.appendChild(movieEl);
    console.log();
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

getMovies(api_url);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  // if searchterm exist or is equal to nothing
  if (searchTerm && searchTerm !== "") {
    getMovies(search_url + searchTerm);

    searchTerm.value = "";
  } else {
    window.location.reload();
  }
});
