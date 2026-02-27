import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ReportGeneration = () => {
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportError, setReportError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Load favorite cities
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) {
      setFavoriteCities(JSON.parse(savedFavorites));
    } else {
      // Initialize with some default cities if none found
      const defaultCities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney'];
      setFavoriteCities(defaultCities);
      localStorage.setItem('favoriteCities', JSON.stringify(defaultCities));
    }
  }, []);

  const fetchWeatherData = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:5000/api/weather?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setSelectedCity(city);

      // Add to favorites if not already present
      if (!favoriteCities.includes(city)) {
        const updatedFavorites = [...favoriteCities, city];
        setFavoriteCities(updatedFavorites);
        localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeatherData(searchCity.trim());
    }
  };

  const generateReport = async () => {
    if (!selectedCity) {
      setReportError('Please select a city');
      return;
    }

    try {
      setReportLoading(true);
      setReportError(null);
      
      // Fetch report data from the report endpoint
      const response = await fetch(`http://localhost:5000/api/report?city=${encodeURIComponent(selectedCity)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate weather report');
      }
      const reportData = await response.json();
      
      // Generate PDF report
      const doc = new jsPDF();
      
      // Split the report text into lines
      const lines = reportData.report.split('\n');
      
      // Set initial position and line height
      let y = 20;
      const lineHeight = 7;
      
      // Add each line to the PDF
      doc.setFontSize(12);
      lines.forEach((line) => {
        // Check if line is a header
        if (line.includes('Weather Report:') || 
            line === 'Current Weather' || 
            line === 'Weather Recommendations') {
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          y += 5; // Add extra space before headers
        } else if (line.includes('Alert:') || 
                 line === 'Gardening Tips:') {
          // Style for weather alerts and gardening tips headers
          doc.setFontSize(13);
          doc.setFont('helvetica', 'bold');
          y += 3;
        } else {
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
        }
        
        // Add the line to the PDF
        doc.text(line, 20, y);
        y += lineHeight;
      });
      
      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      doc.setTextColor(150, 150, 150);
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text('Weather Report Generator - Page ' + i + ' of ' + pageCount, 105, doc.internal.pageSize.height - 10, { align: 'center' });
      }
      
      // Save the PDF
      doc.save(`${selectedCity}_weather_report.pdf`);
      
      setReportLoading(false);
    } catch (error) {
      setReportError(error.message);
      setReportLoading(false);
      console.error('Error generating report:', error);
    }
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    fetchWeatherData(city);
  };

  // Function to manually add a city to favorites
  const addCityToFavorites = () => {
    if (searchCity.trim() && !favoriteCities.includes(searchCity.trim())) {
      const updatedFavorites = [...favoriteCities, searchCity.trim()];
      setFavoriteCities(updatedFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
      setSelectedCity(searchCity.trim());
      setSearchCity('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-blue-500 to-indigo-600">
            <h1 className="text-3xl font-bold text-white">Weather Report Generator</h1>
            <p className="mt-2 text-blue-100">Search for a city or select from your favorites to generate a detailed weather report</p>
          </div>
          
          <div className="p-6">
            {/* Search Bar */}
            <div className="mb-8">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search for a city..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  {loading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <button 
                  type="submit" 
                  className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  disabled={loading || !searchCity.trim()}
                >
                  Search
                </button>
                <button 
                  type="button"
                  onClick={addCityToFavorites}
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  disabled={loading || !searchCity.trim() || favoriteCities.includes(searchCity.trim())}
                >
                  Add to Favorites
                </button>
              </form>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p className="font-medium">Weather Data Error</p>
                <p>{error}</p>
              </div>
            )}

            {/* Favorite Cities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Cities</h2>
              {favoriteCities.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {favoriteCities.map(city => (
                    <button
                      key={city}
                      onClick={() => handleSelectCity(city)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        selectedCity === city 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Search for cities or add them directly to your favorites</p>
              )}
            </div>

            {/* Current Weather Preview */}
            {weatherData && (
              <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Current Weather in {selectedCity}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Temperature</p>
                    <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
                    <p className="text-gray-600">{weatherData.weather}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="text-3xl font-bold">{weatherData.humidity}%</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Wind</p>
                    <p className="text-3xl font-bold">{weatherData.windSpeed} m/s</p>
                  </div>
                </div>
              </div>
            )}

            {/* Generate Report Section */}
            <div className="flex flex-col">
              {selectedCity ? (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-medium">Selected City: {selectedCity}</p>
                  <p className="text-sm text-gray-600">Click the button below to generate a report</p>
                </div>
              ) : (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="font-medium">No city selected</p>
                  <p className="text-sm text-gray-600">Please search for a city or select one from your favorites</p>
                </div>
              )}
              
              {reportError && (
                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                  <p className="font-medium">Report Generation Error</p>
                  <p>{reportError}</p>
                </div>
              )}

              {/* Generate Report Button */}
              <button
                onClick={generateReport}
                disabled={reportLoading || !selectedCity}
                className={`relative w-full md:w-2/3 lg:w-1/2 p-4 rounded-lg text-white font-medium mx-auto ${
                  reportLoading || !selectedCity
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all'
                }`}
              >
                {reportLoading ? (
                  <>
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Generating Report...
                  </>
                ) : (
                  <>
                    Download Weather Report
                  </>
                )}
              </button>
              
              <p className="mt-4 text-sm text-gray-600 text-center max-w-md mx-auto">
                Generate a detailed PDF weather report for {selectedCity || "your selected city"}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGeneration;