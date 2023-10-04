async function getWeatherData(location) {
  const apiKey = "d9744027ca3caa08f26d9d76d017d8f6";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const weatherData = {
        temperature: data.main.temp,
        icon: data.weather[0].icon,
        condition: data.weather[0].main,
        location: data.name,
      };
      return weatherData;
    });
}

function updateUI(weatherData) {
  const errorMsg = document.querySelector("#errorMsg");
  const temperature = document.querySelector("#temperature");
  const condition = document.querySelector("#condition");
  const img = document.querySelector("img");
  const location = document.querySelector("#location");
  errorMsg.textContent = "";
  temperature.textContent = `${weatherData.temperature}°C`;
  img.src = `http://openweathermap.org/img/w/${weatherData.icon}.png`;
  condition.textContent = weatherData.condition;
  location.textContent = weatherData.location;
}
const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

searchBtn.addEventListener("click", () => {
  searchBtn.textContent = "Searching...";
  const location = searchBar.value;
  getWeatherData(location)
    .then((weatherData) => {
      searchBtn.textContent = "Search";
      updateUI(weatherData);
    })
    .catch((error) => {
      const errorMsg = document.querySelector("#errorMsg");
      const temperature = document.querySelector("#temperature");
      const img = document.querySelector("img");
      const condition = document.querySelector("#condition");
      const location = document.querySelector("#location");
      searchBtn.textContent = "Search";
      temperature.textContent = "";
      img.src = "";
      condition.textContent = "";
      location.textContent = "";
      errorMsg.textContent = "Invalid City Name!";
    });
});
