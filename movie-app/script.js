const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getClassByRate = (vote) => {
  if (vote > 8) {
    return "great";
  } else if (vote > 7) {
    return "good";
  } else if (vote > 7) {
    return "mid";
  } else {
    return "bad";
  }
};

const showMovies = (movies) => {
  //clear main
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movieEl = document.createElement("div");

    movieEl.classList.add("movie");

    movieEl.innerHTML = `

        <div class="">
            <img src="${IMGPATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                  vote_average
                )}">${vote_average}</span>
            </div>
        </div>
        <div class="overview">
          <h3>Overview:</h3>
          ${overview}
        </div>
    `;

    main.appendChild(movieEl);
  });
};
const getMovies = async (url) => {
  const resp = await fetch(url);
  const respData = await resp.json();

  if (respData.results.length === 0) return;

    showMovies(respData.results);

  
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);

    search.value = "";
  }
});

getMovies(APIURL);
