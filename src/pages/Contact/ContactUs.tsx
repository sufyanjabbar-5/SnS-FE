import React, { useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCertifications } from '../../context/CertificationContext';
import ReadyToStart from '../../components/ReadyToStart/ReadyToStart';

// Figma assets (migrated from Figma)
const iconArrowRight = "/assets/images/contact/f-arrow-right.svg";
const iconPhoneAlt = "/assets/images/contact/f-phone-alt.svg";
const iconArrowRightAlt = "/assets/images/contact/f-arrow-right-alt.svg";

const ContactUs: React.FC = () => {
  const { appInfo: settings } = useCertifications();
  return (
    <div className="bg-white min-h-screen">
      <ReadyToStart />

      {/* CTA Section */}
      <div id="support" className="bg-white py-20 px-[100px]">
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-[#1f3a5f] text-[40px] font-bold leading-[40px] mb-7"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Ready to Transform Your Team?
            </h2>
            <p 
              className="text-[#0b1f3b] text-xl leading-8 max-w-[1091px] mx-auto"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Partner with SNS CCS to deliver world-class PMI training that builds certified teams, drives business results, and creates lasting competitive advantage.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 mb-14">
            <Link
              to="/corporate-training"
              className="px-6 py-3 rounded-lg text-[#DBEBFF] text-base font-semibold flex items-center gap-2 transition-opacity hover:opacity-90"
              style={{
                background: 'linear-gradient(to bottom, #9aaed3, #5b89b3)',
                minWidth: '290px',
                justifyContent: 'center',
                color: '#DBEBFF',
              }}
            >
              Request Corporate Training
              <img src={iconArrowRight} alt="Arrow" className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${settings.phone}`}
              className="px-6 py-3 rounded-lg border border-[#1f3a5f] text-[#1f3a5f] text-base font-semibold flex items-center gap-2 transition-colors hover:bg-gray-50"
              style={{
                minWidth: '230px',
                justifyContent: 'center',
              }}
            >
              <img src={iconPhoneAlt} alt="Phone" className="w-4 h-4" />
              Talk to a Consultant
            </a>
          </div>

          {/* Stats */}
          <div className="border-t border-[rgba(154,174,211,0.35)] pt-14 flex items-center justify-center gap-8">
            <div className="text-center">
              <p 
                className="text-[#1f3a5f] text-[40px] font-semibold leading-10 mb-2"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                24-48h
              </p>
              <p className="text-[rgba(11,31,59,0.75)] text-base leading-6">Response Time</p>
            </div>
            <div className="text-center">
              <p 
                className="text-[#1f3a5f] text-[40px] font-semibold leading-10 mb-2"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Free
              </p>
              <p className="text-[rgba(11,31,59,0.75)] text-base leading-6">Needs Assessment</p>
            </div>
            <div className="text-center">
              <p 
                className="text-[#1f3a5f] text-[40px] font-semibold leading-10 mb-2"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Flexible
              </p>
              <p className="text-[rgba(11,31,59,0.75)] text-base leading-6">Pricing Options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
