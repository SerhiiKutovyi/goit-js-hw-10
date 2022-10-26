import './css/styles.css';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import CountriesApiService from '../src/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const ref = {
  searchInputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
};

const countriesApiService = new CountriesApiService();

ref.searchInputEl.addEventListener(
  'input',
  debounce(onSearchInput, DEBOUNCE_DELAY)
);

function onSearchInput(e) {
  countriesApiService.searchQuery = e.target.value.toLowerCase().trim();
  if (!countriesApiService.searchQuery) {
    return clearMarkup();
  }
  countriesApiService.fetchCountries().then(createMarkup).catch(onError);
}

function onError() {
  clearMarkup();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function createMarkup(data) {
  if (data.length > 10) {
    clearMarkup();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length >= 2 && data.length <= 10) {
    renderCountry(data, markupSetCountry);
  } else {
    renderCountry(data, markupCountry);
  }
}

function renderCountry(data, markupFunction) {
  const markup = data.map(markupFunction).join('');
  ref.countryListEl.innerHTML = markup;
}

function clearMarkup() {
  ref.countryListEl.innerHTML = '';
}

function markupSetCountry(data) {
  return `<li class="list-item"><img src="${data.flags.svg}" alt="flag" width=30 >  <span>&nbsp;${data.name.official}</span></li>`;
}

function markupCountry(data) {
  return `<li class="list-item">
    <img src="${data.flags.svg}" alt="flag" width=80 ><h2>${
    data.name.official
  }</h2>
    <p class="item-text"><b>Capital:</b>  ${data.capital}</p>
    <p class="item-text"><b>Population:</b>  ${data.population}</p>
    <p class="item-text"><b>Languages:</b>  ${Object.values(
      data.languages
    ).join(', ')}</p>
    </li>`;
}
