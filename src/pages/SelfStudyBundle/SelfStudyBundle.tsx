import React from 'react';
import { useNavigate } from 'react-router-dom';
import { figmaImages } from './figmaAssets';
import { useCertifications } from '../../context/CertificationContext';
import { useCart } from '../../context/CartContext';
import Hero from '../../components/Hero/Hero';
import './SelfStudyBundle.css';

const slugToImageAsset: Record<string, string> = {
  'pmp': figmaImages.pmp,
  'pgmp': figmaImages.pgmp,
  'pfmp': figmaImages.pfmp,
  'pmi-cpmai': figmaImages.cpmai,
  'pmi-rmp': figmaImages.rmp,
  'pmi-pmocp': figmaImages.pmocp,
  'pmi-pba': figmaImages.pba,
};

const faqs = [
  'What is included in the Complete Self-Study Bundle?',
  'Is the Self-Study Bundle completely self-paced?',
  'How long will I have access to the course materials?',
  'Does the bundle include mock exams and practice tests?',
  'Are there any prerequisites for enrolling in the Self-Study Bundle?'
];

const SelfStudyBundle: React.FC = () => {
  const navigate = useNavigate();
  const { certifications, loading } = useCertifications();
  const { addToCart } = useCart();
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

  // Filter certifications that have a self_study offering
  const selfStudyCertifications = certifications.filter(cert => 
    cert.offerings?.some(o => o.type === 'self_study')
  );

  const handleBuyNow = (cert: any) => {
    const offering = cert.offerings?.find((o: any) => o.type === 'self_study');
    if (offering) {
      addToCart({
        id: `self-study-${cert.slug}`,
        type: 'offering',
        offeringId: offering.id,
        certificationId: cert.id,
        title: `${cert.shortName}® Self-Study Bundle`,
        price: offering.price,
        originalPrice: offering.originalPrice,
        image: slugToImageAsset[cert.slug.toLowerCase()] || figmaImages.pmp,
        duration: 'On-Demand',
        pdus: '35 PDUs' // Default for now
      });
      navigate('/checkout');
    }
  };

  const handleDownloadBrochure = () => {
    const link = document.createElement('a');
    link.href = '/assets/documents/SNSCCS Brochure Design.pdf';
    link.download = 'SNSCCS Brochure Design.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full bg-white self-study-bundle">
      {/* Hero Section */}
      <Hero
        badges={[
          { icon: figmaImages.heroBadgeIcon, text: "Complete Self-Study Bundle" }
        ]}
        title={<>Learn at Your Pace. Succeed<br />with Confidence.</>}
        description="Advance your skills with our Complete Self-Study Bundle—flexible, results-driven learning with on-demand videos, quizzes, and an AI study partner."
        primaryBtn={{
          text: "Buy Now",
          onClick: () => {
            document.getElementById('certifications-section')?.scrollIntoView({ behavior: 'smooth' });
          },
          icon: figmaImages.heroArrowIcon
        }}
        secondaryBtn={{
          text: "Download Brochure",
          onClick: handleDownloadBrochure,
          icon: figmaImages.heroDownloadIcon
        }}
        rightElement={
          <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
            <img 
              src={figmaImages.corporateTrainingSession} 
              alt="Study Session" 
              className="max-h-[350px] lg:max-h-[450px] w-auto object-cover" 
            />
          </div>
        }
      />

      {/* What's Included Section */}
      <section className="py-20 bg-white whats-included-section">
        <div className="container mx-auto px-8 max-w-[1920px] whats-included-container">
          <div className="flex gap-24 whats-included-content">
            <div className="w-[450px] whats-included-left">
              <h2 className="text-[#1f3a5f] text-[40px] font-bold leading-[48px] mb-8 whats-included-title">
                <span className="hidden md:inline">Complete<br />Self-Study Bundle</span>
                <span className="md:hidden">Complete<br />Self-Study Bundle<br />PMP Certification</span>
              </h2>
              <p className="text-[#0b1f3b] text-xl leading-7 whats-included-subtitle">
                Our Complete Self-Study Bundle is built for professionals who want flexible, self-paced learning without compromising on quality or support.
              </p>
            </div>
            
            <div className="flex-1 whats-included-right">
              <p className="text-[#0b1f3b] text-xl font-semibold mb-4 hidden md:block">
                What's included with every course purchase:
              </p>
              
              <div className="space-y-4">
                {/* Video Lessons */}
                <div className="bg-[rgba(154,174,211,0.1)] border border-[rgba(154,174,211,0.25)] rounded-2xl p-6 flex gap-8 items-center whats-included-card">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center whats-included-card-icon" style={{
                    background: 'linear-gradient(142.17deg, #1f3a5f 28.291%, #0b1f3b 99.666%)'
                  }}>
                    <img src={figmaImages.video} alt="Video" className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#1f3a5f] text-xl font-bold mb-1 whats-included-card-title">On-Demand Video Lessons</h3>
                    <p className="text-[#0b1f3b] text-base leading-6 whats-included-card-description">
                      Access expertly recorded sessions anytime. Learn at your own pace with clear, structured, and practical explanations you can revisit whenever needed.
                    </p>
                  </div>
                </div>
                
                {/* Interactive Quizzes */}
                <div className="bg-[rgba(154,174,211,0.1)] border border-[rgba(154,174,211,0.25)] rounded-2xl p-6 flex gap-8 items-center whats-included-card">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center whats-included-card-icon" style={{
                    background: 'linear-gradient(142.17deg, #1f3a5f 28.291%, #0b1f3b 99.666%)'
                  }}>
                    <img src={figmaImages.sealQuestion} alt="Quiz" className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#1f3a5f] text-xl font-bold mb-1 whats-included-card-title">On-Demand Video Lessons</h3>
                    <p className="text-[#0b1f3b] text-base leading-6 whats-included-card-description">
                      Test your understanding after each module with smart quizzes designed to reinforce key concepts and track your progress.
                    </p>
                  </div>
                </div>
                
                {/* AI Study Partner */}
                <div className="bg-[rgba(154,174,211,0.1)] border border-[rgba(154,174,211,0.25)] rounded-2xl p-6 flex gap-8 items-center whats-included-card">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center whats-included-card-icon" style={{
                    background: 'linear-gradient(142.17deg, #1f3a5f 28.291%, #0b1f3b 99.666%)'
                  }}>
                    <img src={figmaImages.student} alt="AI" className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#1f3a5f] text-xl font-bold mb-1 whats-included-card-title">AI Study Partner</h3>
                    <p className="text-[#0b1f3b] text-base leading-6 whats-included-card-description">
                      Get instant support through an AI-powered study assistant that helps clarify concepts, answer questions, and keep your learning on track—24/7.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications-section" className="certifications-section">
        <div className="certifications-container">
          <div className="certifications-header">
            <h2 className="certifications-title">Certifications</h2>
            <p className="certifications-subtitle">
              Certifications are used as capability accelerators, not end goals:
            </p>
          </div>
          
          <div className="certifications-list">
            {selfStudyCertifications.map((cert) => {
               const offering = cert.offerings?.find(o => o.type === 'self_study');
               return (
                <div 
                  key={cert.id}
                  className="certification-card"
                >
                  <div className="certification-image-wrapper">
                    <img 
                      src={slugToImageAsset[cert.slug.toLowerCase()] || figmaImages.pmp} 
                      alt={cert.shortName} 
                      className="certification-image" 
                    />
                  </div>
                  
                  {/* <div className="certification-content"> */}
                    <div className="certification-info">
                      <h3 className="certification-title-text">
                        {cert.shortName}® ({cert.longName})
                      </h3>
                      <p className="certification-description">
                        {cert.description || 'No description available'}
                      </p>
                    </div>
                    
                    
                  {/* </div> */}
                  <div className="certification-actions-row">
                      <button 
                        onClick={() => handleBuyNow(cert)}
                        className="certification-buy-btn"
                      >
                        <span>Buy Now</span>
                        <img src={figmaImages.buyIcon} alt="" className="buy-icon" />
                      </button>
                      
                      <div className="certification-price-wrapper">
                        {offering?.originalPrice != null && offering.originalPrice !== offering.price ? (
                          <>
                            <p className="certification-price-original">${offering.price}</p>
                            <p className="certification-price">${offering.originalPrice}</p>
                          </>
                        ) : (
                          <p className="certification-price">${offering?.price || 500}</p>
                        )}
                      </div>
                    </div>
                </div>
               );
            })}
          </div>
          
          <div className="certifications-footer">
            <p className="certifications-footer-text">
              Whether you're upskilling, preparing for certification, or advancing your career, the Complete Self-Study Bundle empowers you with flexibility, confidence, and continuous learning support.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-[rgba(91,137,179,0.1)] faqs-section">
        <div className="container mx-auto px-8 max-w-[1920px] faqs-container">
          <div className="text-center mb-12 faqs-header">
            <h2 className="text-[#1f3a5f] text-[40px] font-bold mb-4 faqs-title">
              Complete Self-Study Bundle – FAQs
            </h2>
            <p className="text-[#0b1f3b] text-xl faqs-subtitle">
              Get answers to common questions about our Complete Self-Study Bundle
            </p>
          </div>
          
          <div className="space-y-4 mx-auto faqs-list">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white border-2 border-[rgba(154,174,211,0.25)] rounded-[10px] overflow-hidden faq-item"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer faq-button"
                >
                  <div className="flex items-center faq-question-wrapper">
                    <img src={figmaImages.faqIcon} alt="" className="faq-icon" />
                    <span className="text-[#0b1f3b] faq-question">{faq}</span>
                  </div>
                  <img 
                    src={figmaImages.chevronDown} 
                    alt="" 
                    className={`transition-transform faq-chevron ${openFAQ === index ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {openFAQ === index && (
                  <div className="faq-answer">
                    <p className="text-[#4a5565] faq-answer-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelfStudyBundle;
