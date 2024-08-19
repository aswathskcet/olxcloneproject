import React, { useState, useEffect } from 'react';
import { useFavorites } from './FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './MyFavoritePage.css';

const MyFavoritePage = () => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const handleContainerClick = (item) => {
    navigate('/item-details', { state: { item } });
  };

  const fetchAllItems = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/all');
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadItems = async () => {
      const allItems = await fetchAllItems();
      setItems(allItems);
    };
    loadItems();
  }, []);

  const handleFavoriteClick = (itemId) => {
    if (favorites.has(itemId)) {
      removeFavorite(itemId); // Remove from favorites if already favorited
    } else {
      addFavorite(itemId); // Add to favorites if not already favorited
    }
  };

  const favoriteItems = items.filter(item => favorites.has(item.id));

  if (favoriteItems.length === 0) return <div>No favorites found</div>;

  return (
    <div className="my-favorites-page-wrapper">
      <div className="my-favorites-navbar">
        <h1 className="my-favorites-title">My Favorite Products</h1>
      </div>
      <div className="my-favorites-container">
        {favoriteItems.map(item => (
          <div 
            key={item.id} 
            className="item-container" 
            onClick={() => handleContainerClick(item)}
          >
            <img src={item.imageLink || 'default-image.jpg'} alt={item.title} className="item-image" />
            <h3 className="item-title">{item.title}</h3>
            <div 
              className="heart-icon" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigating to the item details page
                handleFavoriteClick(item.id);
              }}
            >
              {favorites.has(item.id) ? <FaHeart className="red-heart" /> : <FaRegHeart className="gray-heart" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavoritePage;
