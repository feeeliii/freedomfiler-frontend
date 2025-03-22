import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Überprüfen der Bildschirmgröße
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (profileMenuOpen) setProfileMenuOpen(false);
  };
  
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
    if (menuOpen) setMenuOpen(false);
  };
  
  const handleLogout = () => {
    // clear authentication state here
    navigate('/'); // Navigate back to login page
  };
  
  return (
    <nav className="p-4 pb-16">
      {/* Desktop Navigation */}
      {!isMobile ? (
        <div className="flex items-center">
          {/* Logo - Left */}
          <div className="-mr-20">
            <h1 className="text-2xl font-bold font-['Ranchers']">FreedomFiler</h1>
          </div>
          
          {/* Navigation Links - Center with flex-grow */}
          <div className="flex-grow flex justify-center">
            <div className="flex items-center space-x-10">
              <Link to="/neue-klage" className="text-gray-800 hover:text-[#EC1119]">Neue Klage</Link>
              <Link to="/klageschriften" className="text-gray-800 hover:text-[#EC1119]">Klageschriften</Link>
              <Link to="/textbausteine" className="text-gray-800 hover:text-[#EC1119]">Textbausteine</Link>
            </div>
          </div>
          
          {/* Profile Icon - Right */}
          <div className="relative">
            <button 
              onClick={toggleProfileMenu}
              className="focus:outline-none"
              aria-label="Profile menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#FFE1DE] rounded-md shadow-lg py-1 z-10">
                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-[#ffd1cc]">Profil</Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-[#ffd1cc]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Mobile Navigation */
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold font-['Ranchers']">FreedomFiler</h1>
          
          <div className="flex items-center space-x-4">
            {/* Profile Icon */}
            <div className="relative">
              <button 
                onClick={toggleProfileMenu}
                className="focus:outline-none"
                aria-label="Profile menu"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#FFE1DE] rounded-md shadow-lg py-1 z-10">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-[#ffd1cc]">Profil</Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-[#ffd1cc]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            
            {/* Hamburger Menu */}
            <div className="relative">
              <button 
                onClick={toggleMenu}
                className="focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#FFE1DE] rounded-md shadow-lg py-1 z-10">
                  <Link to="/neue-klage" className="block px-4 py-2 text-gray-800 hover:bg-[#ffd1cc]">Neue Klage</Link>
                  <Link to="/klageschriften" className="block px-4 py-2 text-gray-800 hover:bg-[#ffd1cc]">Klageschriften</Link>
                  <Link to="/textbausteine" className="block px-4 py-2 text-gray-800 hover:bg-[#ffd1cc]">Textbausteine</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
