import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-['Inter',sans-serif]">
      {/* Header Section */}
      <div className="bg-white py-20">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="max-w-[768px] mx-auto text-center">
            <p className="text-[#5B89B3] text-base font-semibold mb-3">
              Current as of 01 Feb 2026
            </p>
            <h1 className="text-[Gray/900] text-5xl font-semibold leading-[60px] tracking-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-[#475467] text-xl leading-[30px]">
              SNS Coaching & Consulting (“we,” “our,” or “us”) respects your privacy and is committed to protecting the personal information you share with us through our website and services.            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white py-20">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="max-w-[720px] mx-auto">
            
            {/* Introduction */}
            <div className="mb-10">
              <p className="text-[#475467] text-lg leading-7">
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, enroll in our courses, use our AI Study Buddy chatbot, or interact with our services.              
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                1. Information We Collect
              </h2>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                We may collect the following types of information:
              </p>
              
              <h3 className="text-[#101828] text-2xl font-semibold leading-8 mb-4 mt-8">
                Personal Information
              </h3>
              <ul className="list-disc pl-8 space-y-2 text-[#475467] text-lg leading-7">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing and payment details</li>
                <li>Professional background (if submitted)</li>
              </ul>

              <h3 className="text-[#101828] text-2xl font-semibold leading-8 mb-4 mt-8">
                Usage Information
              </h3>
              <ul className="list-disc pl-8 space-y-2 text-[#475467] text-lg leading-7">
                <li>Pages visited on our website</li>
                <li>Time spent on each page</li>
                <li>Interaction with Study Buddy AI chatbot</li>
                <li>Device information (type and IP address)</li>
              </ul>

              <h3 className="text-[#101828] text-2xl font-semibold leading-8 mb-4 mt-8">
                Cookies and Tracking
              </h3>
              <p className="text-[#475467] text-lg leading-7">
                We use cookies to enhance your experience and gather insights. You can manage cookie settings through your browser settings.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                2. How We Use Your Information
              </h2>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                We use your information for:
              </p>
              <ul className="list-disc pl-8 space-y-2 text-[#475467] text-lg leading-7">
                <li>Provide access to training programs and digital resources</li>
                <li>Process enrollments and send course confirmation</li>
                <li>Deliver personalized learning experience</li>
                <li>Operate our AI Study Buddy chatbot to assist with learning</li>
                <li>Analyze website performance and user engagement</li>
                <li>Send course updates and marketing communications (with consent)</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                3. Sharing of Information
              </h2>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                We do not sell or rent your personal information.
              </p>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                We may share data with:
              </p>
              <ul className="list-disc pl-8 space-y-2 text-[#475467] text-lg leading-7">
                <li>Payment processing partners</li>
                <li>Hosting and technology providers</li>
                <li>Marketing and analytics tools</li>
                <li>Legal authorities if required by law</li>
              </ul>
              <p className="text-[#475467] text-lg leading-7 mt-4">
                All third parties are required to keep your information secure and confidential.
              </p>
            </div>

            {/* Section 4 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                4. Data Security
              </h2>
              <p className="text-[#475467] text-lg leading-7">
                We implement industry-standard measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no online platform is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                5. Cookies and Tracking Technologies
              </h2>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-8 space-y-2 text-[#475467] text-lg leading-7">
                <li>Improve website functionality</li>
                <li>Track analytics and user behavior</li>
                <li>Personalize content and offers</li>
              </ul>
              <p className="text-[#475467] text-lg leading-7 mt-4">
                You may choose to disable cookies through your browser settings, although some features may not function properly.
              </p>
            </div>

            {/* Section 6 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                6. AI Study Buddy Privacy
              </h2>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                Our AI chatbot may collect and process user queries to:
              </p>
              <ul className="list-disc pl-8 space-y-2 text-[#475467] text-lg leading-7">
                <li>Provide relevant learning assistance</li>
                <li>Improve the quality of responses</li>
              </ul>
              <p className="text-[#475467] text-lg leading-7 mt-4">
                Chat data may be reviewed for quality improvement. We do not use chatbot conversations for marketing purposes without your explicit consent.
              </p>
            </div>

            {/* Section 7 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                7. Your Rights
              </h2>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-8 space-y-2 text-[#475467] text-lg leading-7">
                <li>Access your personal information</li>
                <li>Request correction or update of your data</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="text-[#475467] text-lg leading-7 mt-4">
                To exercise your rights, please contact us at the information below.
              </p>
            </div>

            {/* Section 8 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                8. Contact Information
              </h2>
              <p className="text-[#475467] text-lg leading-7 mb-4">
                If you have questions or concerns about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none space-y-2 text-[#475467] text-lg leading-7">
                <li><span className="font-semibold">Email:</span> info@snsccs.com</li>
                <li><span className="font-semibold">Phone:</span> +1 (437) 505-0437</li>
                <li><span className="font-semibold">Address:</span> Morningstar Avenue, Whitby ON</li>
              </ul>
            </div>

            {/* Section 9 */}
            <div className="mb-10">
              <h2 className="text-[#101828] text-3xl font-semibold leading-[38px] mb-5">
                9. Updates to This Policy
              </h2>
              <p className="text-[#475467] text-lg leading-7">
                We may update this Privacy Policy from time to time. The latest version will always be available on this page with the revision date.
              </p>
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
                Acceptance of This Policy
              </h2>
              <p className="text-[#475467] text-lg leading-7">
                By using our website and services, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
