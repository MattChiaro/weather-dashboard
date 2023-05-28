var cityNameEl = document.querySelector('#city-name')
var qInput = document.querySelector('#q')
var searchForm = document.querySelector('#city-search')
var apiKey = 'e15c17ab5737c79cccfc6cb26a3943b2'
var currentTempEl = document.querySelector('#current-temp')
var currentFeelsLikeEl = document.querySelector('#current-feels-like')
var currentHumidityEl = document.querySelector('#current-humidity')
var currentDescriptionEl = document.querySelector('#current-description')
var currentIconImageEl = document.querySelector('#current-icon-image')


var handleSearch = function(event) {
    event.preventDefault();

    var q = qInput.value.trim();

    
    var geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${apiKey}`


    fetch(geoApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;

            var weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

            fetch(weatherApiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var currentCity = data.name;
                var currentTemp = data.main.temp;
                var currentFeelsLike = data.main.feels_like;
                var currentHumidity = data.main.humidity;
                var currentDescription = data.weather[0].description.toString();
                var iconCode = data.weather[0].icon
                var iconImage = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

                currentIconImageEl.setAttribute('src', iconImage)
                cityNameEl.textContent = `Current Weather for: ${currentCity}`;
                currentTempEl.textContent = `Temp: ${currentTemp}*F`;
                currentFeelsLikeEl.textContent = `Feels Like: ${currentFeelsLike}*F`;
                currentHumidityEl.textContent = `Humidity: ${currentHumidity}%`;
                currentDescriptionEl.textContent = currentDescription;

        })
})
}

searchForm.addEventListener('submit', handleSearch);
