"use strict";

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
  let cityName = searchCity.value
  if(cityName.trim().length == 0) {
      alert('Please Enter a City Name');
  }

  const http = new XMLHttpRequest();
  const apiKey = 'b2d3724934282ea70b7289b72efa6704';
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  const method = 'GET';

  http.open(method, url);
  loadingText.style.display = 'block';
  weatherBox.style.display = 'none';

  http.onreadystatechange = function() {
    if(http.readyState == XMLHttpRequest.DONE && http.status === 200) {
      let data = JSON.parse(http.responseText);

      let weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
      weatherData.temperature = data.main.temp;

      updateWeather(weatherData);
    } else if (http.readyState == XMLHttpRequest.DONE) {
      alert('Something Went Wrong');
    }
  }
  http.send();
}

function updateWeather(weatherData) {
  weatherCity.textContent = weatherData.cityName;
  weatherDescription.textContent = weatherData.description;
  weatherTemperature.textContent = weatherData.temperature;

  loadingText.style.display = 'none';
  weatherBox.style.display = 'block';
}
