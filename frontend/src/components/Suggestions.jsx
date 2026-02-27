// import React, { useState, useEffect } from 'react';
// import 'jspdf-autotable';

// const Suggestions = () => {
//   const [favoriteCities, setFavoriteCities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [reportLoading, setReportLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [reportError, setReportError] = useState(null);
//   const [weatherData, setWeatherData] = useState(null);

//   useEffect(() => {
//     const savedFavorites = localStorage.getItem('favoriteCities');
//     if (savedFavorites) {
//       setFavoriteCities(JSON.parse(savedFavorites));
//     } else {
//       const defaultCities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney'];
//       setFavoriteCities(defaultCities);
//       localStorage.setItem('favoriteCities', JSON.stringify(defaultCities));
//     }
//   }, []);

//   const fetchWeatherData = async (city) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`http://localhost:5000/api/weather?city=${encodeURIComponent(city)}`);
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to fetch weather data');
//       }
      
//       const data = await response.json();
//       setWeatherData(data);
//       setSelectedCity(city);

//       // Add to favorites if not already present
//       if (!favoriteCities.includes(city)) {
//         const updatedFavorites = [...favoriteCities, city];
//         setFavoriteCities(updatedFavorites);
//         localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
//       }
//     } catch (error) {
//       setError(error.message);
//       console.error('Error fetching weather data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateReport = async () => {
//     if (!selectedCity) {
//       setReportError('Please select a city');
//       return;
//     }

//     try {
//       setReportLoading(true);
//       setReportError(null);
      
//       // Fetch report data from the report endpoint
//       const response = await fetch(`http://localhost:5000/api/report?city=${encodeURIComponent(selectedCity)}`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to generate weather report');
//       }
//       const reportData = await response.json();
      
//       // Generate PDF report
//       const doc = new jsPDF();
      
//       // Split the report text into lines
//       const lines = reportData.report.split('\n');
      
//       // Set initial position and line height
//       let y = 20;
//       const lineHeight = 7;
      
//       // Add each line to the PDF
//       doc.setFontSize(12);
//       lines.forEach((line) => {
//         // Check if line is a header
//         if (line.includes('Weather Report:') || 
//             line === 'Current Weather' || 
//             line === 'Weather Recommendations') {
//           doc.setFontSize(14);
//           doc.setFont('helvetica', 'bold');
//           y += 5; // Add extra space before headers
//         } else if (line.includes('Alert:') || 
//                  line === 'Gardening Tips:') {
//           // Style for weather alerts and gardening tips headers
//           doc.setFontSize(13);
//           doc.setFont('helvetica', 'bold');
//           y += 3;
//         } else {
//           doc.setFontSize(12);
//           doc.setFont('helvetica', 'normal');
//         }
        
//         // Add the line to the PDF
//         doc.text(line, 20, y);
//         y += lineHeight;
//       });
      
//       // Add footer
//       const pageCount = doc.internal.getNumberOfPages();
//       doc.setTextColor(150, 150, 150);
//       for (let i = 1; i <= pageCount; i++) {
//         doc.setPage(i);
//         doc.text('Weather Report Generator - Page ' + i + ' of ' + pageCount, 105, doc.internal.pageSize.height - 10, { align: 'center' });
//       }
      
//       // Save the PDF
//       doc.save(`${selectedCity}_weather_report.pdf`);
      
//       setReportLoading(false);
//     } catch (error) {
//       setReportError(error.message);
//       setReportLoading(false);
//       console.error('Error generating report:', error);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="px-6 py-8 bg-gradient-to-r from-blue-500 to-indigo-600">
//             <h1 className="text-3xl font-bold text-white">Seasonal Tips</h1>
//           </div>
          
//           <div className="p-6">
//             {/* Generate Report Section */}
//             <div className="flex flex-col">
//               {/* Generate Report Button */}
//               <button
//                 onClick={generateReport}
//                 disabled={reportLoading || !selectedCity}
//                 className={`relative w-full md:w-2/3 lg:w-1/2 p-4 rounded-lg text-white font-medium mx-auto ${
//                   reportLoading || !selectedCity
//                     ? 'bg-gray-400 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all'
//                 }`}
//               >
//                 {reportLoading ? (
//                   <>
//                     <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
//                     Generating Report...
//                   </>
//                 ) : (
//                   <>
//                     Download Weather Report
//                   </>
//                 )}
//               </button>
              
//               <p className="mt-4 text-sm text-gray-600 text-center max-w-md mx-auto">
//                 Generate a detailed PDF weather report for {selectedCity || "your selected city"}.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Suggestions;

import React, { useState, useEffect } from 'react';

const Suggestions = () => {
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState('');

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) {
      setFavoriteCities(JSON.parse(savedFavorites));
    } else {
      const defaultCities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney'];
      setFavoriteCities(defaultCities);
      localStorage.setItem('favoriteCities', JSON.stringify(defaultCities));
    }
  }, []);

  const fetchWeatherSuggestions = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:5000/api/report?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch suggestions');
      }
      const data = await response.json();
      setSuggestions(data.report);
      setSelectedCity(city);

      if (!favoriteCities.includes(city)) {
        const updatedFavorites = [...favoriteCities, city];
        setFavoriteCities(updatedFavorites);
        localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeatherSuggestions(searchCity.trim());
    }
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    fetchWeatherSuggestions(city);
  };

  const renderSuggestions = () => {
    if (!suggestions) return null;

    const lines = suggestions.split('\n').filter(Boolean);

    return lines.map((line, index) => {
      const isHeader = line.includes('Weather Report:') || 
                       line === 'Current Weather' || 
                       line === 'Weather Recommendations';

      const isAlert = line.includes('Alert:') || 
                      line === 'Gardening Tips:';

      return (
        <div
          key={index}
          className={`p-4 mb-3 rounded-xl shadow-sm ${
            isHeader ? 'bg-blue-100 text-blue-800 font-bold text-lg' :
            isAlert ? 'bg-red-100 text-red-700 font-semibold' :
            'bg-white text-gray-800'
          }`}
        >
          {line}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-blue-500 to-indigo-600">
            <h1 className="text-3xl font-bold text-white">Seasonal Tips</h1>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="p-6 flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Search city..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full sm:w-1/2"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Search
            </button>
          </form>

          {/* Favorite Cities */}
          <div className="px-6 pb-4">
            <h2 className="text-lg font-semibold mb-2">Favorite Cities</h2>
            <div className="flex flex-wrap gap-3">
              {favoriteCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleSelectCity(city)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCity === city
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Suggestions Section */}
          <div className="px-6 pb-8">
            {loading && (
              <p className="text-center text-gray-600">Loading suggestions...</p>
            )}
            {error && (
              <p className="text-center text-red-600">{error}</p>
            )}
            {!loading && !error && suggestions && (
              <div className="mt-6 space-y-2">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  Seasonal Tips for {selectedCity}
                </h3>
                {renderSuggestions()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
