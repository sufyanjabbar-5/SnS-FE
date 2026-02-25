import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import SuccessStories from '../../components/SuccessStories/SuccessStories';
import { figmaImages } from './figmaAssets';
import './CompleteSelfStudyBundle.css';

const CompleteSelfStudyBundle = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeFAQ, setActiveFAQ] = useState(null);

  const handleEnroll = () => {
    addToCart({
      id: 'pmp-self-study-bundle',
      title: 'Complete Self-Study Bundle - PMI-PMP',
      price: 999,
      originalPrice: 1499,
      type: 'Self-Study Bundle'
    });
    navigate('/checkout');
  };

  const handleDownloadBrochure = () => {
    const link = document.createElement('a');
    link.href = '/assets/documents/SNSCCS Brochure Design.pdf';
    link.download = 'SNSCCS Brochure Design.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // About PMP cards - Based on Figma Design (3074-8613)
  const aboutCards = [
    {
      icon: figmaImages.video,
      title: 'On-Demand Video Lessons',
      description: 'Access expertly recorded sessions anytime. Learn at your own pace with clear, structured, and practical explanations you can revisit whenever needed.',
      iconBg: 'linear-gradient(142.1684277680153deg, rgb(31, 58, 95) 28.291%, rgb(11, 31, 59) 99.666%), linear-gradient(90deg, rgb(219, 234, 254) 0%, rgb(219, 234, 254) 100%)'
    },
    {
      icon: figmaImages.sealQuestion,
      title: 'On-Demand Video Lessons',
      description: 'Test your understanding after each module with smart quizzes designed to reinforce key concepts and track your progress.',
      iconBg: 'linear-gradient(142.1684277680153deg, rgb(31, 58, 95) 28.291%, rgb(11, 31, 59) 99.666%), linear-gradient(90deg, rgb(255, 237, 212) 0%, rgb(255, 237, 212) 100%)'
    },
    {
      icon: figmaImages.student,
      title: 'AI Study Partner',
      description: 'Get instant support through an AI-powered study assistant that helps clarify concepts, answer questions, and keep your learning on track—24/7.',
      iconBg: 'linear-gradient(142.1684277680153deg, rgb(31, 58, 95) 28.291%, rgb(11, 31, 59) 99.666%), linear-gradient(90deg, rgb(219, 234, 254) 0%, rgb(219, 234, 254) 100%)'
    }
  ];

  // Who is this course for
  const targetAudience = [
    {
      icon: figmaImages.enterpriseIcon,
      title: 'Enterprise PMOs & Transformation Offices',
      description: 'Transformation offices managing complex initiatives'
    },
    {
      icon: figmaImages.publicSectorIcon,
      title: 'Public sector and regulated industries',
      description: 'Regulated industries with compliance requirements'
    },
    {
      icon: figmaImages.financeTechIcon,
      title: 'Finance, HR, Technology, and Digital portfolios',
      description: 'Finance, HR, Technology, and Digital portfolios'
    },
    {
      icon: figmaImages.aiInitiativesIcon,
      title: 'Organizations scaling AI and data initiatives',
      description: 'Organizations scaling AI and data initiatives'
    }
  ];

  // What We Enable cards - Exact from Figma (order matches grid layout)
  const whatWeEnableCards = [
    {
      icon: figmaImages.whatWeEnableIcon1,
      title: 'Portfolio\nManagement',
      subtitle: 'Align investment decisions to strategic value.',
      description: 'We strengthen portfolio governance, prioritization, funding, and performance management so leadership invests in the right work.',
      focusAreas: ['Strategic alignment', 'Prioritization', 'Portfolio performance', 'Scenario planning']
    },
    {
      icon: figmaImages.whatWeEnableIcon3,
      title: 'Program Management',
      subtitle: 'Realize benefits across coordinated initiatives',
      description: 'We enable organizations to manage dependencies, benefits, and change across programs that deliver enterprise outcomes.',
      focusAreas: ['Benefits management', 'Governance', 'Stakeholder engagement']
    },
    {
      icon: figmaImages.whatWeEnableIcon2,
      title: 'Risk\nManagement',
      subtitle: 'Make risk visible, actionable, and strategic',
      description: 'We embed portfolio and program risk practices that improve foresight, resilience, and executive decision-making.',
      focusAreas: ['Risk identification', 'Exposure analysis', 'Monitoring', 'Mitigation strategies']
    },
    {
      icon: figmaImages.whatWeEnableIcon4,
      title: 'AI Initiative Management',
      subtitle: 'Ensure AI delivers trusted business value',
      description: 'We enable responsible, governed AI delivery aligned to enterprise strategy and outcomes.',
      focusAreas: ['Business need definition', 'AI governance', 'Delivery oversight', 'Value realization']
    },
    {
      icon: figmaImages.whatWeEnableIcon5,
      title: 'PMO & Enterprise Governance',
      subtitle: 'Shift PMOs from reporting to value enablement',
      description: 'We help PMOs establish decision-ready governance, accountability, and performance frameworks aligned to executive needs.',
      focusAreas: ['Risk identification', 'Portfolio reporting', 'Mitigation strategies', 'Monitoring']
    }
  ];

  // Self-Study Bundle FAQs
  const selfStudyFAQs = [
    {
      question: 'What is included in the Complete Self-Study Bundle?',
      answer: 'The Complete Self-Study Bundle includes comprehensive video lectures, study guides, practice exams, PMBOK Guide access, exam simulation software, and lifetime access to all materials.'
    },
    {
      question: 'Is the Self-Study Bundle completely self-paced?',
      answer: 'Yes, the Self-Study Bundle is completely self-paced. You can learn at your own speed and access all materials 24/7 from any device.'
    },
    {
      question: 'How long will I have access to the course materials?',
      answer: 'You will have lifetime access to all course materials, including any future updates and additions to the bundle.'
    },
    {
      question: 'Does the bundle include mock exams and practice tests?',
      answer: 'Yes, the bundle includes 4 full-length mock exams with 180 questions each, plus hundreds of practice questions with detailed explanations.'
    },
    {
      question: 'What technology/platform do you use for live classes?',
      answer: 'The Self-Study Bundle is delivered through our online learning platform, accessible via web browser, mobile app, or tablet. No special software installation required.'
    }
  ];

  return (
    <div className="complete-self-study-bundle">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content pt-0">
            <div className="hero-badge">
              <img src={figmaImages.selfStudyBadgeIcon} alt="" className="badge-icon" style={{ width: '16px', height: '16px' }} />
              <span className="badge-text-mobile">Enterprise Capability Development</span>
              <span className="badge-text-desktop">Complete Self-Study Bundle</span>
            </div>
            <h1 className="corporate-hero-title">
              Corporate Portfolio & Strategy
              <br />
              <span className="corporate-hero-subtitle">Execution Enablement</span>
            </h1>
            <p className="corporate-hero-description">
              Organizations don't fail because projects are poorly managed.
              <br />
              They fail when portfolios are poorly governed.
            </p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                onClick={handleEnroll}
              >
                View Upcoming Batches
                <img src={figmaImages.heroArrowIcon} alt="" style={{ width: '16px', height: '16px' }} />
              </button>
              <button className="btn btn-secondary" onClick={handleDownloadBrochure}>
                <img src={figmaImages.heroDownloadIcon} alt="" style={{ width: '16px', height: '16px' }} />
                Download Brochure
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src={figmaImages.heroImageSelfStudy} alt="PMP Self-Study Bundle" />
          </div>
        </div>
      </section>


      {/* About PMP Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-section-content">
            <div className="about-section-left">
              <h2 className="about-section-title">
                <span className="about-title-mobile">sasa<br />Self-Study Bundle<br />PMP Certification</span>
                <span className="about-title-desktop">About the<br />PMP Certification</span>
              </h2>
              <p className="about-section-subtitle">
                <span className="about-subtitle-mobile">"Our Complete Self-Study Bundle is built for professionals who want flexible, self-paced learning without compromising on quality or support.</span>
                <span className="about-subtitle-desktop">We partner with organizations to build portfolio, program, PMO, risk, and AI delivery capability—so strategy is translated into measurable, stakeholder-defined value.</span>
              </p>
            </div>
            <div className="about-section-right">
              {aboutCards.map((card, index) => (
                <div key={index} className="about-card">
                  <div className="about-card-icon-wrapper">
                    <div className="about-card-icon-bg" style={{ background: card.iconBg }}>
                      <img src={card.icon} alt={card.title} style={{ width: '32px', height: '32px' }} />
                    </div>
                  </div>
                  <div className="about-card-content">
                    <h3 className="about-card-title">{card.title}</h3>
                    <p className="about-card-description">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This Course For */}
      <section className="target-audience-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Who Is This Course For?</h2>
            <p className="section-subtitle">
              Designed for organizations with complex initiatives, aspiring accountability, and transformation initiatives, including:
            </p>
          </div>
          <div className="audience-grid audience-grid-corporate">
            {targetAudience.map((item, index) => (
              <div key={index} className="audience-card audience-card-corporate">
                <div className="audience-icon">
                  <img src={item.icon} alt={item.title} style={{ width: '28px', height: '28px' }} />
                </div>
                <h3 className="audience-title">{item.title}</h3>
                <p className="audience-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Enable Section */}
      <section className="what-we-enable-section">
        <div className="container">
          <div className="what-we-enable-header">
            <div className="enterprise-lens-badge">
              <span>Enterprise Lens</span>
            </div>
            <h2 className="what-we-enable-title">What We Enable</h2>
          </div>
          <div className="what-we-enable-grid">
            {whatWeEnableCards.map((card, index) => (
              <div key={index} className="what-we-enable-card">
                <div className="what-we-enable-card-header">
                  <div className="what-we-enable-icon-wrapper">
                    <img src={card.icon} alt={card.title} style={{ width: '24px', height: '24px' }} />
                  </div>
                  <h3 className="what-we-enable-card-title">{card.title}</h3>
                </div>
                <div className="what-we-enable-card-content">
                  <p className="what-we-enable-subtitle">{card.subtitle}</p>
                  <p className="what-we-enable-description">{card.description}</p>
                  <div className="what-we-enable-focus">
                    <p className="focus-label">Focus Areas:</p>
                    <div className="focus-badge-container">
                      {card.focusAreas.map((area, areaIndex) => (
                        <span key={areaIndex} className="focus-badge">{area}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <SuccessStories />

      {/* FAQs Section */}
      <section className="faqs-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Complete Self-Study Bundle – FAQs</h2>
            <p className="section-subtitle">
              The Project Management Professional (PMP)® is the world's leading project management certification
            </p>
          </div>
          <div className="faqs-list">
            {selfStudyFAQs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${activeFAQ === index ? 'active' : ''}`}
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                >
                  <img src={figmaImages.faqQuestionIcon} alt="" className="faq-icon" style={{ width: '24px', height: '24px' }} />
                  <span>{faq.question}</span>
                  <img
                    src={figmaImages.faqChevronIcon}
                    alt=""
                    className={`faq-chevron ${activeFAQ === index ? 'open' : ''}`}
                    style={{ width: '16px', height: '16px' }}
                  />
                </button>
                {activeFAQ === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h3 className="cta-title">PMP Live Virtual Training</h3>
              <p className="cta-subtitle">Next batch starts soon • Limited seats available</p>
            </div>
            <button className="cta-button" onClick={handleEnroll}>
              Enroll Now
              <img src={figmaImages.heroArrowIcon} alt="" style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompleteSelfStudyBundle;
