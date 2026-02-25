import React, { useState, useEffect } from 'react';
import apiService from '../../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCertifications: 0,
    totalEnrollments: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentEnrollments, setRecentEnrollments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch enrollments, users, and certifications
      const [enrollmentsRes, usersRes, certsRes] = await Promise.all([
        apiService.request('/api/enrollments'),
        apiService.request('/api/admin/users'),
        apiService.request('/api/certifications/admin/all')
      ]);

      setStats({
        totalCertifications: certsRes.data?.length || 0,
        totalEnrollments: enrollmentsRes.data?.length || 0,
        totalUsers: usersRes.data?.length || 0,
        totalRevenue: calculateRevenue(enrollmentsRes.data || [])
      });

      // Get recent enrollments
      const recent = (enrollmentsRes.data || []).slice(0, 5);
      setRecentEnrollments(recent);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRevenue = (enrollments) => {
    return enrollments.reduce((sum, enrollment) => {
      const price = enrollment.offering?.price || 0;
      return sum + parseFloat(price);
    }, 0);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your academy.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">
            <i className="fas fa-certificate"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalCertifications}</h3>
            <p>Total Certifications</p>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon">
            <i className="fas fa-user-graduate"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalEnrollments}</h3>
            <p>Total Enrollments</p>
          </div>
        </div>

        <div className="stat-card orange">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <h3>${stats.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Enrollments</h2>
        </div>

        {recentEnrollments.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-inbox"></i>
            <p>No enrollments yet</p>
          </div>
        ) : (
          <div className="enrollments-table">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Certification</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEnrollments.map((enrollment) => (
                  <tr key={enrollment.id}>
                    <td>
                      <div className="student-info">
                        <i className="fas fa-user-circle"></i>
                        <span>{enrollment.user?.firstName} {enrollment.user?.lastName}</span>
                      </div>
                    </td>
                    <td>
                      {enrollment.certification?.shortName || 'N/A'}
                      {enrollment.offering && <div className="text-xs text-gray-500">{enrollment.offering.type.replace('_', ' ')}</div>}
                    </td>
                    <td>
                      <span className={`status-badge ${enrollment.status}`}>
                        {enrollment.status}
                      </span>
                    </td>
                    <td>{new Date(enrollment.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
