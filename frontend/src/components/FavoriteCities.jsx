import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FavoriteCities = () => {
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    // Load favorite cities from localStorage
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (!savedFavorites) {
      setLoading(false);
      return;
    }
    
    const cities = JSON.parse(savedFavorites);
    setFavorites(cities);
    
    // Try to load from the cached weather data first
    const cachedWeatherData = localStorage.getItem('weatherData');
    let cachedData = {};
    
    if (cachedWeatherData) {
      try {
        cachedData = JSON.parse(cachedWeatherData);
        // Filter to only include favorites
        const filteredData = {};
        cities.forEach(city => {
          if (cachedData[city]) {
            filteredData[city] = cachedData[city];
          }
        });
        
        if (Object.keys(filteredData).length === cities.length) {
          setWeatherData(filteredData);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Error parsing cached weather data:", err);
      }
    }
    
    // If cached data is incomplete or not available, fetch from API
    fetchWeatherForCities(cities, cachedData);
  };

  const fetchWeatherForCities = async (cities, existingData = {}) => {
    setLoading(true);
    const citiesToFetch = cities.filter(city => !existingData[city]);
    
    if (citiesToFetch.length === 0) {
      setWeatherData(existingData);
      setLoading(false);
      return;
    }
    
    const weatherPromises = citiesToFetch.map(city =>
      fetch(`http://localhost:5001/api/weather?city=${city}`)
        .then(res => res.json())
        .catch(error => ({ error: true, city }))
    );

    try {
      const results = await Promise.all(weatherPromises);
      const newWeatherData = { ...existingData };
      
      results.forEach((result, index) => {
        if (!result.error) {
          const city = citiesToFetch[index];
          newWeatherData[city] = result;
        }
      });

      setWeatherData(newWeatherData);
      
      // Update localStorage cache
      localStorage.setItem('weatherData', JSON.stringify(newWeatherData));
    } catch (err) {
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = (city) => {
    const newFavorites = favorites.filter(c => c !== city);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
    
    // Also update cached weather data if needed
    const newWeatherData = { ...weatherData };
    delete newWeatherData[city];
    setWeatherData(newWeatherData);
    
    // No need to remove from the full cached data as it might be useful later
  };

  // Function to get appropriate weather icon based on temperature
  const getWeatherIcon = (temp) => {
    if (temp < 10) return '❄️';
    if (temp < 20) return '🌤️';
    if (temp < 30) return '☀️';
    return '🔥';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800">Favorite Cities</h1>
          <Link
            to="/weather"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
        
        {favorites.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-6xl mb-4">⭐</div>
            <p className="text-gray-600 mb-6 text-lg">No favorite cities yet.</p>
            <Link
              to="/"
              className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(city => {
              const data = weatherData[city];
              const temp = data?.current?.temp || (data?.temperature);
              const description = data?.current?.description || data?.weather;
              const humidity = data?.current?.humidity || data?.humidity;
              const windSpeed = data?.current?.wind_speed || data?.windSpeed;

              return (
                <div key={city} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{city}</h2>
                    <button
                      onClick={() => removeFromFavorites(city)}
                      className="text-white hover:text-red-200 transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {data ? (
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-4xl font-bold text-gray-800">
                          {Math.round(temp)}°C
                        </p>
                        <span className="text-4xl">
                          {getWeatherIcon(temp)}
                        </span>
                      </div>
                      <p className="text-lg text-gray-600 mb-4">{description}</p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Humidity</p>
                          <p className="font-medium">{humidity}%</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Wind</p>
                          <p className="font-medium">{windSpeed} m/s</p>
                        </div>
                      </div>
                      <Link
                        to="/weather"
                        state={{ city }}
                        className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <p>Unable to load weather data</p>
                      <button 
                        onClick={() => loadFavorites()}
                        className="mt-2 text-indigo-600 hover:text-indigo-800 underline"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteCities;