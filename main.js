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
    btn: document.querySelector("#searhform"),
    main() {
      APP.addListener();
    },
  },
  addListener: function () {
    APP.init["movie"].addEventListener("click", APP.checkev);
    APP.init["tvShows"].addEventListener("click", APP.checkev);
    APP.init["btn"].addEventListener("submit", APP.getInputValue);
    APP.toTop();
  },
  checkev: function (ev) {
    let categories = ev.target.getAttribute("value");
    if (categories === movie) {
      APP.activeBtn(categories);
      console.log(categories);
      APP.selectCategories = categories;
    } else {
      APP.activeBtn(categories);
      APP.selectCategories = categories;
      console.log(categories);
    }
  },
  getInputValue: function (ev) {
    ev.preventDefault();
    let inputElement = document.getElementById("keysssb").value.trim();
    console.log(inputElement);
    let inputval = document.getElementById("keysssb");
    inputval.value = ``;
    if (inputElement && APP.selectCategories) {
      APP.activeSelector(false);
      APP.inputvalue = inputElement;
      APP.getData();
    } else {
      APP.activeSelector(true);
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
          console.log(response);
          return response;
        })
        .then((response) => response.json())
        .then((obj) => {
          console.log("este es el obj despues de hacer el fecth", obj);
          APP.containerTitle(false);

          if (obj.results.length === 0) {
            APP.bannerImg(null);
            APP.deletBanner(null);
            APP.changeColorBlur(false);
            APP.containerTitle(false);
            APP.containerNoResults(true);
          } else {
            APP.containerNoResults(false);
            APP.deletBanner(true);
            APP.containerTitle(true);
            switch (APP.selectCategories) {
              case "movie":
                APP.creatInnerHtmlMovie(obj);
                break;
              case "tv":
                APP.creatInnerHtmlTv(obj);
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
    APP.changeColorBlur(true);
    if (obj["results"][0].poster_path === null) {
      containerDiv.innerHTML = `
    <div class="banner_img">
      <div class="banner_img_div">
        <img src='./png/noimage.png'>
      </div>
    <div class="banner_text">    
        <h2>${obj["results"][0].original_title}</h2>
        <p>${obj["results"][0].overview}</p>
        <a class="btn" href="https://api.themoviedb.org/3/movie/${obj["results"][0].id}/credits?api_key=${APP.KEY}">Learn more</a>
        </div>
    </div>
    `;
    } else {
      APP.bannerImg(obj);
      containerDiv.innerHTML = `
    <div class="banner_img">
      <div class="banner_img_div">
        <img src='http://image.tmdb.org/t/p/w500/${obj["results"][0].poster_path}'>
      </div>
    <div class="banner_text">    
        <h2>${obj["results"][0].original_title}</h2>
        <p>${obj["results"][0].overview}</p>
        <a class="btn" href="https://api.themoviedb.org/3/movie/${obj["results"][0].id}/credits?api_key=${APP.KEY}">Learn more</a>
        </div>
    </div>
    `;
    }
    newResult.forEach((item) => {
      const li = document.createElement("li");
      if (item.poster_path === null) {
        li.innerHTML = `
        <a href="https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${APP.KEY}">
          <div>
            <img src='./png/noimage.png'>
          </div>
          <div class="theback">
            <h3>${item.original_name}</h3>
            <p>${item.overview}</p>
          </div>
        </div>
        </a>
        `;
      } else {
        li.innerHTML = `
        <a href="https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${APP.KEY}">
          <div>
          <img src='http://image.tmdb.org/t/p/w500/${item.poster_path}'>
          </div>
          <div>
          <h3>${item.original_name}</h3>
          <p>${item.overview}</p>
          </div>
        </a>
        `;
      }
      APP["df"].append(li);
    });
  },
  creatInnerHtmlTv: function (obj) {
    let newResult = obj["results"].slice(1, obj["results"].length);
    APP.changeColorBlur(true);
    console.log(obj["results"][0].id);
    containerDiv.innerHTML = ``;
    if (obj["results"][0].poster_path === null) {
      containerDiv.innerHTML = `
    <div class="banner_img">
        <div class="banner_img_div"><img class="img_split" src='./png/noimage.png'></div>
    <div class="banner_text">    
        <h2>${obj["results"][0].original_name}</h2>
        <p>${obj["results"][0].overview}</p>
        <a class="btn" 
          href="https://api.themoviedb.org/3/tv/${obj["results"][0].id}/credits?api_key=${APP.KEY}">
            Learn more
        </a>
        </div>
    </div>
    `;
    } else {
      APP.bannerImg(obj);
      containerDiv.innerHTML = `
    <div class="banner_img">
        <div class="banner_img_div"><img class="img_split" src='http://image.tmdb.org/t/p/w500/${obj["results"][0].poster_path}'></div>
    <div class="banner_text">    
        <h2>${obj["results"][0].original_name}</h2>
        <p>${obj["results"][0].overview}</p>
        <a class="btn"
          href="https://api.themoviedb.org/3/tv/${obj["results"][0].id}/credits?api_key=${APP.KEY}">
            Learn more
        </a>
        </div>
    </div>
    `;
    }

    newResult.forEach((item) => {
      const li = document.createElement("li");
      if (item.poster_path === null) {
        li.innerHTML = `
        <a href="https://api.themoviedb.org/3/tv/${item.id}/credits?api_key=${APP.KEY}">
          <div>
            <img src='./png/noimage.png'>
          </div>
        <div>
          <h3>${item.original_title}</h3>
          <p>${item.overview}</p></div>
        </div>
        </a>

        `;
      } else {
        li.innerHTML = `
        <a href="https://api.themoviedb.org/3/tv/${item.id}/credits?api_key=${APP.KEY}">
        <div>
            <img src='http://image.tmdb.org/t/p/w500/${item.poster_path}'>
        </div>
        <div>
          <h3>${item.original_title}</h3>
          <p>${item.overview}</p></div>
        </div>
        </a>
        `;
      }
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
  bannerImg: function (obj) {
    console.log("llegue a banner IMG");
    console.log(obj);
    if (obj === null) {
      APP.banner.setAttribute(`style`, `background-image: none;`);
    } else if (obj["results"][0].backdrop_path === null) {
      APP.banner.setAttribute(
        `style`,
        `background-image: url(./png/ErrorBack.png);background-repeat:no-repeat;background-size: cover;background-position: center;`
      );
    } else {
      APP.banner.setAttribute(
        `style`,
        `background-image: url(http://image.tmdb.org/t/p/original/${obj["results"][0].backdrop_path});background-repeat:no-repeat;background-size: cover;background-position: center;`
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
  activeSelector: function (active) {
    let errorCatSelect = document.querySelector(".errorCatSelect");
    if (active === true) {
      errorCatSelect.classList.add("active");
    } else {
      errorCatSelect.classList.remove("active");
    }
  },
  containerTitle: function (active) {
    let varTitle = document.querySelector(".containerTitle");
    if (active === true) {
      varTitle.classList.add("active");
      varTitle.innerHTML = `
      <p>Here you can enjoy all the result for <span>"${APP.inputvalue}"</span> inside the category <span>${APP.selectCategories}</span></p>
      `;
    } else {
      varTitle.classList.remove("active");
    }
  },
  containerNoResults: function (active) {
    let varTitleError = document.querySelector(".containerTitle");
    if (active === true) {
      varTitleError.classList.add("active");
      varTitleError.innerHTML = `
      <p>There is not result for <span>"${APP.inputvalue}"</span> inside the category <span>${APP.selectCategories}</span> try again</p>
      `;
    } else {
      varTitleError.classList.remove("active");
    }
  },
  changeColorBlur: function (value) {
    let blurBanner = document.querySelector(".banner_blur");
    if (value === true) {
      if (APP.selectCategories == "tv") {
        blurBanner.classList.remove("movieActive");
        blurBanner.classList.add("tvActive");
      } else {
        blurBanner.classList.remove("tvActive");
        blurBanner.classList.add("movieActive");
      }
    } else {
      blurBanner.classList.remove("tvActive");
      blurBanner.classList.remove("movieActive");
    }
  },
  toTop: function () {
    const toTop = document.querySelector(".to-top");
    function handleToTop() {
      if (window.scrollY > 150) {
        toTop.classList.add("visible");
      } else {
        toTop.classList.remove("visible");
      }
    }
    handleToTop();
    toTop && window.addEventListener("scroll", handleToTop);
  },
};

document.addEventListener("DOMContentLoaded", APP.init.main);
