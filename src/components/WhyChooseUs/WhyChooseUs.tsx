import React from 'react';
import { GraduationCap, RefreshCcw } from 'lucide-react';
import './WhyChooseUs.css';

const WhyChooseUs: React.FC = () => {
  return (
    <section className="choose-us-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Most PMI training focuses on shortcuts. We focus on real learning that builds confidence and lasts beyond the exam.
          </p>
        </div>
        
        <div className="choose-us-grid">
          <div className="feature-card-new">
            <div className="feature-icon-box"><GraduationCap size={28} /></div>
            <h3>Exam Simulation</h3>
            <p>Real exam-style simulations to boost confidence and performance</p>
          </div>
          
          <div className="feature-card-new">
            <div className="feature-icon-box"><RefreshCcw size={28} /></div>
            <h3>AI Support</h3>
            <p style={{maxWidth: "155px"}}>Smart AI chatbot for instant study help anytime</p>
          </div>
          
          <div className="feature-card-new">
            <div className="feature-icon-box"><RefreshCcw size={28} /></div>
            <h3>100% Success Rate</h3>
            <p style={{maxWidth: "155px"}}>Proven results with consistently high exam pass rates</p>
          </div>
          
          <div className="feature-card-new">
            <div className="feature-icon-box"><RefreshCcw size={28} /></div>
            <h3>Free Re-Enrollment</h3>
            <p style={{maxWidth: "175px"}}>Retake the course for free if you don't pass the exam on your first attempt.</p>
          </div>
          
          <div className="feature-card-new">
            <div className="feature-icon-box"><RefreshCcw size={28} /></div>
            <h3>Top Expert</h3>
            <p style={{maxWidth: "155px"}}>Learn from globally top one percent PMI professional</p>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="stats-banner">
        <div className="container stats-flex">
          <div className="stat-item">
            <div className="stat-value">20+</div>
            <div className="stat-label">Countries – Operating globally</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">100%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">100%</div>
            <div className="stat-label">First Attempt Pass Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">15+</div>
            <div className="stat-label">Years of Excellence</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">4.9/5</div>
            <div className="stat-label">Student Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
