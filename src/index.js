let now = new Date();

let h6 = document.querySelector("h6");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
//
h6.innerHTML = `${day} ${date}, ${hours}:${minutes}`;

//Show Temp
function showTemperature(response) {
  let degreesNow = document.querySelector("#temperatureNow");
  let currentCity = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  degreesNow.innerHTML = `${temperature}`;
  currentCity.innerHTML = `${response.data.name}`;
}

// Geolocation button
function fetchPosition(position) {
  let apiKey = "3a8f31bb8f5c83717d5b200c7e6f4785";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
function searchMe(event) {
  navigator.geolocation.getCurrentPosition(fetchPosition);
}

let input = document.querySelector("#search-now");
input.addEventListener("click", searchMe);

//city
function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let h1 = document.querySelector("h1");
  let apiKey = "3a8f31bb8f5c83717d5b200c7e6f4785";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);

  if (city) {
    h1.innerHTML = `${city}`;
  } else {
    h1.innerHTML = null;
    alert("What city are you looking for?");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getCity);
