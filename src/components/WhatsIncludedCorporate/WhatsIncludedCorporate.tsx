import React from 'react';
import { figmaImages } from '../../pages/CorporateTraining/figmaAssets';
import './WhatsIncludedCorporate.css';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const WhatsIncludedCorporate: React.FC = () => {
  // What Sets Us Apart features
  const features: Feature[] = [
    {
      icon: figmaImages.featureIcon1,
      title: 'Practical, Job-Ready Training',
      description: 'Our programs go beyond exam preparation and focus on job-ready capability. Participants receive practical project templates and delivery artifacts, guidance on applying PMI frameworks in live environments, and exposure to enterprise project and portfolio systems, including Planview. This ensures learners are prepared to perform in role, not simply meet certification requirements.'
    },
    {
      icon: figmaImages.featureIcon2,
      title: 'Career & Role Progression Alignment',
      description: 'We support organizations in building clear progression paths for project professionals. We help align training to practitioner → project manager pathways, project manager → program/portfolio roles, and delivery roles → strategic leadership positions. This enables sustainable talent development and reduces reliance on external hiring.'
    },
    {
      icon: figmaImages.featureIcon3,
      title: 'Strategic & AI-Enabled Delivery',
      description: 'Modern organizations require more than transactional project execution. Our training equips professionals to apply PMI standards strategically, leverage AI-enabled approaches for planning, risk, and decision-making, and shift from task management to outcome-driven delivery. This prepares teams to operate effectively in high-complexity, high-change environments.'
    }
  ];

  return (
    <section className="whats-included-corporate-flex-section">
      <div className="included-corporate-left-content">
        <div className="section-header">
          <h2 className="section-title mb-4">What Sets Us Apart</h2>
          <p className="section-subtitle mb-8">
            Corporate Portfolio & Strategy Execution Enablement For Organizations Accountable for Enterprise Outcomes.
          </p>
        </div>

        <div className="included-corporate-features-list">
          {features.map((feature, index) => (
            <div key={index} className="included-corporate-feature-item">
              <div className="included-corporate-feature-icon">
                <img src={feature.icon} alt={feature.title} style={{ width: '28px', height: '28px' }} />
              </div>
              <div className="included-corporate-feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="included-corporate-right-image">
        {/* Decorative Arrow */}
        <div className="decorative-arrow">
          <img src="/Vector.png" alt="" />
        </div>
        {/* <img src="/Macbook Pro mockup.png" alt="What's Included Mockup" className="laptop-mockup" /> */}
      </div>
    </section>
  );
};

export default WhatsIncludedCorporate;
