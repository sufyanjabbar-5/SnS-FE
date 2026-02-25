import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Send, CheckCircle, X } from 'lucide-react';
import { useCertifications } from '../../context/CertificationContext';
import apiService from '../../services/api';
import './ReadyToStart.css';

// Local assets (migrated from Figma)
const iconPhone = "/assets/images/contact/f-phone.svg";
const iconMail = "/assets/images/contact/f-mail.svg";
const iconMessage = "/assets/images/contact/f-message.svg";
const iconMap = "/assets/images/contact/f-map.svg";
const iconSend = "/assets/images/contact/f-send.svg";
const iconCheck = "/assets/images/contact/f-check.svg";

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  interestedIn: string;
}

const ReadyToStart: React.FC = () => {
  const { appInfo: settings, certifications, loading: settingsLoading } = useCertifications();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    interestedIn: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const leadData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        messages: `Interested in: ${formData.interestedIn} (from Ready to Start section)`
      };

      const response = await apiService.request('/api/chat-leads', {
        method: 'POST',
        body: JSON.stringify(leadData)
      });

      if (response.success) {
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          interestedIn: '',
        });
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (settingsLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <section 
      id="ready-to-start"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(0deg, rgb(154, 174, 211) 0%, rgb(91, 137, 179) 100%)',
        minHeight: '789px',
      }}
    >
      {/* Background Blur Effect */}
      <div className="absolute -left-28 top-0 w-[1662px] h-[789px] opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[64px]" />
        <div className="absolute top-[405px] left-[1278px] w-96 h-96 bg-white rounded-full blur-[64px]" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-[1920px] mx-auto px-6 md:px-[100px] py-20">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Side - Contact Info */}
          <div className="w-full lg:w-[550px] space-y-8">
            <div>
              <h2 
                className="text-white text-[40px] font-bold leading-[48px] mb-4"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Ready to Start?
              </h2>
              <p 
                className="text-white text-xl leading-[32.5px] mb-8"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Get personalized guidance from our expert counselors
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Call Us Card */}
              <div className="bg-[#dfeaff] border border-white/40 rounded-[14px] p-4 flex gap-4">
                <div className="bg-[#9aaed3] rounded-[14px] w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <img src={iconPhone} alt="Phone" className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#0b1f3b] text-base font-bold leading-5 mb-1">Call Us</h3>
                  <p className="text-[#0b1f3b] text-base leading-6 mb-1">{settings?.phone || ''}</p>
                  <p className="text-[#0b1f3b] text-xs leading-4">Mon-Fri, 9 AM - 6 PM EST</p>
                </div>
              </div>

              {/* Email Us Card */}
              <div className="bg-[#dfeaff] border border-white/40 rounded-[14px] p-4 flex gap-4">
                <div className="bg-[#9aaed3] rounded-[14px] w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <img src={iconMail} alt="Email" className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#0b1f3b] text-base font-bold leading-5 mb-1">Email Us</h3>
                  <p className="text-[#0b1f3b] text-base leading-6 mb-1">{settings?.contactEmail || ''}</p>
                  <p className="text-[#0b1f3b] text-xs leading-4">24/7 Response</p>
                </div>
              </div>

              {/* Live Chat Card */}
              <a 
                href={settings?.whatsappUrl || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#dfeaff] border border-white/40 rounded-[14px] p-4 flex gap-4 hover:bg-[#d0e0ff] transition-colors"
              >
                <div className="bg-[#9aaed3] rounded-[14px] w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <img src={iconMessage} alt="Live Chat" className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#0b1f3b] text-base font-bold leading-5 mb-1">Live Chat</h3>
                  <p className="text-[#0b1f3b] text-base leading-6 mb-1">Chat Now</p>
                  <p className="text-[#0b1f3b] text-xs leading-4">Instant Support</p>
                </div>
              </a>

              {/* Global Headquarters Card */}
              <div className="bg-[#dfeaff] border border-white/40 rounded-[14px] p-4 flex gap-4">
                <div className="bg-[#9aaed3] rounded-[14px] w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <img src={iconMap} alt="Map" className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#0b1f3b] text-base font-bold leading-5 mb-1">Global Headquarters</h3>
                  <p className="text-[#0b1f3b] text-sm leading-5">
                    {settings?.address || ''}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full lg:flex-1 bg-white rounded-[24px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.05)] p-6 md:p-10">
            <div className="mb-8">
              <h2 
                className="text-[#101828] text-[32px] font-bold leading-[36px] mb-2"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Get Free Counseling
              </h2>
              <p 
                className="text-[#4a5565] text-base leading-6"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Fill out the form and we'll get back to you within 2 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#0b1f3b] text-sm font-bold leading-5 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-3 py-3 border border-[rgba(96,165,250,0.5)] rounded-lg text-[#0b1f3b] text-sm placeholder:text-[#0b1f3b]/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#0b1f3b] text-sm font-bold leading-5 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-3 py-3 border border-[rgba(96,165,250,0.5)] rounded-lg text-[#0b1f3b] text-sm placeholder:text-[#0b1f3b]/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[#0b1f3b] text-sm font-bold leading-5 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-3 border border-[rgba(96,165,250,0.5)] rounded-lg text-[#0b1f3b] text-sm placeholder:text-[#0b1f3b]/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Interested In */}
              <div>
                <label className="block text-[#0b1f3b] text-sm font-bold leading-5 mb-2">
                  Interested In *
                </label>
                <select
                  name="interestedIn"
                  value={formData.interestedIn}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-[rgba(96,165,250,0.5)] rounded-lg text-[#0b1f3b] text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select a course</option>
                  {certifications.map(cert => (
                    <option key={cert.id} value={cert.slug}>{cert.longName}</option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="space-y-4">
                {submitSuccess && (
                   <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                      <img src={iconCheck} alt="Success" className="w-5 h-5" />
                      <span className="text-sm font-medium">Your request for callback has been received! Our team will contact you soon.</span>
                   </div>
                )}
                {submitError && (
                   <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                      <X className="w-5 h-5" />
                      <span className="text-sm font-medium">{submitError}</span>
                   </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-lg shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] text-[#dbebff] text-base font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(180deg, rgb(154, 174, 211) 0%, rgb(91, 137, 179) 100%)',
                  }}
                >
                  {isSubmitting ? (
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                     <img src={iconSend} alt="Send" className="w-4 h-4" />
                  )}
                  {isSubmitting ? 'Submitting...' : 'Request Free Callback'}
                </button>
                <p className="text-center text-xs text-[rgba(11,31,59,0.75)] leading-4">
                  🔒 Your information is 100% secure. We respect your privacy.
                </p>
              </div>
            </form>

            {/* Trust Badges */}
            <div className="border-t border-[#f3f4f6] pt-6 mt-6">
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                <div className="flex items-center gap-2">
                  <img src={iconCheck} alt="Check" className="w-4 h-4" />
                  <span className="text-sm text-[rgba(11,31,59,0.75)]">No spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={iconCheck} alt="Check" className="w-4 h-4" />
                  <span className="text-sm text-[rgba(11,31,59,0.75)]">2-hour response</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={iconCheck} alt="Check" className="w-4 h-4" />
                  <span className="text-sm text-[rgba(11,31,59,0.75)]">Free consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToStart;
