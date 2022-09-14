import "./style.scss";

let location = "Chicago";
let units = "imperial";
const apiKey = "c421018a07c14061ff3b4e180dce400f";

const form = document.querySelector("form");
const locationName = document.querySelector(".location");
const temperature = document.querySelector(".temperature");

window.onload = function () {
  getWeather(location);
};

form.addEventListener("submit", (event) => {
  getWeather(form.querySelector("input").value);
  form.reset();
  event.preventDefault();
});

async function getWeather(location) {
  try {
    const response = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?" +
        `q=${location}` +
        `&units=${units}` +
        `&appid=${apiKey}`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);
    locationName.innerText = weatherData.name;
    temperature.innerText = weatherData.main.temp;
  } catch (error) {
    console.log(error);
  }
}
