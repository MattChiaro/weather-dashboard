var cityNameEl = document.querySelector('#city-name')
var qInput = document.querySelector('#q')
var searchForm = document.querySelector('#city-search')
var apiKey = 'e15c17ab5737c79cccfc6cb26a3943b2'
var currentTempEl = document.querySelector('#current-temp')
var currentWindSpeedEl = document.querySelector('#current-wind-speed')
var currentHumidityEl = document.querySelector('#current-humidity')
var currentIconImageEl = document.querySelector('#current-icon-image')


var handleSearch = function (event) {
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
            var state = data[0].state;

            var weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

            fetch(weatherApiUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var currentCity = data.name;
                    var currentTemp = data.main.temp;
                    var currentWindSpeed = data.wind.speed;
                    var currentHumidity = data.main.humidity;
                    var iconCode = data.weather[0].icon
                    var iconImage = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

                    currentIconImageEl.setAttribute('src', iconImage)
                    cityNameEl.textContent = `Current Weather for: ${currentCity}, ${state}`;
                    currentTempEl.textContent = `Temp: ${currentTemp}*F`;
                    currentWindSpeedEl.textContent = `Wind Speed: ${currentWindSpeed} MPH`;
                    currentHumidityEl.textContent = `Humidity: ${currentHumidity}%`;

                    var fiveDayApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

                    fetch(fiveDayApiUrl)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data);

                            for (let i = 0; i < 40; i += 8) {
                                var temp = data.list[i].main.temp;

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
                                cardIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`)
                                cardTempEl.textContent = `Temp: *F`;
                                cardWindEl.textContent = `Wind: `;
                                cardHumidityEl.textContent = `Humidity: %`;

                                cardBodyEl.appendChild(cardTitleEl, cardIcon, cardTempEl, cardWindEl, cardHumidityEl);
                                cardEl.appendChild(cardBodyEl);
                                document.querySelector('.card-group').appendChild(cardEl);








                            }
                        })

                })
        })
}

searchForm.addEventListener('submit', handleSearch);
