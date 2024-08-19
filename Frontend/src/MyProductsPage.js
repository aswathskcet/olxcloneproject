import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from './FavoritesContext'; // Import the context
import './MyProductsPage.css';

const MyProductsPage = () => {
  const [myProducts, setMyProducts] = useState([]);
  const { favorites, addFavorite, removeFavorite } = useFavorites(); // Use the context
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve the username from local storage
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);

    const fetchMyProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/all'); // Adjust endpoint as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Filter products based on the username
        const filteredProducts = data.filter(product => product.username === storedUsername);
        setMyProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchMyProducts();
  }, []);

  const handleContainerClick = (product) => {
    navigate('/item-details', { state: { item: product } });
  };

  const handleFavoriteClick = (productId) => {
    if (favorites.has(productId)) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  };

  const handleRemoveClick = async (productId) => {
    try {
      console.log('Removing product with ID:', productId); // Debugging line
      // Remove product from server
      const response = await fetch(`http://localhost:8080/api/users/remove-product/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove product');
      }

      // Update state to remove the product from the list
      setMyProducts(prevProducts => prevProducts.filter(product => product.id !== productId));

      console.log('Product removed successfully'); // Debugging line
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  if (myProducts.length === 0) return <div>No Products Available</div>;

  return (
    <div className="my-products-page-wrapper">
      {/* Navigation Bar */}
      <div className="my-products-navbar">
        <h1 className="my-products-title">My Products Page</h1>
      </div>

      {/* Products Content */}
      <div className="my-products-container">
        {myProducts.map(product => (
          <div 
            key={product.id} 
            className="item-container" 
            onClick={() => handleContainerClick(product)}
          >
            <img src={product.imageLink ? product.imageLink : 'default-image.jpg'} alt={product.title} className="item-image" />
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
            <button 
              className="remove-button" 
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveClick(product.id);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProductsPage;
