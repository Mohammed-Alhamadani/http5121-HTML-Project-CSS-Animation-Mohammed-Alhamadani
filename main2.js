let locationButton = document.querySelector('.location-button');
let currentTemp = document.getElementById('current-temp');
let conditionsDiv = document.getElementById('conditions');
let forecastList = document.getElementById('forecast-list');
let locationElement = document.getElementById("location");
let getDataCountry = document.getElementById("getDataCountry");
let getDataCity = document.getElementById("getDataCity");


locationButton.addEventListener("click", function () {

    let getDataCountryValue = getDataCountry.value;
    let getDataCityValue = getDataCity.value;
    async function getAPIKey() {
        try {
            const response = await fetch("/api-key.txt");
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const apiKey = await response.text();
            // console.log(apiKey)
            return apiKey;
        } catch (e) {
            locationElement.innerHTML = e;
        }
    }



    async function GetValues(getDataCityValue, getDataCountryValue) {
        try {
            const apiKeyValue = await getAPIKey();
            // console.log(apiKeyValue)
            // console.log(getDataCityValue)
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${getDataCityValue},${getDataCountryValue}&appid=${apiKeyValue}`
            );
            // console.log(response)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const responseData = await response.json();
            // console.log(responseData)
            locationElement.innerHTML = responseData.sys.country + "  " + responseData.name;

            // convert Kelvin to Celsius
            currentTemp.innerHTML =
                `Temperature is ${Math.round(responseData.main.temp- 273.15)}°C`;
            let conditions = responseData.weather;
            // console.log(responseData.weather)
            let conditionArray = [];
            for (let i = 0; i < conditions.length; i++) {
                conditionArray.push(conditions[i]);
                
                conditionsDiv.innerHTML = "Condition is " + conditionArray[0].description.charAt(0)
                .toUpperCase() + conditionArray[0].description.slice(1) + ".";
                // conditionsDiv.innerHTML = "Condition is " + conditionArray[0].description;
                
            }
            console.log(conditionArray[0].description)
            let data = conditionArray[0].description;
            console.log(data)
            // console.log(data)

            function updateWeatherData(data) {
                const weatherConditions = document.querySelector('body');
                // const weatherConditions = document.querySelector('.weather-conditions');

                if (data.includes('clear')) {
                    weatherConditions.classList.add('sunny');
                } else if (data.includes('rain')) {
                    weatherConditions.classList.add('rainy');
                } else if (data.includes('cloud')) {
                    weatherConditions.classList.add('cloudy');
                }
                
                
            }
            updateWeatherData(data);
            return responseData;
        } catch (e) {
            locationElement.innerHTML = e;
        }
    }
    GetValues(getDataCityValue, getDataCountryValue);


});

