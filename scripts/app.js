const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateInterface = (data) => {
    
    // const cityDetails = data.cityDetails;
    // const cityWeather = data.cityWeather;

    // Destructure data properties
    const { cityDetails, cityWeather } = data;

    // Update the details template by overwriting it with new content
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${cityWeather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${cityWeather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // Update day/night & corresponding icon images
    const timeSrc = cityWeather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    
    // let timeSrc = null;
    // if (cityWeather.IsDayTime) {
    //     timeSrc = 'img/day.svg'
    // } else {
    //     timeSrc = 'img/night.svg'
    // }

    // Set src attribute for time of day
    time.setAttribute('src', timeSrc);

    const iconSrc = `img/icons/${cityWeather.WeatherIcon}.svg`;
    // Set src attribute for icon
    icon.setAttribute('src', iconSrc)

    // Remove display none class on card if present
     if (card.classList.contains('d-none')) {
         card.classList.remove('d-none');
     }
}

// const updateCity = async (city) => {
    
//     // Assigning the data from the functions we set up in forecast.js
//     // Store details for the city user types in
//     const cityDetails = await getCity(city);
//     // Store weather conditions for that specific city using the city's key provided in the details 
//     const cityWeather = await getWeather(cityDetails.Key);

//     // Stored object values returned together from data we recieve back from forecast.js
//     return { cityDetails, cityWeather }; 
// }

cityForm.addEventListener('submit', event => {
    event.preventDefault();

    // Getting the value from the input field
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update the interface with the new city
    forecast.updateCity(city)
        .then(data => updateInterface(data))
        .catch(err => console.log(err));

    // Set up local storage
    localStorage.setItem('city', city);
})

if (localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateInterface(data))
    .catch(err => console.log(err));
}