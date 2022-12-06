document.addEventListener("DOMContentLoaded", main);

function main() {
  // !VARIABLES
  const movies = document.querySelector("#movies");
  const tvShows = document.querySelector("#tvShows");
  const btn = document.querySelector("#searchsubmit");
  const key = "d1a21373ff4a38d759b3e1fdd4b4c09f";
  let selecCategories = "";
  let inputvalue = "";
  movies.addEventListener("click", checkev);
  tvShows.addEventListener("click", checkev);
  btn.addEventListener("click", getInputValue);

  // ! -----CHECK CATEGORIES------
  function checkev(ev) {
    let categories = ev.target.getAttribute("value");
    if (categories === movies) {
      console(categories);
      selecCategories = categories;
    } else {
      selecCategories = categories;
    }
    console.log(selecCategories, "holaaa si srivo");
  }
  // ? --------END CHECK CATEGORIES-----
  // ! -------GET INPUT VAL-----
  function getInputValue() {
    let inputElement = document.getElementById("keysssb").value.trim();
    if (inputElement === "") {
      console.log("error");
    } else {
      inputvalue = inputElement;
      console.log(inputvalue);
      getData();
    }
  }
  // ?  ------END INPUT VAL------
  // ! -----FECTH DATA -----
  function getData() {
    if (selecCategories && inputvalue) {
      let url = `https://api.themoviedb.org/3/search/${selecCategories}?query=${inputvalue}&api_key=d1a21373ff4a38d759b3e1fdd4b4c09f`;
      console.log(url);
    }
  }

  // ? -----FECTH DATA -----
  // ! ------ END MAIN -------
}

// `https://api.themoviedb.org/3/search/${ev.target.value}?query=&api_key=e3cb87119b43a590d35eb
