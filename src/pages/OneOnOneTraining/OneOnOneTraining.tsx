import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import ReadyToStart from '../../components/ReadyToStart/ReadyToStart';
import FAQs from '../../components/FAQs/FAQs';
import { figmaImages } from './figmaAssets';
import Hero from '../../components/Hero/Hero';
import './OneOnOneTraining.css';

const OneOnOneTraining = () => {

  return (
    <div className="one-on-one-training">

      {/* Hero Section */}
      {/* Hero Section */}
      <Hero
        badges={[
          { icon: figmaImages.group, text: "For CFOs, CHROs, CTOs & Senior Leaders" }
        ]}
        title="1-on-1 Executive Portfolio & Strategy Coaching"
        description="We help senior leaders turn strategy into results by strengthening portfolio clarity, prioritization, and execution—so strategic intent delivers measurable business outcomes."
        primaryBtn={{
          text: "Book Free Consultation",
          onClick: () => {
             const batchesSection = document.getElementById('upcoming-batches');
             batchesSection?.scrollIntoView({ behavior: 'smooth' });
          },
          icon: figmaImages.iconArrow,
        }}
        secondaryBtn={{
          text: "Explore 1-on-1 Program",
          className: "btn-secondary"
        }}
        rightElement={
          <div className="relative overflow-hidden rounded-[24px] shadow-2xl">
            <img 
              src={figmaImages.corporateTrainingSession} 
              alt="Executive Coaching" 
              className="max-h-[350px] lg:max-h-[450px] w-auto object-cover" 
            />
          </div>
        }
      />

      {/* Why Choose 1-on-1 Training Section */}
      <section 
        className="py-20"
        style={{
          background: 'linear-gradient(180deg, rgba(194, 221, 255, 0.75) 0%, rgba(194, 221, 255, 0.15) 100%)',
          minHeight: '651px'
        }}
      >
        <div className="max-w-[1920px] mx-auto px-[100px]">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 
              className="text-[#1f3a5f] text-[40px] font-bold leading-[40px] mb-7"
              style={{ fontFamily: 'DM Sans' }}
            >
              Why Choose 1-on-1 Training?
            </h2>
            <p 
              className="text-[#0b1f3b] text-[20px] leading-[28px] max-w-[920px] mx-auto"
              style={{ fontFamily: 'DM Sans' }}
            >
              Designed for leaders who sponsor, fund, or govern initiatives but are not delivery specialists
              <br />
              No prior project or program management background required.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-4 gap-5 mb-10">
            <div className="bg-white border border-[rgba(154,174,211,0.25)] rounded-2xl p-6 flex flex-col items-center gap-4 h-[220px]">
              <div className="w-14 h-14 rounded-[14px] flex items-center justify-center" style={{ background: 'rgba(194, 221, 255, 0.5)' }}>
                <img src={figmaImages.iconCFO} alt="" className="w-7 h-7" />
              </div>
              <div className="text-center">
                <h3 className="text-[#1f3a5f] text-[20px] font-bold leading-[24px] mb-4" style={{ fontFamily: 'DM Sans', letterSpacing: '-1px' }}>
                  CFOs
                </h3>
                <p className="text-[#0b1f3b] opacity-75 text-[14px] leading-[20px]" style={{ fontFamily: 'DM Sans' }}>
                  Custom curriculum designed<br />around your experience, goals, and timeline
                </p>
              </div>
            </div>

            <div className="bg-white border border-[rgba(154,174,211,0.25)] rounded-2xl p-6 flex flex-col items-center gap-4 h-[220px]">
              <div className="w-14 h-14 rounded-[14px] flex items-center justify-center" style={{ background: 'rgba(194, 221, 255, 0.5)' }}>
                <img src={figmaImages.iconCHRO} alt="" className="w-7 h-7" />
              </div>
              <div className="text-center">
                <h3 className="text-[#1f3a5f] text-[20px] font-bold leading-[24px] mb-4" style={{ fontFamily: 'DM Sans', letterSpacing: '-1px' }}>
                  CHROs
                </h3>
                <p className="text-[#0b1f3b] opacity-75 text-[14px] leading-[20px]" style={{ fontFamily: 'DM Sans' }}>
                  Leading enterprise change, workforce initiatives, and ESG commitments
                </p>
              </div>
            </div>

            <div className="bg-white border border-[rgba(154,174,211,0.25)] rounded-2xl p-6 flex flex-col items-center gap-4 h-[220px]">
              <div className="w-14 h-14 rounded-[14px] flex items-center justify-center" style={{ background: 'rgba(194, 221, 255, 0.5)' }}>
                <img src={figmaImages.iconCTO} alt="" className="w-7 h-7" />
              </div>
              <div className="text-center">
                <h3 className="text-[#1f3a5f] text-[20px] font-bold leading-[24px] mb-4" style={{ fontFamily: 'DM Sans', letterSpacing: '-1px' }}>
                  CTOs / CIOs
                </h3>
                <p className="text-[#0b1f3b] opacity-75 text-[14px] leading-[20px]" style={{ fontFamily: 'DM Sans' }}>
                  Overseeing digital, data, and AI portfolios
                </p>
              </div>
            </div>

            <div className="bg-white border border-[rgba(154,174,211,0.25)] rounded-2xl p-6 flex flex-col items-center gap-4 h-[220px]">
              <div className="w-14 h-14 rounded-[14px] flex items-center justify-center" style={{ background: 'rgba(194, 221, 255, 0.5)' }}>
                <img src={figmaImages.iconCTO} alt="" className="w-7 h-7" />
              </div>
              <div className="text-center">
                <h3 className="text-[#1f3a5f] text-[20px] font-bold leading-[24px] mb-4" style={{ fontFamily: 'DM Sans', letterSpacing: '-1px' }}>
                  Senior Executives
                </h3>
                <p className="text-[#0b1f3b] opacity-75 text-[14px] leading-[20px]" style={{ fontFamily: 'DM Sans' }}>
                  PMO leaders responsible for enterprise performance
                </p>
              </div>
            </div>
          </div>

          {/* Perfect For Banner */}
          <div 
            className="perfect-for-banner"
            style={{
              marginTop: '20px'
            }}
          >
            <div className="perfect-for-icon">
              <div className="relative w-full h-full">
                <img src={figmaImages.perfectForVector} alt="" className="absolute inset-0 w-full h-full object-contain" />
                <img src={figmaImages.perfectForVector1} alt="" className="absolute inset-0 w-full h-full object-contain" />
              </div>
            </div>
            <div className="perfect-for-content">
              <h4 className="perfect-for-title">
                Perfect for:
              </h4>
              <p className="perfect-for-description">
                Senior executives & PMO leaders responsible for enterprise performance who need portfolio-level decision confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Portfolio Lens */}
      <section className="py-20 bg-white">
        <div className="max-w-[1920px] mx-auto px-[100px]">
          <h2 
            className="text-[#1f3a5f] text-[40px] font-bold leading-[40px] text-center mb-12"
            style={{ fontFamily: 'DM Sans' }}
          >
            Leadership & Portfolio Lens
          </h2>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-2 gap-5">
            {/* Card 1 */}
            <div 
              className="rounded-2xl border p-6"
              style={{
                background: 'linear-gradient(to bottom, white, #f8fafc)',
                borderColor: '#e5e7eb',
                borderWidth: '1.028px'
              }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(194, 221, 255, 0.5)' }}>
                  <img src={figmaImages.iconLens} alt="" className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-[#1f3a5f] text-[20px] font-bold leading-[28px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                    Portfolio & Governance Baseline
                  </h3>
                  <p className="text-[#0b1f3b] opacity-75 text-[14px] leading-[20px]" style={{ fontFamily: 'DM Sans' }}>
                    We assess how you currently:
                  </p>
                </div>
              </div>
              <div className="space-y-3 pl-6">
                {[
                  'Prioritize and authorize initiatives across the portfolio',
                  'Govern programs, risks, dependencies, and benefits',
                  'Interpret portfolio performance, risk exposure, and delivery signals',
                  'Engage with PMOs, program managers, vendors, and AI initiatives',
                  'This establishes portfolio maturity, governance clarity, and decision risk.'
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <img src={figmaImages.iconCheck} alt="" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-[#0b1f3b] text-[14px] leading-[20px]" style={{ fontFamily: 'DM Sans' }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2 */}
            <div 
              className="rounded-2xl border p-6"
              style={{
                background: 'linear-gradient(to bottom, white, #f8fafc)',
                borderColor: '#e5e7eb',
                borderWidth: '1.028px'
              }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(194, 221, 255, 0.5)' }}>
                  <img src={figmaImages.iconLens} alt="" className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-[#1f3a5f] text-[20px] font-bold leading-[28px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                    Build Portfolio & Program Fluency
                  </h3>
                  <p className="text-[#0b1f3b] opacity-75 text-[14px] leading-[20px]" style={{ fontFamily: 'DM Sans' }}>
                    We help you understand:
                  </p>
                </div>
              </div>
              <div className="space-y-3 pl-6">
                {[
                  'How projects, programs, and portfolios work together to deliver strategy',
                  'The role of governance, benefits management, and stakeholder engagement',
                  'How risk, dependency, and scenario planning influence outcomes',
                  'What effective portfolio and program leadership looks like in practice',
                  'This enables you to lead execution conversations with confidence.'
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <img src={figmaImages.iconCheck} alt="" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-[#0b1f3b] text-[14px] leading-[20px]" style={{ fontFamily: 'DM Sans' }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3 */}
            <div 
              className="rounded-2xl border p-6"
              style={{
                background: 'linear-gradient(to bottom, white, #f8fafc)',
                borderColor: '#e5e7eb',
                borderWidth: '1.028px',
                minHeight: '330px'
              }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(194, 221, 255, 0.5)' }}>
                  <img src={figmaImages.iconLens} alt="" className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-[#1f3a5f] text-[20px] font-bold leading-[28px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                    Define Your Future-Ready Leadership Capability
                  </h3>
                  <p className="text-[#0b1f3b] opacity-75 text-[14px] leading-[20px]" style={{ fontFamily: 'DM Sans' }}>
                    Together, we define:
                  </p>
                </div>
              </div>
              <div className="space-y-3 pl-6">
                {[
                  'The portfolio, program, and risk capability required for your role',
                  'How CFOs, CHROs, and CTOs differentiate themselves as strategic execution leaders',
                  'What future-proof leadership looks like across digital, change, and AI portfolios'
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <img src={figmaImages.iconCheck} alt="" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-[#0b1f3b] text-[14px] leading-[20px]" style={{ fontFamily: 'DM Sans' }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4 */}
            <div 
              className="rounded-2xl border p-6"
              style={{
                background: 'linear-gradient(to bottom, white, #f8fafc)',
                borderColor: '#e5e7eb',
                borderWidth: '1.028px',
                minHeight: '330px'
              }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(194, 221, 255, 0.5)' }}>
                  <img src={figmaImages.iconLens} alt="" className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-[#1f3a5f] text-[20px] font-bold leading-[28px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                    Personalized Capability Roadmap
                  </h3>
                  <p className="text-[#0b1f3b] opacity-75 text-[14px] leading-[20px]" style={{ fontFamily: 'DM Sans' }}>
                    We assess how you currently:
                  </p>
                </div>
              </div>
              <div className="space-y-3 pl-6">
                {[
                  'Portfolio Management, Program Management, Risk Management, PMO Governance, AI Initiative Management',
                  'A structured learning and application plan aligned to your real portfolio',
                  'Selective certifications where they add leadership value—not credentials for their own sake',
                  'Direct application to live initiatives, funding decisions, and governance forums',
                  'No generic study plans. No unnecessary certifications.'
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <img src={figmaImages.iconCheck} alt="" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-[#0b1f3b] text-[14px] leading-[20px]" style={{ fontFamily: 'DM Sans' }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Leaders Choose This Approach */}
      <section 
        className="py-20"
        style={{
          background: 'linear-gradient(-89.99999999999991deg, rgba(194, 221, 255, 0.12) 0%, rgba(194, 221, 255, 0.16) 100%)'
        }}
      >
        <div className="max-w-[1920px] mx-auto px-[100px]">
          <h2 
            className="text-[#1f3a5f] text-[40px] font-bold leading-[40px] text-center mb-12"
            style={{ fontFamily: 'DM Sans' }}
          >
            Why Leaders Choose This Approach
          </h2>

          {/* Grid of 4 cards */}
          <div className="grid grid-cols-2 gap-5 mb-12">
            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 rounded-[10px] bg-[#60a5fa] flex items-center justify-center flex-shrink-0">
                <img src={figmaImages.group10} alt="" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[#1f3a5f] text-[20px] font-semibold leading-[28px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                  Portfolio-Level Decision Confidence
                </h3>
                <p className="text-[#0b1f3b] text-[16px] leading-[24px]" style={{ fontFamily: 'DM Sans' }}>
                  Build strategic thinking, not task-level knowledge
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 rounded-[10px] bg-[#60a5fa] flex items-center justify-center flex-shrink-0">
                <img src={figmaImages.iconLeadership} alt="" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[#1f3a5f] text-[20px] font-semibold leading-[28px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                  Strengthen Governance
                </h3>
                <p className="text-[#0b1f3b] text-[16px] leading-[24px]" style={{ fontFamily: 'DM Sans' }}>
                  Improve prioritization and benefits realization
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 rounded-[10px] bg-[#60a5fa] flex items-center justify-center flex-shrink-0">
                <img src={figmaImages.iconGovernance} alt="" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[#1f3a5f] text-[20px] font-semibold leading-[28px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                  Executive Sponsorship
                </h3>
                <p className="text-[#0b1f3b] text-[16px] leading-[24px]" style={{ fontFamily: 'DM Sans' }}>
                  Lead programs and AI initiatives effectively
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 rounded-[10px] bg-[#60a5fa] flex items-center justify-center flex-shrink-0">
                <img src={figmaImages.group11} alt="" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[#1f3a5f] text-[20px] font-semibold leading-[28px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                  Informed Challenge
                </h3>
                <p className="text-[#0b1f3b] text-[16px] leading-[24px]" style={{ fontFamily: 'DM Sans' }}>
                  Confidently challenge delivery teams and vendors
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-5">
            <div 
              className="rounded-[10px] border-2 p-6 text-center"
              style={{ 
                background: 'rgba(194, 221, 255, 0.4)',
                borderColor: 'rgba(194, 221, 255, 0.4)'
              }}
            >
              <p className="text-[#0b1f3b] text-[28px] font-bold leading-[40px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                100%
              </p>
              <p className="text-[#0b1f3b] opacity-50 text-[16px] leading-[24px]" style={{ fontFamily: 'DM Sans' }}>
                Customized to Your Role
              </p>
            </div>

            <div 
              className="rounded-[10px] border-2 p-6 text-center"
              style={{ 
                background: 'rgba(194, 221, 255, 0.4)',
                borderColor: 'rgba(194, 221, 255, 0.4)'
              }}
            >
              <p className="text-[#0b1f3b] text-[28px] font-bold leading-[40px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                1-on-1
              </p>
              <p className="text-[#0b1f3b] opacity-50 text-[16px] leading-[24px]" style={{ fontFamily: 'DM Sans' }}>
                Executive Coaching
              </p>
            </div>

            <div 
              className="rounded-[10px] border-2 p-6 text-center"
              style={{ 
                background: 'rgba(194, 221, 255, 0.4)',
                borderColor: 'rgba(194, 221, 255, 0.4)'
              }}
            >
              <p className="text-[#0b1f3b] text-[28px] font-bold leading-[40px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                Live
              </p>
              <p className="text-[#0b1f3b] opacity-50 text-[16px] leading-[24px]" style={{ fontFamily: 'DM Sans' }}>
                Portfolio Application
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-[1920px] mx-auto px-[160px]">
          <div 
            className="rounded-[32px] overflow-hidden relative"
            style={{
              background: 'linear-gradient(162.41685359996262deg, rgb(31, 58, 95) 28.291%, rgb(11, 31, 59) 99.666%)',
              height: '457px'
            }}
          >
            {/* Background blur circles */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-[120px] w-64 h-64 bg-[#14b8a6] rounded-full blur-[64px]" />
              <div className="absolute bottom-12 left-0 w-64 h-64 bg-[#60a5fa] rounded-full blur-[64px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-12 text-center">
              {/* Badge */}
              <div 
                className="inline-flex items-center justify-center px-3 py-1 rounded-full mt-1 border border-[rgba(194,221,255,0.25)] mb-8"
                style={{ 
                  background: '#c2ddff',
                  boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px 0px rgba(0,0,0,0.1)'
                }}
              >
                
                <span className="text-[#0e2340] text-[14px] leading-[20px] " style={{ fontFamily: 'DM Sans' }}>
                  Limited Availability
                </span>
              </div>

              {/* Heading */}
              <h2 
                className="text-white text-[40px] leading-[60px] mb-4 max-w-[977px]"
                style={{ fontFamily: 'DM Sans' }}
              >
                Secure Your Personalized 1-on-1 Training Slot Today
              </h2>

              {/* Description */}
              <p 
                className="text-[#c2ddff] text-[20px] leading-[32.5px] mb-8 max-w-[658px]"
                style={{ fontFamily: 'DM Sans' }}
              >
                Get direct guidance from a top 1% PMI-certified expert and fast-track your certification success with customized coaching.
              </p>

              {/* Buttons */}
              <div className="flex gap-4">
                <Link
                  to="/contact"
                  className="px-10 py-3.5 rounded-lg text-white text-[18px] leading-[28px]"
                  style={{
                    background: 'linear-gradient(to bottom, #9aaed3, #5b89b3)',
                    fontFamily: 'DM Sans',
                    boxShadow: '0px 25px 50px 0px rgba(0,0,0,0.25)'
                  }}
                >
                  Book Free Consultation
                </Link>
                <Link
                  to="#"
                  className="px-10 py-3.5 rounded-lg border border-[#c2ddff] text-white text-[18px] leading-[28px]"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  Reserve Your Slot Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1920px] mx-auto px-[100px]">
          <div className="text-center mb-12">
            <h2 
              className="text-[#1f3a5f] text-[40px] font-bold leading-[40px] mb-7"
              style={{ fontFamily: 'DM Sans' }}
            >
              Certifications
            </h2>
            <p 
              className="text-[#0b1f3b] text-[20px] leading-[28px]"
              style={{ fontFamily: 'DM Sans' }}
            >
              Certifications are used as capability accelerators, not end goals:
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* Certification Card 1 */}
            <div 
              className="rounded-2xl border p-6 flex gap-6 items-center"
              style={{ 
                background: 'rgba(194, 221, 255, 0.2)',
                borderColor: 'rgba(154, 174, 211, 0.4)',
                height: '150px'
              }}
            >
              <img src={figmaImages.certPortfolio} alt="" className="w-20 h-20 object-cover flex-shrink-0" />
              <div className="flex-1">
                <span 
                  className="inline-block px-2 py-1 rounded-lg text-white text-[14px] leading-[16px] mb-2"
                  style={{ background: '#ff610f', fontFamily: 'DM Sans' }}
                >
                  Strategic
                </span>
                <h3 className="text-[#0b1f3b] text-[20px] font-semibold leading-[28px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                  Portfolio Management Professional
                </h3>
                <p className="text-[rgba(11,31,59,0.75)] text-[16px] leading-[24px]" style={{ fontFamily: 'DM Sans' }}>
                  Portfolio governance, prioritization, and value optimization
                </p>
              </div>
            </div>

            {/* Certification Card 2 */}
            <div 
              className="rounded-2xl border p-6 flex gap-5 items-center"
              style={{ 
                background: 'rgba(194, 221, 255, 0.2)',
                borderColor: 'rgba(154, 174, 211, 0.4)',
                height: '150px'
              }}
            >
              <img src={figmaImages.certProgram} alt="" className="w-20 h-20 object-cover flex-shrink-0" />
              <div className="flex-1">
                <span 
                  className="inline-block px-2 py-1 rounded-lg text-white text-[14px] leading-[16px] mb-2"
                  style={{ background: '#ff610f', fontFamily: 'DM Sans' }}
                >
                  Executive
                </span>
                <h3 className="text-[#0b1f3b] text-[20px] font-semibold leading-[28px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                  Program Management Professional
                </h3>
                <p className="text-[rgba(11,31,59,0.75)] text-[16px] leading-[24px]" style={{ fontFamily: 'DM Sans' }}>
                  Program leadership and benefits management
                </p>
              </div>
            </div>

            {/* Certification Card 3 */}
            <div 
              className="rounded-2xl border p-6 flex gap-5 items-center"
              style={{ 
                background: 'rgba(194, 221, 255, 0.2)',
                borderColor: 'rgba(154, 174, 211, 0.4)',
                height: '150px'
              }}
            >
              <img src={figmaImages.certRisk} alt="" className="w-20 h-20 object-cover flex-shrink-0" />
              <div className="flex-1">
                <span 
                  className="inline-block px-2 py-1 rounded-lg text-white text-[14px] leading-[16px] mb-2"
                  style={{ background: '#be9577', fontFamily: 'DM Sans' }}
                >
                  Advanced
                </span>
                <h3 className="text-[#0b1f3b] text-[20px] font-semibold leading-[28px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                  Risk Management Professional
                </h3>
                <p className="text-[rgba(11,31,59,0.75)] text-[16px] leading-[24px]" style={{ fontFamily: 'DM Sans' }}>
                  Risk strategy, exposure management, and mitigation
                </p>
              </div>
            </div>

            {/* Certification Card 4 */}
            <div 
              className="rounded-2xl border p-6 flex gap-5 items-center"
              style={{ 
                background: 'rgba(194, 221, 255, 0.2)',
                borderColor: 'rgba(154, 174, 211, 0.4)',
                height: '150px'
              }}
            >
              <img src={figmaImages.certAI} alt="" className="w-20 h-20 object-cover flex-shrink-0 rounded" />
              <div className="flex-1">
                <span 
                  className="inline-block px-2 py-1 rounded-lg text-white text-[14px] leading-[16px] mb-2"
                  style={{ background: '#bf9678', fontFamily: 'DM Sans' }}
                >
                  Emerging
                </span>
                <h3 className="text-[#0b1f3b] text-[20px] font-semibold leading-[28px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                  Certified Professional in AI Management
                </h3>
                <p className="text-[rgba(11,31,59,0.75)] text-[16px] leading-[24px]" style={{ fontFamily: 'DM Sans' }}>
                  Managing AI initiatives responsibly and effectively
                </p>
              </div>
            </div>

            {/* Certification Card 5 */}
            <div 
              className="rounded-2xl border p-6 flex gap-5 items-center"
              style={{ 
                background: 'rgba(194, 221, 255, 0.2)',
                borderColor: 'rgba(154, 174, 211, 0.4)',
                height: '150px'
              }}
            >
              <img src={figmaImages.certPMP} alt="" className="w-20 h-20 object-cover flex-shrink-0 rounded" />
              <div className="flex-1">
                <span 
                  className="inline-block px-2 py-1 rounded-lg text-white text-[14px] leading-[16px] mb-2"
                  style={{ background: '#b465ff', fontFamily: 'DM Sans' }}
                >
                  Foundation
                </span>
                <h3 className="text-[#0b1f3b] text-[20px] font-semibold leading-[28px] mb-2" style={{ fontFamily: 'DM Sans' }}>
                  Project Management Professional
                </h3>
                <p className="text-[rgba(11,31,59,0.75)] text-[16px] leading-[24px]" style={{ fontFamily: 'DM Sans' }}>
                  Execution literacy where required
                </p>
              </div>
            </div>

            {/* Empty card with note */}
            <div className="flex items-center pl-6">
              <p className="text-[rgba(11,31,59,0.75)] text-[16px] leading-[28px]" style={{ fontFamily: 'DM Sans' }}>
                Only included when they support your leadership mandate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <FAQs />

      {/* Contact Form Section */}
      <ReadyToStart /> 
    </div>
  );
};

export default OneOnOneTraining;
