import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessStories from '../../components/SuccessStories/SuccessStories';
import WhatsIncluded from '../../components/WhatsIncluded/WhatsIncluded';
import WhatsIncludedCorporate from '../../components/WhatsIncludedCorporate/WhatsIncludedCorporate';
import NewInstructor from '../../components/NewInstructor/NewInstructor';
import { figmaImages } from './figmaAssets';
import Hero from '../../components/Hero/Hero';
import './CorporateTraining.css';

interface CapabilityCard {
  number: string;
  title: string;
  icon: string;
}

interface DeliveryModel {
  image: string;
  title: string;
  description: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  icon: string;
  value: string;
  label: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const CorporateTraining: React.FC = () => {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const handleViewBatches = () => {
    navigate('/self-study-bundle');
  };

  const handleDownloadBrochure = () => {
    const link = document.createElement('a');
    link.href = '/assets/documents/SNSCCS Brochure Design.pdf';
    link.download = 'SNSCCS Brochure Design.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Capability cards - 8 cards from Figma
  const capabilityCards: CapabilityCard[] = [
    { number: '01', title: 'Project Management', icon: figmaImages.liveClassCoursePage },
    { number: '02', title: 'Program Management', icon: figmaImages.liveClassCoursePage1 },
    { number: '03', title: 'Portfolio Management', icon: figmaImages.liveClassCoursePage2 },
    { number: '04', title: 'Risk Management', icon: figmaImages.liveClassCoursePage3 },
    { number: '05', title: 'Agile Practices', icon: figmaImages.liveClassCoursePage4 },
    { number: '06', title: 'Business Analysis', icon: figmaImages.liveClassCoursePage5 },
    { number: '07', title: 'PMO Leadership', icon: figmaImages.liveClassCoursePage6 },
    { number: '08', title: 'AI-Enabled Delivery', icon: figmaImages.liveClassCoursePage7 },
  ];

  // Who Is This Course For - 4 cards
  const deliveryModels: DeliveryModel[] = [
    {
      image: figmaImages.deliveryModel1,
      title: 'Cohort-Based Corporate Programs',
      description: 'PMP-certified instructors with 10+ years real-world experience'
    },
    {
      image: figmaImages.deliveryModel2,
      title: 'Role-Specific Certification Pathways',
      description: 'PMP-certified instructors with 10+ years real-world experience'
    },
    {
      image: figmaImages.deliveryModel3,
      title: 'Executive & PMO Leadership Training',
      description: 'PMP-certified instructors with 10+ years real-world experience'
    },
    {
      image: figmaImages.deliveryModel4,
      title: 'Hybrid & Time-Efficient Formats',
      description: 'PMP-certified instructors with 10+ years real-world experience'
    }
  ];

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

  // Stats - These are displayed in the "What Sets Us Apart" section
  const stats: Stat[] = [
    { icon: figmaImages.statIcon1, value: '50K+', label: 'Students Certified' },
    { icon: figmaImages.statIcon2, value: '98%', label: 'Pass Rate' },
    { icon: figmaImages.statIcon3, value: '15+', label: 'Years Experience' },
    { icon: figmaImages.statIcon4, value: '4.9/5', label: 'Average Rating' }
  ];

  // Enterprise Training FAQs
  const enterpriseFAQs: FAQ[] = [
    {
      question: 'What are the prerequisites for PMP certification?',
      answer: 'To be eligible for PMP certification, you need either a four-year degree with 36 months of project management experience and 35 hours of project management education, or a high school diploma with 60 months of project management experience and 35 hours of project management education.'
    },
    {
      question: 'How long will I have access to course materials?',
      answer: 'You will have lifetime access to all course materials, including any future updates and additions to the training program.'
    },
    {
      question: 'What if I miss a live session?',
      answer: 'All live sessions are recorded and made available to participants. You can access the recordings at any time to catch up on missed sessions.'
    },
    {
      question: 'Are the mock exams similar to the actual PMP exam?',
      answer: 'Yes, our mock exams are designed to closely simulate the actual PMP exam format, question types, and difficulty level to ensure you are well-prepared.'
    },
    {
      question: 'What technology/platform do you use for live classes?',
      answer: 'We use industry-leading virtual classroom platforms that support interactive learning, screen sharing, breakout rooms, and real-time collaboration.'
    },
    {
      question: 'Can I switch batches if my schedule changes?',
      answer: 'Yes, we offer flexibility to switch batches based on availability. Please contact our support team to discuss your options.'
    },
    {
      question: 'Do you provide the PMBOK Guide?',
      answer: 'Yes, all participants receive access to the PMBOK Guide and other essential study materials as part of the training program.'
    },
    {
      question: 'What is your refund policy?',
      answer: 'We offer a full refund if you cancel within 7 days of enrollment, provided you have not accessed more than 10% of the course content.'
    },
    {
      question: 'How soon can I take the PMP exam after completing the course?',
      answer: 'You can schedule your PMP exam as soon as you complete the 35 contact hours and meet all PMI prerequisites. Most students take the exam within 2-4 weeks after course completion.'
    },
    {
      question: 'Do you help with the PMP application process?',
      answer: 'Yes, we provide comprehensive guidance and support throughout the PMP application process, including review of your application and assistance with any questions.'
    }
  ];

  return (
    <div className="corporate-training">
      {/* Hero Section */}
      <Hero
        badges={[
          { icon: figmaImages.enterpriseBadgeIcon, text: "Enterprise Training" }
        ]}
        title={<>Project Management Training<br />Built for Professionals</>}
        description="SnSCCS builds real-world project management capability beyond certification."
        primaryBtn={{
          text: "View Upcoming Batches",
          onClick: () => navigate('/self-study-bundle'),
          icon: figmaImages.heroArrowIcon,
          className: "corporate-btn-primary"
        }}
        secondaryBtn={{
          text: "Download Brochure",
          onClick: handleDownloadBrochure,
          icon: figmaImages.heroDownloadIcon,
          className: "corporate-btn-secondary"
        }}
        rightElement={
          <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
            <img 
              src={figmaImages.corporateTrainingSession} 
              alt="Corporate Training Session" 
              className="max-h-[350px] lg:max-h-[450px] w-auto object-cover" 
            />
          </div>
        }
      />

      {/* A One-Stop Shop Section */}
      <section className="one-stop-shop-section">
        <div className="container">
          <div className="one-stop-shop-header">
            <h2 className="one-stop-shop-title">
              A One-Stop Shop for PMI® Capability Building
            </h2>
            <div className="one-stop-shop-description">
              <p>Corporate Portfolio & Strategy Execution Enablement For Organizations Accountable for Enterprise Outcomes. Organizations don't fail because projects are poorly managed. They fail when portfolios are poorly governed.</p>
              <p>&nbsp;</p>
              <p>We partner with organizations to build portfolio, program, PMO, risk, and</p>
              <p>AI delivery capability—so strategy is translated into measurable,</p>
              <p>stakeholder-defined value.</p>
            </div>
          </div>
          <div className="capability-cards-grid">
            {capabilityCards.map((card, index) => (
              <div key={index} className="capability-card">
                <div className="capability-icon-wrapper">
                  <img src={card.icon} alt={card.title} style={{ width: '80px', height: '80px' }} />
                </div>
                <div className="capability-content">
                  <div className="capability-badge">{card.number}</div>
                  <h3 className="capability-title">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <NewInstructor />

      {/* Who Is This Course For Section */}
      <section className="delivery-models-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Who Is This Course For?</h2>
            <p className="section-subtitle">
              The Project Management Professional (PMP)® is the world's leading project management certification
            </p>
          </div>
          <div className="delivery-models-grid">
            {deliveryModels.map((model, index) => (
              <div key={index} className="delivery-model-card">
                <div className="delivery-model-image">
                  <img src={model.image} alt={model.title} />
                </div>
                <div className="delivery-model-content">
                  <h3 className="delivery-model-title">{model.title}</h3>
                  <p className="delivery-model-description">{model.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* What Sets Us Apart - Corporate Version */}
      <WhatsIncludedCorporate />

      {/* Success Stories */}
      <SuccessStories />

      {/* Enterprise Training FAQs */}
      <section className="enterprise-faqs-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Enterprise Training FAQs</h2>
            <p className="section-subtitle">
              Get answers to common questions about our live virtual training program
            </p>
          </div>
          <div className="faqs-list">
            {enterpriseFAQs.map((faq, index) => (
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
      <section className="corporate-cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <div className="cta-header">
              <h2 className="cta-title">Ready to Transform Your Team?</h2>
              <p className="cta-subtitle">
                Partner with SNS CCS to deliver world-class PMI training that builds certified teams, drives business results, and creates lasting competitive advantage.
              </p>
            </div>
            <div className="cta-buttons">
              <button className="cta-btn-primary">
                Request Corporate Training
                <img src={figmaImages.ctaIcon} alt="" style={{ width: '16px', height: '16px' }} />
              </button>
              <button className="cta-btn-secondary">
                <img src={figmaImages.ctaIcon1} alt="" style={{ width: '16px', height: '16px' }} />
                Talk to a Consultant
              </button>
            </div>
            <div className="cta-features">
              <div className="cta-feature">
                <div className="cta-feature-value">24-48h</div>
                <div className="cta-feature-label">Response Time</div>
              </div>
              <div className="cta-feature">
                <div className="cta-feature-value">Free</div>
                <div className="cta-feature-label">Needs Assessment</div>
              </div>
              <div className="cta-feature">
                <div className="cta-feature-value">Flexible</div>
                <div className="cta-feature-label">Pricing Options</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CorporateTraining;
