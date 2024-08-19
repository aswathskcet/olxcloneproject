import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from './FavoritesContext';
import './BuyPage.css'; // Reuse BuyPage styles

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/search?query=${query}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

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

  if (searchResults.length === 0) return <div>No products found.</div>;

  return (
    <div className="buy-page-wrapper">
      <div className="buy-container">
        {searchResults.map((product) => (
          <div
            key={product.id}
            className="item-container"
            onClick={() => handleContainerClick(product)}
          >
            <img
              src={product.imageLink || 'default-image.jpg'}
              alt={product.title}
              className="item-image"
            />
            <h3 className="item-title">{product.title}</h3>
            <div
              className="favorite-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick(product.id);
              }}
            >
              {favorites.has(product.id) ? <FaHeart color="red" size={24} /> : <FaRegHeart color="gray" size={24} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
