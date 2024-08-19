import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { UserContext } from './UserContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  const handleDeleteAccount = () => {
    navigate('/delete-user');
  };

  const handleLogout = () => {
    setUsername(''); // Clear the username
    navigate('/'); // Navigate to the Signup page
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <div className="sidebar-content">
        <div className="user-icon">
          <FaUser color="white" size={58} />
        </div>
        <div className="user-name">{username || 'Guest'}</div>
        <button className="sidebar-btn" onClick={handleChangePassword}>Change Password</button>
        <button className="sidebar-btn" onClick={handleDeleteAccount}>Delete Account</button>
        <button className="sidebar-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
