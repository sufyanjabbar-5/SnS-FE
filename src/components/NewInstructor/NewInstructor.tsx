import React from 'react';
import { CheckCircle } from 'lucide-react';

export interface InstructorData {
  name: string;
  title: string;
  certifications: string;
  expertise: string[];
}

const defaultInstructorData: InstructorData = {
  name: 'Samia Waqar – Certified Success',
  title: 'Top PMI-Certified Professional',
  certifications: 'PMP, PgMP, PfMP, PMI-ACP, PMI CPMAI & PMI-RMP',
  expertise: [
    'Managed $50M+ portfolio across IT, construction, and healthcare',
    'Regular speaker at PMI Global Summits',
    '18+ years of project management experience',
    'Trained 5,000+ PMP candidates with 98% pass rate',
    'PMI-approved instructor since 2012',
    'Published author of PM best practices guides',
  ],
};

interface NewInstructorProps {
  data?: InstructorData;
  instructorImage?: string;
}

const NewInstructor: React.FC<NewInstructorProps> = ({
  data = defaultInstructorData,
  instructorImage = '/assets/instructor-lead-pmi-trainer.png',
}) => {
  return (
    <section className="relative w-full font-['DM_Sans',sans-serif]">
      <div className="mx-auto bg-gradient-to-l from-[rgba(194,221,255,0.3)] to-[rgba(194,221,255,0.4)]">
        {/* Main grid container: stacks on mobile, 50/50 on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[770px]">

          {/* ─── Left Side: Instructor Image ─── */}
          <div className="relative w-full h-[340px] sm:h-[420px] md:h-auto overflow-hidden shadow-2xl">
            {/* Image */}
            <img
              alt="Lead PMI Trainer"
              className="absolute inset-0 w-full h-full object-cover object-top -scale-x-100"
              src={instructorImage}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,33,59,0.8)] to-transparent" />

            {/* Instructor info over image */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-[100px] md:left-[120px] md:right-auto md:max-w-[500px] z-10 flex flex-col gap-4 md:gap-8 text-white">
              <div className="flex flex-col gap-2.5 md:gap-5">
                <p className="text-xs md:text-2xl font-medium leading-snug">
                  {data.title}
                </p>
                <p className="text-[28px] leading-7 md:text-[56px] md:leading-[56px] font-semibold">
                  {data.name}
                </p>
              </div>
              <p className="text-xs md:text-2xl font-normal leading-tight">
                {data.certifications}
              </p>
            </div>
          </div>

          {/* ─── Right Side: Content Area ─── */}
          <div className="w-full flex flex-col justify-between px-6 py-8 md:px-12 lg:px-20 md:py-[100px] gap-10 md:gap-0 md:max-w-none md:mx-0">

            {/* Top: Heading */}
            <div className="flex flex-col gap-7 md:gap-8">
              <h2 className="text-[32px] md:text-[56px] font-bold leading-10 md:leading-[40px] text-[#1f3a5f]">
                Your Instructor
              </h2>
              <p className="text-base md:text-2xl font-light leading-7 md:leading-9 text-[#0b1f3b]">
                Learn from industry-leading PMP certified trainers with
                extensive real-world experience
              </p>
            </div>

            {/* Bottom: Experience & Expertise */}
            <div className="flex flex-col gap-8">
              <h3 className="text-xl md:text-2xl font-bold leading-6 md:leading-7 text-[#1f3a5f]">
                Experience &amp; Expertise
              </h3>

              <ul className="flex flex-col gap-6">
                {data.expertise.map((item, index) => (
                  <li key={index} className="flex items-start md:items-center gap-4">
                    <CheckCircle className="w-5 h-5 shrink-0 text-blue-400/75 mt-0.5 md:mt-0" />
                    <span className="text-base md:text-xl font-light leading-5 text-[#0b1f3b]/75">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewInstructor;
export { defaultInstructorData };
export type { NewInstructorProps };
