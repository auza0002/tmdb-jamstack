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
    btn: document.querySelector("#searhform"),
    main() {
      APP.addListener();
      if (location.hash) {
        const hashArray = location.hash.split("/");
        if (document.body.id === "body") {
          console.log("estoy en index");
          const [, mediaType, query] = hashArray;
          console.log(mediaType, query);
        } else {
          const [, mediaType, id, title] = hashArray;
          console.log(mediaType, id, title);
          // APP.fetchCredits(mediaType, id);
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
      console.log(categories);
      APP.selectCategories = categories;
    } else {
      APP.activeBtn(categories);
      APP.selectCategories = categories;
    }
  },
  getInputValue: function (ev) {
    ev.preventDefault();
    let inputElement = document.getElementById("keysssb").value.trim();

    if (inputElement && APP.selectCategories) {
      APP.activeSelector(false);
      APP.inputvalue = inputElement;
      console.log(APP.selectCategories, inputElement);
      history.pushState(
        {},
        "",
        "#" + `/${APP.selectCategories}/${inputElement}`
      );
      APP.getData(APP.selectCategories, inputElement);
    } else {
      APP.activeSelector(true);
    }
  },

  getData: function (type, query) {
    APP["ul"].innerHTML = ``;
    let url = `https://api.themoviedb.org/3/search/${type}?query=${query}&api_key=${APP.KEY}`;
    fetch(url)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          console.log("no response");
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
      });
  },
  creatInnerHtmlMovie: function (obj) {
    APP.bannerImg(obj);
    APP.changeColorBlur(true);
    let original_titleObj = obj["results"][0].original_title;
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
        <a class="btn" 
          href="https://api.themoviedb.org/3/tv/${obj["results"][0].id}/credits?api_key=${APP.KEY}">
            Learn more
        </a>
        </div>
    </div>
    `;
    let newResult = obj["results"].slice(1, obj["results"].length);
    newResult.forEach((item) => {
      let newResultImg = item.poster_path
        ? `http://image.tmdb.org/t/p/w500/${item.poster_path}`
        : `./png/noimage.png`;
      const li = document.createElement("li");
      li.innerHTML = `
      <a class="cardContainerA" href="https://api.themoviedb.org/3/tv/${item.id}/credits?api_key=${APP.KEY}">     
            <img src='${newResultImg}'>
        <div class="divCardText">
          <h3>${item.original_title}</h3>
          <p>${item.overview}</p></div>
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
        <a class="btn" 
          href="https://api.themoviedb.org/3/tv/${obj["results"][0].id}/credits?api_key=${APP.KEY}">
            Learn more
        </a>
        </div>
    </div>
    `;
    let newResult = obj["results"].slice(1, obj["results"].length);
    newResult.forEach((item) => {
      let newResultImg = item.poster_path
        ? `http://image.tmdb.org/t/p/w500/${item.poster_path}`
        : `./png/noimage.png`;
      const li = document.createElement("li");
      li.innerHTML = `
        <a class="cardContainerA" href="https://api.themoviedb.org/3/tv/${item.id}/credits?api_key=${APP.KEY}">
            <img src='${newResultImg}'>  
        <div class="divCardText">
          <h3>${item.original_name}</h3>
          <p>${item.overview}</p></div>
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
      console.log("popstate");
      let popstateSelector = "";
      let popstateInputValue = "";
      let urlSplit = location.hash.split("/").slice(1);

      [popstateSelector, popstateInputValue] = urlSplit;
      if (document.body.id === "body") {
        console.log("el split si sirve dentro del popstate");
        let inputval = document.getElementById("keysssb");
        let btnActive = popstateSelector;
        inputval.value = popstateInputValue;
        APP.activeBtn(btnActive);
        APP.getData(popstateSelector, popstateInputValue);
      }
    }
  },
  getDataCredits: function (type, id) {},
};

document.addEventListener("DOMContentLoaded", APP.init.main);
