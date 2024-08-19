import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:8080/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User signed up successfully:', data);
        navigate('/login'); // Redirect to Login page after successful sign-up
      } else {
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Navigate to Login page
  };
  
  return (
    <div className="signup-container">
    <div className='lot'>
    <dotlottie-player src="https://lottie.host/8917898a-385b-4fab-ad7b-d81fd5f71cc6/fGjL7Jkslq.json" background="transparent" speed="1"  loop autoplay></dotlottie-player>
    </div>
      <div className="signup-form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          <button type="button" className="login-btn" onClick={handleLoginRedirect}>
            Already have an account? Log In
          </button>
          </form>
          </div>
    </div>
  );
};

export default SignupPage;
