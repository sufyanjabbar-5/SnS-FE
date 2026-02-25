import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../services/api';
import { useCart } from '../../../context/CartContext';
import './StudentEnrollments.css';

const STATUS_CONFIG = {
  confirmed: { label: 'Confirmed', className: 'status-confirmed', icon: 'fa-check-circle' },
  pending:   { label: 'Pending',   className: 'status-pending',   icon: 'fa-clock'        },
  cancelled: { label: 'Cancelled', className: 'status-cancelled', icon: 'fa-times-circle' },
  completed: { label: 'Completed', className: 'status-completed', icon: 'fa-trophy'       },
};

const PAYMENT_CONFIG = {
  paid:     { label: 'Paid',     className: 'pay-paid'     },
  pending:  { label: 'Pending',  className: 'pay-pending'  },
  failed:   { label: 'Failed',   className: 'pay-failed'   },
  refunded: { label: 'Refunded', className: 'pay-refunded' },
};

const OFFERING_LABELS = {
  self_study:    'Self Study Bundle',
  live_bootcamp: 'Live Bootcamp',
  one_on_one:    'One-on-One Training',
};

const StudentEnrollments = () => {
  const navigate = useNavigate();
  const { showToast } = useCart();

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);

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
      showToast('Failed to load enrollments', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = async (enrollmentId) => {
    try {
      setPayingId(enrollmentId);
      const response = await apiService.createCheckoutSession(enrollmentId);
      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        showToast('Failed to start payment. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Payment error:', error);
      showToast(error.message || 'Failed to initiate payment', 'error');
    } finally {
      setPayingId(null);
    }
  };

  const handleAccessLibrary = (certificationId) => {
    navigate(`/student/courses/${certificationId}/library`);
  };

  if (loading) {
    return (
      <div className="se-loading">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading your courses...</p>
      </div>
    );
  }

  return (
    <div className="student-enrollments">
      {/* Page Header */}
      <div className="se-header">
        <div>
          <h1>My Courses</h1>
          <p>All your enrolled programs in one place</p>
        </div>
        <button className="se-browse-btn" onClick={() => navigate('/self-study-bundle')}>
          <i className="fas fa-plus"></i>
          Browse Courses
        </button>
      </div>

      {/* Stats Row */}
      {enrollments.length > 0 && (
        <div className="se-stats">
          <div className="se-stat">
            <span className="se-stat-num">{enrollments.length}</span>
            <span className="se-stat-lbl">Total</span>
          </div>
          <div className="se-stat">
            <span className="se-stat-num se-num-green">
              {enrollments.filter(e => e.status === 'confirmed' || e.status === 'completed').length}
            </span>
            <span className="se-stat-lbl">Active</span>
          </div>
          <div className="se-stat">
            <span className="se-stat-num se-num-orange">
              {enrollments.filter(e => e.paymentStatus === 'pending').length}
            </span>
            <span className="se-stat-lbl">Awaiting Payment</span>
          </div>
          <div className="se-stat">
            <span className="se-stat-num se-num-blue">
              {enrollments.filter(e => e.status === 'completed').length}
            </span>
            <span className="se-stat-lbl">Completed</span>
          </div>
        </div>
      )}

      {/* Enrollment List */}
      {enrollments.length === 0 ? (
        <div className="se-empty">
          <div className="se-empty-icon">
            <i className="fas fa-book-open"></i>
          </div>
          <h2>No enrollments yet</h2>
          <p>You haven't enrolled in any courses yet. Browse our available programs to get started.</p>
          <button className="se-browse-btn se-browse-btn-lg" onClick={() => navigate('/self-study-bundle')}>
            <i className="fas fa-search"></i>
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="se-list">
          {enrollments.map((enrollment) => {
            const statusCfg = STATUS_CONFIG[enrollment.status] || STATUS_CONFIG.pending;
            const payCfg    = PAYMENT_CONFIG[enrollment.paymentStatus] || PAYMENT_CONFIG.pending;
            const cert      = enrollment.certification;
            const offering  = enrollment.offering;
            const canAccess = (enrollment.status === 'confirmed' || enrollment.status === 'completed') && enrollment.paymentStatus === 'paid';
            const needsPay  = enrollment.paymentStatus === 'pending' || enrollment.paymentStatus === 'failed';
            const offeringLabel = offering ? (OFFERING_LABELS[offering.type] || offering.type) : 'N/A';

            return (
              <div className={`se-card ${canAccess ? 'se-card-active' : ''}`} key={enrollment.id}>
                {/* Left: Icon */}
                <div className="se-card-icon">
                  {cert?.icon && cert.icon.startsWith('http')
                    ? <img src={cert.icon} alt={cert.shortName} />
                    : <i className={cert?.icon || 'fas fa-graduation-cap'}></i>
                  }
                </div>

                {/* Center: Info */}
                <div className="se-card-info">
                  <h3 className="se-card-title">{cert?.longName || cert?.shortName || 'Unknown Course'}</h3>
                  <div className="se-card-meta">
                    <span className="se-meta-chip">
                      <i className="fas fa-tag"></i>
                      {offeringLabel}
                    </span>
                    {enrollment.batch && (
                      <span className="se-meta-chip">
                        <i className="fas fa-calendar"></i>
                        Batch: {enrollment.batch.batchName || enrollment.batch.name || 'N/A'}
                      </span>
                    )}
                    <span className="se-meta-chip">
                      <i className="fas fa-calendar-check"></i>
                      Enrolled: {new Date(enrollment.enrollmentDate || enrollment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Right: Badges + Actions */}
                <div className="se-card-right">
                  <div className="se-badges">
                    <span className={`se-badge ${statusCfg.className}`}>
                      <i className={`fas ${statusCfg.icon}`}></i>
                      {statusCfg.label}
                    </span>
                    <span className={`se-badge-pay ${payCfg.className}`}>
                      {payCfg.label}
                    </span>
                  </div>

                  <div className="se-actions">
                    {canAccess && (
                      <button
                        className="se-btn se-btn-primary"
                        onClick={() => handleAccessLibrary(cert.id)}
                      >
                        <i className="fas fa-play-circle"></i>
                        Access Library
                      </button>
                    )}
                    {needsPay && (
                      <button
                        className="se-btn se-btn-pay"
                        onClick={() => handlePayNow(enrollment.id)}
                        disabled={payingId === enrollment.id}
                      >
                        {payingId === enrollment.id
                          ? <><i className="fas fa-spinner fa-spin"></i> Processing...</>
                          : <><i className="fas fa-credit-card"></i> Pay Now</>
                        }
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentEnrollments;
