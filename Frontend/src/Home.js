import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaUser } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Notification from './Notification';
import './Home.css';
import { useEffect } from 'react';

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent going back to login page by replacing the history state
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleBellClick = () => {
    setNotificationVisible(true);
    setTimeout(() => setNotificationVisible(false), 5000); // Hide after 5 seconds
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-content">
          <div className="left-section">
            <div className="title">OLX Clone</div>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search..."
                className="search-bar"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
            <div className="nav-links">
              <Link to="/home">Home</Link>
              <Link to="/buy">Buy</Link>
              <Link to="/sell">Sell</Link>
              <Link to="/my-favorites">Favorites</Link>
              <Link to="/my-products">My Products</Link>
              <Link to="/about">About</Link>
            </div>
          </div>
          <div className="right-section">
            <FaBell className="nav-icon" style={{ marginRight: '1rem' }} onClick={handleBellClick} />
            <FaUser className="nav-icon" onClick={handleSidebarToggle} />
          </div>
        </div>
      </nav>
      {isNotificationVisible && (
        <Notification 
          message={`Welcome to OLX Clone`} 
          onClose={() => setNotificationVisible(false)} 
        />
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
      <div className='lottie'>
        <dotlottie-player src="https://lottie.host/41874d32-1980-4b7d-9ac8-6df1700a126a/nj0gMBZY1c.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
      </div>
    </div>
  );
};

export default Home;
