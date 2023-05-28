var cityNameEl = document.querySelector('#city-name')
var qInput = document.querySelector('#q')
var searchForm = document.querySelector('#city-search')
var apiKey = 'e15c17ab5737c79cccfc6cb26a3943b2'


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

            var weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

            fetch(weatherApiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
        })
})
}

searchForm.addEventListener('submit', handleSearch);
