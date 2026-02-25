import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, ArrowRight, Trash2, Lock, PlayCircle, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';

// Figma assets
const imgImage27 = "/assets/images/c968daeb-2b20-46c9-990a-846eaf036473.png";
const imgContainer = "/assets/images/13bde361-e1b0-4157-9494-527f58c240a3.png";
const imgContainer1 = "/assets/images/89749d69-a5be-4601-8e54-50b1224f9bb7.png";

interface CartItem {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  duration: string;
  pdus: string;
  image?: string;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();

  // Use actual cart items if available, otherwise use demo
  const items = cartItems && cartItems.length > 0 ? cartItems : [];
  const isEmpty = items.length === 0;
  
  // Calculate totals using discounted price (originalPrice) when available
  const subtotal = items.reduce((sum: number, item: CartItem) => {
    const price = item.originalPrice != null && item.originalPrice !== item.price ? item.originalPrice : item.price;
    return sum + (Number(price) || 0);
  }, 0);
  const discount = 200;
  const tax = 0;
  const total = Math.max(0, subtotal - discount + tax); // Ensure total is never negative

  const handleRemoveItem = (itemId: string) => {
    if (removeFromCart) {
      removeFromCart(itemId);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-white min-h-screen">      
      {isEmpty ? (
        /* Empty Cart State */
        <div className="relative min-h-[calc(100vh-570px)] flex items-center justify-center py-20">
          <div className="flex flex-col items-center justify-center gap-10">
            <h1 
              className="text-[#1f3a5f] text-[32px] font-semibold leading-[60px] text-center"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Shopping Cart
            </h1>
            
            {/* Empty Cart Image */}
            <div className="relative w-[406px] h-[324px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img 
                  alt="Empty Cart" 
                  className="absolute max-w-none"
                  src={imgImage27}
                  style={{
                    height: '185.19%',
                    left: '-48.52%',
                    top: '-42.59%',
                    width: '197.04%'
                  }}
                />
              </div>
            </div>

            {/* Empty Cart Message */}
            <div className="flex flex-col gap-7 items-center">
              <div 
                className="text-[#0b1f3b] text-base text-center whitespace-nowrap"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <p className="mb-0">
                  <span className="font-semibold">Your cart is empty</span>
                  <span> – </span>
                  <span className="text-[rgba(11,31,59,0.75)]">Looks like you haven't added any courses yet.</span>
                </p>
                <p className="leading-6 text-[rgba(11,31,59,0.75)]">Start exploring our training programs!</p>
              </div>
              
              <Link
                to="/self-study-bundle"
                className="bg-gradient-to-b from-[#9aaed3] to-[#5b89b3] px-4 py-3 rounded-md shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] text-[#dbebff] text-sm font-semibold text-center transition-opacity hover:opacity-90"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Browse Certifications
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Cart with Items */
        <div className="max-w-[1920px] mx-auto px-[100px] py-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 
              className="text-[#1f3a5f] text-[32px] font-semibold leading-[60px]"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Shopping Cart
            </h1>
            <p 
              className="text-[#0b1f3b] text-xl font-medium"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {items.length} Course{items.length !== 1 ? 's' : ''} in Cart
            </p>
          </div>

          {/* Main Content */}
          <div className="flex gap-5 items-start">
            {/* Cart Items List */}
            <div className="bg-white border border-[rgba(154,174,211,0.25)] rounded-2xl p-px w-[715px]">
              <div className="flex flex-col">
                {items.map((item: CartItem, index: number) => (
                  <div 
                    key={item.id}
                    className={`flex gap-6 items-start p-6 ${
                      index !== items.length - 1 ? 'border-b border-[#e5e7eb]' : ''
                    }`}
                  >
                    {/* Course Image */}
                    <div className="relative w-[104px] h-[104px] rounded-[14px] overflow-hidden flex-shrink-0">
                      <img 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        src={item.image || imgContainer}
                      />
                    </div>

                    {/* Course Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 
                          className="text-[#0b1f3b] text-lg font-bold leading-7"
                          style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                          {item.title}
                        </h3>
                        <div className="flex flex-col items-end ml-4">
                          {item.originalPrice != null && item.originalPrice !== item.price ? (
                            <>
                              <p className="text-gray-400 line-through text-base" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                                ${item.price}
                              </p>
                              <p className="text-[#1f3a5f] text-2xl font-semibold whitespace-nowrap" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                                ${item.originalPrice}
                              </p>
                            </>
                          ) : (
                            <p className="text-[#1f3a5f] text-2xl font-semibold whitespace-nowrap" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                              ${item.price}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 items-center mb-6">
                        <span 
                          className="text-[rgba(11,31,59,0.75)] text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          ⏱️ {item.duration || '4 Weeks'}
                        </span>
                        <span 
                          className="text-[rgba(11,31,59,0.75)] text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          📚 {item.pdus || '35 PDUs'}
                        </span>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="flex items-center gap-2 text-[#e7000b] text-sm font-semibold transition-opacity hover:opacity-80"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="flex-1 bg-white border border-[rgba(154,174,211,0.25)] rounded-2xl shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden">
              {/* Header */}
              <div className="bg-[#60a5fa] px-6 py-4 flex flex-col gap-1">
                <h2 
                  className="text-white text-xl font-bold leading-7"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Order Summary
                </h2>
                <p 
                  className="text-[#dbeafe] text-sm leading-5"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Review your selections
                </p>
              </div>

              {/* Summary Details */}
              <div className="p-6 flex flex-col gap-3">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span 
                    className="text-[rgba(11,31,59,0.75)] text-sm"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})
                  </span>
                  <span 
                    className="text-[#1f3a5f] text-sm font-semibold"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    ${subtotal}
                  </span>
                </div>

                {/* Discount */}
                {discount > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="/assets/icons/tag.svg" alt="" />
                      <span 
                        className="text-[rgba(11,31,59,0.75)] text-sm"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      >
                        Early Bird Discount
                      </span>
                    </div>
                    <span 
                      className="text-[#00a63e] text-sm font-semibold"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      -${discount}
                    </span>
                  </div>
                )}

                {/* Tax */}
                <div className="flex items-center justify-between">
                  <span 
                    className="text-[rgba(11,31,59,0.75)] text-sm"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    Tax
                  </span>
                  <span 
                    className="text-[#101828] text-sm font-semibold"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    ${tax}
                  </span>
                </div>

                {/* Total */}
                <div className="border-t-2 border-[rgba(154,174,211,0.25)] pt-3 mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span 
                      className="text-[#101828] text-lg font-bold"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      Total
                    </span>
                    <span 
                      className="text-[#1f3a5f] text-[30px] font-bold leading-9"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      ${total}
                    </span>
                  </div>
                  {discount > 0 && (
                    <p 
                      className="text-[rgba(11,31,59,0.75)] text-xs leading-4"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      You save ${discount} with early bird pricing
                    </p>
                  )}
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-b from-[#9aaed3] to-[#5b89b3] px-4 py-3 rounded-lg shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] text-[#dbebff] text-base font-semibold flex items-center justify-center gap-4 transition-opacity hover:opacity-90 mt-3"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Trust Badges */}
                <div className="flex flex-col gap-3 mt-3">
                  <div className="flex items-center gap-3">
                    <img src="/assets/icons/lock.svg" alt="" />
                    <span 
                      className="text-[rgba(11,31,59,0.75)] text-sm"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      Secure SSL encrypted payment
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="/assets/icons/box.svg" alt="" />
                    <span 
                      className="text-[rgba(11,31,59,0.75)] text-sm"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      Instant course access
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="/assets/icons/tag.svg" alt="" />
                    <span 
                      className="text-[rgba(11,31,59,0.75)] text-sm"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      30-day money-back guarantee
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Shopping Link */}
          <div className="mt-8">
            <Link
              to="/self-study-bundle"
              className="inline-flex items-center gap-2 text-[#60a5fa] text-base font-semibold transition-opacity hover:opacity-80"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Browsing
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
