document.addEventListener("DOMContentLoaded", function () {

    const apiKey = "7899406f56b7dec6ccf8aafccdbdde83";

    const searchBtn = document.getElementById("searchBtn");
    const cityInput = document.getElementById("cityInput");
    const weatherCard = document.getElementById("weatherCard");

    searchBtn.addEventListener("click", getWeather);
    cityInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") getWeather();
    });

    async function getWeather() {

        const city = cityInput.value.trim();
        if (!city) return;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) {
                alert("City not found!");
                return;
            }

            displayWeather(data);

        } catch (error) {
            alert("Error fetching weather data");
        }
    }

    function displayWeather(data) {

        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temperature").innerText = Math.round(data.main.temp) + "°C";
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = "Humidity: " + data.main.humidity + "%";
        document.getElementById("wind").innerText = "Wind: " + data.wind.speed + " m/s";

        weatherCard.style.display = "block";

        setWeatherEffect(data.weather[0].main, data.main.temp);
    }

    function setWeatherEffect(condition, temp) {

        clearEffects();
        document.body.className = "";

        condition = condition.toLowerCase();

        if (condition.includes("snow") || temp <= 0) {
            document.body.classList.add("snow");
            createSnow();
        }
        else if (condition.includes("rain")) {
            document.body.classList.add("rain");
            createRain();
        }
        else if (condition.includes("clear")) {
            document.body.classList.add("clear");
            createSun();
        }
        else if (condition.includes("cloud")) {
            document.body.classList.add("clouds");
        }
    }

    function createSun() {
        const sun = document.createElement("div");
        sun.classList.add("sun");
        document.body.appendChild(sun);
    }

    function createSnow() {
        for (let i = 0; i < 80; i++) {
            const snow = document.createElement("div");
            snow.classList.add("snowflake");
            snow.style.left = Math.random() * window.innerWidth + "px";
            snow.style.animationDuration = (Math.random() * 3 + 2) + "s";
            document.body.appendChild(snow);
        }
    }

    function createRain() {
        for (let i = 0; i < 100; i++) {
            const rain = document.createElement("div");
            rain.classList.add("raindrop");
            rain.style.left = Math.random() * window.innerWidth + "px";
            rain.style.animationDuration = (Math.random() * 1 + 0.5) + "s";
            document.body.appendChild(rain);
        }
    }

    function clearEffects() {
        document.querySelectorAll(".snowflake, .raindrop, .sun")
            .forEach(el => el.remove());
    }

});