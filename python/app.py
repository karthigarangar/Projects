from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from datetime import datetime
import config

app = Flask(__name__)
CORS(app)

@app.route('/api/weather', methods=['GET'])
def get_weather():
    city_name = request.args.get('city', config.DEFAULT_CITY)
    
    try:
        complete_url = f"{config.BASE_URL}q={city_name}&appid={config.API_KEY}&units=metric"
        response = requests.get(complete_url)
        data = response.json()

        if data.get("cod") != 404:
            main = data.get("main", {})
            wind = data.get("wind", {})
            weather_desc = data["weather"][0]["description"] if data["weather"] else "N/A"
            
            return jsonify({
                "city": data.get("name"),
                "country": data["sys"].get("country"),
                "temperature": main.get("temp"),
                "weather": weather_desc.capitalize(),
                "pressure": main.get("pressure"),
                "humidity": main.get("humidity"),
                "windSpeed": wind.get("speed"),
                "sunrise": datetime.fromtimestamp(data["sys"].get("sunrise", 0)).strftime('%H:%M:%S'),
                "sunset": datetime.fromtimestamp(data["sys"].get("sunset", 0)).strftime('%H:%M:%S')
            })
        else:
            return jsonify({"error": "City not found"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/report', methods=['GET'])
def generate_report():
    city_name = request.args.get('city')
    
    if not city_name:
        return jsonify({"error": "City parameter is required"}), 400
        
    try:
        # Get weather data for the city
        complete_url = f"{config.BASE_URL}q={city_name}&appid={config.API_KEY}&units=metric"
        response = requests.get(complete_url)
        data = response.json()
        
        if data.get("cod") == 404:
            return jsonify({"error": "City not found"}), 404

        # Get current date and time
        current_time = datetime.now().strftime("%m/%d/%Y at %I:%M:%S %p")
            
        # Format the report text
        main = data.get("main", {})
        weather = data.get("weather", [{}])[0]
        wind = data.get("wind", {})
        clouds = data.get("clouds", {})
        
        temp = main.get('temp')
        feels_like = main.get('feels_like')
        humidity = main.get('humidity')
        wind_speed = wind.get('speed')
        cloud_coverage = clouds.get('all')
        description = weather.get('description', '').capitalize()

        # Generate weather-based suggestions
        suggestions = []
        if temp >= 30:
            suggestions.extend([
                "High Temperature Alert:",
                "- Stay hydrated! Drink at least 8-10 glasses of water",
                "- Avoid outdoor activities during peak hours (11 AM - 4 PM)",
                "- Wear light, breathable clothing"
            ])
            # Gardening tips for hot weather
            suggestions.extend([
                "Gardening Tips:",
                "- Water plants early morning or evening",
                "- Consider growing heat-resistant plants like Marigolds, Sunflowers, or Zinnias",
                "- Use mulch to retain soil moisture"
            ])
        elif temp <= 15:
            suggestions.extend([
                "Cold Weather Alert:",
                "- Dress in warm layers",
                "- Stay warm and protect yourself from cold winds",
                "- Consider indoor activities"
            ])
            # Gardening tips for cold weather
            suggestions.extend([
                "Gardening Tips:",
                "- Protect sensitive plants from frost",
                "- Consider growing cold-hardy plants like Pansies, Kale, or Winter Jasmine",
                "- Reduce watering frequency"
            ])
        else:
            suggestions.extend([
                "Pleasant Weather Alert:",
                "- Perfect weather for outdoor activities",
                "- Great conditions for exercise and sports",
                "- Enjoy nature walks or picnics"
            ])
            # Gardening tips for moderate weather
            suggestions.extend([
                "Gardening Tips:",
                "- Ideal conditions for most plants",
                "- Great time for planting seasonal flowers and vegetables",
                "- Maintain regular watering schedule"
            ])

        # Format the report
        report = f"Weather Report: {city_name}\n"
        report += f"Generated on: {current_time}\n\n"
        report += "Current Weather\n"
        report += f"Temperature: {temp}°C\n"
        report += f"Feels Like: {feels_like if feels_like is not None else 'N/A'}°C\n"
        report += f"Description: {description}\n"
        report += f"Humidity: {humidity}%\n"
        report += f"Wind: {wind_speed} m/s\n"
        report += f"Clouds: {cloud_coverage}% clouds\n\n"
        
        # Add suggestions
        report += "Weather Recommendations\n"
        report += "\n".join(suggestions) + "\n\n"
        

        return jsonify({
            "report": report,
            "temperature": temp,
            "description": description,
            "suggestions": suggestions
        })
        
    except Exception as e:
        print(f"Error generating report: {str(e)}")
        return jsonify({"error": f"Failed to generate report: {str(e)}"}), 500

# Helper functions
def get_weather_emoji(code):
    if code >= 200 and code < 300: return '⛈️'  # Thunderstorm
    if code >= 300 and code < 400: return '🌧️'  # Drizzle
    if code >= 500 and code < 600: return '🌧️'  # Rain
    if code >= 600 and code < 700: return '🌨️'  # Snow
    if code >= 700 and code < 800: return '🌫️'  # Atmosphere
    if code == 800: return '☀️'                 # Clear
    if code > 800: return '🌤️'                 # Clouds
    return '❓'

def get_mock_hourly_data(current_temp):
    hours = ['Now', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM']
    temps = [current_temp]
    
    # Generate some variation in temperature
    for i in range(1, 8):
        variation = (i % 3 - 1) * 1.5
        temps.append(round(current_temp + variation, 1))
    
    hourly_data = []
    for i in range(8):
        hourly_data.append({
            'time': hours[i],
            'temp': temps[i],
            'icon': '☀️' if i % 3 == 0 else ('🌤️' if i % 3 == 1 else '☁️')
        })
    
    return hourly_data

def get_mock_daily_data():
    days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    daily_data = []
    
    for i, day in enumerate(days):
        daily_data.append({
            'day': day,
            'temp': 22 + (i % 5 - 2),
            'icon': '☀️' if i % 3 == 0 else ('🌤️' if i % 3 == 1 else '🌧️')
        })
    
    return daily_data

if __name__ == '__main__':
    app.run(debug=True, port=5000)

