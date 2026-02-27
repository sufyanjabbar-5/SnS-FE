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
      className={`relative w-full h-[650px] overflow-hidden bg-cover bg-center home-hero-section inner-hero-section ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        background: !backgroundImage ? 'linear-gradient(142deg, #1F3A5F 28.29%, #0B1F3B 99.67%), #1F3A5F' : undefined
      }}
    >
      {/* Default Gradient Background if no image or custom class is provided */}
      {!backgroundImage && !className.includes('bg-') && (
        <div className="absolute inset-0 hero-default-gradient" style={{ background: 'linear-gradient(142deg, #1F3A5F 28.29%, #0B1F3B 99.67%), #1F3A5F' }} />
      )}

      {rightElement && (
        <div className="absolute right-0 w-[904px] h-[904px] pointer-events-none hero-visual-container top-1/2 -translate-y-1/2">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative z-10 hero-main-image">
              {rightElement}
            </div>
          </div>
        </div>
      )}

      <div className={`relative max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 h-full flex flex-col justify-center hero-content-wrap ${containerClassName}`}>
        <div className="max-w-[725px] hero-content-inner">
          {badges && badges.length > 0 && (
            <div className="flex items-center gap-3 mb-8 hero-badges">
              {badges.map((badge, idx) => (
                <div key={idx} className="bg-[#c2ddff] border border-[rgba(194,221,255,0.25)] rounded-full px-[13px] py-1 flex items-center gap-2 shadow-sm hero-badge">
                  {badge.icon && <img src={badge.icon} alt="" className="w-4 h-4" />}
                  <span className="text-[#364153] text-xs font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          )}

          <h1 className="text-white text-5xl font-semibold leading-[61px] mb-4 hero-title font-dm-sans">
            {title}
            {subtitle && (
              <span className="block mt-2 text-[#c2ddff] text-3xl lg:text-4xl">{subtitle}</span>
            )}
          </h1>

          <p className="text-white text-base font-medium leading-6 mb-8 max-w-[632px] hero-description font-dm-sans">
            {description}
          </p>
        </div>
      </div>

      {(primaryBtn || secondaryBtn) && (
        <div className="absolute inset-x-0 bottom-[94.5px] z-20 pointer-events-none mobile-buttons-container">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-[725px] flex items-center gap-4 hero-buttons-container pointer-events-auto">
              {primaryBtn && (
                <button
                  onClick={primaryBtn.onClick}
                  className={`home-button-primary ${primaryBtn.className || ''}`.trim()}
                >
                  {primaryBtn.text}
                  {primaryBtn.icon && <img src={primaryBtn.icon} alt="" className="w-4 h-4" />}
                </button>
              )}

              {secondaryBtn && (
                <button
                  onClick={secondaryBtn.onClick}
                  className={`home-button-secondary ${secondaryBtn.className || ''}`.trim()}
                >
                  {secondaryBtn.icon && <img src={secondaryBtn.icon} alt="" className="w-4 h-4" />}
                  {secondaryBtn.text}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
