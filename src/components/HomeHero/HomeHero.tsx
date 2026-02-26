import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import './HomeHero.css';

interface HeroBadge {
  icon: string;
  text: string;
}

interface HeroButton {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'enroll';
}

interface HeroSlide {
  id: number;
  bgType: 'gradient' | 'purple';
  badges: HeroBadge[];
  title: string;
  description: string;
  checkList?: string[];
  mainImage: string;
  circles: string[];
  buttons: HeroButton[];
  imageClassName?: string;
  circleContainerClassName?: string;
}

interface HomeHeroProps {
  slides: HeroSlide[];
}

const HomeHero: React.FC<HomeHeroProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 30000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[650px] overflow-hidden bg-cover bg-center home-hero-section">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background */}
          <div
            className={`absolute inset-0 ${
              slide.bgType === 'gradient' ? 'hero-background-gradient' : 'hero-background-purple'
            }`}
          ></div>

          {/* Decorative Circles & Image */}
          <div className={`absolute right-0 w-[904px] h-[904px] pointer-events-none hero-visual-container ${slide.circleContainerClassName || 'top-1/2 -translate-y-1/2'}`}>
            <div className="relative w-full h-full flex items-center justify-center">
              {slide.circles.map((circle, i) => (
                <img
                  key={i}
                  src={circle}
                  alt=""
                  className={`absolute object-contain hero-circle ${
                    i === 0 ? 'w-[616px] h-[616px]' :
                    i === 1 ? 'w-[444px] h-[444px]' :
                    i === 2 ? 'w-[758px] h-[758px]' :
                    'w-full h-full'
                  }`}
                />
              ))}
              
              <div className={`relative z-10 ${slide.imageClassName || ''} hero-main-image`}>
                <img src={slide.mainImage} alt={slide.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative max-w-screen-2xl mx-auto px-6 md:px-20 h-full flex flex-col justify-center hero-content-wrap">
            <div className="max-w-[725px] hero-content-inner">
              <div className="flex items-center gap-3 mb-8 hero-badges">
                {slide.badges.map((badge, i) => (
                  <div key={i} className="bg-[#c2ddff] border border-[rgba(194,221,255,0.25)] rounded-full px-[13px] py-1 flex items-center gap-2 shadow-sm hero-badge">
                    <img src={badge.icon} alt="" className="w-4 h-4" />
                    <span className="text-[#364153] text-xs font-medium">{badge.text}</span>
                  </div>
                ))}
              </div>

              <h1 className="text-white text-5xl font-semibold leading-[61px] mb-4 mobile-section-title hero-title">
                {slide.title}
              </h1>

              <p className="text-white text-base font-medium leading-6 mb-8 max-w-[632px] mobile-section-text hero-description">
                {slide.description}
              </p>

              {slide.checkList && (
                <div className="hero-checklist grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-6 gap-y-3 mb-12 md:mb-14 max-w-[650px]">
                  {slide.checkList.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                       {/* In original slide 2, it uses slide2CheckIcon and CheckCircle. I'll use CheckCircle for consistency or pass icon in checklist? Let's keep it simple. */}
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-white text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Static Buttons - Outside fading slides */}
      <div className="absolute inset-x-0 bottom-[94.5px] z-20 pointer-events-none mobile-buttons-container">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-20">
          <div className="max-w-[725px] flex items-center gap-4 hero-buttons-container pointer-events-auto">
            {slides[currentSlide].buttons.map((btn, i) => (
              <button
                key={i}
                onClick={btn.onClick}
                className={
                  btn.variant === 'primary' ? 'home-button-primary' :
                  btn.variant === 'secondary' ? 'home-button-secondary' :
                  'bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 enroll-batch-button'
                }
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-[94.5px] right-[56px] flex items-center gap-3 z-20 hero-carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`carousel-dot ${currentSlide === index ? 'active' : 'inactive'}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HomeHero;
