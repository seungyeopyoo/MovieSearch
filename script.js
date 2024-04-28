const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjlhNTY1Y2UxYzE1ZWYzZTBhNDcwYjBmZThmODE2MiIsInN1YiI6IjY2Mjc5MWFkMTc2YTk0MDE2NjgxOGI3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7dmEPc0PwMPRjUO3CM-qULCkfT2jzS-6jfaZmI2SYZs",
  },
};

// 영화 검색 필터
document.getElementById("searchBtn").addEventListener("click", function() {
  SearchMovie();
});

function SearchMovie() {
  let input = document.getElementById("inputbox").value.toUpperCase();
  let movieCards = Array.from(document.querySelectorAll(".Movie_card"));

  movieCards
    .map(function(card) {
      return {
        card: card,
        title: card.querySelector('.card-title').innerHTML.toUpperCase()
      };
    })
    .forEach(function(movie) {
      if (movie.title.includes(input)) {
        movie.card.style.display = "block";
      } else {
        movie.card.style.display = "none";
      }
    });
}


let poster_url = "";
let image_size = "";

// TMDB 영화 API 가져와서 영화 카드 생성하기
function getMovies() {
    fetch("https://api.themoviedb.org/3/configuration", options)
      .then((response) => response.json())
      .then((response) => {
        poster_url = response["images"]["base_url"];
        image_size = response["images"]["poster_sizes"][3];
        return fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options);
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response); //내부정보 확인
        let results = response["results"];
        results.forEach((result) => {
          appendCard(result);
        });
      })
      .catch((err) => console.error(err));
  }

// 영화카드 생성
function appendCard(result) {
    let poster_path = poster_url + image_size + result["poster_path"];
    let overview = result["overview"];
    let vote_average = result["vote_average"];
    let title = result["title"];
    let id = result["id"];
    let temp_html = `
   <img src="${poster_path}" class="card-img" alt="...">
   <h2 class="card-title">${title}</h2>
   <p class="card-overview">${overview}</p>
   <h4>Rating : ${vote_average}</h4>`;
  
    const div = document.createElement("div"); 
    div.innerHTML = temp_html;
    div.className = "Movie_card";
    div.id = id;
    div.onclick = movieClicked; //카드 온클릭시 이벤트 실행
    document.querySelector("main").appendChild(div); // main에 하위요소로 Child(div) 추가
  }

// 카드 클릭시 id alert
function movieClicked() {
  alert(`id : ${this.id}`);
}
getMovies(); // 페이지 로드 될때 영화가져오기