const API_URL='https://api.themoviedb.org/3/movie/popular?api_key=fb5c2ac1b917da0a3b097626bd02708b';
const IMAGE_PATH='https://image.tmdb.org/t/p/w1280/';
const SEARCH_URL='https://api.themoviedb.org/3/search/movie?api_key=fb5c2ac1b917da0a3b097626bd02708b&query=';
const form=document.getElementById('form')
const search=document.getElementById('search')
const main=document.getElementById('movie_temp')
// Get Movies
getMovies(API_URL)
async function getMovies (url){ 
const res= await fetch(url)
const data=await res.json()
showmovie(data.results)
console.log(data.results)
}
function showmovie(movies){
    main.innerHTML =''
    movies.forEach((movie)=>{
        const {title, poster_path, vote_average, overview}=movie;
        const moviesElement=document.createElement('div') ;
        moviesElement.classList.add('movie_name');
        moviesElement.innerHTML=`
        <img src="${IMAGE_PATH+poster_path}" alt="${title}" />
        <div class='movie_info'>
            <h3 class='Movie_title'>${title}</h3>
            <div class='rating ${GiveRating(vote_average)}'>
                <a>IMDB :</a>
                <span> ${vote_average}</span>
            </div>
            <div class='summary'> 
                <div class='Overview'>
                    <h3>Overview</h3>
                    <p>${overview}</p>
                </div>
            </div>
        </div>
        `;
        main.appendChild(moviesElement)
        })
}
function GiveRating(rating){
    if(rating<4)return 'red';
    else if(rating<7) return 'yellow';
    else return 'green';
}
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let searchValue=search.value
    if(searchValue && searchValue !==''){ 
    getMovies (SEARCH_URL+searchValue)
    searchValue=''
    }
    else{
        window.location.reload();
    }
})