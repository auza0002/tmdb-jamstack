const APP = {
  banner: document.querySelector(".banner"),
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
      APP.activeBtn(categories);
      APP.selectCategories = categories;
    } else {
      APP.activeBtn(categories);
      APP.selectCategories = categories;
    }
  },
  getInputValue: function () {
    let inputElement = document.getElementById("keysssb").value.trim();
    if (inputElement === "") {
    } else {
      APP.inputvalue = inputElement;
      APP.getData();
    }
  },
  getData: function () {
    if (APP.selectCategories && APP.inputvalue) {
      APP["ul"].innerHTML = ``;
      let url = `https://api.themoviedb.org/3/search/${APP.selectCategories}?query=${APP.inputvalue}&api_key=${APP.KEY}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            console.log("no response");
          }
          return response;
        })
        .then((response) => response.json())
        .then((obj) => {
          console.log(obj);
          if (obj.results.length === 0) {
            APP.bannerImg(null);
            APP.deletBanner(null);
            console.log("nada en results");
          } else {
            APP.deletBanner(true);
            switch (APP.selectCategories) {
              case "movie":
                console.log("movie selection");
                APP.creatInnerHtmlTv(obj);

                break;
              case "tv":
                console.log("tv selection");
                APP.creatInnerHtmlMovie(obj);

                break;
              default:
            }
          }
          APP["ul"].append(APP["df"]);
        });
    }
  },
  creatInnerHtmlMovie: function (obj) {
    let newResult = obj["results"].slice(1, obj["results"].length);
    containerDiv.innerHTML = ``;
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
  deletBanner: function (response) {
    if (response === null) {
      APP.containerDiv.setAttribute(`style`, `display: none;`);
    } else if (response === true) {
      APP.containerDiv.setAttribute(`style`, `display: block;`);
    }
  },
  creatInnerHtmlTv: function (obj) {
    let newResult = obj["results"].slice(1, obj["results"].length);
    containerDiv.innerHTML = ``;
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
    if (obj === null) {
      APP.banner.setAttribute(`style`, `background-image: none;`);
    } else {
      APP.banner.setAttribute(
        `style`,
        `background-image: url(http://image.tmdb.org/t/p/original/${obj["results"][0].backdrop_path});background-repeat:no-repeat;background-size: cover;`
      );
    }
  },
  activeBtn: function (value) {
    if (value == "movie") {
      APP.init["tvShows"].classList.remove("active");
      APP.init["movie"].classList.add("active");
    } else {
      APP.init["movie"].classList.remove("active");
      APP.init["tvShows"].classList.add("active");
    }
  },
};

document.addEventListener("DOMContentLoaded", APP.init.main);
