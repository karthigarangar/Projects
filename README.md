# Weather Prediction Project

A full-stack weather prediction application that provides real-time weather information and reports using OpenWeatherMap API.

## Project Structure
```
Weather prediction project/
├── Backend/
├── Frontend/
│   ├── src/              # React source files
│   ├── public/           # Public assets
│   ├── package.json      # Frontend dependencies
│   └── tailwind.config.js # Tailwind CSS configuration
└── Python/
    ├── app.py            # Main Flask application
    ├── config.py         # Configuration settings
    └── requirements.txt  # Python dependencies
```cd
```

## Prerequisites
```
- Python 3.8 or higher
- pip (Python package manager)
- Node.js 16.x or higher
- npm (Node.js package manager)
- OpenWeatherMap API key
```
## Setup Instructions

### Backend Setup

1. **Create and Activate Virtual Environment**
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate


   # Linux/MacOS
   python -m venv venv
   source venv/bin/activate
   ``
   
2. **Install Backend Dependencies**
   ```bash
   cd "Python"
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the Python directory
   - Add your OpenWeatherMap API key:
     ```
     WEATHER_API_KEY=your_api_key_here
     ```

### Frontend Setup
1. **Install Frontend Dependencies**
   ```bash
   cd "Frontend"
   npm install
   ```

2. **Configure Frontend Environment**
   - Create a `.env` file in the Frontend directory
   - Add the backend API URL:
     ```
     REACT_APP_API_URL=http://localhost:5000
     ```

## Running the Application

1. **Start the Backend Server**
   ```bash
   # Make sure you're in the Python directory
   python app.py
   ```
   The backend server will start on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   # In a new terminal, navigate to the Frontend directory
   cd "Frontend"
   npm start
   ```
   The frontend application will start on `http://localhost:3000`

3. **Access the Application**
   - Open your web browser and navigate to `http://localhost:3000`
   - The frontend will automatically connect to the backend API

## Available API Endpoints
- GET `/api/weather?city={city_name}` - Get current weather for a city
- GET `/api/report?city={city_name}` - Generate weather report for a city

## Features
- Real-time weather data retrieval
- Weather reports generation
- Support for multiple cities
- Temperature, humidity, wind speed, and more weather metrics
- Sunrise and sunset times

## Dependencies
- Flask (Web Framework)
- Flask-CORS (Cross-Origin Resource Sharing)
- Requests (HTTP client)
- python-dotenv (Environment variables)
- Additional dependencies listed in `requirements.txt`

## Error Handling
- The application includes proper error handling for:
  - City not found
  - API errors
  - Missing parameters
  - Server errors

## Note
Make sure to obtain an API key from [OpenWeatherMap](https://openweathermap.org/api) before running the application.
