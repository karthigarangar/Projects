import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cloud, Sun, Wind } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto pt-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Your Personal Weather Companion
        </h1>
        <p className="text-xl text-gray-600">
          Get accurate weather forecasts for any city in the world
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Cloud className="h-12 w-12 text-blue-500" />}
          title="Real-time Updates"
          description="Get the latest weather information updated in real-time"
        />
        <FeatureCard
          icon={<Sun className="h-12 w-12 text-yellow-500" />}
          title="Detailed Forecasts"
          description="View detailed weather conditions including temperature, humidity, and more"
        />
        <FeatureCard
          icon={<Wind className="h-12 w-12 text-purple-500" />}
          title="Wind Information"
          description="Track wind speed and direction for your location"
        />
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate('/weather')}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Check Weather Now
        </button>
      </div>

      {/* <div className="mt-16">
        <img
          src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=80"
          alt="Weather landscape"
          className="rounded-lg shadow-xl w-full h-64 object-cover pb-6"
        />
      </div> */}
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Home;