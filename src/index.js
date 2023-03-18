import './css/styles.css';
import { showInfoCountry, showCountries } from './renderHtml'
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(inputNameCountry, DEBOUNCE_DELAY));

function inputNameCountry(e) {
  e.preventDefault();
  const nameOfCountry = searchBox.value.trim();

  if (nameOfCountry === '') {
    countryInfo.innerHTML = '';
    countriesList.innerHTML = '';
    return;
  }

	fetchCountries(nameOfCountry)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryInfo.innerHTML = '';
        countriesList.innerHTML = '';
        return;
      }

      if (countries.length <= 10) {
        const listMarkup = countries.map(country => showCountries(country));
        countriesList.innerHTML = listMarkup.join('');
        countryInfo.innerHTML = '';
      }

      if (countries.length === 1) {
        const markup = countries.map(country => showInfoCountry(country));
        countryInfo.innerHTML = markup.join('');
        countriesList.innerHTML = '';
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      countryInfo.innerHTML = '';
      countriesList.innerHTML = '';
      return error;
    });
}

// function showInfoCountry({ flags, name, capital, population, languages }) {
//   return `
// 	<div>
//     <div>
//       <img src="${flags.svg}" alt="${name.official}" width="50" />
//       <h1 class="country-name">${name.official}</h1>
//     </div>
//     <p><span class="info">Capital:</span> ${capital}</p>
//     <p><span class="info">Population:</span> ${population}</p>
//     <p><span class="info">Languages:</span> ${Object.values(languages)
// 			.join(', ')}</p>
//   </div>
//   `;
// }

// function showCountries({ flags, name }) {
//   return `
//   <li class="flag">
//     <img src="${flags.svg}" alt="${name.official}" width="80" />
//     <h2>${name.official}</h2>
//   </li>
//   `;
// }

