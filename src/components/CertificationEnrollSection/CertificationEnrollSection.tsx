import React from 'react';
import './CertificationEnrollSection.css';

interface CertificationEnrollSectionProps {
    title: string;
    iconType: 'pmp' | 'cpmai';
    livePrice: number;
    selfStudyPrice: number;
    onEnrollClick?: () => void;
    onBuySelfStudyClick?: () => void;
    onScheduleClick?: () => void;
    backgroundColorPMP?: string;
    backgroundColorCPMAI?: string;
}

const CertificationEnrollSection: React.FC<CertificationEnrollSectionProps> = ({
    title,
    iconType,
    livePrice,
    selfStudyPrice,
    onBuySelfStudyClick = () => console.log('Buy self study clicked'),
    onScheduleClick = () => console.log('Schedule clicked'),
    backgroundColorPMP = 'linear-gradient(180deg, #051C22 0%, #230A49 100%)',
    backgroundColorCPMAI = 'linear-gradient(0deg, #023C51 0%, #04101F 100%)'
}) => {
    return (
        <section className="cert-enroll-section" style={{ background: iconType === 'pmp' ? backgroundColorPMP : backgroundColorCPMAI }}>
            <div className="cert-enroll-container">
                {/* Icon/Logo */}
                <div className="cert-icon">
                    <img src={iconType === 'pmp' ? '/PMP-Icon.png' : '/PMI-CPMAI-icon.png'} alt={iconType === 'pmp' ? 'PMP' : 'PMI-CPMAI'} />
                </div>

                {/* Content */}
                <div className="cert-enroll-content text-center align-center">
                    <h2 className="cert-enroll-title">{title}</h2>

                    <div className="cert-pricing-row">
                        <div className="cert-price-item">
                            <p className="cert-price-label">Live Virtual Classes:</p>
                            <p className="cert-price-value">${livePrice}</p>
                        </div>
                        <div className="cert-price-item">
                            <p className="cert-price-label">Complete Self-Study Bundle:</p>
                            <p className="cert-price-value">${selfStudyPrice}</p>
                        </div>
                    </div>

                    <div className="cert-buttons-row">
                        <button className="cert-btn cert-btn-schedule" onClick={onScheduleClick}>
                            Schedule & Pricing
                        </button>
                        <button className="cert-btn cert-btn-secondary" onClick={onBuySelfStudyClick}>
                            Buy Self Study Bundle
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CertificationEnrollSection;
