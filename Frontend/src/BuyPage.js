import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from './FavoritesContext'; // Import the context
import './BuyPage.css';

const BuyPage = () => {
  const [sellDetailsList, setSellDetailsList] = useState([]);
  const { favorites, addFavorite, removeFavorite } = useFavorites(); // Use the context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellDetails = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSellDetailsList(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSellDetails();
  }, []);

  const handleContainerClick = (item) => {
    navigate('/item-details', { state: { item } });
  };

  const handleFavoriteClick = (itemId) => {
    if (favorites.has(itemId)) {
      removeFavorite(itemId);
    } else {
      addFavorite(itemId);
    }
  };

  if (sellDetailsList.length === 0) return <div>Loading...</div>;

  return (
    <div className="buy-page-wrapper">
      <nav className="buy-page-navbar">
        <h1 className="buy-page-title">Buy Product</h1>
      </nav>
      <div className="buy-container">
        {sellDetailsList.map(sellDetails => (
          <div 
            key={sellDetails.id} 
            className="item-container" 
            onClick={() => handleContainerClick(sellDetails)}
          >
            <img src={sellDetails.imageLink ? sellDetails.imageLink : 'default-image.jpg'} alt={sellDetails.title} className="item-image" />
            <h3 className="item-title">{sellDetails.title}</h3>
            <div 
              className="favorite-icon" 
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick(sellDetails.id);
              }}
            >
              {favorites.has(sellDetails.id) ? <FaHeart color="red" size={24} /> : <FaRegHeart color="gray" size={24} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyPage;
