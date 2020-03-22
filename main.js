const BASE_URL = 'https://movie-list.alphacamp.io/'
const INDEX_URL = BASE_URL + 'api/v1/movies/'
const IMG_URL = BASE_URL + 'posters/'
let allMovieData = []
let gerneSelectedMovie = []

const movieList = document.querySelector('.list-group')
const movieCards = document.querySelector('.data-panel')
const movieTags = document.querySelector('.card-body')

const movieListData = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}
const movieTitleData = Object.values(movieListData)


showMovieList(movieTitleData)

movieList.addEventListener('click', event => {
  let results = []

  allMovieData.forEach(user => {
    if (user.genres.includes(Number(event.target.dataset.id))) {
      results.push(user)
    } else if ((Number(event.target.dataset.id)) === 0){
      results = allMovieData
    }else {
      movieCards.innerHTML = `
      <div class="no-movie">
        <p>There is no movie yet.</p>
      </div>
      `
    }
  })

  gerneSelectedMovie = results
  ListToClick(event.target)
  showMovieCards(gerneSelectedMovie)
})

axios.get(INDEX_URL)
.then(res => {
  const movieData = res.data.results
  allMovieData.push(...movieData)
  
  showMovieCards(movieData)
})
.catch(err => {
  console.log(err)
})

function ListToClick(listId){
  const listGroup = document.querySelectorAll('.list-group-item')
  listGroup.forEach(item => {
    if (item.matches('.active')) {
      item.classList.remove('active')
    }
  })
  listId.classList.add('active')
}

function showMovieList(data){
  let htmlContain = ''
  htmlContain += `<a href="#" class="list-group-item list-group-item-action active" data-id="0">All Movies</a>`
  data.forEach(function (title, index) {
    htmlContain += `
    <a href="#" class="list-group-item list-group-item-action" data-id="${index + 1}">${title}</a>
  `
  })
  movieList.innerHTML = htmlContain
}

function showMovieCards(data){
  let htmlContain = ''

  data.forEach(movie => {
    htmlContain += `
      <div class="col-auto mb-2" data-id="${movie.id}">
        <div class="card" style="width: 16rem;">
          <img src="${IMG_URL}${movie.image}" class="card-img-top" alt="...">
          <div class="card-body">
             <h5 class="card-title">${movie.title}</h5>
    `
    movie.genres.forEach(genre => {
      Object.keys(movieListData).forEach(key => {
        if (genre === Number(key)) {
          htmlContain += `
            <a href="#" class="btn btn-outline-secondary mr-1 mb-1">${movieListData[genre]}</a>
          `
        }
      })
    })
    htmlContain += `
          </div>
        </div>
      </div>
    `
    movieCards.innerHTML = htmlContain
  })
}


