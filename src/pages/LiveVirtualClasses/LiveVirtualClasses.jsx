import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, Users, Download, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import SuccessStories from '../../components/SuccessStories/SuccessStories';
import { figmaImages } from './figmaAssets';
import Hero from '../../components/Hero/Hero';
import NewInstructor from '../../components/NewInstructor/NewInstructor';
import './LiveVirtualClasses.css';

const LiveVirtualClasses = () => {
  const navigate = useNavigate();
  const { courseSlug = 'pmp' } = useParams();
  const { addToCart } = useCart();
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [timezoneOpen, setTimezoneOpen] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState('(EDT-04:00) Canada/Ontario');
  const timezoneRef = useRef(null);

  // Debug: Log courseSlug to verify routing works
  React.useEffect(() => {
    console.log('LiveVirtualClasses loaded with courseSlug:', courseSlug);
  }, [courseSlug]);

  // Close timezone dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timezoneRef.current && !timezoneRef.current.contains(event.target)) {
        setTimezoneOpen(false);
      }
    };

    if (timezoneOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [timezoneOpen]);

  // Common timezones for training
  const timezones = [
    { label: '(EDT-04:00) Canada/Ontario', value: 'America/Toronto' },
    { label: '(EST-05:00) US Eastern', value: 'America/New_York' },
    { label: '(CST-06:00) US Central', value: 'America/Chicago' },
    { label: '(MST-07:00) US Mountain', value: 'America/Denver' },
    { label: '(PST-08:00) US Pacific', value: 'America/Los_Angeles' },
    { label: '(GMT+00:00) London', value: 'Europe/London' },
    { label: '(GMT+01:00) Paris', value: 'Europe/Paris' },
    { label: '(GMT+02:00) Cairo', value: 'Africa/Cairo' },
    { label: '(GMT+05:30) Mumbai', value: 'Asia/Kolkata' },
    { label: '(GMT+08:00) Singapore', value: 'Asia/Singapore' },
    { label: '(GMT+09:00) Tokyo', value: 'Asia/Tokyo' },
    { label: '(GMT+10:00) Sydney', value: 'Australia/Sydney' }
  ];

  // Course data mapping
  const courseData = {
    pmp: {
      title: 'PMP Certification Training',
      subtitle: 'Live Virtual Classes',
      description: 'PMI-aligned training with 35 contact hours. Pass your PMP exam with confidence through our expert-led live virtual classes.',
      badge: 'Live Virtual Training',
      image: '/PMI-PMP-badge.png',
      certificationName: 'PMP',
      fullCertificationName: 'PMP',
      certificationDescription: 'The Project Management Professional (PMP)® is the world\'s leading project management certification'
    },
    pgmp: {
      title: 'PMI-PgMP Certification Training',
      subtitle: 'Live Virtual Classes',
      description: 'PMI-aligned training with 35 contact hours. Pass your PMI-PgMP exam with confidence through our expert-led live virtual classes.',
      badge: 'Live Virtual Training',
      image: '/PMI-PGMP-badge.png',
      certificationName: 'PgMP',
      fullCertificationName: 'PMI-PgMP',
      certificationDescription: 'The Program Management Professional (PgMP)® is the world\'s leading program management certification'
    },
    acp: {
      title: 'PMI-ACP Certification Training',
      subtitle: 'Live Virtual Classes',
      description: 'PMI-aligned training with 35 contact hours. Pass your PMI-ACP exam with confidence through our expert-led live virtual classes.',
      badge: 'Live Virtual Training',
      image: '/PMI-ACP-badge.png',
      certificationName: 'ACP',
      fullCertificationName: 'PMI-ACP',
      certificationDescription: 'The Agile Certified Practitioner (ACP)® is the world\'s leading agile project management certification'
    },
    rmp: {
      title: 'PMI-RMP Certification Training',
      subtitle: 'Live Virtual Classes',
      description: 'PMI-aligned training with 35 contact hours. Pass your PMI-RMP exam with confidence through our expert-led live virtual classes.',
      badge: 'Live Virtual Training',
      image: '/PMI-RMP-badge.png',
      certificationName: 'RMP',
      fullCertificationName: 'PMI-RMP',
      certificationDescription: 'The Risk Management Professional (RMP)® is the world\'s leading risk management certification'
    },
    cpmai: {
      title: 'PMI-CPMAI Certification Training',
      subtitle: 'Live Virtual Classes',
      description: 'PMI-aligned training with 35 contact hours. Pass your PMI-CPMAI exam with confidence through our expert-led live virtual classes.',
      badge: 'Live Virtual Training',
      image: '/PMI-CPMAI-badge.png',
      certificationName: 'CPMAI',
      fullCertificationName: 'PMI-CPMAI',
      certificationDescription: 'The Certified Practitioner in AI (CPMAI)® is the world\'s leading AI project management certification'
    },
    pfmp: {
      title: 'PMI-PfMP Certification Training',
      subtitle: 'Live Virtual Classes',
      description: 'PMI-aligned training with 35 contact hours. Pass your PMI-PfMP exam with confidence through our expert-led live virtual classes.',
      badge: 'Live Virtual Training',
      image: '/PMI-PFMP-badge.png',
      certificationName: 'PfMP',
      fullCertificationName: 'PMI-PfMP',
      certificationDescription: 'The Portfolio Management Professional (PfMP)® is the world\'s leading portfolio management certification'
    }
  };

  const currentCourse = courseData[courseSlug] || courseData.pmp;

  const handleEnroll = (batch) => {
    const price = batch.hasFlashSale ? 1000 : 2000;
    addToCart({
      id: `${courseSlug}-live-${batch.date.replace(/\s/g, '-').toLowerCase()}`,
      title: `${currentCourse.fullCertificationName}® Live Virtual Class - ${batch.date}`,
      price: price,
      originalPrice: batch.hasFlashSale ? 2000 : 2000,
      type: 'Live Class',
      date: batch.date,
      schedule: batch.schedule
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

  // About Certification cards - Using exact Figma assets
  const aboutCards = [
    {
      icon: figmaImages.aboutIcon1,
      title: `What is ${currentCourse.certificationName}?`,
      description: `${currentCourse.fullCertificationName} is a globally recognized certification offered by the Project Management Institute (PMI) that validates your expertise in project management.`,
      iconBg: 'linear-gradient(142.1684277680153deg, rgb(31, 58, 95) 28.291%, rgb(11, 31, 59) 99.666%), linear-gradient(90deg, rgb(219, 234, 254) 0%, rgb(219, 234, 254) 100%)'
    },
    {
      icon: figmaImages.aboutIcon2,
      title: 'Why It Matters',
      description: `${currentCourse.fullCertificationName} certification holders earn 25% more than non-certified professionals. It opens doors to senior project management roles.`,
      iconBg: 'linear-gradient(142.1684277680153deg, rgb(31, 58, 95) 28.291%, rgb(11, 31, 59) 99.666%), linear-gradient(90deg, rgb(255, 237, 212) 0%, rgb(255, 237, 212) 100%)'
    },
    {
      icon: figmaImages.aboutIcon3,
      title: 'Course Delivery',
      description: 'Our live virtual classes combine the best of both worlds—interactive instructor-led training from the comfort of your home.',
      iconBg: 'linear-gradient(142.1684277680153deg, rgb(31, 58, 95) 28.291%, rgb(11, 31, 59) 99.666%), linear-gradient(90deg, rgb(219, 234, 254) 0%, rgb(219, 234, 254) 100%)'
    }
  ];

  // Who is this course for
  const targetAudience = [
    { icon: '👔', title: 'Project Managers', description: 'Current PMs wanting to formalize their skills and get certified' },
    { icon: '👥', title: 'Team Leads', description: 'Team leaders managing project teams and deliverables' },
    { icon: '🏢', title: 'PMO Members', description: 'Project Management Office professionals seeking advancement' },
    { icon: '🔄', title: 'Career Changers', description: 'Professionals transitioning into project management roles' },
    { icon: '💡', title: 'Consultants', description: 'Management consultants needing PM credentials' },
    { icon: '💻', title: 'IT Professionals', description: 'Technology professionals managing software projects' },
    { icon: '🌍', title: 'International PMs', description: 'Global professionals managing cross-border projects' },
    { icon: '⚡', title: 'Agile Practitioners', description: 'Scrum Masters and Agile coaches expanding expertise' }
  ];

  // Upcoming batches
  const upcomingBatches = [
    {
      date: 'April 3, 2026',
      schedule: '9:00 AM–5:00 PM',
      price: '$2,000',
      originalPrice: '$2,000',
      salePrice: null,
      hasFlashSale: false,
      sellingFast: true,
      saleEnds: null
    },
    {
      date: 'May 1, 2026',
      schedule: '9:00 AM–5:00 PM',
      price: '$1,000',
      originalPrice: '$2,000',
      salePrice: '$1,000',
      hasFlashSale: true,
      sellingFast: true,
      saleEnds: 'Jan 04'
    },
    {
      date: 'June 5, 2026',
      schedule: '9:00 AM–5:00 PM',
      price: '$2,000',
      originalPrice: '$2,000',
      salePrice: null,
      hasFlashSale: false,
      sellingFast: false,
      saleEnds: null
    },
    {
      date: 'July 3, 2026',
      schedule: '9:00 AM–5:00 PM',
      price: '$2,000',
      originalPrice: '$2,000',
      salePrice: null,
      hasFlashSale: false,
      sellingFast: false,
      saleEnds: null
    },
    {
      date: 'Aug 7, 2026',
      schedule: '9:00 AM–5:00 PM',
      price: '$2,000',
      originalPrice: '$2,000',
      salePrice: null,
      hasFlashSale: false,
      sellingFast: false,
      saleEnds: null
    },
    {
      date: 'Sep 4, 2026',
      schedule: '9:00 AM–5:00 PM',
      price: '$2,000',
      originalPrice: '$2,000',
      salePrice: null,
      hasFlashSale: false,
      sellingFast: false,
      saleEnds: null
    },
    {
      date: 'Oct 2, 2026',
      schedule: '9:00 AM–5:00 PM',
      price: '$2,000',
      originalPrice: '$2,000',
      salePrice: null,
      hasFlashSale: false,
      sellingFast: false,
      saleEnds: null
    },
    {
      date: 'Nov 6, 2026',
      schedule: '9:00 AM–5:00 PM',
      price: '$2,000',
      originalPrice: '$2,000',
      salePrice: null,
      hasFlashSale: false,
      sellingFast: false,
      saleEnds: null
    },
    {
      date: 'Dec 4, 2026',
      schedule: '9:00 AM–5:00 PM',
      price: '$2,000',
      originalPrice: '$2,000',
      salePrice: null,
      hasFlashSale: false,
      sellingFast: false,
      saleEnds: null
    }
  ];

  // Training schedule weeks
  const trainingSchedule = [
    {
      week: 'Week 1',
      title: 'Foundations',
      topics: ['PM Framework', 'People Domain', 'Team Management']
    },
    {
      week: 'Week 2',
      title: 'Process Mastery',
      topics: ['Initiating & Planning', 'Scope & Schedule', 'Risk Management']
    },
    {
      week: 'Week 3',
      title: 'Agile & Execution',
      topics: ['Agile Frameworks', 'Monitoring & Control', 'Quality Management']
    },
    {
      week: 'Week 4',
      title: 'Exam Prep',
      topics: ['Exam Simulation', 'Review Sessions', 'Exam Strategies']
    }
  ];

  // Stats
  const stats = [
    { value: '32+', label: 'Live Training Hours' },
    { value: '720', label: 'Practice Questions' },
    { value: '6 Mo', label: 'Post-Training Support' },
    { value: '100%', label: 'Job-Ready Skills' }
  ];

  // Live Virtual Training FAQs
  const liveVirtualFAQs = [
    {
      question: `What are the prerequisites for ${currentCourse.fullCertificationName} certification?`,
      answer: `To qualify for the ${currentCourse.fullCertificationName} exam, you need a four-year degree, 36 months of leading projects, and 35 hours of project management education/training OR a high school diploma/associate degree, 60 months of leading projects, and 35 hours of project management education/training. Our course provides the mandatory 35 contact hours.`
    },
    {
      question: 'How long will I have access to course materials?',
      answer: 'You will have lifetime access to all course materials, including recorded sessions, study guides, and practice exams. This ensures you can review content at any time, even after completing the course.'
    },
    {
      question: 'What if I miss a live session?',
      answer: 'All live sessions are recorded and made available within 24 hours. You can watch the recordings at your convenience and catch up on any missed content. Our instructors are also available for follow-up questions.'
    },
    {
      question: `Are the mock exams similar to the actual ${currentCourse.fullCertificationName} exam?`,
      answer: `Yes, our 4 full-length mock exams are designed to closely mimic the actual ${currentCourse.fullCertificationName} exam format, difficulty level, and question types. They help you build confidence and identify areas that need more focus.`
    },
    {
      question: 'What technology/platform do you use for live classes?',
      answer: 'We use Zoom for our live virtual classes, which provides excellent video quality, interactive features, and breakout rooms for group activities. You\'ll receive detailed instructions on how to join and use the platform before the first session.'
    },
    {
      question: 'Can I switch batches if my schedule changes?',
      answer: 'Yes, we understand that schedules can change. You can switch to another available batch up to 7 days before your registered batch starts, subject to seat availability.'
    },
    {
      question: 'Do you provide the PMBOK Guide?',
      answer: 'Yes, we provide digital access to the PMBOK Guide and other essential PMI resources. You\'ll also receive our comprehensive study materials that complement the PMBOK Guide.'
    },
    {
      question: 'What is your refund policy?',
      answer: 'We offer a full refund if you cancel within 14 days of enrollment and before the course start date. After the course begins, we offer a prorated refund or the option to transfer to a future batch.'
    },
    {
      question: `How soon can I take the ${currentCourse.fullCertificationName} exam after completing the course?`,
      answer: `You can schedule your ${currentCourse.fullCertificationName} exam as soon as you complete the 35 contact hours and feel prepared. Most students take the exam within 2-4 weeks after course completion. We provide exam scheduling guidance and support.`
    },
    {
      question: `Do you help with the ${currentCourse.fullCertificationName} application process?`,
      answer: `Absolutely! We provide step-by-step guidance on completing your ${currentCourse.fullCertificationName} application, including how to document your project experience, and we review your application before submission to ensure it meets PMI requirements.`
    }
  ];

  return (
    <div className="live-virtual-classes">
      {/* Hero Section */}
      <Hero
        badges={[
          { icon: figmaImages.badgeIcon, text: currentCourse.badge }
        ]}
        title={currentCourse.title}
        subtitle={currentCourse.subtitle}
        description={currentCourse.description}
        primaryBtn={{
          text: "View Upcoming Batches",
          onClick: () => {
            const batchesSection = document.getElementById('upcoming-batches');
            batchesSection?.scrollIntoView({ behavior: 'smooth' });
          },
          icon: figmaImages.heroArrowIcon,
          className: "btn-primary"
        }}
        secondaryBtn={{
          text: "Download Brochure",
          onClick: handleDownloadBrochure,
          icon: figmaImages.heroDownloadIcon,
          className: "btn-secondary"
        }}
        rightElement={
          <div className="hero-right-image-wrapper p-4 flex items-center justify-center">
            <img
              src={currentCourse.image}
              alt={currentCourse.title}
              className="max-h-[350px] lg:max-h-[450px] w-auto object-contain rounded-2xl"
            />
          </div>
        }
      />

      {/* About Certification Section */}
      <section className="about-section">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-[75px]">
          <div className="section-header">
            <h2 className="section-title">About the<br />{currentCourse.fullCertificationName} Certification</h2>
            <p className="section-subtitle">
              {currentCourse.certificationDescription}
            </p>
          </div>
          <div className="about-cards">
            {aboutCards.map((card, index) => (
              <div key={index} className="about-card">
                <div className="card-icon-wrapper">
                  <div className="card-icon-bg" style={{ background: card.iconBg }}>
                    <img
                      src={card.icon}
                      alt={card.title}
                      style={{ width: '32px', height: '32px' }}
                    />
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This Course For */}
      <section className="target-audience-section">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="section-header">
            <h2 className="section-title">Who Is This Course For?</h2>
            <p className="section-subtitle">
              {currentCourse.certificationDescription}. Designed for professionals who want to advance their careers and demonstrate their expertise in project management.
            </p>
          </div>
          <div className="audience-grid">
            {targetAudience.map((item, index) => {
              const iconMap = [
                figmaImages.audienceIcon1, figmaImages.audienceIcon2, figmaImages.audienceIcon3,
                figmaImages.audienceIcon4, figmaImages.audienceIcon5, figmaImages.audienceIcon6,
                figmaImages.audienceIcon7, figmaImages.audienceIcon8
              ];
              return (
                <div key={index} className="audience-card">
                  <div className="audience-icon">
                    <img src={iconMap[index]} alt={item.title} />
                  </div>
                  <div className="audience-content">
                    <h3 className="audience-title">{item.title}</h3>
                    <p className="audience-description">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Batches */}
      <section id="upcoming-batches" className="batches-section">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="section-header">
            <h2 className="section-title">Upcoming Batches</h2>
            <p className="section-subtitle">
              Choose a schedule that fits your availability. Limited seats available!
            </p>
          </div>

          {/* Timezone and Enrollment Links */}
          <div className="batches-filter-options">
            <div className="timezone-selector">
              <span className="timezone-label">Time zone:</span>
              <div className="timezone-dropdown-wrapper" ref={timezoneRef}>
                <div
                  className="timezone-dropdown"
                  onClick={() => setTimezoneOpen(!timezoneOpen)}
                >
                  <span>{selectedTimezone}</span>
                  <img
                    src={figmaImages.timezoneChevronIcon}
                    alt="Dropdown"
                    className={`timezone-chevron ${timezoneOpen ? 'open' : ''}`}
                  />
                </div>
                {timezoneOpen && (
                  <div className="timezone-dropdown-menu">
                    {timezones.map((tz, idx) => (
                      <div
                        key={idx}
                        className={`timezone-option ${selectedTimezone === tz.label ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedTimezone(tz.label);
                          setTimezoneOpen(false);
                        }}
                      >
                        {tz.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="enrollment-links">
              <a href="#" className="enroll-multiple-link">Enroll Multiple students</a>
              <span className="link-separator">|</span>
              <a href="#" className="request-private-link">Request Private Class for your Team</a>
            </div>
          </div>

          {/* Batches List */}
          <div className="batches-list-wrapper">
            <div className="batches-list">
              {upcomingBatches.map((batch, index) => (
                <div key={index} className={`batch-card-row ${index % 2 === 1 ? 'batch-card-alt' : ''}`}>
                  {/* Date and Class Details */}
                  <div className="batch-date-section">
                    <div className="batch-date">{batch.date}</div>
                    <a href="#" className="class-details-link">
                      Class details
                      <img src={figmaImages.classDetailsArrowIcon} alt="" className="class-details-arrow" />
                    </a>
                  </div>

                  {/* Weekend Class */}
                  <div className="batch-class-type">
                    <img src={figmaImages.weekendClassIcon} alt="Weekend Class" className="batch-icon" />
                    <div className="batch-class-text">
                      <span>Weekend Class</span>
                      <span>(Fri-Sat-Sun)</span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="batch-time">
                    <img src={figmaImages.timeIcon} alt="Time" className="batch-icon" />
                    <span>{batch.schedule}</span>
                  </div>

                  {/* Price Section */}
                  {batch.hasFlashSale ? (
                    <div className="batch-price-flash-sale">
                      <div className="flash-sale-badge">Flash sale</div>
                      <div className="flash-sale-content">
                        <div className="save-text">Save $1000 Now</div>
                        <div className="price-comparison">
                          <span className="price-strike-through">$2,000</span>
                          <span className="price-actual">$1000 USD</span>
                        </div>
                        <div className="sale-ends-text">Sale Ends {batch.saleEnds}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="batch-price-normal">
                      <span className="price-amount">$2,000 USD</span>
                    </div>
                  )}

                  {/* Enroll Button and Selling Fast */}
                  <div className="batch-enroll-section">
                    <button
                      className="btn btn-enroll-new"
                      onClick={() => handleEnroll(batch)}
                    >
                      Enroll now
                      <img src={figmaImages.enrollArrowIcon} alt="" className="enroll-arrow" />
                    </button>
                    {batch.sellingFast && (
                      <div className="selling-fast-badge">
                        <img src={figmaImages.sellingFastIcon} alt="" className="selling-fast-icon" />
                        <span>Selling Fast</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots - Mobile Only */}
            <div className="batches-pagination-dots">
              <div className="pagination-dot active"></div>
              <div className="pagination-dot"></div>
              <div className="pagination-dot"></div>
              <div className="pagination-dot"></div>
              <div className="pagination-dot"></div>
              <div className="pagination-dot"></div>
              <div className="pagination-dot"></div>
            </div>
          </div>

          {/* <p className="batches-note">All batches include 35 PDUs • 4 Mock Exams • 6 months post-training support</p> */}
        </div>
      </section>

      {/* Training Schedule */}
      <section className="schedule-section ">
        <div className="schedule-container max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="schedule-section-title">4-Week Training Schedule</h2>
          <div className="schedule-grid">
            {trainingSchedule.map((week, index) => (
              <div key={index} className="schedule-card">
                <div className="schedule-card-content">
                  <div className="schedule-badge">{week.week}</div>
                  <h3 className="schedule-title">{week.title}</h3>
                  <ul className="schedule-topics">
                    {week.topics.map((topic, idx) => (
                      <li key={idx} className="schedule-topic-item">
                        <img src={figmaImages.scheduleCheckIcon} alt="" className="schedule-topic-icon" />
                        <span className="schedule-topic-text">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section - Combined with Training Schedule */}
        <div className="stats-section-combined mb-8">
          <div className="stats-grid-combined">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item-combined">
                <div className="stat-value-combined">{stat.value}</div>
                <div className="stat-label-combined">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <NewInstructor
        data={{
          name: 'Samia Waqar – Certified Success',
          title: 'Top PMI-Certified Professional',
          certifications: 'PMP, PgMP, PfMP, PMI-ACP, PMI CPMAI & PMI-RMP',
          expertise: [
            'Managed $50M+ portfolio across IT, construction, and healthcare',
            'Regular speaker at PMI Global Summits',
            '18+ years of project management experience',
            `Trained 5,000+ ${currentCourse.fullCertificationName} candidates with 98% pass rate`,
            'PMI-approved instructor since 2012',
            'Published author of PM best practices guides',
          ],
        }}
        instructorImage="/assets/instructor-lead-pmi-trainer.png"
      />

      {/* Success Stories */}
      <SuccessStories />

      {/* FAQs Section */}
      <section className="faqs-section-live">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="section-header">
            <h2 className="section-title">Live Virtual Training FAQs</h2>
            <p className="section-subtitle">
              Get answers to common questions about our live virtual training program
            </p>
          </div>
          <div className="faqs-list">
            {liveVirtualFAQs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item-live ${activeFAQ === index ? 'active' : ''}`}
              >
                <button
                  className="faq-question-live"
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                >
                  <div className="question-content">
                    <img src={figmaImages.faqQuestionIcon} alt="" className="question-icon" />
                    <span>{faq.question}</span>
                  </div>
                  <img
                    src={figmaImages.faqChevronIcon}
                    alt=""
                    className={`faq-chevron ${activeFAQ === index ? 'rotate' : ''}`}
                  />
                </button>
                <div className="faq-answer-live">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default LiveVirtualClasses;
