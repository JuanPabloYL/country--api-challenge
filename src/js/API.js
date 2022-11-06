import { container } from "./nodes.js";
import { sendCountry, renderDataCountry, renderDataBloc } from "./functions.js";

const url = "https://restcountries.com/v3.1/all";
const urlName = "https://restcountries.com/v3.1/name";
const urlRegion = "https://restcountries.com/v3.1/region";

export const getCountry = async () => {
  try {
    const resaults = await fetch(url);
    const data = await resaults.json();
    location.hash = "#home";

    sendCountry(data);
  } catch (error) {
    console.log(error);
  }
};

export const filteredCountry = async (country) => {
  try {
    const results = await fetch(`${urlName}/${country}`);
    const response = await results.json();
    container.innerHTML = "";
    sendCountry(response);
  } catch (error) {
    console.log(error);
  }
};

export const handleInfoCountry = async (country) => {
  try {
    const results = await fetch(`${urlName}/${country}`);
    const response = await results.json();

    renderDataCountry(response);
  } catch (error) {
    console.log(error);
  }
};

export const filterRegion = async (region) => {
  try {
    const results = await fetch(`${urlRegion}/${region}`);
    const resposne = await results.json();

    container.innerHTML = "";
    sendCountry(resposne);
  } catch (error) {
    console.log(error);
  }
};

export const filterBloc = async (block) => {
  try {
    const results = await fetch(`https://restcountries.com/v2/alpha/${block}`);
    const response = await results.json();

    renderDataBloc(response);
  } catch (error) {
    console.log(error);
  }
};
