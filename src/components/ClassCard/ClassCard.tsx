import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import apiService from '../../services/api';
import './ClassCard.css';

interface ClassData {
  id: number;
  title: string;
  instructor: string;
  date: string;
  time: string;
  seats: number;
  duration?: string;
  price: number;
  originalPrice?: number;
}

interface ClassCardProps {
  classData: ClassData;
}

const ClassCard: React.FC<ClassCardProps> = ({ classData }) => {
  const { addToCart, showToast } = useCart();
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState(false);

  // Check if user is logged in
  const token = localStorage.getItem('access_token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isLoggedIn = !!token && !!user;

  const handleEnrollNow = async () => {
    if (!isLoggedIn) {
      // Not logged in - add to cart for guest checkout
      addToCart({
        id: classData.id.toString(),
        title: classData.title,
        price: classData.price,
        originalPrice: classData.originalPrice || classData.price,
        type: 'Class'
      });
      return;
    }

    // Logged in user - directly enroll
    try {
      setEnrolling(true);
      const response = await apiService.createEnrollment(classData.id);

      if (response.success) {
        showToast('Successfully enrolled! Redirecting to payment...', 'success');

        // Create checkout session for payment
        const paymentResponse = await apiService.createCheckoutSession(response.data.id);

        if (paymentResponse.success && paymentResponse.data.url) {
          // Redirect to Stripe checkout
          window.location.href = paymentResponse.data.url;
        } else {
          // Redirect to dashboard if payment session creation fails
          showToast('Enrollment successful! Please complete payment from your dashboard.', 'info');
          navigate('/student/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Enrollment error:', error);
      if (error.message.includes('already enrolled')) {
        showToast('You are already enrolled in this course!', 'warning');
      } else {
        showToast(error.message || 'Failed to enroll. Please try again.', 'error');
      }
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="class-card">
      <div className="class-header">
        <h3 className="class-title">{classData.title}</h3>
        <div className="class-instructor">
          <i className="fas fa-user-tie"></i>
          {classData.instructor}
        </div>
      </div>

      <div className="class-details">
        <div className="detail-item">
          <i className="fas fa-calendar"></i>
          <span>{classData.date}</span>
        </div>
        <div className="detail-item">
          <i className="fas fa-clock"></i>
          <span>{classData.time}</span>
        </div>
        <div className="detail-item">
          <i className="fas fa-users"></i>
          <span>{classData.seats} seats left</span>
        </div>
        {classData.duration && (
          <div className="detail-item">
            <i className="fas fa-hourglass-half"></i>
            <span>{classData.duration}</span>
          </div>
        )}
      </div>

      <div className="class-features">
        <div className="feature-tag">
          <i className="fas fa-certificate"></i>
          35 PDUs
        </div>
        <div className="feature-tag">
          <i className="fas fa-book"></i>
          Materials Included
        </div>
      </div>

      <div className="class-footer">
        <div className="price-section">
          {classData.originalPrice && (
            <span className="original-price">${classData.originalPrice}</span>
          )}
          <span className="current-price">${classData.price}</span>
          {classData.originalPrice && (
            <span className="discount">
              Save ${classData.originalPrice - classData.price}
            </span>
          )}
        </div>
        <button
          className={`add-to-cart-btn ${enrolling ? 'loading' : ''}`}
          onClick={handleEnrollNow}
          disabled={classData.seats === 0 || enrolling}
        >
          {classData.seats === 0 ? (
            'Sold Out'
          ) : enrolling ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Enrolling...
            </>
          ) : isLoggedIn ? (
            'Enroll Now'
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
