require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/weather_app';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// User Schema and Model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    // Mock weather data for testing
    const weatherData = {
      current: {
        temp: 25,
        description: 'Partly cloudy',
        humidity: 65,
        wind: '5.2 m/s',
        clouds: '40% clouds',
        icon: '🌤️'
      },
      hourly: [
        { time: '1 PM', temp: 25, icon: '🌤️' },
        { time: '2 PM', temp: 26, icon: '☀️' },
        { time: '3 PM', temp: 26, icon: '☀️' },
        { time: '4 PM', temp: 25, icon: '🌤️' },
        { time: '5 PM', temp: 24, icon: '🌥️' },
        { time: '6 PM', temp: 23, icon: '🌥️' },
        { time: '7 PM', temp: 22, icon: '🌙' },
        { time: '8 PM', temp: 21, icon: '🌙' }
      ],
      daily: [
        { day: 'Today', temp: 26, icon: '🌤️' },
        { day: 'Friday', temp: 27, icon: '☀️' },
        { day: 'Saturday', temp: 25, icon: '🌤️' },
        { day: 'Sunday', temp: 24, icon: '🌥️' },
        { day: 'Monday', temp: 23, icon: '🌧️' },
        { day: 'Tuesday', temp: 25, icon: '🌤️' },
        { day: 'Wednesday', temp: 26, icon: '☀️' }
      ],
      news: [
        {
          title: `Weather Update for ${city}`,
          description: 'Expect mild temperatures with partly cloudy skies throughout the day.'
        },
        {
          title: 'Weekend Forecast',
          description: 'Perfect weather conditions expected for outdoor activities this weekend.'
        }
      ]
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error.message);
    res.status(500).json({ 
      message: 'Error fetching weather data',
      error: error.message 
    });
  }
});

// Helper function to process daily forecast
function processDailyForecast(forecastList) {
  const dailyData = {};
  
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    if (!dailyData[day]) {
      dailyData[day] = {
        temps: [],
        icons: []
      };
    }
    
    dailyData[day].temps.push(item.main.temp);
    dailyData[day].icons.push(item.weather[0].id);
  });

  return Object.entries(dailyData).map(([day, data]) => ({
    day,
    temp: Math.round(Math.max(...data.temps)),
    icon: getWeatherIcon(getMostFrequent(data.icons))
  })).slice(0, 7);
}

// Helper function to get most frequent weather condition
function getMostFrequent(arr) {
  return arr.sort((a,b) =>
    arr.filter(v => v === a).length - arr.filter(v => v === b).length
  ).pop();
}

// Helper function to convert weather codes to emoji icons
function getWeatherIcon(code) {
  if (code >= 200 && code < 300) return '⛈️';  // Thunderstorm
  if (code >= 300 && code < 400) return '🌧️';  // Drizzle
  if (code >= 500 && code < 600) return '🌧️';  // Rain
  if (code >= 600 && code < 700) return '🌨️';  // Snow
  if (code >= 700 && code < 800) return '🌫️';  // Atmosphere
  if (code === 800) return '☀️';               // Clear
  if (code > 800) return '☁️';                 // Clouds
  return '❓';
}

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Please provide email, password, and name' });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    user = new User({
      email,
      password: hashedPassword,
      name
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Protected route middleware
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// Protected route example
app.get('/api/auth/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
