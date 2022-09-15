import "./style.scss";

let city = "Chicago";
let units = "imperial";
const apiKey = "c421018a07c14061ff3b4e180dce400f";

const body = document.querySelector("body");

const form = document.querySelector("form");
const conditionsImage = document.querySelector(".conditions-image");
const location = document.querySelector(".location");
const tempNow = document.querySelector(".temp-now");
const fahrenheit = document.querySelector(".fahrenheit");
const celsius = document.querySelector(".celsius");
const description = document.querySelector(".description");
const tempHigh = document.querySelector(".temp-high");
const tempLow = document.querySelector(".temp-low");

window.onload = function () {
  getWeather(city);
  form.querySelector("input").focus();
};

form.addEventListener("submit", (event) => {
  city = form.querySelector("input").value;
  getWeather(city);
  form.reset();
  event.preventDefault();
});

fahrenheit.addEventListener("click", () => {
  units = "imperial";
  celsius.classList.add("inactive");
  fahrenheit.classList.remove("inactive");
  getWeather(city);
});

celsius.addEventListener("click", () => {
  units = "metric";
  fahrenheit.classList.add("inactive");
  celsius.classList.remove("inactive");
  getWeather(city);
});

async function getWeather(city) {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?" +
        `q=${city}` +
        `&units=${units}` +
        `&appid=${apiKey}`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);
    if (
      weatherData.dt > weatherData.sys.sunset ||
      weatherData.dt < weatherData.sys.sunrise
    ) {
      body.style.backgroundColor = "#0f123e";
      body.style.color = "#fff";
    } else {
      body.style.backgroundColor = "#fff";
      body.style.color = "#0f123e";
    }
    location.innerText = weatherData.name;
    tempNow.innerText = Math.round(weatherData.main.temp);
    conditionsImage.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" +
        weatherData.weather[0].icon +
        "@2x.png"
    );
    conditionsImage.setAttribute("alt", weatherData.weather[0].description);
    description.innerText = weatherData.weather[0].description;
    tempHigh.innerText = Math.round(weatherData.main.temp_max);
    tempLow.innerText = Math.round(weatherData.main.temp_min);
  } catch (error) {
    console.log(error);
  }
}
