import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  TrendingUp, 
  Trophy, 
  Calendar
} from 'lucide-react';
import apiService from '../../../services/api';
import { personalizationService } from '../../../services/personalization.service';

interface Enrollment {
  id: number;
  status: string;
  Certification?: {
    name: string;
  };
}

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [daysUntilExam, setDaysUntilExam] = useState<number | null>(null);
  
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    fetchEnrollments();
    fetchPersonalizationData();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await apiService.getMyEnrollments();
      setEnrollments(response.data || []);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPersonalizationData = async () => {
    try {
      const response = await personalizationService.checkStatus();
      if (response.personalizationData?.examDate) {
        const examDate = new Date(response.personalizationData.examDate);
        const today = new Date();
        const timeDiff = examDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setDaysUntilExam(daysDiff > 0 ? daysDiff : null);
      }
    } catch (error) {
      console.error('Error fetching personalization data:', error);
    }
  };

  // Calculate PMP progress (mock calculation)
  const pmpProgress = 62;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen" 
      style={{
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%), linear-gradient(180deg, rgba(194, 221, 255, 0.75) 0%, rgba(194, 221, 255, 0.40) 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Welcome Section */}
        <div 
          className="p-6 md:p-8 mb-6 md:mb-8" 
          style={{
            borderRadius: '16px',
            background: 'linear-gradient(180deg, #9AAED3 0%, #5B89B3 100%)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.10)'
          }}
        >
          <h1 
            className="mb-2"
            style={{
              color: '#FFFFFF',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '30px',
              fontWeight: 700,
              lineHeight: '36px'
            }}
          >
            Welcome back, {user?.firstName || 'Student'}! 👋
          </h1>
          <p 
            style={{
              color: '#DBEAFE',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: '28px'
            }}
          >
            Here's your learning progress across all certifications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Active Courses */}
          <div 
            onClick={() => navigate('/student/enrollments')}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer p-6 border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 rounded-xl p-3">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              {enrollments.length}
            </div>
            <div className="text-sm md:text-base text-gray-600">Active Courses</div>
          </div>

          {/* PMP Progress */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-green-100 rounded-xl p-3">
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              {pmpProgress}%
            </div>
            <div className="text-sm md:text-base text-gray-600">PMP Progress</div>
          </div>

          {/* Days Until Exam */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-orange-100 rounded-xl p-3">
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              {daysUntilExam !== null ? daysUntilExam : '--'}
            </div>
            <div className="text-sm md:text-base text-gray-600">Days Until Exam</div>
          </div>

          {/* PDUs Earned */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-purple-100 rounded-xl p-3">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">35</div>
            <div className="text-sm md:text-base text-gray-600">PDUs Earned</div>
          </div>
        </div>

        {/* My Certification Courses */}
        <div 
          className="mb-8"
          style={{
            backgroundColor: '#ffffff',
            border: '1.028px solid #e5e7eb',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0px 10px 15px 0px rgba(0,0,0,0.1), 0px 4px 6px 0px rgba(0,0,0,0.1)'
          }}
        >
          <h2 
            className="mb-6"
            style={{
              color: '#101828',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '24px',
              fontWeight: 700,
              lineHeight: '32px'
            }}
          >
            📚 My Certification Courses
          </h2>
          
          <div className="space-y-4">
            {enrollments.length > 0 ? (
              <>
                {enrollments.map((enrollment) => {
                  // Mock progress data - you can replace with real progress tracking
                  const mockProgress = 62;
                  const mockChapters = '8/15';
                  const mockAvgScore = 72;
                  
                  return (
                    <div
                      key={enrollment.id}
                      onClick={() => navigate('/student/enrollments')}
                      className="cursor-pointer transition-all hover:shadow-lg"
                      style={{
                        backgroundColor: 'rgba(96,165,250,0.25)',
                        border: '1.028px solid #5b89b3',
                        borderRadius: '14px',
                        padding: '25px'
                      }}
                    >
                    {/* Header with Title and Status */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 
                          style={{
                            color: '#101828',
                            fontFamily: '"DM Sans", sans-serif',
                            fontSize: '20px',
                            fontWeight: 700,
                            lineHeight: '28px',
                            marginBottom: '4px'
                          }}
                        >
                          {enrollment.Certification?.name || 'Certification'}
                        </h3>
                        <p 
                          style={{
                            color: '#4a5565',
                            fontFamily: '"DM Sans", sans-serif',
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '20px'
                          }}
                        >
                          Project Management Professional
                        </p>
                      </div>
                      <span 
                        style={{
                          backgroundColor: '#dbeafe',
                          color: '#1447e6',
                          fontFamily: '"DM Sans", sans-serif',
                          fontSize: '12px',
                          fontWeight: 500,
                          lineHeight: '16px',
                          padding: '3px 9px',
                          borderRadius: '8px'
                        }}
                      >
                        {enrollment.status === 'active' ? 'In Progress' : enrollment.status}
                      </span>
                    </div>
                    
                    {/* Progress Section */}
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span 
                          style={{
                            color: '#4a5565',
                            fontFamily: '"DM Sans", sans-serif',
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '20px'
                          }}
                        >
                          Progress
                        </span>
                        <span 
                          style={{
                            color: '#4a5565',
                            fontFamily: '"DM Sans", sans-serif',
                            fontSize: '14px',
                            fontWeight: 700,
                            lineHeight: '20px'
                          }}
                        >
                          {mockProgress}%
                        </span>
                      </div>
                      <div 
                        className="w-full rounded-full overflow-hidden"
                        style={{
                          backgroundColor: 'rgba(3,2,19,0.2)',
                          height: '8px'
                        }}
                      >
                        <div 
                          className="h-full transition-all duration-300"
                          style={{ 
                            width: `${mockProgress}%`,
                            background: 'linear-gradient(179.63deg, rgb(31, 58, 95) 28.29%, rgb(11, 31, 59) 99.67%)'
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Stats Row */}
                    <div className="flex items-center justify-between">
                      <p 
                        style={{
                          color: '#4a5565',
                          fontFamily: '"DM Sans", sans-serif',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '20px'
                        }}
                      >
                        Chapters: <span style={{ fontWeight: 700, color: '#101828' }}>{mockChapters}</span>
                      </p>
                      <p 
                        style={{
                          color: '#4a5565',
                          fontFamily: '"DM Sans", sans-serif',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '20px'
                        }}
                      >
                        Avg Score: <span style={{ fontWeight: 700, color: '#101828' }}>{mockAvgScore}%</span>
                      </p>
                      <p 
                        style={{
                          color: '#4a5565',
                          fontFamily: '"DM Sans", sans-serif',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '20px'
                        }}
                      >
                        Exam: <span style={{ fontWeight: 700, color: '#f54900' }}>{daysUntilExam !== null ? `${daysUntilExam} Days` : 'Not scheduled'}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
              
              {/* Upcoming Course Card - PgMP */}
              <div
                className="transition-all hover:shadow-lg"
                style={{
                  backgroundColor: '#f9fafb',
                  border: '1.028px solid #e5e7eb',
                  borderRadius: '14px',
                  padding: '25px'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 
                      style={{
                        color: '#101828',
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '20px',
                        fontWeight: 700,
                        lineHeight: '28px',
                        marginBottom: '4px'
                      }}
                    >
                      PgMP Certification
                    </h3>
                    <p 
                      style={{
                        color: '#4a5565',
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '20px'
                      }}
                    >
                      Program Management Professional
                    </p>
                  </div>
                  <span 
                    style={{
                      backgroundColor: '#e5e7eb',
                      color: '#364153',
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: '16px',
                      padding: '3px 9px',
                      borderRadius: '8px'
                    }}
                  >
                    Upcoming
                  </span>
                </div>
                <p 
                  style={{
                    color: '#4a5565',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '20px'
                  }}
                >
                  Enrollment opens after PMP completion
                </p>
              </div>
              </>
            ) : (
              <div className="p-8 md:p-12 text-center">
                <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
                <p className="text-sm md:text-base text-gray-600 mb-6">
                  Start your learning journey by enrolling in a certification course
                </p>
                <button
                  onClick={() => navigate('/self-study-bundle')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                  Browse Courses
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div 
          style={{
            backgroundColor: '#ffffff',
            border: '1.028px solid #e5e7eb',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0px 10px 15px 0px rgba(0,0,0,0.1), 0px 4px 6px 0px rgba(0,0,0,0.1)'
          }}
        >
          <h2 
            className="mb-6"
            style={{
              color: '#101828',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '24px',
              fontWeight: 700,
              lineHeight: '32px'
            }}
          >
            📊 Recent Activity
          </h2>
          
          <div className="space-y-3">
            {/* Quiz Activity - Blue */}
            <div 
              className="flex items-center gap-4 px-4 py-3"
              style={{
                backgroundColor: '#eff6ff',
                border: '1.028px solid #bedbff',
                borderRadius: '10px'
              }}
            >
              <div 
                className="flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: '#2b7fff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%'
                }}
              >
                <span 
                  style={{
                    color: '#ffffff',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: '24px'
                  }}
                >
                  Q
                </span>
              </div>
              <div className="flex-1">
                <h4 
                  style={{
                    color: '#101828',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    marginBottom: '2px'
                  }}
                >
                  Completed Risk Management Quiz
                </h4>
                <p 
                  style={{
                    color: '#4a5565',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '20px'
                  }}
                >
                  Score: 72% • Feb 15, 2026
                </p>
              </div>
            </div>

            {/* Live Session Activity - Green */}
            <div 
              className="flex items-center gap-4 px-4 py-3"
              style={{
                backgroundColor: '#f0fdf4',
                border: '1.028px solid #b9f8cf',
                borderRadius: '10px'
              }}
            >
              <div 
                className="flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: '#00c950',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%'
                }}
              >
                <span 
                  style={{
                    color: '#ffffff',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: '24px'
                  }}
                >
                  L
                </span>
              </div>
              <div className="flex-1">
                <h4 
                  style={{
                    color: '#101828',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    marginBottom: '2px'
                  }}
                >
                  Attended Live Bootcamp Session
                </h4>
                <p 
                  style={{
                    color: '#4a5565',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '20px'
                  }}
                >
                  Stakeholder Management • Feb 14, 2026
                </p>
              </div>
            </div>

            {/* Instructor Feedback Activity - Purple */}
            <div 
              className="flex items-center gap-4 px-4 py-3"
              style={{
                backgroundColor: '#faf5ff',
                border: '1.028px solid #e9d4ff',
                borderRadius: '10px'
              }}
            >
              <div 
                className="flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: '#ad46ff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%'
                }}
              >
                <span 
                  style={{
                    color: '#ffffff',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: '24px'
                  }}
                >
                  I
                </span>
              </div>
              <div className="flex-1">
                <h4 
                  style={{
                    color: '#101828',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    marginBottom: '2px'
                  }}
                >
                  Received Instructor Feedback
                </h4>
                <p 
                  style={{
                    color: '#4a5565',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '20px'
                  }}
                >
                  Dr. Michael Chen • Feb 14, 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
