if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "../../en-za/";
}

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherInfoDiv = document.getElementById('weatherInfo');
const suggestionsDiv = document.getElementById('suggestions');

const apiKey = 'f433176e69b07331a03003cb58e74213';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const cityUrl = 'https://api.openweathermap.org/data/2.5/find';
const airPollutionUrl = 'https://api.openweathermap.org/data/2.5/air_pollution';

const countryNames = {
    "US": "United States", "GB": "United Kingdom", "CA": "Canada",
    "DE": "Germany", "FR": "France", "IN": "India", "AU": "Australia",
    "ZA": "South Africa", "JP": "Japan", "BR": "Brazil", "CN": "China",
    "MX": "Mexico", "RU": "Russia", "IT": "Italy", "ES": "Spain",
    "NL": "Netherlands", "SE": "Sweden", "NO": "Norway", "FI": "Finland",
    "DK": "Denmark", "KR": "South Korea", "SG": "Singapore", "TR": "Turkey",
    "AR": "Argentina", "PL": "Poland", "AE": "United Arab Emirates",
    "CH": "Switzerland", "IE": "Ireland", "TH": "Thailand", "PH": "Philippines",
    "ID": "Indonesia"
};

weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const cityName = cityInput.value;
    await getWeather(cityName);
});

cityInput.addEventListener('input', async () => {
    const query = cityInput.value;
    suggestionsDiv.innerHTML = '';

    if (query.length > 2) {
        const cities = await getCitySuggestions(query);
        cities.forEach(city => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.className = 'suggestion';
            suggestionDiv.textContent = `${city.name}, ${city.state || ''}, ${countryNames[city.sys.country] || city.sys.country}`.trim();
            suggestionDiv.onclick = () => selectCity(city.name);
            suggestionsDiv.appendChild(suggestionDiv);
        });
    }
});

async function getCitySuggestions(query) {
    const response = await fetch(`${cityUrl}?q=${query}&appid=${apiKey}&limit=5`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.list;
}

function selectCity(city) {
    cityInput.value = city;
    suggestionsDiv.innerHTML = '';
}

async function getWeather(city) {
    const weatherResponse = await fetch(`${weatherUrl}?q=${city}&appid=${apiKey}&units=metric`);
    if (!weatherResponse.ok) {
        weatherInfoDiv.innerHTML = '<p>Error: Unable to fetch weather data.</p>';
        return;
    }
    const weatherData = await weatherResponse.json();
    
    const { coord } = weatherData;
    const pollutionResponse = await fetch(`${airPollutionUrl}?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`);
    if (!pollutionResponse.ok) {
        weatherInfoDiv.innerHTML = '<p>Error: Unable to fetch air pollution data.</p>';
        return;
    }
    const pollutionData = await pollutionResponse.json();

    displayWeather(weatherData);
    displayAirPollution(pollutionData);
}

function displayWeather(data) {
    const { main, weather, name, sys } = data;
    const countryName = countryNames[sys.country] || sys.country;

    weatherInfoDiv.innerHTML = `
        <h2>Weather in ${name}, ${countryName}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Condition: ${weather[0].description}</p>
    `;
}

function displayAirPollution(data) {
    const airQuality = data.list[0].main.aqi;
    const airQualityText = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

    const airPollutionDiv = document.createElement('div');
    airPollutionDiv.innerHTML = `
        <p>Air Quality Index (AQI): ${airQuality} - ${airQualityText[airQuality - 1]}</p>
    `;
    weatherInfoDiv.appendChild(airPollutionDiv);
}