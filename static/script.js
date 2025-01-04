document.getElementById('locationType').addEventListener('change', function() {
    const locationType = this.value;
    const locationWrapper = document.getElementById('locationWrapper');
    const locationLabel = document.getElementById('locationLabel');

    // Show the location input field
    locationWrapper.style.display = 'block';

    // Change the label based on the selected location type
    if (locationType === 'city') {
        locationLabel.innerText = 'Enter City:';
    } else if (locationType === 'state') {
        locationLabel.innerText = 'Enter State:';
    } else if (locationType === 'country') {
        locationLabel.innerText = 'Enter Country:';
    } else if (locationType === 'manual') {
        locationLabel.innerText = 'Enter Manual Address:';
    }
});

document.getElementById('cityForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const locationType = document.getElementById('locationType').value;
    const location = document.getElementById('locationInput').value;
    const tempUnit = document.getElementById('tempUnit').value;

    // Prepare URL depending on the location type and temp unit
    const response = await fetch(`/get_weather?locationType=${locationType}&location=${location}&tempUnit=${tempUnit}`);
    const data = await response.json();

    if (data.error) {
        document.getElementById('weatherResult').innerHTML = `<p>${data.error}</p>`;
        document.getElementById('weatherResult').style.display = 'block';
    } else {
        document.getElementById('weatherCity').innerText = `Weather in ${data.city}`;
        document.getElementById('weatherTemp').innerText = `Temperature: ${data.temp}°${data.unit}`;
        document.getElementById('weatherCondition').innerText = `Condition: ${data.condition}`;
        document.getElementById('weatherIcon').src = `http:${data.icon}`;

        // Show editable fields
        document.getElementById('editLocation').value = location;
        document.getElementById('editTempUnit').value = tempUnit;

        // Show the weather result
        document.getElementById('weatherResult').style.display = 'block';
    }
});

// Handle updating weather when user edits location or unit
document.getElementById('updateWeather').addEventListener('click', async (e) => {
    e.preventDefault();

    const location = document.getElementById('editLocation').value;
    const tempUnit = document.getElementById('editTempUnit').value;

    // Prepare URL with new values
    const response = await fetch(`/get_weather?locationType=city&location=${location}&tempUnit=${tempUnit}`);
    const data = await response.json();

    if (data.error) {
        document.getElementById('weatherResult').innerHTML = `<p>${data.error}</p>`;
    } else {
        document.getElementById('weatherCity').innerText = `Weather in ${data.city}`;
        document.getElementById('weatherTemp').innerText = `Temperature: ${data.temp}°${data.unit}`;
        document.getElementById('weatherCondition').innerText = `Condition: ${data.condition}`;
        document.getElementById('weatherIcon').src = `http:${data.icon}`;
    }
});
