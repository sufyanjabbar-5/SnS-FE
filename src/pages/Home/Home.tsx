import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award,Calendar, Clock, Users, CheckCircle, ArrowRight, Play, RefreshCcw, GraduationCap, ShoppingCart } from 'lucide-react';
import NewInstructor from "../../components/NewInstructor/NewInstructor.tsx"
import SuccessStories from '../../components/SuccessStories/SuccessStories.tsx';
import FAQs from '../../components/FAQs/FAQs.tsx';
import ReadyToStart from '../../components/ReadyToStart/ReadyToStart.tsx';
import WhatsIncluded from '../../components/WhatsIncluded/WhatsIncluded.tsx';
import UpcomingBatches from '../../components/UpcomingBatches/UpcomingBatches.tsx';
import Programs from '../../components/Programs/Programs.tsx';

// Local Assets for Home Page
const slide1InstructorImageLocal = 'assets/images/home/slide1-instructor.png';
const slide1Circle1Local = 'assets/images/home/slide1-circle1.svg';
const slide1Circle2Local = 'assets/images/home/slide1-circle2.svg';
const slide1Circle3Local = 'assets/images/home/slide1-circle3.svg';
const slide1Circle4Local = 'assets/images/home/slide1-circle4.svg';
const slide1BadgeIcon1Local = 'assets/images/home/slide1-badge1.svg';
const slide1BadgeIcon2Local = 'assets/images/home/slide1-badge2.svg';
const slide1PlayIconLocal = 'assets/images/home/slide1-play.svg';
const slide2BadgeImageLocal = 'assets/images/home/slide2-badge-hero.png';
const slide2Circle1Local = 'assets/images/home/slide2-circle1.svg';
const slide2Circle2Local = 'assets/images/home/slide2-circle2.svg';
const slide2Circle3Local = 'assets/images/home/slide2-circle3.svg';
const slide2Circle4Local = 'assets/images/home/slide2-circle4.svg';
const slide2BadgeIconLocal = 'assets/images/home/slide2-badge-icon.svg';
const slide2CheckIconLocal = 'assets/images/home/slide2-check.svg';
const slide3BadgeImageLocal = 'assets/images/home/slide3-badge-hero.png';
const slide3Circle1Local = 'assets/images/home/slide3-circle1.svg';
const slide3Circle2Local = 'assets/images/home/slide3-circle2.svg';
const slide3Circle3Local = 'assets/images/home/slide3-circle3.svg';
const slide3Circle4Local = 'assets/images/home/slide3-circle4.svg';
const slide3BadgeIcon1Local = 'assets/images/home/slide3-badge1.svg';
const slide3BadgeIcon2Local = 'assets/images/home/slide3-badge2.svg';
const slide3CheckIconLocal = 'assets/images/home/slide3-check.svg';

import HomeHero from '../../components/HomeHero/HomeHero.tsx';
import './Home.css';

// Slide 1 Images (Instructor with person)
const slide1InstructorImage = slide1InstructorImageLocal;
const slide1Circle1 = slide1Circle1Local;
const slide1Circle2 = slide1Circle2Local;
const slide1Circle3 = slide1Circle3Local;
const slide1Circle4 = slide1Circle4Local;
const slide1BadgeIcon1 = slide1BadgeIcon1Local;
const slide1BadgeIcon2 = slide1BadgeIcon2Local;

// Slide 2 Images (PMI Badge logo)
const slide2BadgeImage = slide2BadgeImageLocal;
const slide2Circle1 = slide2Circle1Local;
const slide2Circle2 = slide2Circle2Local;
const slide2Circle3 = slide2Circle3Local;
const slide2Circle4 = slide2Circle4Local;
const slide2BadgeIcon = slide2BadgeIconLocal;

// Slide 3 Images (PMI Badge logo purple)
const slide3BadgeImage = slide3BadgeImageLocal;
const slide3Circle1 = slide3Circle1Local;
const slide3Circle2 = slide3Circle2Local;
const slide3Circle3 = slide3Circle3Local;
const slide3Circle4 = slide3Circle4Local;
const slide3BadgeIcon1 = slide3BadgeIcon1Local;
const slide3BadgeIcon2 = slide3BadgeIcon2Local;
const slide3CheckIcon = slide3CheckIconLocal;

