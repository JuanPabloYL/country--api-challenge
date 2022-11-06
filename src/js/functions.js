import { container, filterCountry } from "./nodes.js";
import { countryContainer, selectCountry } from "./nodes.js";
import { handleInfoCountry, filterBloc } from "./API.js";

const home = () => {
  const exists = document.querySelector(".selected-country");
  if (exists) {
    document.querySelector(".filter__form").classList.remove("inactive");
    filterCountry.classList.remove("inactive");
    container.classList.remove("inactive");
    document.querySelector(".selected-country").remove();
  }
};

export const renderCountry = ({
  png,
  common,
  population: pop,
  region: reg,
  capital: cap,
}) => {
  const country = document.createElement("article");
  country.classList.add("country");

  // Show information of the country with a "click" event
  country.addEventListener("click", () => {
    location.hash = `#country=${common}`;
    handleInfoCountry(common);
  });

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("country__img");

  const image = document.createElement("img");
  image.src = `${png}`;

  const countryContent = document.createElement("div");
  countryContent.classList.add("country__content");

  const countryHeading = document.createElement("div");
  countryHeading.classList.add("country__heading");

  const countryName = document.createElement("h2");
  countryName.classList.add("country__name");
  countryName.textContent = common;

  const countryInfo = document.createElement("ul");
  countryInfo.classList.add("country__info");

  const countryLiPopulation = document.createElement("li");
  countryLiPopulation.classList.add("country__li");

  const countryLiRegion = document.createElement("li");
  countryLiRegion.classList.add("country__li");

  const countryLiCapital = document.createElement("li");
  countryLiCapital.classList.add("country__li");

  const population = document.createElement("p");
  population.textContent = pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const populationSpan = document.createElement("span");
  populationSpan.textContent = "Population: ";

  const region = document.createElement("p");
  region.textContent = reg;

  const regionSpan = document.createElement("span");
  regionSpan.textContent = "Region: ";

  const capital = document.createElement("p");
  capital.textContent = cap?.[0];

  const capitalSpan = document.createElement("span");
  capitalSpan.textContent = "Capital: ";

  countryContent.appendChild(countryHeading);
  countryContent.appendChild(countryInfo);

  countryInfo.appendChild(countryLiCapital);
  capital.prepend(capitalSpan);
  countryLiCapital.prepend(capital);

  countryInfo.appendChild(countryLiRegion);
  region.prepend(regionSpan);
  countryLiRegion.prepend(region);

  countryInfo.appendChild(countryLiPopulation);
  population.prepend(populationSpan);
  countryLiPopulation.prepend(population);

  countryHeading.appendChild(countryName);

  imageContainer.appendChild(image);
  country.appendChild(imageContainer);
  country.appendChild(countryContent);

  countryContainer.appendChild(country);
};

export const sendCountry = (data) => {
  return data.forEach((d) => {
    const {
      name: { common },
      population,
      region,
      capital,
      flags: { png },
    } = d;

    renderCountry({ common, population, region, capital, png });
  });
};

export const toggleTheme = (text) => {
  document.body.classList.toggle("dark");

  if (!document.body.classList.contains("dark")) {
    text.textContent = "Dark theme";
    document.querySelector(".sun").classList.add("off");
    document.querySelector(".moon").classList.remove("off");
  } else {
    text.textContent = "Light theme";

    document.querySelector(".sun").classList.remove("off");
    document.querySelector(".moon").classList.add("off");
  }
};

export const renderDataCountry = (data) => {
  return data.forEach((d) => {
    const {
      name: { nativeName, common },
      population,
      region,
      subregion,
      capital,
      tld,
      currencies,
      languages,
      flags: { png },
      borders,
    } = d;
    console.log(d);
    countryInformation({
      common,
      nativeName,
      population,
      region,
      subregion,
      capital,
      tld,
      currencies,
      languages,
      png,
      borders,
    });
  });
};

