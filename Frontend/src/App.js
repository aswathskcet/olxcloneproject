import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './Home'; 
import BuyPage from './BuyPage';
import SellPage from './SellPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import AboutPage from './AboutPage';
import UpdatePassword from './UpdatePassword';
import NewPasswordPage from './NewPasswordPage'; 
import ItemDetailsPage from './ItemDetailsPage'; 
import MyFavoritePage from './MyFavoritePage'; 
import MyProductsPage from './MyProductsPage';
import SearchResultsPage from './SearchResultsPage'; // Import the SearchResultsPage component
import DeleteUser from './DeleteUser';
import { FavoritesProvider } from './FavoritesContext';
import { UserProvider } from './UserContext';

function App() {
  return (
    <FavoritesProvider>
        <UserProvider>
          <Router>
            <div className="app-container">
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/buy" element={<BuyPage />} />
                <Route path="/sell" element={<SellPage />} />
                <Route path="/" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/change-password" element={<UpdatePassword />} />
                <Route path="/new-password" element={<NewPasswordPage />} />
                <Route path="/item-details" element={<ItemDetailsPage />} />
                <Route path="/my-favorites" element={<MyFavoritePage />} />
                <Route path="/my-products" element={<MyProductsPage />} />
                <Route path="/search-results" element={<SearchResultsPage />} /> {/* Add this line */}
                <Route path="/delete-user" element={<DeleteUser />} />
              </Routes>
            </div>
          </Router>
        </UserProvider>
    </FavoritesProvider>
  );
}

export default App;
