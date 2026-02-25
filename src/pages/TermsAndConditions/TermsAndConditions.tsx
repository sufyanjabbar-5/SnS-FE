import React from 'react';
import ReadyToStart from '../../components/ReadyToStart/ReadyToStart';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-[#1F3A5F] py-24">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="max-w-[768px] mx-auto text-center">
            <p className="text-[#eaecf0] text-base font-semibold mb-3">
              COURSE DETAILS 2025
            </p>
            <h1 className="text-white text-5xl font-semibold leading-[60px] tracking-tight mb-6">
              Terms and conditions
            </h1>
            <p className="text-[#eaecf0] text-xl leading-[30px]">
              Welcome to S&S Coaching & Consulting ("we," "us," or "our"). By accessing or using our website, courses, services, and AI Study Buddy assistant, you agree to comply with and be bound by the following Terms and Conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white py-24">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="max-w-[720px] mx-auto">
            
            {/* Section 1 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                1. Use of Our Services
              </h2>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                By using our services and enrolling in our programs, you confirm that:
              </p>
              <ul className="list-disc pl-8 space-y-2 text-[#475467] text-lg leading-7">
                <li>You are at least 18 years old or have parental consent</li>
                <li>You will use our services lawfully and ethically</li>
                <li>You will not misuse our content, systems, or technology</li>
              </ul>
              <p className="text-[#475467] text-lg leading-7 mt-4">
                We reserve the right to suspend or terminate access for any violation of these terms.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                2. Course Enrollment & Access
              </h2>
              <ul className="list-disc pl-8 space-y-2 text-[#475467] text-lg leading-7">
                <li>Upon successful payment, you will receive access to purchased courses or programs</li>
                <li>Access may differ than vary depending on the course (live classes, self-study options, or hybrid access)</li>
                <li>Enrollment may be valid for a specified duration as mentioned during purchase</li>
              </ul>
              <p className="text-[#475467] text-lg leading-7 mt-4">
                We may update course content to maintain quality and relevance.
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                3. Payments & Pricing
              </h2>
              <ul className="list-disc pl-8 space-y-2 text-[#475467] text-lg leading-7">
                <li>All prices are displayed in Canadian Dollars (CAD) and may change without prior notice</li>
                <li>Payment must be completed before accessing content</li>
                <li>We use secure third-party payment partners</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                4. Refund & Re-Enrollment Policy
              </h2>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                Before eligibility offer, one try to program and who clearly stated on each course page.
              </p>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                We understand how offer:
              </p>
              <ul className="list-disc pl-8 space-y-2 text-[#475467] text-lg leading-7">
                <li>Free re-enrollment if exam is not passed</li>
                <li>Refunds for on-made within a specified period</li>
                <li>Live sessions and coaching may not be refundable</li>
              </ul>
              <p className="text-[#475467] text-lg leading-7 mt-4">
                For corporate or custom programs, refund terms may differ.
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                5. Intellectual Property
              </h2>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                All website content including:
              </p>
              <ul className="list-disc pl-8 space-y-2 text-[#475467] text-lg leading-7">
                <li>Course materials</li>
                <li>Videos</li>
                <li>Logos</li>
                <li>Trademarks</li>
                <li>Software</li>
                <li>AI Study Buddy responses</li>
              </ul>
              <p className="text-[#475467] text-lg leading-7 mt-4">
                are the property of S&S Coaching & Consulting and protected by copyright laws.
              </p>
              <p className="text-[#475467] text-lg leading-7 mt-4">
                You may not copy, distribute, modify or reproduce any content without written permission.
              </p>
            </div>

            {/* Section 6 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                6. AI Study Buddy Usage
              </h2>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                Our AI Study Buddy is designed for learning support only.
              </p>
              <ul className="list-disc pl-8 space-y-2 text-[#475467] text-lg leading-7">
                <li>It is not a substitute for live instructors or official exam materials</li>
                <li>Not to misuse or attempt to manipulate the system</li>
                <li>That AI responses are for educational guidance and not professional guarantees</li>
              </ul>
              <p className="text-[#475467] text-lg leading-7 mt-4">
                We are not responsible for decisions made solely based on chatbot outputs.
              </p>
            </div>

            {/* Section 7 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                7. Limitation of Liability
              </h2>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                S&S Coaching & Consulting is not liable for:
              </p>
              <ul className="list-disc pl-8 space-y-2 text-[#475467] text-lg leading-7">
                <li>Exam failure or certification denial by PMI or other governing bodies</li>
                <li>Technical issues, internet outages, or system downtime</li>
                <li>Third-party disruptions (payment processors, hosting providers, etc.)</li>
              </ul>
              <p className="text-[#475467] text-lg leading-7 mt-4">
                Our total liability is limited to the fees paid for the course in question.
              </p>
            </div>

            {/* Section 8 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                8. Modification of Terms
              </h2>
              <p className="text-[#475467] text-lg leading-7">
                We may update these Terms and Conditions at any time. Changes will be posted on this page with the revision date. Continued use of our services after changes indicates acceptance.
              </p>
            </div>

            {/* Section 9 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                9. Contact Information
              </h2>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                If you have questions about these Terms and Conditions, please contact us:
              </p>
              <ul className="list-none space-y-2 text-[#475467] text-lg leading-7">
                <li><span className="font-semibold">Email:</span> info@snsccs.com</li>
                <li><span className="font-semibold">Phone:</span> +1 (437) 505-0437</li>
                <li><span className="font-semibold">Address:</span> Morningstar Avenue, Whitby ON</li>
              </ul>
            </div>

            {/* Last Updated */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                Last Updated
              </h2>
              <p className="text-[#475467] text-lg leading-7">
                February 7, 2026
              </p>
            </div>

            {/* Acceptance */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                Acceptance of Terms
              </h2>
              <p className="text-[#475467] text-lg leading-7">
                By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Ready to Start Section */}
      <ReadyToStart />
    </div>
  );
};

export default TermsAndConditions;
