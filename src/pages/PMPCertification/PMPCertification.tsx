import React, { useState } from 'react';
import './PMPCertification.css';

interface ClassSchedule {
    date: string;
    type: string;
    days: string;
    time: string;
    timezone: string;
    originalPrice: string;
    price: string;
    savings: string;
    soldOut: boolean;
    soldOutDate?: string;
    flashSale?: boolean;
    sellingFast?: boolean;
}

interface Testimonial {
    name: string;
    role: string;
    text: string;
    rating: number;
}

const PMPCertification: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Schedule & Pricing');

    const classSchedules: ClassSchedule[] = [
        {
            date: 'Mon, Jan 16, 2026',
            type: 'Weekend Class',
            days: '(Fri-Sat-Sun)',
            time: '7PM - 3AM',
            timezone: '(Asia/Karachi)',
            originalPrice: '$2,388',
            price: '$2,000 USD',
            savings: 'Save $300 Now',
            soldOut: true,
            soldOutDate: 'Sold Out till 22 Feb.'
        },
        {
            date: 'Mon, Jan 23, 2026',
            type: 'Weekend Class',
            days: '(Fri-Sat-Sun)',
            time: '8PM - 3AM',
            timezone: '(Asia/Karachi)',
            originalPrice: '$2,388',
            price: '$2,000 USD',
            savings: 'Save $400 Now',
            soldOut: true,
            soldOutDate: 'Sold Out till 22 Feb.'
        },
        {
            date: 'Mon, Jan 30, 2026',
            type: 'Weekend Class',
            days: '(Fri-Sat-Sun)',
            time: '10PM - 12AM',
            timezone: '(Asia/Karachi)',
            originalPrice: '$2,388',
            price: '$2,000 USD',
            savings: 'Save $400 Now',
            soldOut: true,
            soldOutDate: 'Sold Out till 22 Feb.'
        },
        {
            date: 'Tue, Feb 22, 2026',
            type: 'Weekend Class',
            days: '(Fri-Sat-Sun)',
            time: '6AM - 8AM',
            timezone: '(Asia/Karachi)',
            originalPrice: '$2,000',
            price: '$1500 USD',
            savings: 'Save $500 Now',
            soldOut: false,
            flashSale: true,
            sellingFast: true
        }
    ];

    const testimonials: Testimonial[] = [
        {
            name: 'Michael R.',
            role: 'Senior Project Manager',
            text: '"Excellent training! The instructor was knowledgeable and the materials were comprehensive. I passed my PMP exam on the first try!"',
            rating: 5
        },
        {
            name: 'Sarah T.',
            role: 'IT Project Lead',
            text: '"Best investment I made in my career. The online format was convenient and the support after the course was invaluable."',
            rating: 5
        },
        {
            name: 'David L.',
            role: 'Construction Manager',
            text: '"The practice exams and study materials were spot-on. I felt fully prepared for the exam. Highly recommend this training!"',
            rating: 5
        }
    ];

    return (
        <div className="pmp-certification-page">
            {/* Hero Section */}
            <section className="pmp-hero">
                <div className="pmp-hero-container">
                    <div className="pmp-hero-content">
                        {/* Left Side - Purple Triangle Badge */}
                        <div className="pmp-hero-left">
                            <div className="pmp-triangle-badge">
                                <div className="pmp-badge-text">PMP®</div>
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="pmp-hero-right">
                            <h1 className="pmp-hero-title">
                                Project Management Professional (PMP)®
                            </h1>

                            <div className="pmp-pricing-info">
                                <div className="pmp-pricing-item">
                                    <span className="pmp-pricing-label">Live Virtual Classes:</span>
                                    <span className="pmp-pricing-value">$2000</span>
                                </div>
                                <div className="pmp-pricing-item">
                                    <span className="pmp-pricing-label">Complete Self-Study Bundle:</span>
                                    <span className="pmp-pricing-value">$500</span>
                                </div>
                            </div>

                            <div className="pmp-hero-buttons">
                                <button className="pmp-btn pmp-btn-primary">Enroll Now</button>
                                <button className="pmp-btn pmp-btn-secondary">Buy Self Study Bundle</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tab Navigation */}
            <section className="pmp-tabs-section">
                <div className="pmp-tabs-container">
                    <div className="pmp-tabs">
                        {['Class Overview', 'Schedule & Pricing', 'Included With Class', 'Our Guarantee'].map((tab) => (
                            <button
                                key={tab}
                                className={`pmp-tab ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Schedule & Pricing Content */}
            {activeTab === 'Schedule & Pricing' && (
                <>
                    <section className="pmp-schedule-pricing">
                        <div className="pmp-schedule-container">
                            <h2 className="pmp-section-title">Live Virtual PMP Class Schedule and Pricing</h2>

                            <div className="pmp-features-section">
                                {/* Features Grid */}
                                <div className="pmp-features-grid">
                                    <div className="pmp-feature">
                                        <div className="pmp-feature-icon">
                                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                                                <circle cx="25" cy="25" r="25" fill="#E0F2FE" />
                                                <path d="M25 15L30 20L25 25L20 20L25 15Z" fill="#0284C7" />
                                            </svg>
                                        </div>
                                        <div className="pmp-feature-text">
                                            <p>Money back guarantee</p>
                                            <p>included with every class</p>
                                            <p>offered</p>
                                        </div>
                                    </div>

                                    <div className="pmp-feature">
                                        <div className="pmp-feature-icon">
                                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                                                <circle cx="25" cy="25" r="25" fill="#E0F2FE" />
                                                <rect x="15" y="18" width="20" height="14" rx="2" fill="#0284C7" />
                                            </svg>
                                        </div>
                                        <div className="pmp-feature-text">
                                            <p>Instant email confirmation</p>
                                            <p>and class enrollment after</p>
                                            <p>checkout</p>
                                        </div>
                                    </div>

                                    <div className="pmp-feature">
                                        <div className="pmp-feature-icon">
                                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                                                <circle cx="25" cy="25" r="25" fill="#E0F2FE" />
                                                <rect x="18" y="15" width="14" height="20" rx="2" fill="#0284C7" />
                                            </svg>
                                        </div>
                                        <div className="pmp-feature-text">
                                            <p>Attend live classes</p>
                                            <p>from any web browser or</p>
                                            <p>connected device</p>
                                        </div>
                                    </div>

                                    <div className="pmp-feature">
                                        <div className="pmp-feature-icon">
                                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                                                <circle cx="25" cy="25" r="25" fill="#E0F2FE" />
                                                <circle cx="25" cy="22" r="6" fill="#0284C7" />
                                                <path d="M15 35C15 30 19 28 25 28C31 28 35 30 35 35" fill="#0284C7" />
                                            </svg>
                                        </div>
                                        <div className="pmp-feature-text">
                                            <p>Includes class materials</p>
                                            <p>from the Project Management</p>
                                            <p>Institute (PMI)®, practice exam</p>
                                            <p>portal, 35 Contact Hours, and</p>
                                            <p>much <span className="pmp-link">more</span></p>
                                        </div>
                                    </div>
                                </div>

                                {/* Reviews and Image */}
                                <div className="pmp-reviews-section">
                                    <div className="pmp-reviews-header">
                                        <span className="pmp-reviews-label">Reviews:</span>
                                        <div className="pmp-stars">★★★★★</div>
                                    </div>
                                    <div className="pmp-class-image">
                                        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop" alt="PMP Training Class" />
                                    </div>
                                </div>
                            </div>

                            {/* Class Schedule Listings */}
                            <div className="pmp-schedule-header">
                                <div className="pmp-schedule-filters">
                                    <div className="pmp-timezone-selector">
                                        <label>Time zone:</label>
                                        <select>
                                            <option>(GMT+05:00) Asia/Karachi</option>
                                        </select>
                                    </div>
                                    <div className="pmp-filter-group">
                                        <select>
                                            <option>Any day</option>
                                        </select>
                                        <select>
                                            <option>Any time</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="pmp-schedule-actions">
                                    <a href="#" className="pmp-action-link">Enroll Multiple students</a>
                                    <span className="pmp-separator">|</span>
                                    <a href="#" className="pmp-action-link">Request Private Class for your Team</a>
                                </div>
                                <div className="pmp-sort">
                                    <select>
                                        <option>Sort by Start Date</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pmp-class-listings">
                                {classSchedules.map((schedule, index) => (
                                    <div key={index} className="pmp-class-card">
                                        <div className="pmp-class-info">
                                            <div className="pmp-class-date">
                                                <strong>{schedule.date}</strong>
                                                <a href="#" className="pmp-class-details-link">Class details →</a>
                                            </div>
                                            <div className="pmp-class-type">
                                                <span className="pmp-icon">📅</span>
                                                <div>
                                                    <div>{schedule.type}</div>
                                                    <div className="pmp-class-days">{schedule.days}</div>
                                                </div>
                                            </div>
                                            <div className="pmp-class-time">
                                                <span className="pmp-icon">🕐</span>
                                                <div>
                                                    <div>{schedule.time}</div>
                                                    <div className="pmp-class-timezone">{schedule.timezone}</div>
                                                </div>
                                            </div>
                                            <div className="pmp-class-pricing">
                                                <div className="pmp-savings">{schedule.savings}</div>
                                                <div className="pmp-original-price">{schedule.originalPrice}</div>
                                                <div className="pmp-current-price">{schedule.price}</div>
                                            </div>
                                        </div>
                                        <div className="pmp-class-action">
                                            {schedule.soldOut ? (
                                                <div className="pmp-sold-out-section">
                                                    <button className="pmp-btn pmp-btn-sold-out">Sold out →</button>
                                                    <div className="pmp-sold-out-date">{schedule.soldOutDate}</div>
                                                </div>
                                            ) : (
                                                <div className="pmp-enroll-section">
                                                    {schedule.flashSale && (
                                                        <div className="pmp-flash-sale">
                                                            <div className="pmp-flash-badge">FLASH SALE</div>
                                                            <div className="pmp-flash-details">
                                                                <div>{schedule.savings}</div>
                                                                <div className="pmp-flash-price">
                                                                    <span className="pmp-original">{schedule.originalPrice}</span>
                                                                    <span className="pmp-sale-price">{schedule.price}</span>
                                                                </div>
                                                                <div className="pmp-flash-end">SALE ENDS: JAN 5th</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <button className="pmp-btn pmp-btn-enroll">
                                                        Enroll now →
                                                        {schedule.sellingFast && <div className="pmp-selling-fast">⏱️ Selling Fast</div>}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Money Back Guarantee Section */}
                    <section className="pmp-guarantee-section">
                        <div className="pmp-guarantee-container">
                            <h3 className="pmp-guarantee-title">OUR MONEY BACK GUARANTEE 3</h3>
                            <ul className="pmp-guarantee-list">
                                <li>Pass the PMP exam after completing a PMI Training Live Online Class with these simple requirements.</li>
                                <li>If you do not pass the PMP exam in three attempts, we will refund your entire class enrollment fee, provided all exam attempts occurred within 120 calendar days of your PMTraining class concluding</li>
                                <li>You must attend your PMP certification class in full</li>
                                <li>You must complete all assigned practice exams and quizzes in your student portal and receive your Certificate of Completion (COC) prior to your first exam attempt</li>
                            </ul>
                        </div>
                    </section>
                </>
            )}

            {/* Testimonials Section */}
            <section className="pmp-testimonials">
                <div className="pmp-testimonials-container">
                    <h2 className="pmp-testimonials-title">What Our Students Say</h2>
                    <div className="pmp-testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="pmp-testimonial-card">
                                <div className="pmp-testimonial-stars">
                                    {'★'.repeat(testimonial.rating)}
                                </div>
                                <p className="pmp-testimonial-text">{testimonial.text}</p>
                                <div className="pmp-testimonial-author">
                                    <strong className="pmp-testimonial-name">{testimonial.name}</strong>
                                    <span className="pmp-testimonial-role">{testimonial.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="pmp-cta">
                <div className="pmp-cta-container">
                    <h2 className="pmp-cta-title">Ready to Start Your PMP Journey?</h2>
                    <p className="pmp-cta-subtitle">Join our next class and take the first step toward certification</p>
                    <button className="pmp-btn pmp-btn-cta">View Available Classes</button>
                </div>
            </section>

            {/* Footer */}
            <footer className="pmp-footer">
                <div className="pmp-footer-container">
                    <div className="pmp-footer-grid">
                        <div className="pmp-footer-column">
                            <h4 className="pmp-footer-heading">About SnSCCS</h4>
                            <p className="pmp-footer-text">
                                Leading provider of PMP certification training with over 15 years of experience.
                            </p>
                            <div className="pmp-footer-social">
                                <a href="#" className="pmp-social-link">f</a>
                                <a href="#" className="pmp-social-link">𝕏</a>
                                <a href="#" className="pmp-social-link">in</a>
                                <a href="#" className="pmp-social-link">▶</a>
                            </div>
                        </div>

                        <div className="pmp-footer-column">
                            <h4 className="pmp-footer-heading">Quick Links</h4>
                            <ul className="pmp-footer-links">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Class Schedule</a></li>
                                <li><a href="#">Cart</a></li>
                                <li><a href="#">Login</a></li>
                            </ul>
                        </div>

                        <div className="pmp-footer-column">
                            <h4 className="pmp-footer-heading">Certifications</h4>
                            <ul className="pmp-footer-links">
                                <li><a href="#">PMP Certification</a></li>
                                <li><a href="#">CAPM Certification</a></li>
                                <li><a href="#">PMI-ACP</a></li>
                                <li><a href="#">PgMP Certification</a></li>
                            </ul>
                        </div>

                        <div className="pmp-footer-column">
                            <h4 className="pmp-footer-heading">Contact Us</h4>
                            <ul className="pmp-footer-contact">
                                <li>📞 1-800-PMI-TRAIN</li>
                                <li>✉️ info@snsccs.com</li>
                                <li>📍 123 Training St, Education City</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pmp-footer-bottom">
                        <p>© 2025 SnSCCS. All rights reserved.</p>
                        <div className="pmp-footer-legal">
                            <a href="#">Privacy Policy</a>
                            <span>•</span>
                            <a href="#">Terms of Service</a>
                            <span>•</span>
                            <a href="#">Refund Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PMPCertification;
