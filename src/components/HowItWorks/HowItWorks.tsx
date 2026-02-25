import React from 'react';
import './HowItWorks.css';

const HowItWorks: React.FC = () => {
  return (
    <section className="how-it-works-section">
      <div className="container">
        <div className="section-header text-center text-white">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Your journey to PMP certification is simple and structured. Follow our proven 4-step process.
          </p>
        </div>

        <div className="how-it-works-grid">
          {/* Step 01 */}
          <div className="step-card">
            <div className="step-image-container">
              <img src="/how-it-works-1.png" alt="Register for Training" />
            </div>
            <div className="step-content">
              <span className="step-number">Step 01</span>
              <h3>Register for Training</h3>
              <p>Complete your enrollment to get instant access to your personalized study plan, training materials, & live session schedule.</p>
            </div>
          </div>

          {/* Step 02 */}
          <div className="step-card">
            <div className="step-image-container">
              <img src="/how-it-works-2.png" alt="Attend Live Classes" />
            </div>
            <div className="step-content">
              <span className="step-number">Step 02</span>
              <h3>Attend Live Classes</h3>
              <p>Join interactive live sessions with expert trainers covering PMBOK® Guide and real-world project scenarios.</p>
            </div>
          </div>

          {/* Step 03 */}
          <div className="step-card">
            <div className="step-image-container">
              <img src="/how-it-works-3.png" alt="Practice Mock Tests" />
            </div>
            <div className="step-content">
              <span className="step-number">Step 03</span>
              <h3>Practice Mock Tests</h3>
              <p>Take full-length PMP simulation exams and assess your readiness with detailed performance analytics.</p>
            </div>
          </div>

          {/* Step 04 */}
          <div className="step-card">
            <div className="step-image-container">
              <img src="/how-it-works-4.png" alt="Get PMP Certification" />
            </div>
            <div className="step-content">
              <span className="step-number">Step 04</span>
              <h3>Get PMP Certification</h3>
              <p>Apply for the PMP exam with confidence and earn your globally recognized project management.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
