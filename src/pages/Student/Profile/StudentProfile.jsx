import React, { useState, useEffect } from 'react';
import apiService from '../../../services/api';
import { useCart } from '../../../context/CartContext';
import './StudentProfile.css';

const StudentProfile = () => {
  const { showToast } = useCart();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: ''
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || ''
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await apiService.request('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          company: userData.company
        })
      });

      if (response.success) {
        // Update localStorage with new data
        const updatedUser = {
          ...JSON.parse(localStorage.getItem('user')),
          ...response.data
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        showToast('Profile updated successfully!', 'success');
        setEditing(false);
        loadUserData();
      }
    } catch (error) {
      showToast(error.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    loadUserData();
    setEditing(false);
  };

  return (
    <div className="student-profile">
      <div className="profile-header">
        <div className="header-content">
          <div className="avatar-section">
            <div className="profile-avatar">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="profile-info">
              <h1>{userData.firstName} {userData.lastName}</h1>
              <p className="email">{userData.email}</p>
              <span className="role-badge">Student</span>
            </div>
          </div>
          
          {!editing && (
            <button className="edit-btn" onClick={() => setEditing(true)}>
              <i className="fas fa-edit"></i> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="content-section">
          <div className="section-header">
            <h2>Personal Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  disabled={!editing}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  disabled={!editing}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                disabled
                className="disabled-field"
              />
              <small className="field-hint">Email cannot be changed</small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  disabled={!editing}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  value={userData.company}
                  onChange={handleInputChange}
                  disabled={!editing}
                  placeholder="Enter your company name"
                />
              </div>
            </div>

            {editing && (
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save"></i> Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>Account Security</h2>
          </div>

          <div className="security-info">
            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-lock"></i>
              </div>
              <div className="info-details">
                <h4>Password</h4>
                <p>••••••••</p>
              </div>
              <button className="link-btn">Change Password</button>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="info-details">
                <h4>Two-Factor Authentication</h4>
                <p>Not enabled</p>
              </div>
              <button className="link-btn">Enable</button>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>Preferences</h2>
          </div>

          <div className="preferences-list">
            <div className="preference-item">
              <div className="preference-info">
                <h4>Email Notifications</h4>
                <p>Receive updates about your courses and enrollment</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>

            <div className="preference-item">
              <div className="preference-info">
                <h4>Course Reminders</h4>
                <p>Get reminded about upcoming classes</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>

            <div className="preference-item">
              <div className="preference-info">
                <h4>Marketing Emails</h4>
                <p>Receive information about new courses and promotions</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="content-section danger-zone">
          <div className="section-header">
            <h2>Danger Zone</h2>
          </div>

          <div className="danger-content">
            <div className="danger-info">
              <h4>Delete Account</h4>
              <p>Once you delete your account, there is no going back. Please be certain.</p>
            </div>
            <button className="btn-danger">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
