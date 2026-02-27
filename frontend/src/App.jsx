import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Weather from './components/Weather';
import Navbar from './components/Navbar';
import ReportGeneration from './components/ReportGeneration';
import FavoriteCities from './components/FavoriteCities';
import Layout from './components/Layout';
import Signup from './components/Signup';
import Suggestions from './components/Suggestions';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <AuthWrapper isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </Router>
  );
}

function AuthWrapper({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation();
  const showNavbar = isAuthenticated && location.pathname !== "/";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route element={isAuthenticated ? <ProtectedLayout /> : <Navigate to="/" />} >
          <Route path="/home" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/reports" element={<ReportGeneration />} />
          <Route path="/favorites" element={<FavoriteCities />} />
          <Route path="/suggestions" element={<Suggestions/>}/>
        </Route>
      </Routes>
    </>
  );
}

// Protected layout that applies the layout structure after login
function ProtectedLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
