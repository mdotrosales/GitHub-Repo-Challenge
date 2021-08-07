function showCurrentLocationTemperature (response) {
  console.log(response);

}


function getCurrentPosition (position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey= "21bb68436e382aa3eb6a2a4b679453e3";
  let apiEndpoint ="https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&long=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentLocationTemperature);
}


function findCurrentPosition (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);

}

function updateTemperature (response) {
  let searchedTemperature = Math.round(response.data.main.temp);
  let headerTemp = document.querySelector("#header-temp");
  headerTemp.innerHTML = `${searchedTemperature}℉`;

}

function handleCitySearch (event) {
   event.preventDefault();
  let cityInput = document.querySelector("#city-search-field");
  let headerCity = document.querySelector("#header-city");
  headerCity.innerHTML = `${cityInput.value}`;

  let city = `${cityInput.value}`;
  let units = "imperial";
  let apiKey= "21bb68436e382aa3eb6a2a4b679453e3";
  let apiEndpoint ="https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl= `${apiEndpoint}${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(updateTemperature);
}


let now = new Date ();
console.log(now);

let weekdays = ["SUN", "MON", "TUES", "WEDNES", "THURS", "FRI", "SAT"]
let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"]

let currentWeekday = weekdays[now.getDay()];
let currentDate = now.getDate();
let currentMonth = months[now.getMonth()];

let currentHour = now.getHours();
// the following will add a 0 in front of the hour when its a single integer
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinutes = now.getMinutes();
// the following will add a 0 in front of the minutes when its a single integer
if (currentMinutes <10) {
  currentMinutes = `0${currentMinutes}`
}

let actualDate = document.querySelector("#current-date");

actualDate.innerHTML = `${currentWeekday}, ${currentMonth} ${currentDate} at ${currentHour}:${currentMinutes} EST`

let form = document.querySelector("form");
form.addEventListener("submit", handleCitySearch);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", findCurrentPosition);