// Placeholder images - replace with actual Figma URLs
const companyLogos = [
  {
    id: 1,
    name: "PMI-CPMAI-badge",
    image: "/PMI-CPMAI-badge.png"
  },
  {
    id: 2,
    name: "PMI-PMP-badge",
    image: "/PMI-PMP-badge.png"
  },
  {
    id: 3,
    name: "PMI-ACP-badge",
    image: "/PMI-ACP-badge.png"
  },
  {
    id: 4,
    name: "PMI-PGMP-badge",
    image: "/PMI-PGMP-badge.png"
  },
  {
    id: 5,
    name: "PMI-PBA-badge",
    image: "/PMI-PBA-badge.png"
  },
  {
    id: 6,
    name: "PMI-PFMP-badge",
    image: "/PMI-PFMP-badge.png"
  },
  {
    id: 7,
    name: "PMI-PMOCP-badge",
    image: "/PMI-PMOCP-badge.png"
  },
  {
    id: 8,
    name: "PMI-RMP-badge",
    image: "/PMI-RMP-badge.png"
  }
];

interface WhyChooseUsCard {
  title: string;
  description: string;
  width?: string;
  icon: React.ReactNode;
}

interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  image: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleDownloadBrochure = () => {
    const link = document.createElement('a');
    link.href = '/assets/documents/SNSCCS Brochure Design.pdf';
    link.download = 'SNSCCS Brochure Design.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const heroSlides: any[] = [
    {
      id: 1,
      bgType: 'gradient',
      badges: [
        { icon: slide1BadgeIcon1, text: 'PMI® Authorized' },
        { icon: slide1BadgeIcon2, text: 'Global Recognition' }
      ],
      title: 'PMI Certification Training | Learn Beyond Exam Shortcuts',
      description: 'PMI exams are often taught as shortcuts. Learn how professionals develop real knowledge, pass with confidence, and grow their careers beyond the exam.',
      mainImage: slide1InstructorImage,
      circles: [slide1Circle1, slide1Circle2, slide1Circle3, slide1Circle4],
      imageClassName: 'rotate-[0.75deg] h-[600px] lg:h-[700px] mt-[24px] lg:scale-110 origin-center',
      buttons: [
        { label: 'About SNSCCS', onClick: () => navigate('/about'), variant: 'primary' },
        { label: 'Download Brochure', onClick: handleDownloadBrochure, variant: 'enroll' }
      ]
    },
    {
      id: 2,
      bgType: 'purple',
      badges: [
        { icon: slide2BadgeIcon, text: 'Authorized Training Partner`s' }
      ],
      title: 'PMI certification, built on real knowledge.',
      description: 'PMI exams are often taught as shortcuts, so we help professionals develop real knowledge, pass with confidence, and enable career growth beyond the exam.',
      checkList: [
        'Leadership & Professional Development',
        'CRM & Client Management',
        'Secondary Education & Services',
        'Direct & Online Instruction',
        'Teaching & Training Delivery',
        'Academic & Course Evaluation'
      ],
      mainImage: slide2BadgeImage,
      circles: [slide2Circle1, slide2Circle2, slide2Circle3, slide2Circle4],
      imageClassName: 'w-[444px] h-[444px]',
      buttons: [
        { label: 'Enroll Now', onClick: () => {}, variant: 'primary' },
        { label: 'Learn More', onClick: () => {}, variant: 'secondary' }
      ]
    },
    {
      id: 3,
      bgType: 'purple',
      badges: [
        { icon: slide3BadgeIcon1, text: 'PMI-Backed Quality Training' },
        { icon: slide3BadgeIcon2, text: 'Global Recognition' }
      ],
      title: 'Beyond exam shortcuts. Built for growth.',
      description: 'Empowering professionals with PMI®-authorized training, expert guidance, and a clear path to global project management certification.',
      checkList: [
        'Official PMI Content',
        'Expert guidance & support',
        'Structured path to certification & career growth'
      ],
      mainImage: slide2BadgeImage,
      circles: [slide2Circle1, slide2Circle2, slide2Circle3, slide2Circle4],
      imageClassName: 'w-[444px] h-[444px]',
      buttons: [
        { label: 'Enroll Now', onClick: () => {}, variant: 'primary' },
        { label: 'Learn More', onClick: () => {}, variant: 'secondary' }
      ]
    }
  ];

  const whyChooseUs: WhyChooseUsCard[] = [
    {
      title: "Exam Simulation",
      description: "Real exam-style simulations to boost confidence and performance",
      width: "190px",
      icon: <GraduationCap/>
    },
    {
      title: "AI Support",
      description: "Smart AI chatbot for instant study help anytime",
      width: "270px",
      icon: <RefreshCcw/>
    },
    {
      title: "100% Success Rate",
      description: "Proven results with consistently high exam pass rates",
      width: "180px",
      icon: <RefreshCcw/>
    },
    {
      title: "Free Re-Enrollment",
      description: "Retake the course for free if you don’t pass the exam on your first attempt.",
      width: "179px",
      icon: <RefreshCcw/>
    },
    {
      title: "Top Expert",
      description: "Learn from globally top one percent PMI professional",
      width: "170px",
      icon: <RefreshCcw/>
    }
  ];

  const stats = [
    { value: "20+", label: "Countries – Operating globally" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "100%", label: "First Attempt Pass Rate" },
    { value: "15+", label: "Years of Excellence" },
    { value: "4.9/5", label: "Student Rating" }
  ];

  const howItWorks: HowItWorksStep[] = [
    {
      step: "Step 01",
      title: "Register for Training",
      description: "Complete your enrollment to get instant access to your personalized study plan, training materials, & live session schedule.",
      image: "/how-it-works-1.png"
    },
    {
      step: "Step 02",
      title: "Attend Live Classes",
      description: "Join interactive live sessions with expert trainers covering PMBOK® Guide and real-world project scenarios.",
      image: "/how-it-works-2.png"
    },
    {
      step: "Step 03",
      title: "Practice Mock Tests",
      description: "Take full-length PMP simulation exams and assess your readiness with detailed performance analytics.",
      image: "/how-it-works-3.png"
    },
    {
      step: "Step 04",
      title: "Get PMP Certification",
      description: "Apply for the PMP exam with confidence and earn your globally recognized project management.",
      image: "/how-it-works-4.png"
    }
  ];

  return (
    <div className="w-full home-page">
      <HomeHero slides={heroSlides} />

      {/* Company Logos Strip */}
      <section className="bg-white py-12">
        <div className="marquee-container">
          <div className="marquee-track">
            {/* Render logos multiple times for a seamless loop */}
            {[...companyLogos, ...companyLogos].map((logo, index) => (
              <img key={`${logo.id}-${index}`} src={logo.image} alt={logo.name} className="marquee-logo" />
            ))}
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <Programs />

      {/* Why Choose Us */}
      <section className="py-14 sm:py-20 px-6 md:px-20 choose-us-section-gradient">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center">
            <h2 className="text-[30px] md:text-3xl lg:text-4xl font-bold leading-tight text-[#1F3A5F] mb-4">Why Choose Us</h2>
            <p className="text-base sm:text-lg text-[#0B1F3B] max-w-2xl mx-auto mb-8">
              Most PMI training focuses on shortcuts. We focus on real learning that builds confidence and lasts beyond the exam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#C2DDFF80] rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl text-[#5B89B3]">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1F3A5F] mb-3">{item.title}</h3>
                <p className="text-sm text-[#0B1F3B] mx-auto choose-us-desc-text" style={{ "--item-width": item.width } as React.CSSProperties}>{item.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 bg-[#5B89B3] border border-[#5B89B3] rounded-[16px] p-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-[30px] sm:text-4xl font-bold text-[#ffffff] mb-2">{stat.value}</div>
                <div className="text-sm text-[#BEDBFF]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 sm:py-20 px-6 md:px-20 works-section-gradient">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center">
            <h2 className="text-[30px] md:text-3xl lg:text-4xl font-bold leading-tight text-white mb-4">How It Works</h2>
            <p className="text-base sm:text-lg text-white/80 max-w-[580px] mx-auto mb-8">
              Your journey to PMP certification is simple and structured. Follow our proven 4-step process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <img className='w-full' src={step.image} alt="" />
                <div className="p-5 sm:p-6">
                  <div className="text-xs font-semibold text-[#5B89B3] mb-2">{step.step}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1F3A5F] mb-3">{step.title}</h3>
                  <p className="text-sm text-[#0B1F3BBF] max-w-[270px]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhatsIncluded />      
      <UpcomingBatches />
      <NewInstructor />
      <SuccessStories />
      <FAQs />
      <ReadyToStart />
    </div>
  );
};

export default Home;
