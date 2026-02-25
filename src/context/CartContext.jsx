import { createContext, useContext, useState, useEffect } from 'react';
import ToastContainer from '../components/Toast/ToastContainer';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('pmtraining_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('pmtraining_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const addToCart = (item) => {
    // Normalize item price to number
    const normalizedItem = {
      ...item,
      price: Number(item.price || 0),
      originalPrice: Number(item.originalPrice || 0)
    };

    // Check for duplicates using the id, offeringId, or batchId
    const existingItem = cartItems.find(i =>
      (normalizedItem.id && i.id === normalizedItem.id) ||
      (normalizedItem.offeringId && i.offeringId === normalizedItem.offeringId) ||
      (normalizedItem.batchId && i.batchId === normalizedItem.batchId) ||
      (normalizedItem.title && i.title === normalizedItem.title)
    );

    if (existingItem) {
      showToast('This item is already in your cart!', 'warning');
      return;
    }

    setCartItems([...cartItems, { ...normalizedItem, quantity: 1 }]);
    showToast('Item added to cart!', 'success');
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    showToast('Class removed from cart', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    showToast('Cart cleared', 'info');
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  };

  const getOriginalTotal = () => {
    return cartItems.reduce((sum, item) => sum + (Number(item.originalPrice) * item.quantity), 0);
  };

  const getSavings = () => {
    return getOriginalTotal() - getTotal();
  };

  const getItemCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotal,
    getOriginalTotal,
    getSavings,
    getItemCount,
    showToast
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </CartContext.Provider>
  );
};
