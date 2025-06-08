const apiKey = "YOUR_API_KEY";
const cityInput = document.querySelector(".cityInput");
const weatherForm = document.querySelector(".weatherForm");
const card = document.querySelector(".card");

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch (error) {
            displayError(error)
        }
    }
    else {
        displayError("Please enter a city!")
    }

});

async function fetchWeatherData(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("City not found");
    }

    return await response.json();

}

function displayWeatherData(data) {

    const {

        name: city,
        main: { humidity, temp },
        weather: [{ description, id }]

    } = data;

    const cityDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const tempDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("img");

    cityDisplay.textContent = city;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    tempDisplay.textContent = `${Math.round(temp - 273.15)}°C`;
    descriptionDisplay.textContent = description;
    weatherEmoji.src = getWeatherEmojo(id);
    weatherEmoji.classList.add("weatherEmoji");

    card.textContent = "";

    card.appendChild(cityDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(descriptionDisplay);
    card.appendChild(weatherEmoji);

    card.style.display = "flex";

    console.log(id);

}

function getWeatherEmojo(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "images/11d.png";
        case (weatherId >= 300 && weatherId < 400):
            return "images/09d.png";
        case (weatherId >= 500 && weatherId < 600):
            return "images/10d.png";
        case (weatherId >= 600 && weatherId < 700):
            return "images/13d.png";
        case (weatherId >= 700 && weatherId < 800):
            return "images/50d.png";
        case (weatherId === 800):
            return "images/01d.png";
        case (weatherId >= 801 && weatherId < 810):
            return "images/03d.png";
        default:
            return "images/questionMark.png";
    }
}

function displayError(msg) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = msg;

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}