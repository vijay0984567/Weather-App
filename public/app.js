// const apiKey = "14b44a16b24cabac323e32b2d7072e3e";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

// const searchBox = document.querySelector(".search input");
// const searchBtn = document.querySelector(".search button");
// const weatherIcon = document.querySelector(".weather-icon");

// async function checkWeather(city) {
//     const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

//     if (response.status == 404) {
//         document.querySelector(".error").style.display = "block";
//         document.querySelector(".weather").style.display = "none";
//     } else {
//         var data = await response.json();

//         document.querySelector(".city").innerHTML = data.name;
//         document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
//         document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
//         document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

//         if (data.weather[0].main == "Clouds") {
//             weatherIcon.src = "images/clouds.png";
//         } else if (data.weather[0].main == "Clear") {
//             weatherIcon.src = "images/clear.png";
//         } else if (data.weather[0].main == "Rain") {
//             weatherIcon.src = "images/rain.png";
//         } else if (data.weather[0].main == "Drizzle") {
//             weatherIcon.src = "images/drizzle.png";
//         } else if (data.weather[0].main == "Mist") {
//             weatherIcon.src = "images/mist.png";
//         }

//         document.querySelector(".weather").style.display = "block";
//     }
// }

// searchBtn.addEventListener("click", () => {
//     checkWeather(searchBox.value);
// });

// checkWeather();





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
