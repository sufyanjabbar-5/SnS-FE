import React from 'react';
import { CheckCircle2, Calendar, Clock, Target, TrendingUp, Download } from 'lucide-react';
import type { PersonalizationData } from './PersonalizationModal';
import type { StudyPlan } from '../../../../services/personalization.service';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalizationData: PersonalizationData | null;
  studyPlan: StudyPlan | null;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ isOpen, onClose, personalizationData, studyPlan }) => {
  if (!isOpen || !personalizationData || !studyPlan) return null;

  // Helper functions to format study plan data from backend
  const calculateReadyDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + studyPlan.readyByDays);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getWeeklyHoursDisplay = () => {
    // weeklyHours is now a string like "7-14 hours"
    return studyPlan.weeklyHours || 'Varies';
  };

  const getPlanTypeDisplay = () => {
    if (!studyPlan.planType) return `${studyPlan.studyDurationDays} Days`;
    
    switch (studyPlan.planType) {
      case '20_day':
        return '20-Day Intensive Plan';
      case '30_day':
        return '30-Day Accelerated Plan';
      case '60_day':
        return '60-Day Comprehensive Plan';
      default:
        return `${studyPlan.studyDurationDays} Days`;
    }
  };

  const getDurationDisplay = () => {
    return `${studyPlan.studyDurationDays} Days`;
  };

  const getReadyByDisplay = () => {
    return `${studyPlan.readyByDays} Days`;
  };

  const handleDownloadPDF = () => {
    if (studyPlan.pdfPath) {
      // Construct the full URL for the PDF
      const API_BASE = (import.meta as any).env.VITE_API_URL || 'http://localhost:3000';
      const pdfUrl = `${API_BASE}${studyPlan.pdfPath}`;
      
      // Open PDF in new tab for download
      window.open(pdfUrl, '_blank');
    } else {
      console.warn('PDF path not available');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        <div className="px-6 md:px-12 py-8 md:py-10">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-[#1f3a5f] rounded-full p-4">
              <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <Target className="w-7 h-7 text-orange-600" />
              Your Customized PMP Plan Is Ready!
            </h2>
            <p className="text-base md:text-lg text-[#5B89B3] font-semibold mb-1">
              {getPlanTypeDisplay()}
            </p>
            <p className="text-sm md:text-base text-gray-600">
              We've created a personalized study roadmap tailored to your goals
            </p>
          </div>

          {/* Study Plan Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">Study Duration</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{getDurationDisplay()}</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">Weekly Hours</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{getWeeklyHoursDisplay()}</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Target className="w-5 h-5" />
                <span className="text-sm font-medium">Risk Level</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{studyPlan.riskLevel}</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Ready By</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{getReadyByDisplay()}</p>
            </div>
          </div>

          {/* Focus Domains */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 md:p-6 mb-6">
            <div className="flex items-center gap-2 text-blue-600 mb-3">
              <Target className="w-5 h-5" />
              <span className="text-sm md:text-base font-semibold">Focus Domains</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {studyPlan.focusDomains && studyPlan.focusDomains.length > 0 ? (
                studyPlan.focusDomains.map((domain, index) => (
                  <span key={index} className="inline-block bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                    {domain}
                  </span>
                ))
              ) : (
                <span className="inline-block bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  Balanced Study Across All Domains
                </span>
              )}
            </div>
          </div>

          {/* Email Sent Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
            <p className="text-sm text-gray-700">
              ✉️ <strong>Plan sent to your email!</strong> You can also download it now.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 md:py-4 bg-[#5B89B3] text-white rounded-lg font-semibold hover:bg-[#4a7299] transition-colors text-sm md:text-base"
            >
              View My Dashboard →
            </button>
            {studyPlan.pdfPath && (
              <button
                onClick={handleDownloadPDF}
                className="px-6 py-3 md:py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;
