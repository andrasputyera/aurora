const cityForm = document.querySelector('form');

const updateCity = async (city) => {
    
    // Assigning the data from the functions we set up in forecast.js
    // Store details for the city user types in
    const cityDetails = await getCity(city);
    // Store weather conditions for that specific city using the city's key provided in the details 
    const cityWeather = await getWeather(cityDetails.Key);

    // Stored object values returned together from data we recieve back from forecast.js
    return {
        cityDetails,
        cityWeather
    }; 
}

cityForm.addEventListener('submit', event => {
    event.preventDefault();

    // Getting the value from the input field
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update the interface with the new city
    updateCity(city)
        .then(data => console.log(data))
        .catch(err => console.log(err));
})