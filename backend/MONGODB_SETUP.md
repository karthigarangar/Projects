# MongoDB Setup Guide

This backend now uses MongoDB instead of SQLite. Follow these steps to get it running:

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

This will install Mongoose and all other required packages:
- mongoose: MongoDB object modeling
- express: Web framework
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- cors: Cross-origin resource sharing
- dotenv: Environment variables

### 2. Setup MongoDB

#### Option A: Local MongoDB Installation
```bash
# Install MongoDB Community Edition (Windows)
# Download from: https://www.mongodb.com/try/download/community

# Start MongoDB service
# On Windows: MongoDB should start automatically after installation

# Default connection string:
# mongodb://localhost:27017/weather_app
```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/weather_app
   ```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weather_app
JWT_SECRET=your-secret-key-here
```

For MongoDB Atlas, use:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/weather_app
JWT_SECRET=your-secret-key-here
```

### 4. Start the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

You should see:
```
MongoDB connected
Server running on port 5000
```

## API Changes from SQLite to MongoDB

### Key Differences:
- User ID is now `_id` (MongoDB ObjectId) instead of `id`
- Password field has `select: false` to exclude it by default
- Email validation is built into the schema
- Timestamps are automatically managed

### User Model

The User schema now includes:
- `email` (String, unique, required, with validation)
- `password` (String, required, min 6 chars, not selected by default)
- `name` (String, required)
- `createdAt` (Date, auto-set)

## API Endpoints

All endpoints remain the same:

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user (requires JWT token)

### Weather
- `GET /api/weather?city=CityName` - Get weather data

## Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Get user (replace TOKEN with actual JWT)
curl -X GET http://localhost:5000/api/auth/user \
  -H "Authorization: Bearer TOKEN"
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify MongoDB is listening on port 27017 (default)

### "User already exists" error
- This means the email is already registered
- Try with a different email

### JWT Token Error
- Ensure JWT_SECRET is set in .env
- Include `Bearer ` prefix in Authorization header

## Next Steps

You can now:
1. Connect your React frontend to this backend
2. Add more models (favorites list, weather history, etc.)
3. Implement additional features like city favorites, weather alerts, etc.

