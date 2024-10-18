const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(`/weather/${city}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.city;
        document.querySelector(".temp").innerHTML = data.temperature;
        document.querySelector(".humidity").innerHTML = data.humidity;
        document.querySelector(".wind").innerHTML = data.wind_speed;

        if (data.weather == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
