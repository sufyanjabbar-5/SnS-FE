import React, { useState, useEffect } from 'react';
import apiService from '../../../services/api';
import { useCart } from '../../../context/CartContext';
import './AdminEnrollments.css';

const AdminEnrollments = () => {
  const { showToast } = useCart();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await apiService.request('/api/enrollments');
      if (response.success) {
        setEnrollments(response.data || []);
      }
    } catch (error) {
      showToast('Failed to load enrollments', 'error');
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (enrollmentId, newStatus) => {
    try {
      setUpdating(true);
      const response = await apiService.request(`/api/enrollments/${enrollmentId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });

      if (response.success) {
        showToast('Enrollment status updated successfully', 'success');
        fetchEnrollments();
        setShowModal(false);
        setSelectedEnrollment(null);
      }
    } catch (error) {
      showToast(error.message || 'Failed to update enrollment', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handlePaymentStatusUpdate = async (enrollmentId, newPaymentStatus) => {
    try {
      setUpdating(true);
      const response = await apiService.request(`/api/enrollments/${enrollmentId}`, {
        method: 'PUT',
        body: JSON.stringify({ paymentStatus: newPaymentStatus })
      });

      if (response.success) {
        showToast('Payment status updated successfully', 'success');
        fetchEnrollments();
        setShowModal(false);
        setSelectedEnrollment(null);
      }
    } catch (error) {
      showToast(error.message || 'Failed to update payment status', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleViewDetails = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setShowModal(true);
  };

  const getFilteredEnrollments = () => {
    let filtered = enrollments;

    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter(e => e.status === filter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(e => {
        const userName = `${e.user?.firstName || ''} ${e.user?.lastName || ''}`.toLowerCase();
        const userEmail = e.user?.email?.toLowerCase() || '';
        const certificationName = e.certification?.shortName?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();

        return userName.includes(search) ||
          userEmail.includes(search) ||
          certificationName.includes(search);
      });
    }

    return filtered;
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const getPaymentBadgeClass = (paymentStatus) => {
    switch (paymentStatus) {
      case 'paid': return 'payment-paid';
      case 'pending': return 'payment-pending';
      case 'failed': return 'payment-failed';
      case 'refunded': return 'payment-refunded';
      default: return 'payment-pending';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredEnrollments = getFilteredEnrollments();

  const stats = {
    total: enrollments.length,
    confirmed: enrollments.filter(e => e.status === 'confirmed').length,
    pending: enrollments.filter(e => e.status === 'pending').length,
    cancelled: enrollments.filter(e => e.status === 'cancelled').length
  };

  if (loading) {
    return (
      <div className="admin-enrollments">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading enrollments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-enrollments">
      <div className="page-header">
        <h1>Enrollment Management</h1>
        <p>Manage and track all certification enrollments</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <i className="fas fa-clipboard-list"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Enrollments</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon confirmed">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.confirmed}</h3>
            <p>Confirmed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon cancelled">
            <i className="fas fa-times-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.cancelled}</h3>
            <p>Cancelled</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="controls-bar">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by student name, email, or certification..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'confirmed' ? 'active' : ''}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </button>
          <button
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={filter === 'cancelled' ? 'active' : ''}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="enrollments-table-container">
        {filteredEnrollments.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-inbox"></i>
            <h3>No enrollments found</h3>
            <p>
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'No enrollments match the selected filter'}
            </p>
          </div>
        ) : (
          <table className="enrollments-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Certification</th>
                <th>Enrolled Date</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td>
                    <div className="student-info">
                      <div className="student-avatar">
                        <i className="fas fa-user"></i>
                      </div>
                      <div>
                        <div className="student-name">
                          {enrollment.user?.firstName} {enrollment.user?.lastName}
                        </div>
                        <div className="student-email">{enrollment.user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="certification-name">{enrollment.certification?.shortName}</div>
                    <div className="certification-meta">
                      {enrollment.offering?.type.replace('_', ' ')} • {enrollment.batch?.timeRange || 'Lifetime'}
                    </div>
                  </td>
                  <td>{formatDate(enrollment.createdAt)}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(enrollment.status)}`}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td>
                    <span className={`payment-badge ${getPaymentBadgeClass(enrollment.paymentStatus)}`}>
                      {enrollment.paymentStatus}
                    </span>
                  </td>
                  <td className="amount">${enrollment.offering?.price || 0}</td>
                  <td>
                    <button
                      className="btn-view"
                      onClick={() => handleViewDetails(enrollment)}
                    >
                      <i className="fas fa-eye"></i> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Details Modal */}
      {showModal && selectedEnrollment && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Enrollment Details</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3>Student Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Name:</label>
                    <span>{selectedEnrollment.user?.firstName} {selectedEnrollment.user?.lastName}</span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{selectedEnrollment.user?.email}</span>
                  </div>
                  <div className="detail-item">
                    <label>Phone:</label>
                    <span>{selectedEnrollment.user?.phone || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Company:</label>
                    <span>{selectedEnrollment.user?.company || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Certification Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Certification:</label>
                    <span>{selectedEnrollment.certification?.longName}</span>
                  </div>
                  <div className="detail-item">
                    <label>Offering Type:</label>
                    <span style={{ textTransform: 'capitalize' }}>
                      {selectedEnrollment.offering?.type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Instructor:</label>
                    <span>{selectedEnrollment.batch?.instructor || 'TBA'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Date:</label>
                    <span>
                      {selectedEnrollment.batch
                        ? `${new Date(selectedEnrollment.batch.startDate).toLocaleDateString()} - ${new Date(selectedEnrollment.batch.endDate).toLocaleDateString()}`
                        : 'Anytime'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Time:</label>
                    <span>{selectedEnrollment.batch?.timeRange || 'TBA'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Location:</label>
                    <span>{selectedEnrollment.batch?.location || 'Online'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Price:</label>
                    <span className="price-value">${selectedEnrollment.offering?.price}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Enrollment Status</h3>
                <div className="status-controls">
                  <div className="control-group">
                    <label>Enrollment Status:</label>
                    <select
                      value={selectedEnrollment.status}
                      onChange={(e) => handleStatusUpdate(selectedEnrollment.id, e.target.value)}
                      disabled={updating}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="control-group">
                    <label>Payment Status:</label>
                    <select
                      value={selectedEnrollment.paymentStatus}
                      onChange={(e) => handlePaymentStatusUpdate(selectedEnrollment.id, e.target.value)}
                      disabled={updating}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Timeline</h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <i className="fas fa-plus-circle"></i>
                    </div>
                    <div className="timeline-content">
                      <strong>Enrolled</strong>
                      <span>{formatDate(selectedEnrollment.createdAt)}</span>
                    </div>
                  </div>
                  {selectedEnrollment.updatedAt !== selectedEnrollment.createdAt && (
                    <div className="timeline-item">
                      <div className="timeline-icon">
                        <i className="fas fa-edit"></i>
                      </div>
                      <div className="timeline-content">
                        <strong>Last Updated</strong>
                        <span>{formatDate(selectedEnrollment.updatedAt)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnrollments;
