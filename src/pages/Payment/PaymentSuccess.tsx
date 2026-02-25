import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// Figma asset
const imgImage27 = "/assets/images/a137bf2f-ca79-4982-ba0b-a9e954a9ae4f.png";

const PaymentSuccess: React.FC = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  const userName = user ? `${user.firstName} ${user.lastName}` : "Student";
  const userEmail = user?.email || "your email";

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-8 max-w-[800px] px-4">
          {/* Success Title */}
          <h1 
            className="text-[#0b1f3b] text-[40px] font-bold leading-[60px] text-center"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Payment Successful!
          </h1>

          {/* Success Icon/Image */}
          <div className="relative w-[406px] h-[274px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img 
                alt="Payment Success" 
                className="absolute max-w-none"
                src={imgImage27}
                style={{
                  height: '148.18%',
                  left: '-0.12%',
                  top: '-24.09%',
                  width: '100%'
                }}
              />
            </div>
          </div>

          {/* Success Message */}
          <div 
            className="text-[#0b1f3b] text-[16px] text-center mb-4"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            <p className="mb-0">
              <span className="font-semibold leading-[24px]">
                Thank you for enrolling, {userName}!{' '}
              </span>
              <span className="leading-[24px]">– </span>
              <span className="text-[rgba(11,31,59,0.75)] leading-[24px]">
                We've sent a confirmation
              </span>
            </p>
            <p>
              <span className="text-[rgba(11,31,59,0.75)] leading-[24px]">
                email to{' '}
              </span>
              <span className="font-bold text-[#0b1f3b] leading-[24px]">
                {userEmail}
              </span>
              <span className="text-[rgba(11,31,59,0.75)] leading-[24px]">
                {' '}with your course access details and login credentials.
              </span>
            </p>
          </div>

          {/* Back to Dashboard Button */}
          <Link
            to="/student/dashboard"
            className="bg-gradient-to-b from-[#9aaed3] to-[#5b89b3] px-4 py-3 rounded-[6px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] text-[#dbebff] text-[14px] font-semibold text-center transition-opacity hover:opacity-90"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Go to Dashboard
          </Link>

          {/* What's Next Section */}
          <div className="bg-[rgba(194,221,255,0.25)] rounded-[24px] p-6 mt-8 w-full">
            <h2 
              className="text-[#0b1f3b] text-[24px] font-bold leading-[60px] text-center mb-4"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              What's Next?
            </h2>

            <div className="flex gap-10 items-start justify-center flex-wrap">
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-3 max-w-[200px]">
                <div className="bg-[#60a5fa] rounded-full w-[28px] h-[28px] flex items-center justify-center">
                  <span 
                    className="text-white text-[14px] font-semibold opacity-75"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    1
                  </span>
                </div>
                <p 
                  className="text-[#0b1f3b] text-[14px] opacity-75 text-center leading-[20px]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Check your email for login credentials
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-3 max-w-[200px]">
                <div className="bg-[#60a5fa] rounded-full w-[28px] h-[28px] flex items-center justify-center">
                  <span 
                    className="text-white text-[14px] font-semibold opacity-75"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    2
                  </span>
                </div>
                <p 
                  className="text-[#0b1f3b] text-[14px] opacity-75 text-center leading-[20px]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Access your course materials instantly
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-3 max-w-[200px]">
                <div className="bg-[#60a5fa] rounded-full w-[28px] h-[28px] flex items-center justify-center">
                  <span 
                    className="text-white text-[14px] font-semibold opacity-75"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    3
                  </span>
                </div>
                <p 
                  className="text-[#0b1f3b] text-[14px] opacity-75 text-center leading-[20px]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Join your first class on the scheduled date
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
