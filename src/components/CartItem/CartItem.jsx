import React from 'react';
import './CartItem.css';

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <div className="cart-item-info">
          <span className="cart-item-date">
            <i className="fas fa-calendar"></i>
            {item.date}
          </span>
          <span className="cart-item-format">
            <i className="fas fa-laptop"></i>
            {item.format}
          </span>
          <span className="cart-item-location">
            <i className="fas fa-map-marker-alt"></i>
            {item.location}
          </span>
        </div>
      </div>

      <div className="cart-item-pricing">
        {item.originalPrice && (
          <span className="cart-item-original-price">
            ${item.originalPrice}
          </span>
        )}
        <span className="cart-item-price">${item.price}</span>
        {item.originalPrice && (
          <span className="cart-item-savings">
            Save ${item.originalPrice - item.price}
          </span>
        )}
      </div>

      <button 
        className="cart-item-remove"
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default CartItem;
