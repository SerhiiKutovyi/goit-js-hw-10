import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
import fetchCountries from './fetchCountries.js';
export {ref}

const ref = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

ref.input.addEventListener('input', debounce(markupCountries, DEBOUNCE_DELAY));

function markupCountries() {
  if (ref.input.value.length < 1 && ref.input.value.length > 11) {
    Notiflix.Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
  console.log('input start');
  if (ref.input.value.length > 0) {
    fetchCountries(ref.input.value).then(data => {
      
      let test = data;
      const markup = test
        .map(
          item => `<li>
          <p class="name">${item.name.official}</p>
          <img class="image" src="${item.flags.svg}" alt="Flag of ${item.name.official}" width = 30px height = 30 px />
        </li>`
        )
        .join('');
      ref.countryList.innerHTML = markup;
      ref.countryInfo.innerHTML = '';
      return (ref.countryList.innerHTML = markup);
    });
  } else if (ref.input.value.length === 1) {
    
    fetchCountries(element.ref.input.value).then(data => {

      
      let test = data;
      const markup = test
        .map(
          item => `<div class="flag-country-block">
        <img
          class="flag"
          src="${flags.svg}"
          alt="flag"
        />
        <h1>${item.name.official}</h1>
      </div>
      <ul class="country-info-details">
        <li class="country-info-item">
          <h2>Capital:</h2>
          <span class="info-value">${capital}</span>
        </li>
        <li class="country-info-item">
          <h2>Population:</h2>
          <span class="info-value">${population}</span
          >
        </li>
        <li class="country-info-item">
          <h2>Languages:</h2>
          <span class="info-value">${Object.values(languages)}</span
          >
        </li>
      </ul>`
        )
        .join('');
      
      ref.countryList.innerHTML = '';
      ref.countryInfo.innerHTML = markup;
      return (ref.countryInfo.innerHTML = markup);
      
    });
  } else {
    console.log('null');
    ref.countryList.innerHTML = '';
    ref.countryInfo.innerHTML = '';
  }

//   function markupCountryFullInfo(element) {
//     if (ref.input.value.length === 1) {
//       fetchCountries(element.ref.input.value).then(data => {
//         console.log(data);
//         let test = data;
//         const markup = test
//           .map(
//             item => `<div class="flag-country-block">
//         <img
//           class="flag"
//           src="${flags.svg}"
//           alt="flag"
//         />
//         <h1>${item.name.official}</h1>
//       </div>
//       <ul class="country-info-details">
//         <li class="country-info-item">
//           <h2>Capital:</h2>
//           <span class="info-value">${capital}</span>
//         </li>
//         <li class="country-info-item">
//           <h2>Population:</h2>
//           <span class="info-value">${population}</span
//           >
//         </li>
//         <li class="country-info-item">
//           <h2>Languages:</h2>
//           <span class="info-value">${Object.values(languages)}</span
//           >
//         </li>
//       </ul>`
//           )
//           .join('');
//         return (ref.countryList.innerHTML = markup);
//       });
//     } else {
//       ref.countryList.innerHTML = '';
//       ref.countryInfo.innerHTML = '';
//     }
//   }
// }

// return ref.countryInfo.insertAdjacentHTML("beforeend", ``);
