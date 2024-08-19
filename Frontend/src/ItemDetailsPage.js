import React from 'react';
import { useLocation } from 'react-router-dom';
import './ItemDetailsPage.css';

const ItemDetailsPage = () => {
  const location = useLocation();
  const { item } = location.state || {};

  if (!item) return <div>No details available.</div>;

  return (
    <div className="item-details-page">
      <div className="item-details-container">
        <h2>Product Details</h2>
        {/* Image at the top */}
        <img src={item.imageLink ? item.imageLink : 'default-image.jpg'} alt={item.title} className="item-image-large" />

        {/* Outer container with nested input boxes */}
        <div className="details-outer-box">
          <div className="details-input-box">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" value={item.title} readOnly />
          </div>
          <div className="details-input-box">
            <label htmlFor="category">Category</label>
            <input type="text" id="category" value={item.category} readOnly />
          </div>
          <div className="details-input-box">
            <label htmlFor="price">Price</label>
            <input type="text" id="price" value={item.price} readOnly />
          </div>
          <div className="details-input-box">
            <label htmlFor="condition">Condition</label>
            <input type="text" id="condition" value={item.condition} readOnly />
          </div>
          <div className="details-input-box">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" value={item.location} readOnly />
          </div>
          <div className="details-input-box">
            <label htmlFor="contactEmail">Contact Email</label>
            <input type="text" id="contactEmail" value={item.contactEmail} readOnly />
          </div>
          <div className="details-input-box">
            <label htmlFor="contactPhone">Contact Phone</label>
            <input type="text" id="contactPhone" value={item.contactPhone} readOnly />
          </div>
          <div className="details-input-box">
            <label htmlFor="tags">Tags</label>
            <input type="text" id="tags" value={item.tags} readOnly />
          </div>
          <div className="details-input-box">
            <label htmlFor="deliveryOptions">Delivery Options</label>
            <input type="text" id="deliveryOptions" value={item.deliveryOptions} readOnly />
          </div>
          <div className="details-input-box">
            <label htmlFor="description">Description</label>
            <textarea id="description" value={item.description} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
