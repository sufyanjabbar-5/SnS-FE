import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyProvider';
import { useCertifications } from '../../context/CertificationContext';

// Figma image assets
const imgImage32 = "https://www.figma.com/api/mcp/asset/0e0b3ab0-1bbd-42b8-b92b-61b6ec1657e1";
const imgIcon = "https://www.figma.com/api/mcp/asset/e73965b8-30ec-4709-96f8-37ea32df9047";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/98977d84-f1c1-484d-9679-b5a6b1b11b97";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/14ea0363-5b85-41cb-8aab-3885c91077ed";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/ac181860-46e1-47aa-9f18-3f29eb3e2ed2";

const UpcomingBatches = () => {
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const { upcomingBatches: batches, loading } = useCertifications();

  if (loading) return <div className="py-20 text-center">Loading upcoming batches...</div>;
  if (batches.length === 0) return null;

  return (
    <section className="relative bg-white py-14 sm:py-20 px-6 md:px-[100px]">
      <div className="max-w-[1920px] mx-auto relative">
        {/* Header */}
        <div className="text-center mb-[48px]">
          <h2 
            className="font-['DM_Sans'] font-bold text-[30px] leading-[34px] md:text-[32px] lg:text-[40px] lg:leading-[40px] text-[#1f3a5f] mb-4"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Upcoming Batches
          </h2>
          <p 
            className="font-['DM_Sans'] font-normal text-[16px] leading-[24px] md:text-lg lg:text-[20px] lg:leading-[28px] text-[#0b1f3b] max-w-[669px] mx-auto"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Choose a schedule that fits your availability. Limited seats available!
          </p>
        </div>

        {/* Batches Grid */}
        <div className="flex flex-wrap gap-5 mb-12">
          {batches.slice(0, 2).map((batch, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-[rgba(154,174,211,0.25)] rounded-[14px] p-5 md:p-8 lg:p-[42px] flex-shrink-0 w-full md:w-[calc(50%-10px)] relative hover:shadow-lg transition-shadow"
            >
              {/* Badge Image - Top Right */}
              <div className="hidden sm:block absolute right-7 top-7 w-20 h-20">
                <img src={imgImage32} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Card Content */}
              <div className="w-full max-w-[496px]">
                {/* Tags */}
                <div className="flex gap-2 mb-6">
                  <div className="bg-[#230a4a] px-2 sm:px-3 h-[26px] sm:h-[30px] rounded-full shadow-sm flex items-center">
                    <p 
                      className="font-['DM_Sans'] font-semibold text-[10px] sm:text-[14px] leading-[14px] sm:leading-[16px] text-white whitespace-nowrap"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      {batch.certification?.shortName || 'PMP'} Certification
                    </p>
                  </div>
                  <div className="bg-[#60a5fa] border border-[rgba(194,221,255,0.25)] px-2 sm:px-3 h-[26px] sm:h-[30px] rounded-full shadow-sm flex items-center">
                    <p 
                      className="font-['DM_Sans'] font-semibold text-[10px] sm:text-[14px] leading-[14px] sm:leading-[16px] text-white whitespace-nowrap"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      Live Bootcamp
                    </p>
                  </div>
                </div>

                {/* Title */}
                <h3 
                  className="font-['DM_Sans'] font-semibold text-[20px] leading-[28px] md:text-[22px] lg:text-[24px] lg:leading-[32px] text-[#1f3a5f] mb-6"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Weekend Class (Fri-Sat-Sun)
                </h3>

                {/* Details */}
                <div className="flex flex-col gap-4 mb-6">
                  {/* Duration */}
                  <div className="flex gap-8 items-start">
                    <img src={imgIcon} alt="" className="w-5 h-5 mt-0.5" />
                    <div className="flex-1">
                      <p 
                        className="font-['DM_Sans'] font-semibold text-[14px] leading-[20px] text-[#0b1f3b] mb-1"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        Duration
                      </p>
                      <p 
                        className="font-['DM_Sans'] font-normal text-[16px] leading-[24px] text-[rgba(11,31,59,0.75)]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        {batch.startDate ? new Date(batch.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Loading...'}
                      </p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="flex gap-8 items-start">
                    <img src={imgIcon1} alt="" className="w-5 h-5 mt-0.5" />
                    <div className="flex-1">
                      <p 
                        className="font-['DM_Sans'] font-semibold text-[14px] leading-[20px] text-[#0b1f3b] mb-1"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        Schedule
                      </p>
                      <p 
                        className="font-['DM_Sans'] font-normal text-[16px] leading-[24px] text-[rgba(11,31,59,0.75)]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        {batch.timeRange || '9:00 AM–5:00 PM'}
                      </p>
                    </div>
                  </div>

                  {/* Seats Available */}
                  <div className="flex gap-8 items-start">
                    <img src={imgIcon2} alt="" className="w-5 h-5 mt-0.5" />
                    <div className="flex-1">
                      <p 
                        className="font-['DM_Sans'] font-semibold text-[14px] leading-[20px] text-[#0b1f3b] mb-1"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        Seats Available
                      </p>
                      <p 
                        className="font-['DM_Sans'] font-normal text-[16px] leading-[24px] text-[rgba(11,31,59,0.75)]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        {batch.seatsTotal !== undefined ? `${batch.seatsTotal - (batch.seatsBooked || 0)} out of ${batch.seatsTotal}` : 'Loading...'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer - Button and Price */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Enroll Button */}
                  <button
                    onClick={() => {
                      const slug = batch.certification?.slug;
                      if (slug) {
                        navigate(`/${slug}?batch=${batch.id}&source=live-virtual`);
                      }
                    }}
                    className="h-12 w-full px-4 sm:px-10 rounded-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
                    style={{ 
                      backgroundImage: "linear-gradient(180deg, rgb(154, 174, 211) 0%, rgb(91, 137, 179) 100%)" 
                    }}
                  >
                    <img src={imgIcon3} alt="" className="w-4 h-4" />
                    <span 
                      className="font-['DM_Sans'] font-semibold text-[16px] sm:text-[18px] leading-[28px] text-[#dbebff]"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      Enroll in This Batch
                    </span>
                  </button>

                  {/* Price */}
                  <div className="flex flex-col items-end justify-center min-w-[120px]">
                    <div className="flex flex-col items-end">
                      {batch.certification?.offerings?.[0]?.originalPrice && 
                       Number(batch.certification.offerings[0].originalPrice) > Number(batch.certification.offerings[0].price) && (
                        <p 
                          className="font-['DM_Sans'] font-semibold text-[18px] leading-[24px] text-[#0b1f3b] opacity-40 line-through decoration-1"
                          style={{ 
                            fontVariationSettings: "'opsz' 14",
                            textDecorationSkipInk: 'none'
                          }}
                        >
                          {formatPrice(batch.certification.offerings[0].originalPrice)}
                        </p>
                      )}
                      <p 
                        className="font-['DM_Sans'] font-semibold text-[28px] leading-[32px] md:text-[30px] lg:text-[32px] sm:leading-[36px] text-[#60a5fa] mt-1"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        {batch.certification?.offerings?.[0] 
                          ? formatPrice(batch.certification.offerings[0].price)
                          : formatPrice(1000)}
                      </p>
                    </div>
                    <p 
                      className="font-['DM_Sans'] font-normal text-[14px] leading-[20px] text-[rgba(11,31,59,0.75)] mt-1"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      one-time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <p 
          className="font-['DM_Sans'] font-medium text-[14px] leading-[22px] sm:text-[16px] sm:leading-[24px] text-[#0b1f3b] text-center"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          All batches include 35 PDUs • 4 Exam Simulation • 6 months support • Lifetime recordings
        </p>
      </div>
    </section>
  );
};

export default UpcomingBatches;
