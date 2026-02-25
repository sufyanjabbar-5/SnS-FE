import React, { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import apiService from '../../../services/api';
import './AdminSettings.css';

const AdminSettings = () => {
  const { showToast } = useCart();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'SnSCCS',
    siteDescription: 'Professional Project Management Training',
    contactEmail: 'info@snsccs.com',
    supportEmail: 'support@snsccs.com',
    phone: '+1 (555) 123-4567',
    address: '123 Training Street, Education City, ED 12345',
    corporateName: 'Samia Consulting Inc.',
    corporationNumber: '14059727',
    facebookUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
    instagramUrl: '',
    redditUrl: '',
    whatsappUrl: ''
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    emailHost: 'smtp.gmail.com',
    emailPort: '587',
    emailUser: '',
    emailPassword: '',
    emailFrom: 'noreply@snsccs.com',
    emailFromName: 'SnSCCS'
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    enrollmentNotifications: true,
    paymentNotifications: true,
    courseUpdates: true,
    systemAlerts: true,
    weeklyReports: false,
    monthlyReports: true
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    currency: 'USD',
    taxRate: '10',
    paymentMethods: {
      creditCard: true,
      paypal: true,
      bankTransfer: false
    },
    stripePublicKey: '',
    stripeSecretKey: '',
    paypalClientId: '',
    paypalSecret: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await apiService.request('/api/settings');

      if (response.success && response.data) {
        // Load general settings
        if (response.data.general) {
          setGeneralSettings(prev => ({ ...prev, ...response.data.general }));
        }

        // Load email settings
        if (response.data.email) {
          setEmailSettings(prev => ({ ...prev, ...response.data.email }));
        }

        // Load notification settings
        if (response.data.notification) {
          const notif = response.data.notification;
          setNotificationSettings({
            enrollmentNotifications: notif.enrollmentNotifications === 'true',
            paymentNotifications: notif.paymentNotifications === 'true',
            courseUpdates: notif.courseUpdates === 'true',
            systemAlerts: notif.systemAlerts === 'true',
            weeklyReports: notif.weeklyReports === 'true',
            monthlyReports: notif.monthlyReports === 'true'
          });
        }

        // Load payment settings
        if (response.data.payment) {
          const payment = response.data.payment;
          setPaymentSettings(prev => ({
            ...prev,
            currency: payment.currency || prev.currency,
            taxRate: payment.taxRate || prev.taxRate,
            paymentMethods: payment.paymentMethods ? JSON.parse(payment.paymentMethods) : prev.paymentMethods,
            stripePublicKey: payment.stripePublicKey || '',
            stripeSecretKey: payment.stripeSecretKey || '',
            paypalClientId: payment.paypalClientId || '',
            paypalSecret: payment.paypalSecret || ''
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveGeneral = async () => {
    setSaving(true);
    try {
      const response = await apiService.request('/api/settings/general', {
        method: 'PUT',
        body: JSON.stringify(generalSettings)
      });

      if (response.success) {
        showToast('General settings saved successfully', 'success');
      }
    } catch (error) {
      showToast(error.message || 'Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEmail = async () => {
    setSaving(true);
    try {
      const response = await apiService.request('/api/settings/email', {
        method: 'PUT',
        body: JSON.stringify(emailSettings)
      });

      if (response.success) {
        showToast('Email settings saved successfully', 'success');
      }
    } catch (error) {
      showToast(error.message || 'Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    try {
      const response = await apiService.request('/api/settings/notification', {
        method: 'PUT',
        body: JSON.stringify(notificationSettings)
      });

      if (response.success) {
        showToast('Notification settings saved successfully', 'success');
      }
    } catch (error) {
      showToast(error.message || 'Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePayment = async () => {
    setSaving(true);
    try {
      const response = await apiService.request('/api/settings/payment', {
        method: 'PUT',
        body: JSON.stringify(paymentSettings)
      });

      if (response.success) {
        showToast('Payment settings saved successfully', 'success');
      }
    } catch (error) {
      showToast(error.message || 'Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-settings">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-settings">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage system settings and configurations</p>
        </div>
      </div>

      <div className="settings-container">
        {/* Settings Tabs */}
        <div className="settings-tabs">
          <button
            className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <i className="fas fa-cog"></i>
            General
          </button>
          <button
            className={`tab-btn ${activeTab === 'email' ? 'active' : ''}`}
            onClick={() => setActiveTab('email')}
          >
            <i className="fas fa-envelope"></i>
            Email
          </button>
          <button
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <i className="fas fa-bell"></i>
            Notifications
          </button>
          <button
            className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            <i className="fas fa-credit-card"></i>
            Payment
          </button>
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="settings-section">
              <h2>General Settings</h2>
              <p className="section-description">Basic information about your training academy</p>

              <div className="form-group">
                <label>Site Name</label>
                <input
                  type="text"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="form-group">
                <label>Site Description</label>
                <textarea
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  disabled={saving}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Contact Email</label>
                  <input
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                    disabled={saving}
                  />
                </div>

                <div className="form-group">
                  <label>Support Email</label>
                  <input
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={generalSettings.phone}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                  disabled={saving}
                  rows="2"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Corporate Name</label>
                  <input
                    type="text"
                    value={generalSettings.corporateName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, corporateName: e.target.value })}
                    disabled={saving}
                    placeholder="Enter corporate name"
                  />
                </div>

                <div className="form-group">
                  <label>Corporation Number</label>
                  <input
                    type="text"
                    value={generalSettings.corporationNumber}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, corporationNumber: e.target.value })}
                    disabled={saving}
                    placeholder="Enter corporation number"
                  />
                </div>
              </div>

              <h3 className="subsection-title">Social Media Links</h3>
              <p className="section-description">Add your social media profile URLs (leave empty to hide)</p>

              <div className="form-row">
                <div className="form-group">
                  <label><i className="fab fa-facebook"></i> Facebook URL</label>
                  <input
                    type="url"
                    value={generalSettings.facebookUrl}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, facebookUrl: e.target.value })}
                    disabled={saving}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>

                <div className="form-group">
                  <label><i className="fab fa-twitter"></i> Twitter URL</label>
                  <input
                    type="url"
                    value={generalSettings.twitterUrl}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, twitterUrl: e.target.value })}
                    disabled={saving}
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><i className="fab fa-linkedin"></i> LinkedIn URL</label>
                  <input
                    type="url"
                    value={generalSettings.linkedinUrl}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, linkedinUrl: e.target.value })}
                    disabled={saving}
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>

                <div className="form-group">
                  <label><i className="fab fa-youtube"></i> YouTube URL</label>
                  <input
                    type="url"
                    value={generalSettings.youtubeUrl}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, youtubeUrl: e.target.value })}
                    disabled={saving}
                    placeholder="https://youtube.com/c/yourchannel"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><i className="fab fa-instagram"></i> Instagram URL</label>
                  <input
                    type="url"
                    value={generalSettings.instagramUrl}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, instagramUrl: e.target.value })}
                    disabled={saving}
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>

                <div className="form-group">
                  <label><i className="fab fa-reddit"></i> Reddit URL</label>
                  <input
                    type="url"
                    value={generalSettings.redditUrl}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, redditUrl: e.target.value })}
                    disabled={saving}
                    placeholder="https://reddit.com/r/yourcommunity"
                  />
                </div>
              </div>

              <div className="form-group">
                <label><i className="fab fa-whatsapp"></i> WhatsApp URL</label>
                <input
                  type="url"
                  value={generalSettings.whatsappUrl}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, whatsappUrl: e.target.value })}
                  disabled={saving}
                  placeholder="https://wa.me/1234567890"
                />
              </div>

              <div className="form-actions">
                <button className="btn-save" onClick={handleSaveGeneral} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="settings-section">
              <h2>Email Configuration</h2>
              <p className="section-description">Configure SMTP settings for sending emails</p>

              <div className="form-row">
                <div className="form-group">
                  <label>SMTP Host</label>
                  <input
                    type="text"
                    value={emailSettings.emailHost}
                    onChange={(e) => setEmailSettings({ ...emailSettings, emailHost: e.target.value })}
                    disabled={saving}
                  />
                </div>

                <div className="form-group">
                  <label>SMTP Port</label>
                  <input
                    type="text"
                    value={emailSettings.emailPort}
                    onChange={(e) => setEmailSettings({ ...emailSettings, emailPort: e.target.value })}
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>SMTP Username</label>
                  <input
                    type="text"
                    value={emailSettings.emailUser}
                    onChange={(e) => setEmailSettings({ ...emailSettings, emailUser: e.target.value })}
                    disabled={saving}
                    placeholder="Enter SMTP username"
                  />
                </div>

                <div className="form-group">
                  <label>SMTP Password</label>
                  <input
                    type="password"
                    value={emailSettings.emailPassword}
                    onChange={(e) => setEmailSettings({ ...emailSettings, emailPassword: e.target.value })}
                    disabled={saving}
                    placeholder="Enter SMTP password"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>From Email</label>
                  <input
                    type="email"
                    value={emailSettings.emailFrom}
                    onChange={(e) => setEmailSettings({ ...emailSettings, emailFrom: e.target.value })}
                    disabled={saving}
                  />
                </div>

                <div className="form-group">
                  <label>From Name</label>
                  <input
                    type="text"
                    value={emailSettings.emailFromName}
                    onChange={(e) => setEmailSettings({ ...emailSettings, emailFromName: e.target.value })}
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button className="btn-save" onClick={handleSaveEmail} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              <p className="section-description">Control which notifications are sent to users and admins</p>

              <div className="toggle-group">
                <div className="toggle-item">
                  <div>
                    <strong>Enrollment Notifications</strong>
                    <p>Send notifications when students enroll in courses</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.enrollmentNotifications}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, enrollmentNotifications: e.target.checked })}
                      disabled={saving}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div>
                    <strong>Payment Notifications</strong>
                    <p>Send notifications for payment confirmations and receipts</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.paymentNotifications}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, paymentNotifications: e.target.checked })}
                      disabled={saving}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div>
                    <strong>Course Updates</strong>
                    <p>Notify students about course schedule changes</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.courseUpdates}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, courseUpdates: e.target.checked })}
                      disabled={saving}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div>
                    <strong>System Alerts</strong>
                    <p>Send critical system alerts and errors to admins</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.systemAlerts}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, systemAlerts: e.target.checked })}
                      disabled={saving}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div>
                    <strong>Weekly Reports</strong>
                    <p>Send weekly summary reports to admins</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyReports}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, weeklyReports: e.target.checked })}
                      disabled={saving}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div>
                    <strong>Monthly Reports</strong>
                    <p>Send monthly analytics and performance reports</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.monthlyReports}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, monthlyReports: e.target.checked })}
                      disabled={saving}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button className="btn-save" onClick={handleSaveNotifications} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className="settings-section">
              <h2>Payment Configuration</h2>
              <p className="section-description">Configure payment methods and gateway settings</p>

              <div className="form-row">
                <div className="form-group">
                  <label>Currency</label>
                  <select
                    value={paymentSettings.currency}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, currency: e.target.value })}
                    disabled={saving}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tax Rate (%)</label>
                  <input
                    type="number"
                    value={paymentSettings.taxRate}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, taxRate: e.target.value })}
                    disabled={saving}
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="payment-methods">
                <h3>Payment Methods</h3>
                <div className="toggle-group">
                  <div className="toggle-item">
                    <div>
                      <strong>Credit Card</strong>
                      <p>Accept credit and debit card payments</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={paymentSettings.paymentMethods.creditCard}
                        onChange={(e) => setPaymentSettings({
                          ...paymentSettings,
                          paymentMethods: { ...paymentSettings.paymentMethods, creditCard: e.target.checked }
                        })}
                        disabled={saving}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div>
                      <strong>PayPal</strong>
                      <p>Accept payments through PayPal</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={paymentSettings.paymentMethods.paypal}
                        onChange={(e) => setPaymentSettings({
                          ...paymentSettings,
                          paymentMethods: { ...paymentSettings.paymentMethods, paypal: e.target.checked }
                        })}
                        disabled={saving}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div>
                      <strong>Bank Transfer</strong>
                      <p>Accept direct bank transfers</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={paymentSettings.paymentMethods.bankTransfer}
                        onChange={(e) => setPaymentSettings({
                          ...paymentSettings,
                          paymentMethods: { ...paymentSettings.paymentMethods, bankTransfer: e.target.checked }
                        })}
                        disabled={saving}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="gateway-settings">
                <h3>Stripe Configuration</h3>
                <div className="form-group">
                  <label>Publishable Key</label>
                  <input
                    type="text"
                    value={paymentSettings.stripePublicKey}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, stripePublicKey: e.target.value })}
                    disabled={saving}
                    placeholder="pk_test_..."
                  />
                </div>
                <div className="form-group">
                  <label>Secret Key</label>
                  <input
                    type="password"
                    value={paymentSettings.stripeSecretKey}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeSecretKey: e.target.value })}
                    disabled={saving}
                    placeholder="sk_test_..."
                  />
                </div>
              </div>

              <div className="gateway-settings">
                <h3>PayPal Configuration</h3>
                <div className="form-group">
                  <label>Client ID</label>
                  <input
                    type="text"
                    value={paymentSettings.paypalClientId}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalClientId: e.target.value })}
                    disabled={saving}
                    placeholder="Enter PayPal Client ID"
                  />
                </div>
                <div className="form-group">
                  <label>Secret</label>
                  <input
                    type="password"
                    value={paymentSettings.paypalSecret}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalSecret: e.target.value })}
                    disabled={saving}
                    placeholder="Enter PayPal Secret"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button className="btn-save" onClick={handleSavePayment} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
