const APP = {
  KEY: "d1a21373ff4a38d759b3e1fdd4b4c09f",
  CatImg: "https://placekitten.com/g/500/750",
  selectCategories: "",
  inputvalue: "",
  ul: document.querySelector("#ulInfo"),
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
    console.log(obj["results"][0].poster_path);
    obj["results"].forEach((item) => {
      const li = document.createElement("li");
      if (item.poster_path === null) {
        li.innerHTML = `
        <div>
        <img src='${APP.CatImg}'>
        <h2>${item.original_name}</h2>
        <p>${item.overview}</p>
        </div>
        `;
      } else {
        li.innerHTML = `
        <div>
        <img src='http://image.tmdb.org/t/p/w500/${item.poster_path}'>
        <h2>${item.original_name}</h2>
        <p>${item.overview}</p>
        </div>
        `;
      }
      APP["df"].append(li);
    });
  },
  creatInnerHtmlTv: function (obj) {
    console.log(obj);
    console.log(obj["results"]);
    console.log(obj["results"][0].poster_path);
    obj["results"].forEach((item) => {
      const li = document.createElement("li");
      if (item.poster_path === null) {
        li.innerHTML = `
        <div>
        <img src='${APP.CatImg}'>
        <h2>${item.original_title}</h2>
        <p>${item.overview}</p>
        </div>
        `;
      } else {
        li.innerHTML = `
        <div>
        <img src='http://image.tmdb.org/t/p/w500/${item.poster_path}'>
        <h2>${item.original_title}</h2>
        <p>${item.overview}</p>
        </div>
        `;
      }
      APP["df"].append(li);
    });
  },
};

document.addEventListener("DOMContentLoaded", APP.init.main);
console.log(APP.init);

// function main() {
//   // !VARIABLES
//   const movies = document.querySelector("#movies");
//   const tvShows = document.querySelector("#tvShows");
//   const btn = document.querySelector("#searchsubmit");
//   const key = "d1a21373ff4a38d759b3e1fdd4b4c09f";
//   let ul = document.querySelector("#ulInfo");
//   let selectCategories = "";
//   let inputvalue = "";
//   movies.addEventListener("click", checkev);
//   tvShows.addEventListener("click", checkev);
//   btn.addEventListener("click", getInputValue);

//   // ! -----CHECK CATEGORIES------
//   function checkev(ev) {
//     let categories = ev.target.getAttribute("value");
//     if (categories === movies) {
//       console(categories);
//       selectCategories = categories;
//     } else {
//       selectCategories = categories;
//     }
//     console.log(selectCategories, "holaaa si sirvo");
//   }
//   // ? --------END CHECK CATEGORIES-----
//   // ! -------GET INPUT VAL-----
//   function getInputValue() {
//     let inputElement = document.getElementById("keysssb").value.trim();
//     if (inputElement === "") {
//       console.log("error");
//     } else {
//       inputvalue = inputElement;
//       console.log(inputvalue);
//       getData();
//     }
//   }
//   // ?  ------END INPUT VAL------
//   // ! -----FECTH DATA -----
//   function getData() {
//     if (selectCategories && inputvalue) {
//       ul.innerHTML = ``;
//       let url = `https://api.themoviedb.org/3/search/${selectCategories}?query=${inputvalue}&api_key=${key}`;
//       console.log(url);
//       fetch(url)
//         .then((response) => {
//           if (!response.ok) {
//             console.log("no response");
//           }
//           return response;
//         })
//         .then((response) => response.json())
//         .then((obj) => {
//           creatInnerHtml(obj);
//         });
//     }
//   }
//   // ? -----END FECTH DATA -----
//   // !-------CREAT INNET HTML
//   function creatInnerHtml(obj) {
//     obj["results"].forEach((element) => {
//       console.log(element.original_name);
//     });
//   }
//   // ?------- END CREAT INNET HTML----
//   // ! ------ END MAIN -------
// }

// `https://api.themoviedb.org/3/search/${ev.target.value}?query=&api_key=e3cb87119b43a590d35eb
