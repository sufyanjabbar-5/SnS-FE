import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCertifications } from '../../context/CertificationContext';
import apiService from '../../services/api';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useCart();
  const { appInfo: settings } = useCertifications();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Please fill in all required fields correctly', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.login({
        email: formData.email,
        password: formData.password
      });

      if (response.success) {
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        showToast(`Welcome back, ${response.data.user.firstName}!`, 'success');

        if (response.data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      showToast(error.message || 'Authentication failed. Please try again.', 'error', 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side: Login Form */}
        <div className="login-left">
          <div className="login-logo-container">
            <Link to="/">
              <img src="/logo.png" alt={settings.siteName} className="login-header-logo" />
            </Link>
          </div>

          <div className="login-form-content">
            <div className="welcome-section">
              <h1>Welcome Back!</h1>
              <p>Enter credentials to access your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email/Username</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className={errors.email ? 'error' : ''}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="****************"
                  className={errors.password ? 'error' : ''}
                />
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" title="Forgot Password?" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>

          <div className="login-footer">
            <p>© {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
          </div>
        </div>

        {/* Right Side: Visual Image */}
        <div className="login-right">
          <div className="login-right-content">
            <h2>Unlock knowledge anytime, anywhere. Sign in to continue growing.</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
