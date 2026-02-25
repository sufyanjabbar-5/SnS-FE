import React from 'react';
import './ScheduleCard.css';

interface ScheduleCardProps {
  date: string;
  type: string;
  days?: string;
  time: string;
  price: string;
  originalPrice?: string;
  savings?: string;
  saleEndDate?: string;
  soldOut?: boolean;
  sellingFast?: boolean;
  isFlashSale?: boolean;
  highlighted?: boolean;
  onEnroll?: () => void;
  onViewDetails?: () => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  date,
  type,
  days,
  time,
  price,
  originalPrice,
  savings,
  saleEndDate,
  soldOut = false,
  sellingFast = false,
  isFlashSale = false,
  highlighted = false,
  onEnroll = () => {},
  onViewDetails = () => {}
}) => {
  return (
    <div className={`schedule-card ${highlighted ? 'schedule-card--highlighted' : ''}`}>
      <div className="schedule-card__content">
        {/* Date */}
        <div className="schedule-card__date">
          <h3 className="schedule-card__date-text">{date}</h3>
          <button 
            className="schedule-card__details-link"
            onClick={onViewDetails}
          >
            Class details
            <svg 
              width="24" 
              height="29" 
              viewBox="0 0 24 29" 
              fill="none" 
              className="schedule-card__arrow-icon"
            >
              <path 
                d="M12 4.5L12 24.5M12 24.5L20 16.5M12 24.5L4 16.5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Schedule Info */}
        <div className="schedule-card__info">
          <div className="schedule-card__info-item">
            <svg 
              width="24" 
              height="29" 
              viewBox="0 0 24 29" 
              fill="none" 
              className="schedule-card__icon"
            >
              <rect x="3" y="6.5" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M3 10.5H21" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 4.5V8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16 4.5V8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="schedule-card__info-text">
              <p className="schedule-card__type">{type}</p>
              <p className="schedule-card__days">{days}</p>
            </div>
          </div>

          <div className="schedule-card__info-item">
            <svg 
              width="24" 
              height="29" 
              viewBox="0 0 24 29" 
              fill="none" 
              className="schedule-card__icon"
            >
              <circle cx="12" cy="14.5" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 10.5V14.5L15 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="schedule-card__info-text">
              <p className="schedule-card__time">{time}</p>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="schedule-card__price-section">
          {savings && isFlashSale ? (
            <div className="schedule-card__sale-box">
              <div className="schedule-card__sale-header">
                <span className="schedule-card__sale-badge">FLASH SALE</span>
              </div>
              <p className="schedule-card__save-text">{savings}</p>
              <div className="schedule-card__price-row">
                <span className="schedule-card__original-price">{originalPrice}</span>
                <span className="schedule-card__sale-price">{price}</span>
              </div>
              {saleEndDate && (
                <p className="schedule-card__sale-end">SALE ENDS {saleEndDate}</p>
              )}
            </div>
          ) : (
            <div className="schedule-card__price">
              <span className="schedule-card__price-text">{price}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="schedule-card__actions">
          {soldOut ? (
            <button className="schedule-card__button schedule-card__button--soldout" disabled>
              Sold out
              <svg 
                width="24" 
                height="29" 
                viewBox="0 0 24 29" 
                fill="none" 
                className="schedule-card__button-icon"
              >
                <path 
                  d="M9 14.5L12 17.5L20 9.5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <button 
              className="schedule-card__button schedule-card__button--enroll"
              onClick={onEnroll}
            >
              Enroll now
              <svg 
                width="24" 
                height="29" 
                viewBox="0 0 24 29" 
                fill="none" 
                className="schedule-card__button-icon"
              >
                <path 
                  d="M5 14.5H19M19 14.5L12 7.5M19 14.5L12 21.5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          
          {sellingFast && !soldOut && (
            <div className="schedule-card__selling-fast">
              <svg 
                width="24" 
                height="25" 
                viewBox="0 0 24 25" 
                fill="none" 
                className="schedule-card__fire-icon"
              >
                <path 
                  d="M12 2.5C12 2.5 7 7.5 7 12.5C7 15.26 9.24 17.5 12 17.5C14.76 17.5 17 15.26 17 12.5C17 7.5 12 2.5 12 2.5Z" 
                  fill="#A94442"
                  stroke="#A94442" 
                  strokeWidth="2"
                />
              </svg>
              <span className="schedule-card__selling-fast-text">Selling Fast</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
