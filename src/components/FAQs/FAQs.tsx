import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import './FAQs.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Do I qualify for the PMP exam?",
    answer: "To qualify for the PMP exam, you typically need a four-year degree, 36 months of leading projects, and 35 hours of project management education/training OR a high school diploma/associate degree, 60 months of leading projects, and 35 hours of project management education/training. Our course provides the mandatory 35 contact hours."
  },
  {
    question: "What is the duration of the PMP training?",
    answer: "Our standard PMP training is a comprehensive program that includes 35 contact hours delivered over several weeks. We offer different formats including weekend batches and intensive bootcamps to fit your schedule."
  },
  {
    question: "Do you offer recorded sessions?",
    answer: "Yes! All our live virtual sessions are recorded and made available to students for lifetime access. This allows you to revisit complex topics and catch up if you miss a session."
  },
  {
    question: "Can I get mock exams and practice tests?",
    answer: "Absolutely. We provide 4 full-length PMP simulation exams that mimic the real exam environment. You'll also get access to over 1,000 practice questions with detailed explanations."
  },
  {
    question: "What materials are included?",
    answer: "The training includes our comprehensive PMP study guide, access to our AI learning assistant, class recordings, mock exams, slide decks, and specialized templates for the application process."
  },
  {
    question: "What if I don't pass on my first attempt?",
    answer: "We have a 100% success rate guarantee. If you don't pass on your first attempt, you can re-enroll in our next live batch for free and receive continued one-on-one support until you are certified."
  }
];

const FAQs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faqs-section" id="faqs">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title mb-4">FAQs</h2>
          <p className="section-subtitle mb-8">
            Everything you need to know about our training
          </p>
        </div>

        <div className="faqs-container">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                <div className="question-left">
                  <HelpCircle size={20} className="icon-help" />
                  <span>{faq.question}</span>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`icon-chevron ${activeIndex === index ? 'rotate' : ''}`} 
                />
              </button>
              <div className="faq-answer">
                <div className="answer-content">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
