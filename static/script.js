document.addEventListener("DOMContentLoaded", function() {
    const weatherForm = document.getElementById('weatherForm');
    const locationSelect = document.getElementById('locationSelect');
    const locationWrapper = document.getElementById('locationWrapper');
    const locationInput = document.getElementById('locationInput');
    const tempUnitSelect = document.getElementById('tempUnit');
    const editLocationInput = document.getElementById('editLocation');
    const editTempUnitSelect = document.getElementById('editTempUnit');
    const updateWeatherButton = document.getElementById('updateWeather');

    // Ensure no default selection
    locationSelect.selectedIndex = -1;

    // Prevent form submission
    weatherForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop page reload

        const location = locationInput.value;
        const unit = tempUnitSelect.value;

        if (!locationSelect.value || !location) {
            alert("Please select a location type and enter a value.");
            return;
        }

        fetchWeatherData(location, unit);
    });

    // Show location input based on user selection
    locationSelect.addEventListener('change', function() {
        if (locationSelect.value) {
            locationWrapper.style.display = 'block'; // Show the input field
            locationInput.placeholder = `Enter ${locationSelect.value} name`;
        } else {
            locationWrapper.style.display = 'none'; // Hide the input field
            locationInput.placeholder = 'Enter location'; // Default placeholder
        }
    });

    // Allow editing of location and temperature unit
    updateWeatherButton.addEventListener('click', function() {
        const updatedLocation = editLocationInput.value;
        const updatedUnit = editTempUnitSelect.value;

        if (updatedLocation && updatedUnit) {
            fetchWeatherData(updatedLocation, updatedUnit);
        } else {
            alert("Please fill out both location and unit to update the weather.");
        }
    });

    // Function to fetch weather data
    function fetchWeatherData(location, unit) {
        const apiKey = '3268ceaa1ab842558f4135205250401'; // Replace with your actual WeatherAPI key
        const unitParam = unit === 'metric' ? 'C' : 'F'; // WeatherAPI uses 'C' or 'F'
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.current) {
                    displayWeather(data, unitParam);
                } else {
                    alert("Failed to fetch weather data. Please check the location or API key.");
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                alert("Failed to fetch weather data. Please try again.");
            });
    }

    // Function to display weather data
    function displayWeather(data, unit) {
        const weatherResult = document.getElementById('weatherResult');
        const weatherCity = document.getElementById('weatherCity');
        const weatherTemp = document.getElementById('weatherTemp');
        const weatherCondition = document.getElementById('weatherCondition');

        const temp = unit === 'C' ? data.current.temp_c : data.current.temp_f;
        weatherCity.textContent = `${data.location.name}, ${data.location.country}`;
        weatherTemp.textContent = `${temp}° ${unit}`;
        weatherCondition.textContent = data.current.condition.text;

        weatherResult.style.display = 'block';
    }
});
