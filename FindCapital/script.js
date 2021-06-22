"use strict";

const btn_onecall = document.querySelector(".btn_onecall");
const btn_multicall = document.querySelector(".btn_multicall");

const countriesContainer = document.querySelector(".countries");
const countryInput = document.querySelector(".country_input");

btn_onecall.addEventListener("click", function (e) {
  e.preventDefault();
  countriesContainer.innerHTML = "";
  getCountryDataInOneCall(countryInput.value);
  countryInput.value = "";
});

btn_multicall.addEventListener("click", function (e) {
  e.preventDefault();
  countriesContainer.innerHTML = "";
  getCountryDataMutiCall(countryInput.value);
  countryInput.value = "";
});

// multiple API call throught name and alpha
const getCountryDataMutiCall = async function (country) {
  try {
    const [data] = await getJSON(
      `https://restcountries.eu/rest/v2/name/${country}`
    );

    renderCapital(data);

    const getData = async () => {
      return Promise.all(
        data.borders.map((item) =>
          getJSON(`https://restcountries.eu/rest/v2/alpha/${item}`)
        )
      );
    };

    getData().then((data) =>
      data.map((item) => renderCapital(item, "neighbour"))
    );
  } catch (err) {
    renderError(`${err.message}`);
  }
};

// Single API call through All
const getCountryDataInOneCall = async function (country) {
  try {
    const data = await getJSON(`https://restcountries.eu/rest/v2/all`);
    const [result] = data.filter(
      (item) =>
        item.alpha3Code === country.toUpperCase() ||
        item.name.toUpperCase() === country.toUpperCase() ||
        item.altSpellings.includes(country.toUpperCase())
    );

    renderCapital(result);

    const neighbours = data.filter((item) =>
      result.borders.includes(item.alpha3Code)
    );

    neighbours.map((item) => renderCapital(item, "neighbour"));
  } catch (err) {
    renderError(`${err.message}`);
  }
};

const renderCapital = function (data, className = "") {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__capital">${data.capital}</h4>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};
