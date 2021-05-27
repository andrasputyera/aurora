const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateInterface = (data) => {
    
    const cityDetails = data.cityDetails;
    const cityWeather = data.cityWeather;

    // Update the details template by overwriting it with new content
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${cityWeather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${cityWeather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // Remove display none class on card if present
     if (card.classList.contains('d-none')) {
         card.classList.remove('d-none');
     }
}

const updateCity = async (city) => {
    
    // Assigning the data from the functions we set up in forecast.js
    // Store details for the city user types in
    const cityDetails = await getCity(city);
    // Store weather conditions for that specific city using the city's key provided in the details 
    const cityWeather = await getWeather(cityDetails.Key);

    // Stored object values returned together from data we recieve back from forecast.js
    return { cityDetails, cityWeather }; 
}

cityForm.addEventListener('submit', event => {
    event.preventDefault();

    // Getting the value from the input field
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update the interface with the new city
    updateCity(city)
        .then(data => updateInterface(data))
        .catch(err => console.log(err));
})