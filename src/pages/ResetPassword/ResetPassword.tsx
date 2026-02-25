import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCertifications } from '../../context/CertificationContext';
import apiService from '../../services/api';
import '../Login/Login.css';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useCart();
  const { appInfo: settings } = useCertifications();
  
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [step, setStep] = useState<'verify' | 'reset'>('verify');
  
  const [formData, setFormData] = useState({
    email: searchParams.get('email') || '',
    token: searchParams.get('token') || '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!formData.email) {
      showToast('Email is required. Please start from forgot password page.', 'error');
      navigate('/forgot-password');
    }
  }, [formData.email, navigate, showToast]);

  // Auto-verify token if provided via URL (from email link)
  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken && formData.email && step === 'verify') {
      handleVerifyToken(urlToken);
    }
  }, []);

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

  const validateToken = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.token.trim()) {
      newErrors.token = 'Reset code is required';
    } else if (!/^\d{6}$/.test(formData.token)) {
      newErrors.token = 'Reset code must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'Password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-])/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, number, and special character';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyToken = async (tokenOrEvent?: string | React.FormEvent) => {
    // If called from form submit, prevent default; if called with token string, use it directly
    let tokenToVerify = formData.token;
    if (typeof tokenOrEvent === 'string') {
      tokenToVerify = tokenOrEvent;
    } else if (tokenOrEvent && 'preventDefault' in tokenOrEvent) {
      tokenOrEvent.preventDefault();
    }

    // Validate the token
    if (!tokenToVerify || !/^\d{6}$/.test(tokenToVerify)) {
      showToast('Please enter a valid 6-digit code', 'error');
      return;
    }

    setVerifying(true);

    try {
      const response = await apiService.verifyResetToken({
        email: formData.email,
        token: tokenToVerify
      });

      if (response.success && response.data.valid) {
        setStep('reset');
        showToast('Code verified! Now set your new password.', 'success');
      }
    } catch (error: any) {
      console.error('Token verification error:', error);
      showToast(error.message || 'Invalid or expired code. Please try again.', 'error');
    } finally {
      setVerifying(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) {
      showToast('Please fix the password errors', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.resetPassword({
        email: formData.email,
        token: formData.token,
        newPassword: formData.newPassword
      });

      if (response.success) {
        showToast('Password reset successfully! You can now login.', 'success');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Password reset error:', error);
      showToast(error.message || 'Failed to reset password. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&#^()_+=\-]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side: Reset Password Form */}
        <div className="login-left">
          <div className="login-logo-container">
            <Link to="/">
              <img src="/logo.png" alt={settings.siteName} className="login-header-logo" />
            </Link>
          </div>

          <div className="login-form-content">
            {step === 'verify' ? (
              <>
                <div className="welcome-section">
                  <h1>Enter Reset Code</h1>
                  <p>
                    Enter the 6-digit code sent to <strong>{formData.email}</strong>
                  </p>
                </div>

                <form onSubmit={handleVerifyToken} className="login-form">
                  <div className="form-group">
                    <label htmlFor="token">Reset Code</label>
                    <input
                      type="text"
                      id="token"
                      name="token"
                      value={formData.token}
                      onChange={handleInputChange}
                      placeholder="Enter 6-digit code"
                      className={errors.token ? 'error' : ''}
                      maxLength={6}
                      autoFocus
                      style={{
                        fontSize: '1.5rem',
                        letterSpacing: '0.5rem',
                        textAlign: 'center'
                      }}
                    />
                    {errors.token && <span className="error-message">{errors.token}</span>}
                  </div>

                  <button type="submit" className="submit-btn" disabled={verifying}>
                    {verifying ? 'Verifying...' : 'Verify Code'}
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Link to="/forgot-password" className="back-to-login">
                      ← Resend Code
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="welcome-section">
                  <h1>Set New Password</h1>
                  <p>Create a strong password for your account</p>
                </div>

                <form onSubmit={handleResetPassword} className="login-form">
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                      className={errors.newPassword ? 'error' : ''}
                    />
                    {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                    
                    {/* Password Strength Indicator */}
                    {formData.newPassword && (
                      <div style={{ marginTop: '10px' }}>
                        <div style={{ 
                          display: 'flex', 
                          gap: '5px',
                          marginBottom: '5px'
                        }}>
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              style={{
                                flex: 1,
                                height: '4px',
                                borderRadius: '2px',
                                background: passwordStrength >= level 
                                  ? passwordStrength <= 2 ? '#ff4444'
                                  : passwordStrength <= 3 ? '#ff8800'
                                  : '#00cc44'
                                  : 'rgba(255, 255, 255, 0.2)'
                              }}
                            />
                          ))}
                        </div>
                        <span style={{ 
                          fontSize: '0.85rem',
                          color: passwordStrength <= 2 ? '#ff4444'
                            : passwordStrength <= 3 ? '#ff8800'
                            : '#00cc44'
                        }}>
                          {passwordStrength <= 2 ? 'Weak' 
                            : passwordStrength <= 3 ? 'Medium'
                            : 'Strong'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                  </div>

                  {/* Password Requirements */}
                  <div style={{ 
                    background: 'rgba(255, 183, 94, 0.1)', 
                    border: '1px solid rgba(255, 183, 94, 0.3)',
                    borderRadius: '8px',
                    padding: '15px',
                    fontSize: '0.9rem'
                  }}>
                    <div style={{ marginBottom: '8px', fontWeight: '500' }}>Password must contain:</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <div style={{ color: formData.newPassword.length >= 8 ? '#00cc44' : 'rgba(255,255,255,0.6)' }}>
                        {formData.newPassword.length >= 8 ? '✓' : '○'} At least 8 characters
                      </div>
                      <div style={{ color: /[A-Z]/.test(formData.newPassword) ? '#00cc44' : 'rgba(255,255,255,0.6)' }}>
                        {/[A-Z]/.test(formData.newPassword) ? '✓' : '○'} One uppercase letter
                      </div>
                      <div style={{ color: /[a-z]/.test(formData.newPassword) ? '#00cc44' : 'rgba(255,255,255,0.6)' }}>
                        {/[a-z]/.test(formData.newPassword) ? '✓' : '○'} One lowercase letter
                      </div>
                      <div style={{ color: /\d/.test(formData.newPassword) ? '#00cc44' : 'rgba(255,255,255,0.6)' }}>
                        {/\d/.test(formData.newPassword) ? '✓' : '○'} One number
                      </div>
                      <div style={{ color: /[@$!%*?&#^()_+=\-]/.test(formData.newPassword) ? '#00cc44' : 'rgba(255,255,255,0.6)' }}>
                        {/[@$!%*?&#^()_+=\-]/.test(formData.newPassword) ? '✓' : '○'} One special character
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </form>
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
                {step === 'verify' ? '🔑' : '🔒'}
              </div>
              <h2 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '20px',
                color: '#FFB75E'
              }}>
                {step === 'verify' ? 'Verify Your Identity' : 'Create New Password'}
              </h2>
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8',
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                {step === 'verify' 
                  ? 'Enter the verification code we sent to your email to proceed with password reset.'
                  : 'Choose a strong password to keep your account secure.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
