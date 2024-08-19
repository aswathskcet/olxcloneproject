// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Import your UserContext

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { username } = useContext(UserContext); // Access username from context

  // Check if the user is authenticated (username exists)
  const isAuthenticated = !!username;

  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
