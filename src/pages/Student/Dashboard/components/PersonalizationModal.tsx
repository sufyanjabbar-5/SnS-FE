import React, { useState } from 'react';
import { X, Calendar, Briefcase, BookOpen, Target, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

interface PersonalizationModalProps {
  isOpen: boolean;
  onComplete: (data: PersonalizationData) => void;
  isSubmitting?: boolean;
}

export interface PersonalizationData {
  // New client questionnaire fields
  pmiEnrolled: boolean;
  examScheduled: boolean;
  examDate: string;
  yearsExperience: number;
  currentEmployer: string;
  projectMethodology: string;
  otherPMICertifications: boolean;
  certificationsDetails: string;
  learningStyle: string[];
  educationLevel: string;
  educationSubject: string;
  studyHoursDaily: string;
  confidenceLevel: string;
  mockExamScore: number | null;
}

const PersonalizationModal: React.FC<PersonalizationModalProps> = ({ isOpen, onComplete, isSubmitting = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [formData, setFormData] = useState<PersonalizationData>({
    pmiEnrolled: false,
    examScheduled: false,
    examDate: '',
    yearsExperience: 0,
    currentEmployer: '',
    projectMethodology: '',
    otherPMICertifications: false,
    certificationsDetails: '',
    learningStyle: [],
    educationLevel: '',
    educationSubject: '',
    studyHoursDaily: '',
    confidenceLevel: '',
    mockExamScore: null,
  });

  if (!isOpen) return null;

  // Validation function for each step
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        // Step 1: PMI membership, exam details, experience, employer
        const step1Valid = 
          (formData.examScheduled ? formData.examDate !== '' : true) &&
          formData.yearsExperience > 0 &&
          formData.currentEmployer.trim() !== '';
        return step1Valid;
      
      case 2:
        // Step 2: Project methodology, certifications
        const step2Valid = 
          formData.projectMethodology !== '' &&
          (formData.otherPMICertifications ? formData.certificationsDetails.trim() !== '' : true);
        return step2Valid;
      
      case 3:
        // Step 3: Learning style (at least one), education, study hours
        const step3Valid = 
          formData.learningStyle.length > 0 &&
          formData.educationLevel !== '' &&
          formData.educationSubject.trim() !== '' &&
          formData.studyHoursDaily !== '';
        return step3Valid;
      
      case 4:
        // Step 4: Confidence level required, mock exam score optional
        return formData.confidenceLevel !== '';
      
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) {
      setShowValidationErrors(true);
      return;
    }
    
    setShowValidationErrors(false);
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setShowValidationErrors(false);
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: keyof PersonalizationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation errors when user starts filling
    if (showValidationErrors) {
      setShowValidationErrors(false);
    }
  };

  const toggleLearningStyle = (style: string) => {
    setFormData(prev => ({
      ...prev,
      learningStyle: prev.learningStyle.includes(style)
        ? prev.learningStyle.filter(s => s !== style)
        : [...prev.learningStyle, style]
    }));
    // Clear validation errors when user starts filling
    if (showValidationErrors) {
      setShowValidationErrors(false);
    }
  };

  const StepHeader = () => (
    <div className="bg-gradient-to-br from-[#1f3a5f] to-[#0b1f3b] rounded-t-2xl px-6 md:px-12 py-6 md:py-8">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
            Let's Personalize Your PMP Journey
          </h2>
          <p className="text-blue-100 text-sm md:text-base">
            Answer a few questions so we can build your customized study plan
          </p>
        </div>
        {/* Close button removed - modal is mandatory */}
      </div>
      <div className="flex items-center gap-3 text-sm text-blue-100">
        <span className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          Estimated time: 2-3 minutes
        </span>
        <span>Step {currentStep} of 4</span>
      </div>
      <div className="mt-4 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gray-800 transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>
    </div>
  );

  const RequiredLabel = ({ children, error }: { children: React.ReactNode; error?: boolean }) => (
    <label className="block text-sm md:text-base font-semibold text-gray-900 mb-3">
      {children}
      <span className="text-red-500 ml-1">*</span>
      {error && (
        <span className="text-red-500 text-xs md:text-sm font-normal ml-2 flex items-center gap-1 inline-flex">
          <AlertCircle className="w-3 h-3" />
          Required
        </span>
      )}
    </label>
  );

  const OptionalLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-sm md:text-base font-semibold text-gray-900 mb-3">
      {children}
      <span className="text-gray-400 text-xs md:text-sm font-normal ml-2">(Optional)</span>
    </label>
  );

  const OptionButton = ({ 
    selected, 
    onClick, 
    children, 
    icon 
  }: { 
    selected: boolean; 
    onClick: () => void; 
    children: React.ReactNode;
    icon?: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      type="button"
      className={`w-full px-4 md:px-6 py-3 md:py-4 rounded-lg border-2 transition-all text-sm md:text-base font-medium ${
        selected
          ? 'border-[#5B89B3] bg-blue-50 text-gray-900'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
      }`}
    >
      <span className="flex items-center justify-center gap-2">
        {icon}
        {children}
      </span>
    </button>
  );

  const CheckboxButton = ({ 
    selected, 
    onClick, 
    children 
  }: { 
    selected: boolean; 
    onClick: () => void; 
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      type="button"
      className={`w-full px-4 md:px-6 py-3 md:py-4 rounded-lg border-2 transition-all text-sm md:text-base font-medium text-left ${
        selected
          ? 'border-[#5B89B3] bg-blue-50 text-gray-900'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
      }`}
    >
      <span className="flex items-center gap-2">
        <span className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
          selected ? 'border-[#5B89B3] bg-[#5B89B3]' : 'border-gray-300'
        }`}>
          {selected && (
            <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </span>
        {children}
      </span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 max-h-[90vh] overflow-y-auto">
        <StepHeader />
        
        <div className="px-6 md:px-12 py-8 md:py-10">
          {/* Step 1: PMI Membership, Exam Details, Experience */}
          {currentStep === 1 && (
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-8 h-8 text-[#5B89B3]" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Basic Information</h3>
              </div>

              {/* PMI Enrollment */}
              <div className="p-4 rounded-lg">
                <label className="block text-sm md:text-base font-semibold text-gray-900 mb-3">
                  Are you enrolled with PMI?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <OptionButton
                    selected={formData.pmiEnrolled === true}
                    onClick={() => updateFormData('pmiEnrolled', true)}
                  >
                    Yes
                  </OptionButton>
                  <OptionButton
                    selected={formData.pmiEnrolled === false}
                    onClick={() => updateFormData('pmiEnrolled', false)}
                  >
                    No
                  </OptionButton>
                </div>
              </div>

              {/* Exam Scheduled */}
              <div className="p-4 rounded-lg">
                <label className="block text-sm md:text-base font-semibold text-gray-900 mb-3">
                  Have you scheduled your PMP exam?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <OptionButton
                    selected={formData.examScheduled === true}
                    onClick={() => updateFormData('examScheduled', true)}
                  >
                    Yes
                  </OptionButton>
                  <OptionButton
                    selected={formData.examScheduled === false}
                    onClick={() => updateFormData('examScheduled', false)}
                  >
                    No
                  </OptionButton>
                </div>
              </div>

              {/* Exam Date (conditional) */}
              {formData.examScheduled && (
                <div className={`p-4 rounded-lg transition-colors ${showValidationErrors && formData.examDate === '' ? 'bg-red-50 border-2 border-red-200' : ''}`}>
                  <RequiredLabel error={showValidationErrors && formData.examDate === ''}>
                    When is your exam scheduled?
                  </RequiredLabel>
                  <input
                    type="date"
                    value={formData.examDate}
                    onChange={(e) => updateFormData('examDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#5B89B3] text-base"
                  />
                </div>
              )}

              {/* Years of Experience */}
              <div className={`p-4 rounded-lg transition-colors ${showValidationErrors && formData.yearsExperience === 0 ? 'bg-red-50 border-2 border-red-200' : ''}`}>
                <RequiredLabel error={showValidationErrors && formData.yearsExperience === 0}>
                  How many years of project management experience do you have?
                </RequiredLabel>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={formData.yearsExperience || ''}
                  onChange={(e) => updateFormData('yearsExperience', parseInt(e.target.value) || 0)}
                  placeholder="Enter years of experience (minimum 1)"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#5B89B3] text-base"
                />
              </div>

              {/* Current Employer */}
              <div className={`p-4 rounded-lg transition-colors ${showValidationErrors && formData.currentEmployer.trim() === '' ? 'bg-red-50 border-2 border-red-200' : ''}`}>
                <RequiredLabel error={showValidationErrors && formData.currentEmployer.trim() === ''}>
                  Current employer or company
                </RequiredLabel>
                <input
                  type="text"
                  value={formData.currentEmployer}
                  onChange={(e) => updateFormData('currentEmployer', e.target.value)}
                  placeholder="Enter your current organization"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#5B89B3] text-base"
                />
              </div>
            </div>
          )}

          {/* Step 2: Project Methodology & Certifications */}
          {currentStep === 2 && (
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-8 h-8 text-[#5B89B3]" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Your Project Experience</h3>
              </div>

              {/* Project Methodology */}
              <div className={`p-4 rounded-lg transition-colors ${showValidationErrors && formData.projectMethodology === '' ? 'bg-red-50 border-2 border-red-200' : ''}`}>
                <RequiredLabel error={showValidationErrors && formData.projectMethodology === ''}>
                  What project methodology do you primarily work with?
                </RequiredLabel>
                <div className="grid grid-cols-1 gap-3">
                  <OptionButton
                    selected={formData.projectMethodology === 'predictive'}
                    onClick={() => updateFormData('projectMethodology', 'predictive')}
                  >
                    Predictive (Waterfall)
                  </OptionButton>
                  <OptionButton
                    selected={formData.projectMethodology === 'agile'}
                    onClick={() => updateFormData('projectMethodology', 'agile')}
                  >
                    Agile (Scrum, Kanban, etc.)
                  </OptionButton>
                  <OptionButton
                    selected={formData.projectMethodology === 'hybrid'}
                    onClick={() => updateFormData('projectMethodology', 'hybrid')}
                  >
                    Hybrid (Mix of both)
                  </OptionButton>
                </div>
              </div>

              {/* Other PMI Certifications */}
              <div className="p-4 rounded-lg">
                <label className="block text-sm md:text-base font-semibold text-gray-900 mb-3">
                  Do you hold any other PMI certifications?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <OptionButton
                    selected={formData.otherPMICertifications === true}
                    onClick={() => updateFormData('otherPMICertifications', true)}
                  >
                    Yes
                  </OptionButton>
                  <OptionButton
                    selected={formData.otherPMICertifications === false}
                    onClick={() => updateFormData('otherPMICertifications', false)}
                  >
                    No
                  </OptionButton>
                </div>
              </div>

              {/* Certification Details (conditional) */}
              {formData.otherPMICertifications && (
                <div className={`p-4 rounded-lg transition-colors ${showValidationErrors && formData.certificationsDetails.trim() === '' ? 'bg-red-50 border-2 border-red-200' : ''}`}>
                  <RequiredLabel error={showValidationErrors && formData.certificationsDetails.trim() === ''}>
                    Which certifications do you hold?
                  </RequiredLabel>
                  <textarea
                    value={formData.certificationsDetails}
                    onChange={(e) => updateFormData('certificationsDetails', e.target.value)}
                    placeholder="e.g., CAPM, PMI-ACP, etc."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#5B89B3] text-base resize-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Learning Style, Education, Study Hours */}
          {currentStep === 3 && (
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-8 h-8 text-[#5B89B3]" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Your Learning Preferences</h3>
              </div>

              {/* Learning Style (multi-select) */}
              <div className={`p-4 rounded-lg transition-colors ${showValidationErrors && formData.learningStyle.length === 0 ? 'bg-red-50 border-2 border-red-200' : ''}`}>
                <RequiredLabel error={showValidationErrors && formData.learningStyle.length === 0}>
                  How do you prefer to learn? (Select all that apply)
                </RequiredLabel>
                <div className="grid grid-cols-1 gap-3">
                  <CheckboxButton
                    selected={formData.learningStyle.includes('video')}
                    onClick={() => toggleLearningStyle('video')}
                  >
                    Video lectures
                  </CheckboxButton>
                  <CheckboxButton
                    selected={formData.learningStyle.includes('audio')}
                    onClick={() => toggleLearningStyle('audio')}
                  >
                    Audio/Podcasts
                  </CheckboxButton>
                  <CheckboxButton
                    selected={formData.learningStyle.includes('practice_questions')}
                    onClick={() => toggleLearningStyle('practice_questions')}
                  >
                    Practice questions
                  </CheckboxButton>
                  <CheckboxButton
                    selected={formData.learningStyle.includes('instructor_led')}
                    onClick={() => toggleLearningStyle('instructor_led')}
                  >
                    Instructor-led sessions
                  </CheckboxButton>
                  <CheckboxButton
                    selected={formData.learningStyle.includes('reading')}
                    onClick={() => toggleLearningStyle('reading')}
                  >
                    Reading materials
                  </CheckboxButton>
                </div>
              </div>

              {/* Education Level */}
              <div className={`p-4 rounded-lg transition-colors ${showValidationErrors && formData.educationLevel === '' ? 'bg-red-50 border-2 border-red-200' : ''}`}>
                <RequiredLabel error={showValidationErrors && formData.educationLevel === ''}>
                  What is your highest level of education?
                </RequiredLabel>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => updateFormData('educationLevel', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#5B89B3] text-base bg-white"
                >
                  <option value="">Select education level</option>
                  <option value="high_school">High School</option>
                  <option value="associate">Associate Degree</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="doctorate">Doctorate/PhD</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Education Subject */}
              <div className={`p-4 rounded-lg transition-colors ${showValidationErrors && formData.educationSubject.trim() === '' ? 'bg-red-50 border-2 border-red-200' : ''}`}>
                <RequiredLabel error={showValidationErrors && formData.educationSubject.trim() === ''}>
                  What was your major/field of study?
                </RequiredLabel>
                <input
                  type="text"
                  value={formData.educationSubject}
                  onChange={(e) => updateFormData('educationSubject', e.target.value)}
                  placeholder="e.g., Business Administration, Engineering, etc."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#5B89B3] text-base"
                />
              </div>

              {/* Study Hours Daily */}
              <div className={`p-4 rounded-lg transition-colors ${showValidationErrors && formData.studyHoursDaily === '' ? 'bg-red-50 border-2 border-red-200' : ''}`}>
                <RequiredLabel error={showValidationErrors && formData.studyHoursDaily === ''}>
                  How many hours can you study per day?
                </RequiredLabel>
                <div className="grid grid-cols-2 gap-3">
                  <OptionButton
                    selected={formData.studyHoursDaily === '1-2'}
                    onClick={() => updateFormData('studyHoursDaily', '1-2')}
                  >
                    1-2 hours
                  </OptionButton>
                  <OptionButton
                    selected={formData.studyHoursDaily === '2-3'}
                    onClick={() => updateFormData('studyHoursDaily', '2-3')}
                  >
                    2-3 hours
                  </OptionButton>
                  <OptionButton
                    selected={formData.studyHoursDaily === '3-4'}
                    onClick={() => updateFormData('studyHoursDaily', '3-4')}
                  >
                    3-4 hours
                  </OptionButton>
                  <OptionButton
                    selected={formData.studyHoursDaily === '4+'}
                    onClick={() => updateFormData('studyHoursDaily', '4+')}
                  >
                    4+ hours
                  </OptionButton>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confidence Level & Mock Exam Score */}
          {currentStep === 4 && (
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-[#5B89B3]" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Final Assessment</h3>
              </div>

              {/* Confidence Level */}
              <div className={`p-4 rounded-lg transition-colors ${showValidationErrors && formData.confidenceLevel === '' ? 'bg-red-50 border-2 border-red-200' : ''}`}>
                <RequiredLabel error={showValidationErrors && formData.confidenceLevel === ''}>
                  How would you rate your current confidence level for the PMP exam?
                </RequiredLabel>
                <div className="grid grid-cols-1 gap-3">
                  <OptionButton
                    selected={formData.confidenceLevel === 'beginner'}
                    onClick={() => updateFormData('confidenceLevel', 'beginner')}
                  >
                    Beginner - Just starting my PMP journey
                  </OptionButton>
                  <OptionButton
                    selected={formData.confidenceLevel === 'intermediate'}
                    onClick={() => updateFormData('confidenceLevel', 'intermediate')}
                  >
                    Intermediate - Have some knowledge, need more practice
                  </OptionButton>
                  <OptionButton
                    selected={formData.confidenceLevel === 'advanced'}
                    onClick={() => updateFormData('confidenceLevel', 'advanced')}
                  >
                    Advanced - Ready for exam, need final review
                  </OptionButton>
                </div>
              </div>

              {/* Mock Exam Score (Optional) */}
              <div className="p-4 rounded-lg">
                <OptionalLabel>
                  If you've taken a mock exam, what was your score?
                </OptionalLabel>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.mockExamScore ?? ''}
                  onChange={(e) => updateFormData('mockExamScore', e.target.value === '' ? null : parseInt(e.target.value))}
                  placeholder="Enter score (0-100)"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#5B89B3] text-base"
                />
                <p className="text-gray-500 text-xs md:text-sm mt-2">
                  This helps us better tailor your study plan focus areas
                </p>
              </div>

              {/* Summary Info */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm md:text-base">
                  <strong>Almost done!</strong> Click "Generate My Plan" to receive your personalized study plan based on your responses.
                </p>
              </div>
            </div>
          )}

          {/* Validation Error Summary */}
          {showValidationErrors && !isStepValid() && (
            <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 font-semibold text-sm md:text-base">
                  Please complete all required fields
                </p>
                <p className="text-red-600 text-xs md:text-sm mt-1">
                  Fields marked with <span className="text-red-500 font-bold">*</span> are required. Please scroll up to see highlighted questions.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 md:mt-10 pt-6 border-t">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepValid() || isSubmitting}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                isStepValid() && !isSubmitting
                  ? 'bg-[#5B89B3] text-white hover:bg-[#4a7299]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Processing...
                </>
              ) : (
                <>
                  {currentStep === 4 ? 'Generate My Plan' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationModal;
