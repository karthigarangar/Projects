import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="top-0 fixed w-full bg-gradient-to-r from-cyan-500 to-blue-500 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src="./weather-icon.svg" alt="Weather Icon" className="w-8 h-8 mr-2" />
            <Link to="/" className="flex items-center">
              <span className="text-2xl md:text-4xl font-bold text-white">Weather</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/weather" className="px-3 py-2 text-white hover:bg-white/20 rounded-lg text-xl">
              Dashboard
            </Link>
            <Link to="/reports" className="px-3 py-2 text-white hover:bg-white/20 rounded-lg text-xl">
              Report Generation
            </Link>
            <Link to="/favorites" className="px-3 py-2 text-white hover:bg-white/20 rounded-lg text-xl">
              Favorite Cities
            </Link>
            <Link to="/suggestions" className="px-3 py-2 text-white hover:bg-white/20 rounded-lg text-xl">
            Seasonal Tips
            </Link>
            
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-white hover:text-blue-600 transition-colors text-xl"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/"
                className="px-4 py-2 text-white hover:bg-white hover:text-blue-600 rounded-lg text-xl"
              >
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="mr-4 px-3 py-1 rounded-lg text-white bg-blue-600 hover:bg-white hover:text-blue-600 transition-colors text-base"
              >
                Logout
              </button>
            )}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-white hover:bg-white/20 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              {!isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-400">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/weather" 
              className="block px-3 py-2 text-white hover:bg-white/20 rounded-lg text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/reports" 
              className="block px-3 py-2 text-white hover:bg-white/20 rounded-lg text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Report Generation
            </Link>
            <Link 
              to="/favorites" 
              className="block px-3 py-2 text-white hover:bg-white/20 rounded-lg text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorite Cities
            </Link>
            {!isAuthenticated && (
              <Link
                to="/"
                className="block px-3 py-2 text-white hover:bg-white/20 rounded-lg text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const isAuthenticated = localStorage.getItem('token');
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="top-0 fixed w-full bg-gradient-to-r from-cyan-500 to-blue-500 z-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <img src="./weather-icon.svg" alt="Weather Icon" className="w-8 h-8 mr-2" />
//             <Link to="/" className="flex items-center">
//               <span className="text-2xl md:text-4xl font-bold text-white">Weather</span>
//             </Link>
//           </div>
          
//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link to="/weather" className="px-3 py-2 text-white hover:bg-white/20 rounded-lg text-xl">
//               Dashboard
//             </Link>
//             <Link to="/reports" className="px-3 py-2 text-white hover:bg-white/20 rounded-lg text-xl">
//               Report Generation
//             </Link>
//             <Link to="/favorites" className="px-3 py-2 text-white hover:bg-white/20 rounded-lg text-xl">
//               Favorite Cities
//             </Link>
            
//             {isAuthenticated ? (
//               <button
//                 onClick={handleLogout}
//                 className="ml-4 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-white hover:text-blue-600 transition-colors text-xl"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 to="/"
//                 className="px-4 py-2 text-white hover:bg-white hover:text-blue-600 rounded-lg text-xl"
//               >
//                 Login
//               </Link>
//             )}
//           </div>
          
//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             {isAuthenticated && (
//               <button
//                 onClick={handleLogout}
//                 className="mr-4 px-3 py-1 rounded-lg text-white bg-blue-600 hover:bg-white hover:text-blue-600 transition-colors text-base"
//               >
//                 Logout
//               </button>
//             )}
//             <button
//               onClick={toggleMenu}
//               className="p-2 rounded-md text-white hover:bg-white/20 focus:outline-none"
//               aria-expanded={isMenuOpen}
//             >
//               <span className="sr-only">Open main menu</span>
//               {/* Hamburger icon */}
//               {!isMenuOpen ? (
//                 <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               ) : (
//                 <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Mobile Navigation Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-blue-400">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <Link 
//               to="/weather" 
//               className="block px-3 py-2 text-white hover:bg-white/20 rounded-lg text-lg"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Dashboard
//             </Link>
//             <Link 
//               to="/reports" 
//               className="block px-3 py-2 text-white hover:bg-white/20 rounded-lg text-lg"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Report Generation
//             </Link>
//             <Link 
//               to="/favorites" 
//               className="block px-3 py-2 text-white hover:bg-white/20 rounded-lg text-lg"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Favorite Cities
//             </Link>
//             {!isAuthenticated && (
//               <Link
//                 to="/"
//                 className="block px-3 py-2 text-white hover:bg-white/20 rounded-lg text-lg"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;