import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentCertificates.css';

const StudentCertificates = () => {
  const navigate = useNavigate();

  return (
    <div className="student-certificates">
      <div className="sc-header">
        <h1>My Certifications</h1>
        <p>Certificates earned after completing your courses</p>
      </div>

      <div className="sc-empty">
        <div className="sc-empty-icon">
          <i className="fas fa-award"></i>
        </div>
        <h2>No certifications yet</h2>
        <p>
          When you complete a course, your certificate will appear here.
          Keep learning and you'll earn your first certificate soon!
        </p>
        <button className="sc-btn" onClick={() => navigate('/student/enrollments')}>
          <i className="fas fa-book-open"></i>
          Go to My Courses
        </button>
      </div>
    </div>
  );
};

export default StudentCertificates;
