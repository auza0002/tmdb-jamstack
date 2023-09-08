import { NetworkError } from "./utilities.js";
const APP = {
  banner: document.querySelector(".banner"),
  KEY: "d1a21373ff4a38d759b3e1fdd4b4c09f",
  categoriesUrl: "",
  selectCategories: "",
  inputvalue: "",
  ul: document.querySelector("#ulInfo"),
  containerDiv: document.querySelector("#containerDiv"),
  df: new DocumentFragment(),
  init: {
    movie: document.querySelector("#movie"),
    tvShows: document.querySelector("#tvShows"),
    btn: document.querySelector("#searchform"),
    main() {
      APP.addListener();
      if (location.hash) {
        const splitArray = location.hash.split("/");
        if (document.body.id === "body") {
          const [, mediaType, query] = splitArray;
          APP.inputvalue = query;

          let inputval = document.getElementById("keysssb");
          inputval.value = decodeURIComponent(query);
          APP.activeBtn(mediaType);
          let btnSelect = mediaType;
          APP.selectCategories = btnSelect;
          APP.getData(mediaType, query);
        } else {
          const [, mediaType, id, title] = splitArray;

          APP.activeBtn(mediaType);
          let btnSelect = mediaType;
          APP.selectCategories = btnSelect;
          APP.getDataCredits(mediaType, id, title);
        }
      }
    },
  },
  addListener: function () {
    window.addEventListener("popstate", APP.popstate);
    APP.init["movie"].addEventListener("click", APP.checkev);
    APP.init["tvShows"].addEventListener("click", APP.checkev);
    APP.init["btn"].addEventListener("submit", APP.getInputValue);
  },
  checkev: function (ev) {
    let eve = ev.target;
    let categories = eve.getAttribute("value");
    if (categories === "movie") {
      APP.activeBtn(categories);

      APP.selectCategories = categories;
    } else {
      APP.activeBtn(categories);

      APP.selectCategories = categories;
    }
  },
  getInputValue: function (ev) {
    ev.preventDefault();
    let inputElement = document.getElementById("keysssb").value.trim();
    if (document.body.id === "body") {
      if (inputElement && APP.selectCategories) {
        APP.activeSelector(false);
        APP.inputvalue = inputElement;

        history.pushState(
          {},
          "",
          "#" + `/${APP.selectCategories}/${inputElement}`
        );
        APP.getData(APP.selectCategories, inputElement);
      } else {
        APP.activeSelector(true);
      }
    } else {
      location.href = `index.html#/${APP.selectCategories}/${inputElement}`;
    }
  },
  getData: function (type, query) {
    APP["ul"].innerHTML = ``;
    let url = `https://api.themoviedb.org/3/search/${type}?query=${query}&api_key=${APP.KEY}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new NetworkError("Failed API Call", response);
        }
        return response;
      })
      .then((response) => response.json())
      .then((obj) => {
        APP.containerTitle(false);
        if (obj.results.length === 0) {
          APP.bannerImg(null);
          APP.deletBanner(null);
          APP.changeColorBlur(false);
          APP.containerTitle(false);
          APP.containerNoResults(true);
        } else {
          APP.errorCategories(false);
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
          }
        }
        APP["ul"].append(APP["df"]);
      })
      .catch((err) => {
        return APP.errorCategories(true, err);
      });
  },
  creatInnerHtmlMovie: function (obj) {
    APP.bannerImg(obj);
    APP.changeColorBlur(true);
    let original_titleObj = obj["results"][0].original_title;
    let id = obj["results"][0].id;
    let poster_pathObj = obj["results"][0].poster_path
      ? `http://image.tmdb.org/t/p/w500/${obj["results"][0].poster_path}`
      : `./png/noimage.png`;
    let overviewObj = obj["results"][0].overview
      ? obj["results"][0].overview
      : `"${original_titleObj}" does not have overview`;
    containerDiv.innerHTML = `
    <div class="banner_img">
        <div class="banner_img_div">
        <img class="img_split" src='${poster_pathObj}'>
        </div>
    <div class="banner_text">    
        <h2>${original_titleObj}</h2>
        <p>${overviewObj}</p>
        <a class="btn" href=credits.html#/movie/${id}/${APP.inputvalue}>
            Learn more
        </a>
        </div>
    </div>
    `;
    let newResult = obj["results"].slice(1, obj["results"].length);
    newResult.forEach((item) => {
      let overview = item.overview
        ? item.overview
        : `"THIS TITLE DOES NOT HAVE A DESCRIPTION"`;
      let newResultImg = item.poster_path
        ? `http://image.tmdb.org/t/p/w500/${item.poster_path}`
        : `./png/noimage.png`;
      const li = document.createElement("li");
      li.innerHTML = `
      <a class="cardContainerA" href=credits.html#/movie/${item.id}/${APP.inputvalue}>     
            <img src='${newResultImg}'>
        <div class="divCardText">
          <h3>${item.original_title}</h3>
          <p>${overview}</p>
          </div>
        
        </a>
        `;
      APP["df"].append(li);
      APP.checkScreen();
    });
  },
  creatInnerHtmlTv: function (obj) {
    APP.bannerImg(obj);
    APP.changeColorBlur(true);
    let original_nameObj = obj["results"][0].original_name;
    let id = obj["results"][0].id;
    let poster_pathObj = obj["results"][0].poster_path
      ? `http://image.tmdb.org/t/p/w500/${obj["results"][0].poster_path}`
      : `./png/noimage.png`;
    let overviewObj = obj["results"][0].overview
      ? obj["results"][0].overview
      : `"${original_nameObj}" does not have overview`;
    containerDiv.innerHTML = `
    <div class="banner_img">
        <div class="banner_img_div">
        <img class="img_split" src='${poster_pathObj}'>
        </div>
    <div class="banner_text">    
        <h2>${original_nameObj}</h2>
        <p>${overviewObj}</p>
        <a class="btn" href=credits.html#/tv/${id}/${APP.inputvalue}>
            Learn more
        </a>
        </div>
    </div>
    `;
    let newResult = obj["results"].slice(1, obj["results"].length);
    newResult.forEach((item) => {
      let overview = item.overview
        ? item.overview
        : `"THIS TITLE DOES NOT HAVE A DESCRIPTION"`;
      let newResultImg = item.poster_path
        ? `http://image.tmdb.org/t/p/w500/${item.poster_path}`
        : `./png/noimage.png`;
      const li = document.createElement("li");
      li.innerHTML = `
        <a class="cardContainerA" href=credits.html#/tv/${item.id}/${APP.inputvalue}>
            <img src='${newResultImg}'>  
        <div class="divCardText">
          <h3>${item.original_name}</h3>
          <p>${overview}</p>
          </div>
        </a>

        `;

      APP["df"].append(li);
      APP.checkScreen();
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
      <p>Results for <span>"${document
        .getElementById("keysssb")
        .value.trim()}"</span> in the <span>${
        APP.selectCategories
      }</span> category</p>
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
      <p>There is no result for <span>"${document
        .getElementById("keysssb")
        .value.trim()}"</span> in the <span>${
        APP.selectCategories
      }</span> category. Try again.</p>
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
  checkScreen: function () {
    let ul = document.querySelectorAll("#ulInfo");
    let ulConten = ul[0];
    const bodyMain = document.getElementById("body");
    const observer = new ResizeObserver((entries) => {
      const bodyElement = entries[0]["contentRect"]["width"];
      if (bodyElement > 720) {
        ulConten.querySelectorAll(".divCardText").forEach((element) => {
          element.classList.add("active");
        });
      } else {
        ulConten.querySelectorAll(".divCardText").forEach((element) => {
          element.classList.remove("active");
        });
      }
    });
    observer.observe(bodyMain);
  },
  popstate: function () {
    if (location.hash) {
      let popstateSelector = "";
      let popstateInputValue = "";
      let urlSplit = location.hash.split("/").slice(1);

      [popstateSelector, popstateInputValue] = urlSplit;
      if (document.body.id === "body") {
        let btnActive = popstateSelector;
        APP.selectCategories = popstateSelector;
        APP.activeBtn(btnActive);
        let inputval = document.getElementById("keysssb");
        inputval.value = decodeURIComponent(popstateInputValue);
        APP.getData(popstateSelector, popstateInputValue);
      }
    }
  },
  getDataCredits: function (type, id, title) {
    let inputval = document.getElementById("keysssb");
    inputval.value = decodeURIComponent(title);
    let url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${APP.KEY}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new NetworkError("Failed API Call", response);
        }
        return response;
      })
      .then((response) => response.json())
      .then((obj) => {
        if (obj["cast"] == 0) {
          APP.containerNoResults(true);
        } else {
          APP.errorCategories(false);
          APP.containerTitle(true);
          APP.creditsConstructor(obj);
        }
      })
      .catch((err) => {
        return APP.errorCategoriesCredtis(true, err);
      });
  },
  creditsConstructor: function (obj) {
    let ulContainer = document.querySelector(".credits_ul");
    ulContainer.innerHTML = obj["cast"]
      .map((element) => {
        let name = element.name ? element.name : `"NO name found"`;
        let popularity = element.popularity
          ? element.popularity
          : `"There is no information about it"`;
        let character = element.character
          ? element.character
          : `"There is no information about it"`;
        let img_path = element["profile_path"]
          ? `https://image.tmdb.org/t/p/original/${element["profile_path"]}`
          : "./png/noimage.png";
        return ` <li class="credits_li">
        <img src ='${img_path}'>
        <div class="credits_li_div">
        <h2>${name}</h2>
        <p class="credits_as">As "${character}"</p>
        <p class="credits_popularity">Popularity ${popularity}</p>
        </div>
         </li>
        `;
      })
      .join("");
  },
  errorCategories: function (show, err) {
    let divContainer = document.querySelector(".div_error");
    if (show) {
      let errorP = document.querySelector(".error_p");
      APP.bannerImg(null);
      APP.deletBanner(null);
      APP.changeColorBlur(false);
      APP.containerTitle(false);
      APP.containerNoResults(false);
      if (err.status === 404) {
        errorP.innerHTML = `Error ${err.status}, try again. no images found`;
        console.warn(err);
        divContainer.classList.add("active");
      } else {
        console.warn(err);
        divContainer.classList.add("active");
        return (errorP.innerHTML = `there is something wrong, try again. double check your connection`);
      }
    } else {
      divContainer.classList.remove("active");
    }
  },
  errorCategoriesCredtis: function (show, err) {
    let divContainer = document.querySelector(".div_error");
    if (show) {
      let errorP = document.querySelector(".error_p");
      if (err.status === 404) {
        errorP.innerHTML = `Error ${err.status}, try again. no images found`;
        console.warn(err);
        divContainer.classList.add("active");
      } else {
        console.warn(err);
        divContainer.classList.add("active");
        return (errorP.innerHTML = `there is something wrong, try again. double check your connection`);
      }
    } else {
      divContainer.classList.remove("active");
    }
  },
};

document.addEventListener("DOMContentLoaded", APP.init.main);
