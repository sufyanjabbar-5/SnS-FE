import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../services/api';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await apiService.getMyEnrollments();
      setEnrollments(response.data || []);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      <div className="welcome-section">
        <div>
          <h1>Welcome back, {user?.firstName}! 👋</h1>
          <p>Continue your learning journey</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-box" onClick={() => navigate('/student/enrollments')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon blue">
            <i className="fas fa-book-open"></i>
          </div>
          <div className="stat-details">
            <h3>{enrollments.length}</h3>
            <p>My Courses</p>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon green">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-details">
            <h3>{enrollments.filter(e => e.status === 'confirmed').length}</h3>
            <p>Confirmed</p>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon orange">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-details">
            <h3>{enrollments.filter(e => e.status === 'pending').length}</h3>
            <p>Pending</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Quick Actions</h2>
        </div>

        <div className="quick-actions">
          <button className="action-card" onClick={() => navigate('/student/enrollments')}>
            <div className="action-icon blue">
              <i className="fas fa-book-open"></i>
            </div>
            <h3>My Courses</h3>
            <p>View and manage your enrolled courses</p>
          </button>

          <button className="action-card" onClick={() => navigate('/self-study-bundle')}>
            <div className="action-icon green">
              <i className="fas fa-search"></i>
            </div>
            <h3>Browse Courses</h3>
            <p>Explore available courses and enroll</p>
          </button>

          <button className="action-card" onClick={() => navigate('/student/study-buddy')}>
            <div className="action-icon purple">
              <i className="fas fa-robot"></i>
            </div>
            <h3>Study Buddy</h3>
            <p>Get AI-powered study assistance</p>
          </button>

          <button className="action-card" onClick={() => navigate('/student/profile')}>
            <div className="action-icon orange">
              <i className="fas fa-user"></i>
            </div>
            <h3>My Profile</h3>
            <p>Update your account information</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
