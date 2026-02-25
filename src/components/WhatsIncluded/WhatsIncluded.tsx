import React from 'react';
import { Video, Target, BookOpen, Headphones, Download, Clock } from 'lucide-react';
import './WhatsIncluded.css';

const WhatsIncluded: React.FC = () => {
  return (
    <section className="whats-included-flex-section">
      <div className="included-left-content">
        <div className="section-header">
          <h2 className="section-title mb-4">What's Included</h2>
          <p className="section-subtitle mb-8">
            Everything you need to prepare, practice, and pass the PMP exam on your first attempt.
          </p>
        </div>

        <div className="included-features-grid">
          <div className="included-feature-item">
            <div className="included-feature-icon"><Video size={24} /></div>
            <div className="included-feature-text">
              <h3>Interactive Live Classes</h3>
              <p>Engage with instructors in real-time sessions</p>
            </div>
          </div>

          <div className="included-feature-item">
            <div className="included-feature-icon"><Target size={24} /></div>
            <div className="included-feature-text">
              <h3>Exam Simulation</h3>
              <p>Practice with realistic exam environment</p>
            </div>
          </div>

          <div className="included-feature-item">
            <div className="included-feature-icon"><BookOpen size={24} /></div>
            <div className="included-feature-text">
              <h3>Study Materials</h3>
              <p>Complete study materials and resources</p>
            </div>
          </div>

          <div className="included-feature-item">
            <div className="included-feature-icon"><Headphones size={24} /></div>
            <div className="included-feature-text">
              <h3>Support</h3>
              <p>Guidance through entire certification process</p>
            </div>
          </div>

          <div className="included-feature-item">
            <div className="included-feature-icon"><Download size={24} /></div>
            <div className="included-feature-text">
              <h3>Downloads</h3>
              <p>Access materials anytime, anywhere</p>
            </div>
          </div>

          <div className="included-feature-item">
            <div className="included-feature-icon"><Clock size={24} /></div>
            <div className="included-feature-text">
              <h3>Lifetime Access</h3>
              <p>Never lose access to your learning content</p>
            </div>
          </div>
        </div>
      </div>

      <div className="included-right-image">
        {/* Decorative Arrow */}
        <div className="decorative-arrow">
          <img src="/Vector.png" alt="" />
        </div>
        {/* <img src="/Macbook Pro mockup.png" alt="What's Included Mockup" className="laptop-mockup" /> */}
      </div>
    </section>
  );
};

export default WhatsIncluded;
