import React from 'react';
import { CheckCircle, User, Award, Users, Building2, Globe, ArrowRight } from 'lucide-react';
import './About.css';
import SuccessStories from '../../components/SuccessStories/SuccessStories';
import NewInstructor from '../../components/NewInstructor/NewInstructor';

// Local Assets for About Page
import leadTrainerLocal from '../../assets/images/about/lead-trainer.png';
import nyleLocal from '../../assets/images/about/testimonial-nyle.png';
import moeenLocal from '../../assets/images/about/testimonial-moeen.png';

import logo1 from '../../assets/images/about/logo-1.png';
import logo2 from '../../assets/images/about/logo-2.png';
import logo3 from '../../assets/images/about/logo-3.png';
import logo4 from '../../assets/images/about/logo-4.png';
import logo5 from '../../assets/images/about/logo-5.png';
import logo6 from '../../assets/images/about/logo-6.png';
import logo7 from '../../assets/images/about/logo-7.png';
import logo8 from '../../assets/images/about/logo-8.png';
import logo9 from '../../assets/images/about/logo-9.png';
import logo10 from '../../assets/images/about/logo-10.png';
import logo11 from '../../assets/images/about/logo-11.png';
import logo12 from '../../assets/images/about/logo-12.png';

// Image URLs from Figma
const imgLeadPmiTrainer = leadTrainerLocal;

// Company logos
const companyLogos = [
  logo1, logo2, logo3, logo4, logo5, logo6,
  logo7, logo8, logo9, logo10, logo11, logo12
];

// Testimonial images
const testimonialImages = {
  nyle: nyleLocal,
  moeen: moeenLocal,
};

interface ExpertiseCard {
  title: string;
  description: string;
  badges: string[];
}

interface CareerPath {
  level: string;
  title: string;
  badge: string;
  description: string;
  salaryRange: string;
  icon: React.ReactNode;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  badge: string;
  image: string;
}

