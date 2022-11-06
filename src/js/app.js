import {
  searcherBtn,
  country,
  selectCountry,
  heading,
  btnTheme,
  themeText,
} from "./nodes.js";
import { getCountry, filterRegion, filteredCountry } from "./API.js";
import { toggleTheme } from "./functions.js";

(function () {
  document.addEventListener("DOMContentLoaded", getCountry);

  searcherBtn.addEventListener("click", (e) => {
    e.preventDefault();
    filteredCountry(country.value);
  });

  selectCountry.addEventListener("change", (e) => {
    filterRegion(e.target.value);
  });

  heading.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  btnTheme.addEventListener("click", () => {
    toggleTheme(themeText);
  });
})();
