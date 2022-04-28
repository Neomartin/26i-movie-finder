const URL_API_KEY = `api_key=f7da3dc6288c269c60ef7c5ed3c3767c`; 
const BASE_URL = 'https://api.themoviedb.org/3';

let movies = [];
const movieListContainer = document.getElementById('movies-list')
const launcher = document.getElementById('launcher')
const modal = document.getElementById('exampleModal');

var myModal = new bootstrap.Modal(modal);

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
    //Prevengo el comportamiento por defecto del submit en un formulario
    e.preventDefault()
    // Obtengo el valor actual del input
    
    //Realizo la petición a la API de MovieDB
    getMovieSearchAPI()
}

// Escuchó el evento keyup en el input y cuando sea una string vacía obtengo las películas mejor valoradas 
searchInputHTML.addEventListener('keyup', (event)=> {
    if(event.wich === 13) getMovieSearchAPI()
    if(event.target.value === '') getTopRatedMovies();
})

function getMovieSearchAPI() {
    const queryInput = searchInputHTML.value;
    //Cláusula guarda para evitar realizar búsquedas de películas cuando el texto colodado sea menor a 4 caractéres
    if(queryInput.lenght <= 3) return;
    fetch(`${BASE_URL}/search/movie?${URL_API_KEY}&query=${queryInput}`)
    .then(res => res.json())
    .then(moviesFromAPI => {
        myModal.toggle(modal)
        swal({
            title: "Películas obtenidas", 
            text: `Se obtuvieron correctamente un total de ${moviesFromAPI.total_results} películas`, 
            icon: 'info',
            timer: 2000,    
        })
        //Accedo a la respuesta de la API obtengo las películas
        const newMovies = moviesFromAPI.results;
        // Pinto las películas en el HTML
        renderMovies(newMovies)
    }).catch((error)=> {
        swal("Errror al cargar las películas", "No se pudieron obtener películas", "error")
    });
}

function register(event) {
    const el = event.target.elements;
    console.log(el)
    console.log(event)
    event.preventDefault();
    params = {
        from_name: 'neomartinr@gmail.com',
        userName:  el.userName.value,
        title: '<h1 style="color: blue">Bienvenido a RC School</h1>',
        message: `Su registro en la plataforma ha sido correcto, ahora deberá esperar a que su cuenta sea activada`,
        email: el.email.value,
        reply_to: `neomartinr@gmail.com`
    }
    emailjs.send('service_n81oy5x', 'template_gu1z1ad', params)
        .then((resp)=> swal("Subscripción correcta", "Se realizó correctamente la subscripción al servicio de notificaciones", "success"))
        .catch((error) => swal("Error", "No se pudo enviar el correo", "error"))
}