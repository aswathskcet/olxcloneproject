import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdatePassword.css';
import { UserContext } from './UserContext'; // Import your context

const UpdatePassword = () => {
  const { username } = useContext(UserContext); // Get the username from context
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/users/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username, // Use the actual username here
          oldPassword,
          newPassword,
          confirmPassword
        }),
      });

      if (response.ok) {
        console.log('Password updated successfully');
        navigate('/'); 
      } else {
        const errorData = await response.text();
        setError(errorData || 'Failed to update password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="update-password-container">
    <div className = "cha">
     <dotlottie-player src="https://lottie.host/2dcb93bf-a652-486b-b898-9912c0144484/pmkCUN8c7B.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
    </div>
      <div className="form-container">
        <h2>Update Password</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            readOnly
          />
          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="update-password-btn">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
