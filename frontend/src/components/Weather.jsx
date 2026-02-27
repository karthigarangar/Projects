import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function Weather() {
  const [city, setCity] = useState('Salem');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const fetchWeather = async (searchCity = city) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${searchCity}`);
      setWeatherData(response.data);
      setError('');
      
      // Store the weather data in localStorage for favorites page to use
      if (response.data) {
        const storedWeatherData = localStorage.getItem('weatherData');
        const existingWeatherData = storedWeatherData ? JSON.parse(storedWeatherData) : {};
        
        // Transform the data to match the format used in favorites page
        existingWeatherData[response.data.city] = {
          current: {
            temp: response.data.temperature,
            description: response.data.weather,
            humidity: response.data.humidity,
            wind_speed: response.data.windSpeed
          },
          city: response.data.city,
          country: response.data.country
        };
        
        localStorage.setItem('weatherData', JSON.stringify(existingWeatherData));
      }
    } catch (err) {
      setError('City not found or error fetching data');
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  const toggleFavorite = () => {
    if (!weatherData) return;
    
    let newFavorites = [...favorites];
    if (isFavorite()) {
      // Remove from favorites
      newFavorites = favorites.filter(fav => fav !== weatherData.city);
    } else {
      // Add to favorites
      newFavorites.push(weatherData.city);
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
  };

  const isFavorite = () => {
    return weatherData && favorites.includes(weatherData.city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Search */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-indigo-800">Weather Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for a city..."
                className="w-full pl-4 pr-10 py-3 rounded-xl border-none ring-2 ring-indigo-100 focus:ring-indigo-400 focus:outline-none shadow-sm"
              />
              <button 
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            {/* {favorites.length > 0 && (
              <a 
                href="/favorites" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Favorites
              </a>
            )} */}
          </div>
        </div>

        {/* Date and Time Display */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white rounded-xl shadow-md px-5 py-3">
            <div className="text-gray-500 text-sm">Today</div>
            <div className="font-semibold text-lg">{moment().format('DD MMM, YYYY')}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md px-5 py-3">
            <div className="text-gray-500 text-sm">Current Time</div>
            <div className="font-semibold text-lg">{moment().format('hh:mm:ss A')}</div>
          </div>
        </div>

        {/* Main Content */}
        {error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        ) : weatherData && (
          <div>
            {/* Location Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {weatherData.city}, {weatherData.country}
                </h2>
                <button 
                  onClick={toggleFavorite}
                  className="ml-3 focus:outline-none"
                  aria-label={isFavorite() ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite() ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  )}
                </button>
                <p className="text-gray-600 mt-1 ml-1">{weatherData.weather}</p>
              </div>
              <div className="flex items-center mt-4 md:mt-0">
                <span className="text-5xl mr-2">
                  {weatherData.temperature < 10 ? '❄️' : 
                   weatherData.temperature < 20 ? '🌤️' : 
                   weatherData.temperature < 30 ? '☀️' : '🔥'}
                </span>
                <span className="text-4xl font-bold text-indigo-600">{weatherData.temperature}°C</span>
              </div>
            </div>

            {/* Weather Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <WeatherCard 
                title="Temperature"
                value={`${weatherData.temperature}°C`}
                icon="🌡️"
                color="bg-gradient-to-br from-orange-50 to-red-100"
                iconColor="text-red-500"
              />
              <WeatherCard 
                title="Humidity"
                value={`${weatherData.humidity}%`}
                icon="💧"
                color="bg-gradient-to-br from-blue-50 to-cyan-100"
                iconColor="text-blue-500"
              />
              <WeatherCard 
                title="Pressure"
                value={`${weatherData.pressure} hPa`}
                icon="🌪️"
                color="bg-gradient-to-br from-purple-50 to-indigo-100"
                iconColor="text-indigo-500"
              />
              <WeatherCard 
                title="Wind Speed"
                value={`${weatherData.windSpeed} m/s`}
                icon="💨"
                color="bg-gradient-to-br from-teal-50 to-green-100"
                iconColor="text-teal-500"
              />
            </div>

            {/* Sun Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Sun Information</h3>
              <div className="flex flex-col md:flex-row justify-around items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 text-3xl mb-2">
                    🌅
                  </div>
                  <p className="text-gray-500">Sunrise</p>
                  <p className="text-lg font-medium">{weatherData.sunrise}</p>
                </div>
                <div className="h-0.5 w-full md:w-32 bg-gradient-to-r from-amber-200 via-orange-300 to-red-300 opacity-70 my-2 md:my-0"></div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-100 text-3xl mb-2">
                    🌇
                  </div>
                  <p className="text-gray-500">Sunset</p>
                  <p className="text-lg font-medium">{weatherData.sunset}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WeatherCard({ title, value, icon, color, iconColor }) {
  return (
    <div className={`rounded-xl shadow-md p-6 ${color}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-700">{title}</h3>
        <span className={`text-2xl ${iconColor}`}>{icon}</span>
      </div>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

export default Weather;