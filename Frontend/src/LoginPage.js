import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Import UserContext
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUsername: setContextUsername } = useContext(UserContext); // Destructure setUsername from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/login?username=${username}&password=${password}`,
        {
          method: 'GET',
        }
      );

      if (response.ok) {
        console.log('Login successful');
        console.log(username)
        localStorage.setItem('username', username); // Store the username in local storage
        setContextUsername(username); // Set the username in the context
        navigate('/home'); // Redirect to the home page after login
      } else {
        const errorData = await response.text();
        setError(errorData || 'Invalid username or password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/new-password'); // Navigate to the New Password page
  };

  return (
    <div className="login-container">
      <div className='login-lottie'>
        <dotlottie-player src="https://lottie.host/b66c8b10-87a5-4b93-945f-68b3d3f88bb4/SonplRFh5X.json" 
          background="transparent"
          speed="1" 
          loop
          autoplay></dotlottie-player>
      </div>
      <div className="form-container">
        <h2>Login</h2>
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
          <button type="button" className="forgot-password-btn" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
