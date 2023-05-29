var cityNameEl = document.querySelector('#city-name')
var qInput = document.querySelector('#q')
var searchForm = document.querySelector('#city-search')
var apiKey = 'e15c17ab5737c79cccfc6cb26a3943b2'
var currentTempEl = document.querySelector('#current-temp')
var currentWindSpeedEl = document.querySelector('#current-wind-speed')
var currentHumidityEl = document.querySelector('#current-humidity')
var currentIconImageEl = document.querySelector('#current-icon-image')
var searchHistory = document.querySelector('#search-history')



var handleSearch = function (event) {
    event.preventDefault();

    var q = qInput.value.trim();

    function searchHistory() {

        var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        if (searchHistory.indexOf(q) === -1) {
            searchHistory.push(q)
        }
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    }


    searchHistory();
    var geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${apiKey}`


    //fetch geo api to turn the city name into lat and lon coordinates
    fetch(geoApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            var state = data[0].state;

            var weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

            //using lat and lon coord, fetch the weather api to get current weather data and display it on the page in main card.
            fetch(weatherApiUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var currentCity = data.name;
                    var currentTemp = Math.round(data.main.temp);
                    var currentWindSpeed = Math.round(data.wind.speed);
                    var currentHumidity = data.main.humidity;
                    var iconCode = data.weather[0].icon
                    var iconImage = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

                    currentIconImageEl.setAttribute('src', iconImage)
                    cityNameEl.textContent = `Current Weather for: ${currentCity}, ${state}`;
                    currentTempEl.textContent = `Temp: ${currentTemp} \u00B0F`;
                    currentWindSpeedEl.textContent = `Wind Speed: ${currentWindSpeed} MPH`;
                    currentHumidityEl.textContent = `Humidity: ${currentHumidity}%`;

                    var fiveDayApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

                    //use same lat and lon to fetch the 5day/3hour api to get future weather data.
                    fetch(fiveDayApiUrl)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {

                            // Dynamically displays  '5 Day Forecast' header
                            var fiveDayHeaderEl = document.querySelector('#five-day-header');
        
                                fiveDayHeaderEl.className = '';
                                fiveDayHeaderEl.className = 'd-block';
                        
                            //increments by 8, since there are 40 responses for the api call - 8 per day. This pulls 5 different days spaced 24 hours apart. Dynamically creates cards for each day with their respective information.
                            for (let i = 0; i < 40; i += 8) {
                                var temp = Math.round(data.list[i].main.temp);
                                var wind = Math.round(data.list[i].wind.speed);
                                var humidity = data.list[i].main.humidity;
                                var icon = data.list[i].weather[0].icon;

                                var cardTitleEl = document.createElement('h5');
                                var cardIcon = document.createElement('img');
                                var cardTempEl = document.createElement('p');
                                var cardWindEl = document.createElement('p');
                                var cardHumidityEl = document.createElement('p');
                                var cardBodyEl = document.createElement('div');
                                var cardEl = document.createElement('div');

                                cardTitleEl.className = 'card-title';
                                cardIcon.className = 'card-icon';
                                cardTempEl.className = 'card-temp';
                                cardWindEl.className = 'card-wind';
                                cardHumidityEl.className = 'card-humidity';
                                cardBodyEl.className = 'card-body';
                                cardEl.className = 'card mx-1';

                                cardTitleEl.textContent = dayjs(data.list[i].dt_txt).format('dddd');
                                cardIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}.png`)
                                cardTempEl.textContent = `Temp: ${temp} \u00B0F`;
                                cardWindEl.textContent = `Wind: ${wind} MPH`;
                                cardHumidityEl.textContent = `Humidity: ${humidity}%`;

                                cardBodyEl.appendChild(cardTitleEl)
                                cardBodyEl.appendChild(cardTempEl)
                                cardBodyEl.appendChild(cardWindEl)
                                cardBodyEl.appendChild(cardHumidityEl)
                                cardBodyEl.appendChild(cardIcon)
                                cardEl.appendChild(cardBodyEl);
                                document.querySelector('.card-group').appendChild(cardEl);








                            }
                        })

                })
        })
}


//respond to submit click on search form.
searchForm.addEventListener('submit', handleSearch);
