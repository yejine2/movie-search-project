import './scss/main.scss';

const searchBtn = document.querySelector('.search-btn');
const movieList = document.querySelector('#movie');
const searchInput = document.querySelector('.search-input');
const moreBtn = document.querySelector('.more-button');
const toTopBtn = document.querySelector('#to-top');

const API_KEY = '7035c60c';
const NO_POSTER = './images/no-poster.png';
let page = 1;

// 검색 버튼 클릭 이벤트
searchBtn.addEventListener('click', async () => {
  let page = 1;
  const data = await getMovieList(searchInput.value.trim(), page);
  const movies = data.Search;
  renderMovies(movies);
});

// Enter키 검색
searchInput.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const data = await getMovieList(searchInput.value.trim(), page);
    const movies = data.Search;
    renderMovies(movies);
  }
});

// 영화 정보 가져오기
async function getMovieList(title, page) {
  let res = await fetch(
    `https://www.omdbapi.com?apikey=${API_KEY}&s=${title}&page=${page}`
  );
  res = await res.json();
  return res;
}

// 영화 정보 화면 출력
function renderMovies(movies) {
  let html = '';
  if (movies) {
    movies.forEach((movie) => {
      html += `<div class="movie-item">
                <div class = "movie-img">
                  <img src = ${
                    movie.Poster != 'N/A' ? movie.Poster : NO_POSTER
                  } alt = "movie">
                </div>
                  <div class = "movie-info">
                  <span class="movie-year">${movie.Year}</span>
                  <h3 class="movie-title">${movie.Title}</h3>
                  </div>
                </div>
              </div>
              `;
    });
    movieList.classList.remove('notFound');
    moreBtn.style.display = 'block';
    toTopBtn.style.display = 'block';
  } else {
    html = "Sorry, we didn't find any movie!";
    movieList.classList.add('notFound');
    moreBtn.style.display = 'none';
    toTopBtn.style.display = 'none';
  }
  movieList.innerHTML = html;
}

// 더보기 버튼
moreBtn.addEventListener('click', async () => {
  let html = '';
  page += 1;

  const data = await getMovieList(searchInput.value.trim(), page);
  const movies = data.Search;
  movies.forEach((movie) => {
    const movieItems = document.createElement('div');
    movieItems.classList.add('movie-item');
    html = `<div class = "movie-img">
                <img src = ${
                  movie.Poster != 'N/A' ? movie.Poster : NO_POSTER
                } alt = "movie">
              </div>
                <div class = "movie-info">
                <span class="movie-year">${movie.Year}</span>
                <h3 class="movie-title">${movie.Title}</h3>
                </div>
            `;
    movieItems.innerHTML = html;
    movieList.append(movieItems);
  });
});

// 페이지 상단 이동 버튼
toTopBtn.addEventListener('click', () => {
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});
