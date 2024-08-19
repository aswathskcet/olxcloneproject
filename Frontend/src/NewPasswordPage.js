// src/NewPasswordPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPasswordPage.css';

const NewPasswordPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          newPassword: newPassword,
        }),
      });

      if (response.ok) {
        // Password updated successfully
        navigate('/'); // Redirect to home page or login page
      } else {
        // Show error message
        const errorMessage = await response.text();
        setError(errorMessage || 'Failed to update password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="new-password-container">
    <div className = "foro">
     <dotlottie-player src="https://lottie.host/8beca56b-819f-460c-b15b-55e94fa31ff8/MAW4V5yEzw.json" background="transparent" speed="1"  loop autoplay></dotlottie-player>
    </div>
      <div className="form-container">
        <h2>New Password</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="confirm-btn">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordPage;
