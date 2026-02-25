import React from 'react';
import './Hero.css';

export interface HeroBadge {
  icon?: string;
  text: string;
}

export interface HeroButton {
  text: string;
  onClick?: () => void;
  icon?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

interface HeroProps {
  badges?: HeroBadge[];
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description: React.ReactNode;
  primaryBtn?: HeroButton;
  secondaryBtn?: HeroButton;
  rightElement?: React.ReactNode;
  backgroundImage?: string;
  className?: string;
  containerClassName?: string;
}

const Hero: React.FC<HeroProps> = ({
  badges,
  title,
  subtitle,
  description,
  primaryBtn,
  secondaryBtn,
  rightElement,
  backgroundImage,
  className = "",
  containerClassName = "",
}) => {
  return (
    <section 
      className={`relative w-full overflow-hidden flex items-center min-h-[500px] lg:h-[650px] ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Default Gradient Background if no image or custom class is provided */}
      {!backgroundImage && !className.includes('bg-') && (
        <div className="absolute inset-0 hero-default-gradient" />
      )}

      <div className={`container mx-auto px-6 md:px-20 relative z-10 py-12 lg:py-0 h-full ${containerClassName}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          
          {/* Left Content */}
          <div className="flex flex-col justify-center max-w-[725px] h-full relative">
            <div className="lg:mt-[-80px] pb-[160px] lg:pb-0"> {/* Padding bottom for mobile buttons */}
              {/* Badges */}
              {badges && badges.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  {badges.map((badge, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#c2ddff] border border-[rgba(194,221,255,0.25)] rounded-full px-[13px] py-1 flex items-center gap-2 shadow-sm"
                    >
                      {badge.icon && <img src={badge.icon} alt="" className="w-4 h-4" />}
                      <span className="text-[#364153] text-[12px] font-medium leading-[16px] font-dm-sans">{badge.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Title & Subtitle */}
              <h1 className="text-white text-3xl md:text-5xl lg:text-[56px] font-semibold leading-[1.2] md:leading-[61px] font-dm-sans">
                {title}
                {subtitle && (
                  <span className="block mt-2 text-[#c2ddff] text-xl md:text-3xl lg:text-4xl">{subtitle}</span>
                )}
              </h1>

              {/* Description */}
              <div className="text-white text-base md:text-lg font-medium leading-relaxed mt-4 md:mt-6 mb-8 max-w-[632px] font-dm-sans opacity-95">
                {description}
              </div>
            </div>

            {/* Buttons - Sticking to bottom */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 absolute bottom-[94.5px] left-0 w-full lg:w-auto z-20">
              {primaryBtn && (
                <button
                  onClick={primaryBtn.onClick}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 hero-btn-primary shadow-lg hover:shadow-xl ${primaryBtn.className || ''}`}
                >
                  {primaryBtn.text}
                  {primaryBtn.icon && <img src={primaryBtn.icon} alt="" className="w-4 h-4" />}
                </button>
              )}
              {secondaryBtn && (
                <button
                  onClick={secondaryBtn.onClick}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-lg font-semibold border border-[#c2ddff] text-[#c2ddff] flex items-center justify-center gap-2 transition-all hover:bg-[#c2ddff]/10 hover:scale-105 active:scale-95 ${secondaryBtn.className || ''}`}
                >
                  {secondaryBtn.icon && <img src={secondaryBtn.icon} alt="" className="w-4 h-4" />}
                  {secondaryBtn.text}
                </button>
              )}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex justify-center lg:justify-end relative items-center w-full h-full lg:pb-[94.5px] pb-[160px] lg:pt-0 pt-12">
             {rightElement}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
