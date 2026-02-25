import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCertifications } from '../../context/CertificationContext';
import apiService from '../../services/api';
import '../Login/Login.css';

const ForgotPassword: React.FC = () => {
  const { showToast } = useCart();
  const { appInfo: settings } = useCertifications();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.forgotPassword(email);

      if (response.success) {
        setEmailSent(true);
        showToast('Password reset instructions sent! Check your email.', 'success');
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);
      // Show success message anyway for security (don't reveal if email exists)
      setEmailSent(true);
      showToast('If an account exists, you will receive password reset instructions.', 'info');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side: Forgot Password Form */}
        <div className="login-left">
          <div className="login-logo-container">
            <Link to="/">
              <img src="/logo.png" alt={settings.siteName} className="login-header-logo" />
            </Link>
          </div>

          <div className="login-form-content">
            {!emailSent ? (
              <>
                <div className="welcome-section">
                  <h1>Forgot Password?</h1>
                  <p>Enter your email address and we'll send you a code to reset your password.</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className={error ? 'error' : ''}
                      autoFocus
                    />
                    {error && <span className="error-message">{error}</span>}
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Code'}
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Link to="/login" className="back-to-login">
                      ← Back to Login
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="welcome-section">
                  <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📧</div>
                  <h1>Check Your Email</h1>
                  <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                    We've sent a 6-digit verification code to <strong>{email}</strong>
                  </p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem' }}>
                    The code will expire in 1 hour. If you don't see the email, check your spam folder.
                  </p>
                </div>

                <div className="form-actions" style={{ marginTop: '40px' }}>
                  <Link to={`/reset-password?email=${encodeURIComponent(email)}`}>
                    <button className="submit-btn">
                      Enter Reset Code
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      setEmailSent(false);
                      setEmail('');
                    }}
                    className="secondary-btn"
                    style={{
                      marginTop: '15px',
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white'
                    }}
                  >
                    Use Different Email
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="login-footer">
            <p>© {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="login-right">
          <div className="login-illustration">
            <div className="illustration-content">
              <div className="lock-icon" style={{ 
                fontSize: '120px', 
                marginBottom: '30px',
                filter: 'drop-shadow(0 10px 30px rgba(255, 183, 94, 0.3))'
              }}>
                🔐
              </div>
              <h2 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '20px',
                color: '#FFB75E'
              }}>
                Secure Password Reset
              </h2>
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8',
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                We'll send you a secure 6-digit code to verify your identity and help you create a new password.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
