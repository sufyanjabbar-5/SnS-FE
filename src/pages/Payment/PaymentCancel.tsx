import React from 'react';
import { Link } from 'react-router-dom';
import { XIcon } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const PaymentCancel: React.FC = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-8 max-w-[800px] px-4">
          {/* Error Title */}
          <h1 
            className="text-[#0b1f3b] text-[40px] font-bold leading-[60px] text-center"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Payment Unsuccessful!
          </h1>

          {/* Error Icon */}
          <div className="relative flex items-center justify-center">
            <div className="bg-[#e74c3c] rounded-full flex items-center justify-center shadow-lg">
              <XIcon className="w-32 h-32 text-white p-4" strokeWidth={3} />
            </div>
          </div>

          {/* Error Message */}
          <div 
            className="text-[rgba(11,31,59,0.75)] text-[16px] text-center leading-[24px] mb-4"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            <p className="mb-2">
              Unfortunately, we couldn't process your payment at this time. Your enrollment has not been completed.
            </p>
            <p>
              Please try again or use a different payment method. If the issue persists, contact our support team for assistance.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              to="/"
              className="bg-gradient-to-b from-[#9aaed3] to-[#5b89b3] px-4 py-3 rounded-[6px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] text-[#dbebff] text-[14px] font-semibold text-center transition-opacity hover:opacity-90"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentCancel;
