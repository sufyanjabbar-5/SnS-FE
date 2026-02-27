import React from 'react';
import { Star, Check } from 'lucide-react';
import './SuccessStories.css';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
  achievement: string;
}

interface SuccessStoriesProps {
  containerClassName?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Nyle Hassan",
    role: "Project Manager",
    company: "Amazon",
    image: "/female-avatar.png",
    rating: 5,
    text: "Samia's coaching helped me bridge project management theory with how work actually happens at Amazon. Her breadth of credentials and real-world experience is unmatched. The one-on-one sessions played a key role in helping me grow.",
    achievement: "Passed – Above Target"
  },
  {
    name: "Moeen Khurshid",
    role: "Senior Project Manager",
    company: "Ontario Public Service",
    image: "/male-avatar.png",
    rating: 5,
    text: "I studied project management with Samia over a decade ago and passed PMP on the first attempt. Years later, I returned for one-on-one PgMP coaching. Very few professionals maintain this level of depth and relevance over time.",
    achievement: "15% Salary Increase"
  },
  {
    name: "Syeda Rabbia",
    role: "Project Manager",
    company: "Ontario Public Service",
    image: "/female-avatar.png",
    rating: 5,
    text: "I completed PMP with Samia five years ago and am now enrolled in CPMAI. Her ability to simplify complex project management frameworks while keeping them practical and relevant has consistently supported my professional growth.",
    achievement: "Passed First Attempt"
  }
];

const SuccessStories: React.FC<SuccessStoriesProps> = ({
  containerClassName = 'max-w-screen-2xl'
}) => {
  return (
     <section className="bg-[#c2ddff]/15 py-14 sm:py-20 px-6 md:px-12 lg:px-20">
            <div className={`${containerClassName} mx-auto w-full`}>
              <div className="text-center">
                <h2 className="text-[30px] md:text-3xl lg:text-4xl font-bold leading-tight text-[#1f3a5f] mb-4">Success Stories</h2>
                <p className="text-base md:text-lg lg:text-xl text-[#0b1f3b] max-w-2xl mx-auto mb-8">
                  Join thousands who achieved PMP certification through our live virtual training
                </p>
              </div>
    
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white border border-[#9aaed3]/35 rounded-2xl p-6 sm:p-8">
                    {/* Profile */}
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-[#1f3a5f]">{testimonial.name}</h3>
                        <p className="text-sm font-medium text-[#0b1f3b]">{testimonial.role}</p>
                        <p className="text-xs text-[#0b1f3b]/75">{testimonial.company}</p>
                      </div>
                    </div>
    
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
    
                    {/* Testimonial Text */}
                    <p className="text-sm text-[#364153] leading-relaxed mb-4">
                      {testimonial.text}
                    </p>
    
                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 bg-[#dcfce7] text-[#008236] text-xs font-medium px-3 py-1 rounded-lg">
                      <Check size={16} />{testimonial.achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
  );
};

export default SuccessStories;
