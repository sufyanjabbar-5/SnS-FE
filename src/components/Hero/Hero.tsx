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
      className={`inner-hero-section ${className}`}
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

      <div className={`inner-hero-shell max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 ${containerClassName}`}>
        <div className={`inner-hero-grid ${rightElement ? 'has-media' : 'no-media'}`}>
          {rightElement && (
            <div className="inner-hero-media" aria-hidden="true">
              <div className="inner-hero-media-inner">
                {rightElement}
              </div>
            </div>
          )}

          <div className="inner-hero-content">
            {badges && badges.length > 0 && (
              <div className="inner-hero-badges">
                {badges.map((badge, idx) => (
                  <div key={idx} className="inner-hero-badge">
                    {badge.icon && <img src={badge.icon} alt="" className="inner-hero-badge-icon" />}
                    <span className="inner-hero-badge-text">{badge.text}</span>
                  </div>
                ))}
              </div>
            )}

            <h1 className="inner-hero-title">
              {title}
              {subtitle && (
                <span className="inner-hero-subtitle">{subtitle}</span>
              )}
            </h1>

            <p className="inner-hero-description">
              {description}
            </p>

            {(primaryBtn || secondaryBtn) && (
              <div className="inner-hero-buttons">
                {primaryBtn && (
                  <button
                    onClick={primaryBtn.onClick}
                    className={`home-button-primary inner-hero-btn ${primaryBtn.className || ''}`.trim()}
                  >
                    {primaryBtn.text}
                    {primaryBtn.icon && <img src={primaryBtn.icon} alt="" className="w-4 h-4" />}
                  </button>
                )}

                {secondaryBtn && (
                  <button
                    onClick={secondaryBtn.onClick}
                    className={`home-button-secondary inner-hero-btn ${secondaryBtn.className || ''}`.trim()}
                  >
                    {secondaryBtn.icon && <img src={secondaryBtn.icon} alt="" className="w-4 h-4" />}
                    {secondaryBtn.text}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
