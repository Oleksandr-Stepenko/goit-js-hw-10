export function fetchCountries(name) {
	const BASE_URL = 'https://restcountries.com/v3.1/name';
	const fieldsList = 'name,capital,population,flags,languages';
	return fetch(`${BASE_URL}/${name}?fields=${fieldsList}`)
		.then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
