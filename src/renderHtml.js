function showInfoCountry({ flags, name, capital, population, languages }) {
  return `
	<div>
    <div>
      <img src="${flags.svg}" alt="${name.official}" width="50" />
      <h1>${name.official}</h1>
    </div>
    <p><span class="info">Capital:</span> ${capital}</p>
    <p><span class="info">Population:</span> ${population}</p>
    <p><span class="info">Languages:</span> ${Object.values(languages).join(
      ', '
    )}</p>
  </div>
  `;
}

function showCountries({ flags, name }) {
  return `
  <li class="flag">
    <img src="${flags.svg}" alt="${name.official}" width="80" />
    <h2>${name.official}</h2>
  </li>
  `;
}

export { showInfoCountry, showCountries };