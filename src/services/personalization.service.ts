const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';

interface PersonalizationFormData {
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

interface StudyPlan {
  id: number;
  userId: number;
  studyDurationDays: number;
  weeklyHours: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  readyByDays: number;
  planType?: '20_day' | '30_day' | '60_day';
  pdfPath?: string;
  focusDomains: string[];
  recommendedResources: Array<{
    type: 'video' | 'reading' | 'practice' | 'live' | 'audio';
    title: string;
    description: string;
  }>;
  milestones: Array<{
    week: number;
    title: string;
    description: string;
  }>;
  isActive: boolean;
  createdAt: string;
}

interface PersonalizationStatusResponse {
  hasCompletedPersonalization: boolean;
  personalizationData: any;
  activeStudyPlan: StudyPlan | null;
}

class PersonalizationService {
  private getAuthHeader() {
    const token = localStorage.getItem('access_token'); // Match the token name from api.js
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  }

  /**
   * Check if user has completed personalization
   */
  async checkStatus(): Promise<PersonalizationStatusResponse> {
    const response = await fetch(
      `${API_BASE_URL}/api/student/personalization/status`,
      {
        method: 'GET',
        ...this.getAuthHeader()
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to check status');
    return data.data;
  }

  /**
   * Save personalization data and generate study plan
   */
  async savePersonalization(data: PersonalizationFormData): Promise<{
    personalizationData: any;
    studyPlan: StudyPlan;
  }> {
    // Transform form data to match backend expected format
    const payload = {
      // New fields - send directly as they match backend structure
      pmiEnrolled: data.pmiEnrolled,
      examScheduled: data.examScheduled,
      examDate: data.examDate || null,
      yearsExperience: data.yearsExperience,
      currentEmployer: data.currentEmployer,
      projectMethodology: data.projectMethodology,
      otherPMICertifications: data.otherPMICertifications,
      certificationsDetails: data.certificationsDetails,
      learningStyle: data.learningStyle, // Already an array
      educationLevel: data.educationLevel,
      educationSubject: data.educationSubject,
      studyHoursDaily: data.studyHoursDaily,
      confidenceLevel: data.confidenceLevel,
      mockExamScore: data.mockExamScore
    };

    const response = await fetch(
      `${API_BASE_URL}/api/student/personalization`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        ...this.getAuthHeader()
      }
    );
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to save personalization');
    return result.data;
  }

  /**
   * Get user's personalization data
   */
  async getPersonalization(): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/api/student/personalization`,
      {
        method: 'GET',
        ...this.getAuthHeader()
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to get personalization');
    return data.data;
  }

  /**
   * Get active study plan
   */
  async getStudyPlan(): Promise<StudyPlan> {
    const response = await fetch(
      `${API_BASE_URL}/api/student/personalization/study-plan`,
      {
        method: 'GET',
        ...this.getAuthHeader()
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to get study plan');
    return data.data;
  }
}

export const personalizationService = new PersonalizationService();
export type { PersonalizationFormData, StudyPlan, PersonalizationStatusResponse };
