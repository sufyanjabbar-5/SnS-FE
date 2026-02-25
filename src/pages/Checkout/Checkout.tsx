import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, BadgeCheck, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import apiService from '../../services/api';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      // Small delay to allow state to settle, then redirect if empty
      const timer = setTimeout(() => {
        if (cartItems.length === 0) navigate('/self-study-bundle');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [cartItems, navigate]);

  const subtotal = cartItems.reduce((sum: number, item: any) => {
    const price = item.originalPrice != null && item.originalPrice !== item.price ? item.originalPrice : item.price;
    return sum + Number(price || 0);
  }, 0);
  const discount = 0; // Implement discount logic here
  const tax = 0;
  const total = subtotal - discount + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const items = cartItems.map((item: any) => ({
        type: item.type || 'offering',
        offeringId: item.offeringId,
        certificationId: item.certificationId,
        batchId: item.batchId,
        price: item.originalPrice != null && item.originalPrice !== item.price ? item.originalPrice : item.price
      }));

      const res = await apiService.registerAndEnroll(formData, items);
      
      if (res.success) {
        if (res.checkoutUrl) {
          // Clear cart before redirecting to external Stripe page
          clearCart();
          window.location.href = res.checkoutUrl;
        } else if (res.error) {
          // Registration worked, but Stripe failed
          setError(`Registration successful, but payment session failed: ${res.error}. Please contact support or try paying from your dashboard.`);
          // Don't clear cart yet so they can try again if fixed
        } else {
          clearCart();
          navigate('/payment/success');
        }
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl text-[#1f3a5f]">Your cart is empty. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1920px] mx-auto px-[100px] py-10 lg:py-20">
        <h1 
          className="text-[#1f3a5f] text-[32px] font-semibold leading-[60px] mb-10"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Checkout
        </h1>

        <div className="bg-white border border-[rgba(154,174,211,0.35)] rounded-[24px] overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Contact Form */}
            <div className="flex-1 bg-[rgba(154,174,211,0.1)] p-8">
              <form onSubmit={handleSubmit} className="max-w-[627px]">
                <div className="mb-8">
                  <h2 className="text-[#0b1f3b] text-[24px] font-semibold leading-[32px] mb-2 font-['DM_Sans']">
                    Contact Information
                  </h2>
                  <p className="text-[#0b1f3b] text-[14px] leading-[20px] opacity-75 font-['DM_Sans']">
                    We'll use this to send your certification access details
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-[#0b1f3b] text-[14px] font-bold leading-[20px] mb-2 font-['DM_Sans']">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                      className="w-full h-[48px] bg-white border border-[rgba(96,165,250,0.5)] rounded-[8px] px-4 text-[14px] text-[#0b1f3b] focus:outline-none focus:border-[#60a5fa] font-['DM_Sans']"
                    />
                  </div>
                  <div>
                    <label className="block text-[#0b1f3b] text-[14px] font-bold leading-[20px] mb-2 font-['DM_Sans']">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      required
                      className="w-full h-[48px] bg-white border border-[rgba(96,165,250,0.5)] rounded-[8px] px-4 text-[14px] text-[#0b1f3b] focus:outline-none focus:border-[#60a5fa] font-['DM_Sans']"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-[#0b1f3b] text-[14px] font-bold leading-[20px] mb-2 font-['DM_Sans']">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="w-full h-[48px] bg-white border border-[rgba(96,165,250,0.5)] rounded-[8px] px-4 text-[14px] text-[#0b1f3b] focus:outline-none focus:border-[#60a5fa] font-['DM_Sans']"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-[#0b1f3b] text-[14px] font-bold leading-[20px] mb-2 font-['DM_Sans']">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="********"
                    required
                    className="w-full h-[48px] bg-white border border-[rgba(96,165,250,0.5)] rounded-[8px] px-4 text-[14px] text-[#0b1f3b] focus:outline-none focus:border-[#60a5fa] font-['DM_Sans']"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-[#0b1f3b] text-[14px] font-bold leading-[20px] mb-2 font-['DM_Sans']">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    required
                    className="w-full h-[48px] bg-white border border-[rgba(96,165,250,0.5)] rounded-[8px] px-4 text-[14px] text-[#0b1f3b] focus:outline-none focus:border-[#60a5fa] font-['DM_Sans']"
                  />
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-['DM_Sans']">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full h-[48px] bg-gradient-to-b from-[#9aaed3] to-[#5b89b3] rounded-[8px] text-[#dbebff] text-[16px] font-semibold flex items-center justify-center gap-3 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 active:scale-[0.98]'} font-['DM_Sans']`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-[#dbebff] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Proceed to Payment
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Order Summary */}
            <div className="w-full lg:w-[505px] bg-[#0b1f3b] p-8 lg:rounded-bl-[24px] lg:rounded-tl-[24px]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-white text-[24px] font-bold leading-[32px] font-['DM_Sans']">
                  Order Summary
                </h2>
                <button 
                  className="text-[rgba(255,255,255,0.8)] text-[14px] font-medium transition-opacity hover:opacity-70 font-['DM_Sans']"
                  onClick={() => navigate('/cart')}
                >
                  Edit Cart
                </button>
              </div>

              <div className="flex flex-col gap-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item: any, index: number) => (
                  <div 
                    key={index}
                    className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-[14px] p-5"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white text-[14px] font-bold leading-[20px] font-['DM_Sans'] flex-1 pr-4">
                        {item.title}
                      </h3>
                      <div className="flex flex-col items-end">
                        {item.originalPrice != null && item.originalPrice !== item.price ? (
                          <>
                            <span className="text-gray-400 line-through text-xs font-['DM_Sans']">
                              ${item.price}
                            </span>
                            <span className="text-white text-[16px] font-bold leading-[24px] font-['DM_Sans']">
                              ${item.originalPrice}
                            </span>
                          </>
                        ) : (
                          <span className="text-white text-[16px] font-bold leading-[24px] font-['DM_Sans']">
                            ${item.price}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-[#dbeafe] text-[12px] leading-[16px] font-['DM_Sans'] opacity-80">
                      {item.duration || 'Flexible Access'} • {item.pdus || '35 PDUs'}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[rgba(255,255,255,0.2)] pt-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#dbeafe] text-[14px] leading-[20px] font-['DM_Sans']">Subtotal</span>
                  <span className="text-white text-[14px] font-bold leading-[20px] font-['DM_Sans']">${subtotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#dbeafe] text-[14px] leading-[20px] font-['DM_Sans']">Discount</span>
                    <span className="text-[#7bf1a8] text-[14px] font-bold leading-[20px] font-['DM_Sans']">-${discount}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#dbeafe] text-[14px] leading-[20px] font-['DM_Sans']">Tax</span>
                  <span className="text-white text-[14px] font-bold leading-[20px] font-['DM_Sans']">${tax}</span>
                </div>

                <div className="border-t border-[rgba(255,255,255,0.2)] pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-[18px] font-bold leading-[28px] font-['DM_Sans']">Total</span>
                    <span className="text-white text-[30px] font-bold leading-[36px] font-['DM_Sans']">${total}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[rgba(255,255,255,0.2)]">
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-[#60A5FA] flex-shrink-0" />
                  <span className="text-[#dbeafe] text-[14px] font-['DM_Sans']">Secure 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <BadgeCheck className="w-4 h-4 text-[#60A5FA] flex-shrink-0" />
                  <span className="text-[#dbeafe] text-[14px] font-['DM_Sans']">Money-back guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-[#60A5FA] flex-shrink-0" />
                  <span className="text-[#dbeafe] text-[14px] font-['DM_Sans']">Instant access after payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
