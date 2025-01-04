import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_weather')
def get_weather():
    location_type = request.args.get('locationType')  # Get location type (city, state, country, manual)
    location = request.args.get('location')  # Get the location input
    temp_unit = request.args.get('tempUnit')  # Get selected temperature unit (C, F, K)
    
    api_key = '3268ceaa1ab842558f4135205250401'  # Replace with your actual API key
    
    # Build the URL for the API request
    url = f'http://api.weatherapi.com/v1/current.json?q={location}&key={api_key}'
    
    # Make the API request
    response = requests.get(url).json()
    
    if 'error' in response:
        return jsonify({'error': 'Location not found or invalid API request.'})
    
    # Extract temperature in Celsius from the response
    temp_celsius = response['current']['temp_c']
    
    # Convert temperature based on selected unit
    if temp_unit == 'F':
        temp = (temp_celsius * 9/5) + 32  # Celsius to Fahrenheit
        unit = 'F'
    elif temp_unit == 'K':
        temp = temp_celsius + 273.15  # Celsius to Kelvin
        unit = 'K'
    else:
        temp = temp_celsius  # Default to Celsius
        unit = 'C'
    
    # Prepare weather data for the frontend
    weather_data = {
        'city': response['location']['name'],
        'temp': round(temp, 2),
        'condition': response['current']['condition']['text'],
        'icon': response['current']['condition']['icon'],
        'unit': unit
    }
    
    return jsonify(weather_data)

if __name__ == '__main__':
    app.run(debug=True)
