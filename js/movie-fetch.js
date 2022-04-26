const KEY = `f7da3dc6288c269c60ef7c5ed3c3767c`;
const URL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=f7da3dc6288c269c60ef7c5ed3c3767c';
let movies = [];
const movieListContainer = document.getElementById('movies-list')
const launcher = document.getElementById('launcher')
const modal = document.getElementById('exampleModal')
var myModal = new bootstrap.Modal(modal)

launcher.addEventListener('click', () => myModal.toggle(modal))
console.time()

function getTopRatedMovies() {

    fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            movies = data.results;
            console.log(movies)
            swal("Good job!", "You clicked the button!", "success");
            renderMovies(movies);
        })
    // .catch((error) => {
    //     console.log(`ERROR AL OBTENER PELICULAS`, error)
    // })
}

getTopRatedMovies();

function renderMovies(movies) {
    movieListContainer.innerHTML = '';
    const movieImg = "https://www.themoviedb.org/t/p/w1280_and_h720_multi_faces"
    movies.forEach(movie => {
        movieListContainer.innerHTML += `<div class="col-4 d-flex">
                <div class="card ">
                <img src="${movieImg + movie.backdrop_path}" class="card-img-top" alt="...">
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

fetch(`https://api.themoviedb.org/3/movie/680/images?api_key=f7da3dc6288c269c60ef7c5ed3c3767c`)
    .then(r => r.json())
    .then(images => console.log(images))