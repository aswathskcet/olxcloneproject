// src/SellPage.js
import React, { useState } from 'react';
import './SellPage.css';
import { useNavigate } from 'react-router-dom';

const SellPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [tags, setTags] = useState('');
  const [deliveryOptions, setDeliveryOptions] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Get username from local storage
    const username = localStorage.getItem('username') || 'Guest';
  
    const sellDetails = {
      title,
      description,
      imageLink,
      category,
      price,
      condition,
      location,
      contactName,
      contactEmail,
      contactPhone,
      tags,
      deliveryOptions,
      username // Include username here
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/users/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sellDetails),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Success:', data);
  
      // Navigate to BuyPage with sellDetails in state
      navigate('/buy', { state: { sellDetails: sellDetails } });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  return (
    <div className="sell-container">
      <div className="sell-form-container">
        <h2>Sell Your Product</h2>
        <form onSubmit={handleSubmit} className="sell-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Item Title</label>
              <input
                type="text"
                id="title"
                placeholder="Item Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="furniture">Furniture</option>
                {/* Add more categories as needed */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="condition">Condition</label>
              <select
                id="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
              >
                <option value="">Select Condition</option>
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageLink">Image Link</label>
            <input
              type="text"
              id="imageLink"
              placeholder="Image Link"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactName">Contact Name</label>
              <input
                type="text"
                id="contactName"
                placeholder="Contact Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactEmail">Contact Email</label>
              <input
                type="email"
                id="contactEmail"
                placeholder="Contact Email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactPhone">Contact Phone Number</label>
              <input
                type="tel"
                id="contactPhone"
                placeholder="Contact Phone Number"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                placeholder="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="deliveryOptions">Delivery Options</label>
            <select
              id="deliveryOptions"
              value={deliveryOptions}
              onChange={(e) => setDeliveryOptions(e.target.value)}
              required
            >
              <option value="">Select Delivery Options</option>
              <option value="delivery">Delivery Available</option>
              <option value="pickup">Pickup Only</option>
            </select>
          </div>
          <button type="submit" className="sell-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SellPage;
