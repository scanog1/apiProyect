
// Selectores
const showGrid = document.getElementById("showGrid");
const showName = document.getElementById('search');
const searchButton = document.querySelector('.search__button');
const searchForm = document.getElementById('searchForm');
const movieGrid = document.getElementById('showGridMovie');
const movieButton = document.querySelector('.search__buttonMovie');
const movieForm = document.getElementById('searchFormMovie');
const movieInput = document.getElementById('searchMovie');

// Creación de los contenedores de películas
const createCard = (show) => {
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("showInfo");

    const card = document.createElement("div");
    card.classList.add("showCard");

    const name = document.createElement("h3");
    name.classList.add("showName");
    name.textContent = show.name;


    const infopShow = document.createElement("p");
    infopShow.classList.add("infopShow");
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = show.summary;
    infopShow.innerText = tempDiv.innerText;
    card.appendChild(infopShow);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("showImageContainer");

    const image = document.createElement("img");
    imageContainer.appendChild(name);
    image.classList.add("showImage");
    image.src = show.image ? show.image.medium : 'placeholder.jpg';
    image.alt = show.name;


    imageContainer.appendChild(image);
    card.appendChild(imageContainer);
    infoDiv.appendChild(card);

    return card;
};
const createCardMovie = (movie) => {
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("showInfo");

    const card = document.createElement("div");
    card.classList.add("showCard");

    const name = document.createElement("h3");
    name.classList.add("showName");
    name.textContent = movie.Title;

    const infopMovie = document.createElement("p");
    infopMovie.classList.add("infopShow");
    infopMovie.innerText = movie.Plot || 'No plot available.';
    card.appendChild(infopMovie);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("showImageContainer");

    const image = document.createElement("img");
    imageContainer.appendChild(name);
    image.classList.add("showImage");
    image.src = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg';
    image.alt = movie.Title;

    imageContainer.appendChild(image);
    card.appendChild(imageContainer);
    infoDiv.appendChild(card);

    return card;
};


// Función para cargar los shows
const loadShows = async (query) => {
    try {
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
        const shows = response.data.slice(0, 10); 
        showGrid.innerHTML = '';

        for (const show of shows) {
            const showCard = createCard(show.show); 
            showGrid.appendChild(showCard);
        }
    } catch (error) {
        console.log("Error fetch:", error);
    }
};

// Función para cargar las películas
const loadMovies = async (query) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=b3a8f27a`);


        if (response.data.Response === "True") {
            const movies = response.data.Search.slice(0, 10);
            console.log(movies);
            movieGrid.innerHTML = '';

            for (const movie of movies) {
                const showCard = createCardMovie(movie);
                movieGrid.appendChild(showCard);
            }
        } else {
            console.log("No movies found for the given query.");
        }
    } catch (error) {
        console.log("Error fetching data:", error);
    }
};

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    loadShows('marvel');
    loadMovies('Harry');

});
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = showName.value.trim();
    if (query) {
        loadShows(query);
    }
});

movieForm.addEventListener('submit',(e)=>{
e.preventDefault();
const query = movieInput.value.trim();
if(query){
    loadMovies(query);
}
});

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const query = showName.value.trim();
    if (query) {
        loadShows(query);
    }
});
movieButton.addEventListener('click', (e)=> {
    e.preventDefault();
    const query = movieInput.value.trim();
    if(query){
        loadMovies(query);
    }
});