const About: React.FC = () => {
  const expertiseCards: ExpertiseCard[] = [
    {
      title: "Risk & Governance Expertise",
      description: "Applied to portfolio and program risk, investment exposure, and decision-making—not just project-level risk logs.",
      badges: ["PMI-RMP®"]
    },
    {
      title: "Change & Transformation Leadership",
      description: "Our work integrates change leadership, stakeholder engagement, and adoption planning into portfolio and program governance.",
      badges: ["Prosci® Certified Change Practitioner", "Prosci® Methodology Application Program"]
    },
    {
      title: "AI & Emerging Technology Delivery",
      description: "We help organizations manage AI initiatives from business need identification through operationalization, with a focus on value, trust, and accountability.",
      badges: ["PMI-CPMAI™", "CPMAI™", "PMI Learning"]
    },
    {
      title: "Agile & Hybrid Delivery",
      description: "Applied pragmatically within enterprise governance and portfolio controls.",
      badges: ["PMI-RMP®"]
    }
  ];

  const careerPaths: CareerPath[] = [
    {
      level: "Entry Level",
      title: "Project Coordinator",
      badge: "CAPM®",
      description: "Start your project management journey with foundational skills and certifications.",
      salaryRange: "$45K - $65K",
      icon: <User size={24} className="text-[#1F3A5F]" />
    },
    {
      level: "Mid Level",
      title: "Project Manager",
      badge: "PMP®",
      description: "Lead projects independently with industry-recognized credentials and expertise.",
      salaryRange: "$75K - $110K",
      icon: <Users size={24} className="text-[#1F3A5F]" />
    },
    {
      level: "Senior Level",
      title: "Senior PM / Program Manager",
      badge: "PgMP®",
      description: "Manage complex programs and mentor teams with advanced certifications.",
      salaryRange: "$120K - $160K",
      icon: <Building2 size={24} className="text-[#1F3A5F]" />
    },
    {
      level: "Executive",
      title: "PMO Director / VP",
      badge: "PfMP®",
      description: "Lead organizational strategy and portfolio management at the executive level.",
      salaryRange: "$170K - $250K+",
      icon: <Globe size={24} className="text-[#1F3A5F]" />
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Nyle Hassan",
      role: "Project Manager",
      company: "Amazon",
      rating: 5,
      text: "Samia's coaching helped me bridge project management theory with how work actually happens at Amazon. Her breadth of credentials and real-world experience is unmatched. The one-on-one sessions played a key role in helping me grow.",
      badge: "✓ Passed - Above Target",
      image: testimonialImages.nyle
    },
    {
      name: "Moeen Khurshid",
      role: "Senior Project Manager",
      company: "Ontario Public Service",
      rating: 5,
      text: "I studied project management with Samia over a decade ago and passed PMP on the first attempt. Years later, I returned for one-on-one PgMP coaching. Very few professionals maintain this level of depth and relevance over time.",
      badge: "✓ 15% Salary Increase",
      image: testimonialImages.moeen
    },
    {
      name: "Syeda Rabbia",
      role: "Project Manager",
      company: "Ontario Public Service",
      rating: 5,
      text: "I completed PMP with Samia five years ago and am now enrolled in CPMAI. Her ability to simplify complex project management frameworks while keeping them practical and relevant has consistently supported my professional growth",
      badge: "✓ Passed First Attempt",
      image: testimonialImages.nyle
    }
  ];

  const trainerHighlights = [
    "PMI Authorized Training Partner (ATP)",
    "20+ Years of Enterprise Project Management",
    "Former Fortune 500 PMO Director",
    "Trained 10,000+ Professionals Globally",
    "Published Author & Industry Speaker",
    "Multiple PMI Credential Holder"
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="about-hero py-20 px-6 md:px-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 text-white">
              <div className="inline-flex items-center gap-2 bg-[#C2DDFF] border border-[#C2DDFF40] rounded-full px-4 py-2 mb-8">
                <Award className="w-4 h-4 text-[#364153]" />
                <span className="text-sm font-medium text-[#364153]">Globally Recognized Standards & Credentials</span>
              </div>
              
              <h1 className="about-hero-title mb-4">
                Our Credentials & Standards
              </h1>
              
              <p className="about-hero-description mb-8">
                Our work is grounded in globally recognized project, portfolio, change, risk, and
                AI management standards. We don't just teach frameworks — we apply them to real
                leadership, governance, and execution challenges.
              </p>
            </div>

            {/* Right Side Image & Badge */}
            <div className="relative">
              <div className="about-hero-image-container">
                {/* 15 years of badge */}
                <div className="years-badge">
                  <div className="years-badge-content">
                    <div className="years-badge-icon">
                      <Users/>
                    </div>
                    <div>
                      <div className="years-badge-number">15+</div>
                      <div className="years-badge-label">Years of Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PMI ATP Partner Section */}
      <section className="bg-gradient-to-r from-[#3d226b] to-[#261346] py-8 px-6 md:px-20">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-[117px] h-[117px] rounded-full overflow-hidden flex-shrink-0">
            <img src="/PMI-Authorized-Training-Partner.png" alt="PMI ATP Logo" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1 text-white">
            <h2 className="atp-section-title mb-4">
              PMI Authorized Training Partner – Premier
            </h2>
            <p className="atp-section-description leading-relaxed opacity-90">
              As a PMI Authorized Training Partner (ATP) – Premier, we deliver PMI-aligned programs that meet the highest standards of instructional
              quality, ethics, and relevance. This ensures our clients receive accurate, current, and globally recognized guidance aligned with PMI's evolving view of project success and value delivery.
            </p>
          </div>
        </div>
      </section>

      {/* About Introduction */}
      <section className="about-intro-section">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <h2 className="about-intro-title">
                Empowering Professionals Through Project Management Excellence
              </h2>
            </div>
            
            <div className="flex-1 space-y-8 about-intro-description">
              <p>
                SnSCSS is a specialized professional education institute and a one-stop shop for all major PMI® certifications across the field of project management. We are designed for professionals who want a single, trusted academy to support their growth across project, program, portfolio, risk, agile, business analysis, PMO leadership, and AI-enabled delivery—without switching providers as their careers evolve.
              </p>
              
              <p>
                Unlike providers that focus on one or two credentials, SnSCSS delivers end-to-end PMI® certification pathways under one roof. This comprehensive approach ensures consistency in standards, learning methodologies, and professional guidance across every certification level, eliminating the need to navigate multiple training providers as your career advances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Led by Trainer Section */}
      <NewInstructor
        data={{
          name: 'Samia Waqar – Certified Success',
          title: 'Top PMI-Certified Professional',
          certifications: 'PMP | PgMP | PfMP | PMI-ACP | PMI | CPMAI | PMI-RMP',
          expertise: trainerHighlights,
        }}
      />

      {/* Company Logos */}
      <section className="bg-white py-20 px-6 md:px-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-14">
            {companyLogos.map((logo, index) => (
              <div key={index} className="w-40 h-40 rounded-full border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
                <img src={logo} alt={`Company ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Expertise */}
      <section className="bg-gradient-to-br from-[#1f3a5f] to-[#0b1f3b] py-20 px-6 md:px-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center text-white mb-12">
            <h2 className="text-4xl font-bold mb-4">Specialized Expertise</h2>
            <p className="text-xl max-w-4xl mx-auto opacity-90">
              SnSCCS does not teach theory for the sake of passing exams. We train professionals to perform in real roles by providing practical, immediately applicable knowledge that bridges the gap between certification requirements and workplace demands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {expertiseCards.map((card, index) => (
              <div key={index} className="bg-white border border-[#f3f4f6] rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#1f3a5f] mb-3 leading-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-[#0b1f3b]/75 mb-5 leading-relaxed">
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {card.badges.map((badge, badgeIndex) => (
                    <span key={badgeIndex} className="inline-block bg-[#60a5fa]/15 border border-[#9aaed3]/25 text-xs px-3 py-1.5 rounded-lg text-[#0a0a0a]">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#c2ddff] border border-[#1f3a5f]/15 rounded-2xl p-6 text-center">
            <p className="text-sm text-[#1f3a5f] font-medium leading-relaxed max-w-5xl mx-auto">
              Our programs are designed for busy professionals, using highly efficient learning techniques refined through decades of real certification and enterprise delivery experience. Every lesson is structured to maximize learning impact while respecting the time constraints of working executives.
            </p>
          </div>
        </div>
      </section>

      {/* Career Progression Paths */}
      <section className="bg-gradient-to-b from-white/50 via-[#c2ddff]/75 to-transparent py-20 px-6 md:px-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1f3a5f] mb-4">
              Career Growth & Progression Paths
            </h2>
            <p className="text-xl text-[#0b1f3b] max-w-3xl mx-auto">
              Map your project management career from entry-level to executive with our comprehensive certification pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {careerPaths.map((path, index) => (
              <div key={index} className="relative bg-white border border-[#e1e7ef]/50 rounded-3xl shadow-lg overflow-visible">
                {/* Level Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#c2deff] px-4 py-1 rounded-full">
                  <span className="text-xs font-semibold text-[#0d213b]">{path.level}</span>
                </div>

                <div className="pt-12 pb-6 px-6">
                  {/* Icon placeholder */}
                  <div className="w-16 h-16 bg-[#C2DDFF]/30 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                    {path.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-center text-base font-bold text-[#102238] mb-4">
                    {path.title}
                  </h3>

                  {/* Badge */}
                  <div className="flex justify-center mb-4">
                    <span className="inline-block bg-[#60a6fb]/20 px-3 py-1 rounded-full text-xs font-semibold text-[#60a6fb]">
                      {path.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-center text-sm text-[#102238] leading-relaxed mb-6">
                    {path.description}
                  </p>

                  {/* Salary Range */}
                  <div className="border-t border-[#E1E7EF80] pt-4">
                    <p className="text-center text-xs text-[#102238] mb-1">Avg. Salary Range</p>
                    <p className="text-center text-lg font-bold text-[#102238]">{path.salaryRange}</p>
                  </div>
                </div>

                {/* Arrow connector (except last item) */}
                {index < careerPaths.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-5 transform -translate-y-1/2 w-6 h-6 z-10">
                    <ArrowRight className="w-6 h-6 text-[#60A6FB]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <SuccessStories />

      {/* Credentials Philosophy */}
      <section className="bg-white py-20 px-6 md:px-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* What This Means */}
            <div className="bg-[#9aaed3]/25 border border-[#9aaed3]/50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#1f3a5f] mb-2">
                What This Means for Our Clients
              </h3>
              <p className="text-base text-[#0b1f3b] mb-6">Our credentials ensure that:</p>
              
              <div className="space-y-3">
                {[
                  "Guidance is globally aligned and current",
                  "Recommendations are governance-ready and executive-relevant",
                  "Learning translates into better decisions, not just certificates",
                  "Strategy execution is treated as a leadership capability, not a technical skill"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0b1f3b] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#0b1f3b]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How We Use Certifications */}
            <div className="bg-[#9aaed3]/25 border border-[#9aaed3]/50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#1f3a5f] mb-2">
                How We Use Certifications
              </h3>
              <p className="text-base text-[#0b1f3b] mb-6">Certifications are never the goal.</p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#0b1f3b] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#0b1f3b]">
                    <p className="mb-1">They are used selectively to:</p>
                    <ul className="list-disc list-inside space-y-1 opacity-75 ml-2">
                      <li>Accelerate capability</li>
                      <li>Establish a shared execution language</li>
                      <li>Strengthen governance and decision confidence</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#0b1f3b] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#0b1f3b]">
                    Always in service of stakeholder-defined value.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