export const countryInformation = ({
  name,
  common,
  nativeName,
  population,
  region,
  subregion,
  capital,
  tld,
  currencies,
  languages,
  png,
  borders: neighbour,
}) => {
  if (document.body.querySelector("section.selected-country")) return;

  const cur = Object.values(currencies)[0] || cur[0].name;
  const nm = name || Object.values(nativeName)[0]?.official;
  const lng = languages[0]?.name || Object.values(languages);

  document.querySelector(".countries.section").classList.add("inactive");
  document.querySelector(".filter__form").classList.add("inactive");

  filterCountry.classList.add("inactive");
  container.classList.add("inactive");
  const exists = document.querySelector(".selected-country");
  if (exists) {
    document.querySelector(".selected-country").classList.remove("inactive");
  }

  filterCountry.classList.add("inactive");
  container.classList.add("inactive");

  const selectedContainer = document.createElement("section");
  selectedContainer.classList.add("selected-country", "container");

  const backButton = document.createElement("button");
  backButton.classList.add("back");
  backButton.setAttribute("id", "back");
  backButton.innerHTML = "&#8592; Back";
  backButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  const selected = document.createElement("article");
  selected.classList.add("selected");

  const selectedImageContainer = document.createElement("div");
  selectedImageContainer.classList.add("selected__image-container");

  const image = document.createElement("img");
  image.setAttribute("src", `${png}`);

  const selectedBox = document.createElement("div");
  selectedBox.classList.add("selected__box");

  const selectedName = document.createElement("h2");
  // selectedName.textContent = nativeName.official;
  selectedName.classList.add("selected__name");

  const selectedContent = document.createElement("div");
  selectedContent.classList.add("selected__content");

  const selectedUl = document.createElement("ul");
  selectedUl.classList.add("selected__ul");

  const selectedLiNativeName = document.createElement("li");
  selectedLiNativeName.classList.add("selected__li");
  // selectedLiNativeName.textContent = " " + nm.official;
  selectedLiNativeName.textContent = " " + nm;

  const spanNativeName = document.createElement("span");
  spanNativeName.textContent = "Native Name:";

  const selectedLiPopulation = document.createElement("li");
  selectedLiPopulation.classList.add("selected__li");
  // selectedLiPopulation.textContent = " " + population;
  selectedLiPopulation.textContent =
    " " + population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const spanPopulation = document.createElement("span");
  spanPopulation.textContent = "Population:";

  const selectedLiRegion = document.createElement("li");
  selectedLiRegion.classList.add("selected__li");
  selectedLiRegion.textContent = " " + region;

  const spanRegion = document.createElement("span");
  spanRegion.textContent = "Region:";

  const selectedLisubRegion = document.createElement("li");
  selectedLisubRegion.classList.add("selected__li");
  selectedLisubRegion.textContent = " " + subregion;

  const spansubRegion = document.createElement("span");
  spansubRegion.textContent = "Sub Region:";

  const selectedLiCapital = document.createElement("li");
  selectedLiCapital.classList.add("selected__li");
  selectedLiCapital.textContent = " " + capital;

  const spanCapital = document.createElement("span");
  spanCapital.textContent = "Capital:";

  const selectedUl2 = document.createElement("ul");
  selectedUl2.classList.add("selected__ul");

  const selectedLiTopLevel = document.createElement("li");
  selectedLiTopLevel.classList.add("selected__li");
  selectedLiTopLevel.textContent = " " + tld;

  const spanTopLevel = document.createElement("span");
  spanTopLevel.textContent = "Top Level Domain:";

  const selectedLiCurrencies = document.createElement("li");
  selectedLiCurrencies.classList.add("selected__li");
  selectedLiCurrencies.textContent = " " + Object.values(cur)[0];

  const spanCurrencies = document.createElement("span");
  spanCurrencies.textContent = "Currencies:";

  const selectedLiLanguages = document.createElement("li");
  selectedLiLanguages.classList.add("selected__li");
  selectedLiLanguages.textContent = lng;

  const spanLanguages = document.createElement("span");
  spanLanguages.textContent = "Languages:";

  // Borders
  const selectedBorders = document.createElement("div");
  selectedBorders.classList.add("selected__borders");

  const selectedParagraph = document.createElement("p");
  selectedParagraph.classList.add("selected__paragraph");
  selectedParagraph.textContent = "Border Countries: ";

  const borders = document.createElement("div");
  borders.classList.add("borders");

  if (neighbour) {
    console.log(neighbour);
    neighbour.forEach((country) => {
      const border = document.createElement("div");
      border.classList.add("borders__border");

      const borderName = document.createElement("a");
      // borderName.href = `#country=${country}`;
      borderName.textContent = country;

      border.onclick = () => {
        // location.hash = `#country=${country}`;
        filterBloc(country);
      };

      border.appendChild(borderName);
      borders.appendChild(border);
    });
  }

  selectedContainer.appendChild(backButton);
  selectedContainer.appendChild(selected);

  selected.appendChild(selectedImageContainer);
  selected.appendChild(selectedBox);

  selectedBox.appendChild(selectedName);
  selectedBox.appendChild(selectedContent);

  selectedBox.appendChild(selectedBorders);
  selectedBorders.appendChild(borders);

  selectedContent.appendChild(selectedUl);
  selectedContent.appendChild(selectedUl2);

  selectedUl.appendChild(selectedLiNativeName);
  selectedUl.appendChild(selectedLiPopulation);
  selectedUl.appendChild(selectedLiRegion);
  selectedUl.appendChild(selectedLisubRegion);
  selectedUl.appendChild(selectedLiCapital);

  selectedLiNativeName.prepend(spanNativeName);
  selectedLiPopulation.prepend(spanPopulation);
  selectedLiRegion.prepend(spanRegion);
  selectedLisubRegion.prepend(spansubRegion);
  selectedLiCapital.prepend(spanCapital);

  selectedImageContainer.appendChild(image);

  selectedUl2.appendChild(selectedLiTopLevel);
  selectedUl2.appendChild(selectedLiCurrencies);
  selectedUl2.appendChild(selectedLiLanguages);

  selectedLiTopLevel.prepend(spanTopLevel);
  selectedLiCurrencies.prepend(spanCurrencies);
  selectedLiLanguages.prepend(spanLanguages);

  document.body.appendChild(selectedContainer);
};

export const renderDataBloc = (data) => {
  const exists = document.querySelector(".selected-country");
  if (exists) exists.remove();
  const {
    name: { nativeName, common },
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    flags: { png },
    borders,
  } = data;
  countryInformation({
    name,
    common,
    nativeName,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    png,
    borders,
  });
};
