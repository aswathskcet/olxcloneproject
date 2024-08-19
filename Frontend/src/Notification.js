import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext'; // Import UserContext to access the username
import './Notification.css'; // Ensure this CSS file exists

const Notification = ({ onClose }) => {
  const [isMouseInside, setIsMouseInside] = useState(false);
  const { username } = useContext(UserContext); // Get the username from context

  const message = `Welcome to OXL Clone${username ? `, ${username}` : ''}`;

  useEffect(() => {
    let timer;

    if (!isMouseInside) {
      timer = setTimeout(() => {
        onClose();
      }, 5000); // Automatically close after 5 seconds if mouse is not inside
    }

    return () => clearTimeout(timer); // Cleanup on unmount or mouse enters
  }, [isMouseInside, onClose]);

  return (
    <div
      className="notification open"
      onMouseEnter={() => setIsMouseInside(true)}
      onMouseLeave={() => setIsMouseInside(false)}
    >
      <button className="notification-close-btn" onClick={onClose}>×</button>
      <div className="notification-content">
        {message}
      </div>
    </div>
  );
};

export default Notification;
