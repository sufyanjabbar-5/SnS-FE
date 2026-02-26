import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCcw, Award, ChevronLeft, ChevronRight, Users, ArrowRight } from 'lucide-react';

interface ProgramCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}

const programs: ProgramCard[] = [
  {
    title: "Live Bootcamp",
    description: "Join immersive live bootcamps led by industry experts, featuring real-time interaction, structured learning plans, and exam-focused guidance.",
    icon: <Award color='#5B89B3'/>,
    link: "/pmp"
  },
  {
    title: "Complete Self-Study\nBundle",
    description: "Access on-demand videos, interactive quizzes, and an AI study partner to learn anytime, anywhere—without compromising on quality.",
    icon: <Award color='#5B89B3'/>,
    link: "/self-study-bundle"
  },
  {
    title: "One-on-One Training",
    description: "Get dedicated one-on-one sessions designed around your learning pace, experience level, and specific certification or career objectives.",
    icon: <Users color='#5B89B3'/>,
    link: "/one-on-one-training"
  },
  {
    title: "Corporate Training",
    description: "Customized corporate programs that align with business goals, enhance team capability, and support enterprise-wide professional development.",
    icon: <Users color='#5B89B3'/>,
    link: "/corporate-training"
  },
  {
    title: "PDUs & Continuing Ed",
    description: "Earn PDUs through structured courses and learning activities designed to support certification renewal and continuous professional growth.",
    icon: <RefreshCcw color='#5B89B3'/>,
    link: "/"
  }
];

const Programs: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth / (window.innerWidth >= 1280 ? 4 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
      scrollContainerRef.current.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth / (window.innerWidth >= 1280 ? 4 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
      scrollContainerRef.current.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative py-14 sm:py-20 px-6 md:px-12 lg:px-20"
      style={{ background: 'linear-gradient(180deg, rgba(91, 137, 179, 0.10) 0%, rgba(154, 174, 211, 0.10) 100%)' }}
    >
      <div className="max-w-screen-2xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col text-center">
          <h2 
            className="font-['DM_Sans'] font-bold text-[30px] leading-[34px] md:text-[32px] lg:text-[40px] lg:leading-[40px] text-[#1f3a5f] mb-4"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Our Services
          </h2>
          <p 
            className="font-['DM_Sans'] font-normal text-[16px] leading-[24px] md:text-[18px] lg:text-[20px] lg:leading-[28px] text-[#0b1f3b] max-w-[951px] mb-8 self-center"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            We provide flexible and professional learning solutions designed to help individuals and organizations grow, upskill, and stay certification-ready.
          </p>
        </div>

        {/* Cards Container with Navigation */}
        <div className="relative mb-12">
          {/* Left Navigation Arrow */}
          <button 
            onClick={scrollLeft}
            className="hidden md:flex absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all -scale-y-100 rotate-180"
            aria-label="Previous services"
          >
            <img src="/assets/icons/arrow.svg" alt="" className="w-10 h-10" />
          </button>

          {/* Right Navigation Arrow */}
          <button 
            onClick={scrollRight}
            className="hidden md:flex absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all"
            aria-label="Next services"
          >
            <img src="/assets/icons/arrow.svg" alt="" className="w-10 h-10" />
          </button>

          {/* Scrollable Cards Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {programs.map((program, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-[295px] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-10.666px)] xl:w-[calc(25%-12px)] h-[340px] bg-white border border-[rgba(154,174,211,0.25)] rounded-2xl relative hover:shadow-lg transition-shadow"
              >
                {/* Icon */}
                <div className="absolute left-6 top-6 w-12 h-12 bg-[rgba(194,221,255,0.5)] rounded-[14px] flex items-center justify-center">
                  {program.icon}
                </div>

                {/* Title */}
                <div className="absolute left-6 top-[88px] w-[236px]">
                  <h3 
                    className="font-['DM_Sans'] font-bold text-[18px] leading-[24px] sm:text-[20px] sm:leading-[28px] tracking-[-0.5px] text-[#1f3a5f] whitespace-pre-line"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    {program.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="absolute left-6 top-[152px] w-[236px]">
                  <p 
                    className="font-['DM_Sans'] font-normal text-[14px] leading-[20px] text-[rgba(11,31,59,0.75)]"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    {program.description}
                  </p>
                </div>

                {/* Learn More Button */}
                <button
                  onClick={() => program.link && navigate(program.link)}
                  className="absolute left-6 top-[288px] h-5 flex items-center gap-2 group"
                >
                  <span 
                    className="font-['DM_Sans'] font-semibold text-[14px] leading-[20px] text-[#155dfc]"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Learn More
                  </span>
                  <ArrowRight className='w-4 h-4 text-[#155dfc]' />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PMP Eligibility Info Box */}
        <div className="bg-[rgba(96,165,250,0.5)] border border-[rgba(31,58,95,0.15)] rounded-2xl p-6 flex gap-4 items-start mx-auto">
          <div className="flex-shrink-0 w-5 h-5 mt-0.5">
            <div className="relative w-5 h-5">
              <div className="absolute inset-0">
                <Award color='#1F3A5F' />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h4 
              className="font-['DM_Sans'] font-semibold text-[14px] leading-[20px] text-[#101828] mb-1"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              PMP Eligibility Requirement
            </h4>
            <p 
              className="font-['DM_Sans'] font-medium text-[14px] leading-[22.75px] text-[#1F3A5F]"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              All PMP courses include the mandatory{' '}
              <span 
                className="font-['DM_Sans'] font-extrabold"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                35 contact hours
              </span>
              {' '}required for exam eligibility per PMI® standards.
            </p>
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default Programs;
