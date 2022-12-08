const APP = {
  KEY: "d1a21373ff4a38d759b3e1fdd4b4c09f",
  CatImg: "https://placekitten.com/g/500/750",
  selectCategories: "",
  inputvalue: "",
  ul: document.querySelector("#ulInfo"),
  containerDiv: document.querySelector("#containerDiv"),
  df: new DocumentFragment(),
  init: {
    movie: document.querySelector("#movie"),
    tvShows: document.querySelector("#tvShows"),
    btn: document.querySelector("#searchsubmit"),
    main() {
      APP.addListener();
    },
  },
  addListener: function () {
    APP.init["movie"].addEventListener("click", APP.checkev);
    APP.init["tvShows"].addEventListener("click", APP.checkev);
    APP.init["btn"].addEventListener("click", APP.getInputValue);
  },
  checkev: function (ev) {
    let categories = ev.target.getAttribute("value");
    if (categories === movie) {
      console(categories);
      APP.selectCategories = categories;
    } else {
      APP.selectCategories = categories;
    }
    console.log(`---${APP.selectCategories}---`, "checkev function is working");
  },
  getInputValue: function () {
    let inputElement = document.getElementById("keysssb").value.trim();
    if (inputElement === "") {
      console.log("error");
    } else {
      APP.inputvalue = inputElement;
      console.log(APP.inputvalue);
      APP.getData();
    }
    console.log("btn is working");
  },
  getData: function () {
    if (APP.selectCategories && APP.inputvalue) {
      APP["ul"].innerHTML = ``;
      let url = `https://api.themoviedb.org/3/search/${APP.selectCategories}?query=${APP.inputvalue}&api_key=${APP.KEY}`;
      console.log(url);
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            console.log("no response");
          }
          return response;
        })
        .then((response) => response.json())
        .then((obj) => {
          switch (APP.selectCategories) {
            case "movie":
              APP.creatInnerHtmlTv(obj);
              console.log("movie witch is working");
              break;
            case "tv":
              APP.creatInnerHtmlMovie(obj);
              console.log("tv switch is working");
              break;
          }

          APP["ul"].append(APP["df"]);
        });
    }
  },
  creatInnerHtmlMovie: function (obj) {
    console.log(obj);
    console.log(obj["results"]);
    let newResult = obj["results"].slice(1, obj["results"].length);
    containerDiv.innerHTML = `
    <div class="banner_img">
      <div>
        <img src='http://image.tmdb.org/t/p/w500/${obj["results"][0].poster_path}'>
      </div>
    <div>    
        <h3>${obj["results"][0].original_name}</h3>
        <p>${obj["results"][0].overview}</p>
        </div>
    </div>
    `;
    newResult.forEach((item) => {
      const li = document.createElement("li");
      if (item.poster_path === null) {
        li.innerHTML = `
        <div class="thecard">
          <div class="thefront">
            <img src='${APP.CatImg}'>
          </div>
          <div class="theback">
            <h3>${item.original_name}</h3>
            <p>${item.overview}</p>
          </div>
        </div>
        `;
      } else {
        li.innerHTML = `
        <div>
        <img src='http://image.tmdb.org/t/p/w500/${item.poster_path}'>
        <h3>${item.original_name}</h3>
        <p>${item.overview}</p>
        </div>
        `;
      }
      APP.bannerImg(obj);
      APP["df"].append(li);
    });
  },
  creatInnerHtmlTv: function (obj) {
    console.log(obj);
    console.log(obj["results"]);
    let newResult = obj["results"].slice(1, obj["results"].length);
    containerDiv.innerHTML = `
    <div class="banner_img">
        <div><img class="img_split" src='http://image.tmdb.org/t/p/w500/${obj["results"][0].poster_path}'></div>

    <div>    
        <h3>${obj["results"][0].original_title}</h3>
        <p>${obj["results"][0].overview}</p>
        </div>
    </div>
    `;
    newResult.forEach((item) => {
      const li = document.createElement("li");
      if (item.poster_path === null) {
        li.innerHTML = `
        <div class="thecard">
          <div class="thefront">
            <img src='${APP.CatImg}'>
          </div>
        <div class="theback">
          <h3>${item.original_title}</h3>
          <p>${item.overview}</p></div>
        </div>
        `;
      } else {
        li.innerHTML = `
        <div class="thecard">
          <div class="thefront">
            <img src='http://image.tmdb.org/t/p/w500/${item.poster_path}'>
          </div>
        <div class="theback">
          <h3>${item.original_title}</h3>
          <p>${item.overview}</p></div>
        </div>
        `;
      }
      APP.bannerImg(obj);
      APP["df"].append(li);
    });
  },
  bannerImg: function (obj) {
    let banner = document.querySelector(".banner");
    banner.setAttribute(
      `style`,
      `background-image: url(http://image.tmdb.org/t/p/original/${obj["results"][0].backdrop_path});background-repeat:no-repeat;background-size: cover;`
    );
  },
};

document.addEventListener("DOMContentLoaded", APP.init.main);
console.log(APP.init);
