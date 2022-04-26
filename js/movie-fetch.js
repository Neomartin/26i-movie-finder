const URL_API_KEY = `api_key=f7da3dc6288c269c60ef7c5ed3c3767c`; 
const BASE_URL = 'https://api.themoviedb.org/3';

let movies = [];
const movieListContainer = document.getElementById('movies-list')
const launcher = document.getElementById('launcher')
const modal = document.getElementById('exampleModal')
var myModal = new bootstrap.Modal(modal)

launcher.addEventListener('click', () => myModal.toggle(modal))
console.time()

function getTopRatedMovies() {
    fetch(`${BASE_URL}/movie/top_rated?${URL_API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            movies = data.results;
            console.log(data)
            // swal("Good job!", "You clicked the button!", "success");
            renderMovies(movies);
        })
    .catch((error) => {
        console.error(`ERROR AL OBTENER PELICULAS`, error)
    })
}

getTopRatedMovies();

function renderMovies(movies) {
    movieListContainer.innerHTML = '';
    const movieImg = "https://www.themoviedb.org/t/p/w1280_and_h720_multi_faces"
    movies.forEach(movie => {
        movieListContainer.innerHTML += `<div class="col-4 d-flex">
                <div class="card ">
                <img src="${movieImg + movie.backdrop_path}" class="card-img-top" alt="..." loading='lazy'>
                <div class="card-body text-dark">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <p class="text-black-50 mb-1">RATE: ${movie.vote_average}</p>
                    <p class="small mb-1">${movie.id}</p>
                    <p class="text-primary mb-1">Release date: ${movie.release_date}</p>
                </div>
                </div>
            </div>`
    })
}

//Aprieto el botón buscar entonces ejecuto la función buscar películas
//Tengo obtener la referencia al elemento input
const searchInputHTML = document.getElementById('search-movie')
//Tengo que acceder al valor del mismo
function searchMovie(e) {
    e.preventDefault()
    const queryInput = searchInputHTML.value;
    if(queryInput.lenght <= 3) return;

    fetch(`${BASE_URL}/search/movie?${URL_API_KEY}&query=${queryInput}`)
        .then(res => res.json())
        .then(moviesFromAPI => {
            const newMovies = moviesFromAPI.results;
            renderMovies(newMovies)
        });
}

searchInputHTML.addEventListener('keyup', (event)=> {
    if(event.target.value === '') getTopRatedMovies()
})