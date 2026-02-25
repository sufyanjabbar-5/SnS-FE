import { Link } from 'react-router-dom';
import { useCertifications } from '../../context/CertificationContext';
import { Award, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import './Footer.css';

import React from 'react';

const Footer: React.FC = () => {
  const { appInfo: settings, certifications } = useCertifications();

  const corePrograms = certifications.slice(0, 3);
  const skillPrograms = certifications.slice(3);

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/logo.png" alt={settings?.siteName || 'Logo'} />
            </Link>
            <p className="footer-description">
              {settings?.siteDescription || ''}
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/self-study-bundle">Classes</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
              <li><Link to="/#faqs">FAQs</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Core Programs Column */}
          <div className="footer-links-col">
            <h4>Core Programs</h4>
            <ul>
              {corePrograms.map(prog => (
                <li key={prog.id}><Link to={`/${prog.slug}`}>{prog.shortName}</Link></li>
              ))}
            </ul>
          </div>

          {/* Skill Programs Column */}
          <div className="footer-links-col">
            <h4>Skill Programs</h4>
            <ul>
              {skillPrograms.map(prog => (
                <li key={prog.id}><Link to={`/${prog.slug}`}>{prog.shortName}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-contact-col">
            <h4>Contact Us</h4>
            <ul className="contact-list">
              <li>
                <MapPin size={18} className="icon-blue" />
                <span>{settings?.address || ''}</span>
              </li>
              <li>
                <Mail size={18} className="icon-blue" />
                <span>{settings?.contactEmail || ''}</span>
              </li>
              <li>
                <Phone size={18} className="icon-blue" />
                <span>{settings?.phone || ''}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Info & Social Row */}
        <div className="footer-corporate-row">
          <div className="corporate-text">
            <span>Corporate Name: {settings?.corporateName || ''}</span>
            <span className="divider">|</span>
            <span>Corporation Number: {settings?.corporationNumber || ''}</span>
          </div>
          <div className="footer-social-icons">
            {settings.instagramUrl && <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer"><img src="/prime_instagram.png" alt="Instagram" className="social-img-icon" /></a>}
            {settings.facebookUrl && <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer"><img src="/prime_facebook.png" alt="Facebook" className="social-img-icon" /></a>}
            {settings.linkedinUrl && <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer"><img src="/prime_linkedin.png" alt="LinkedIn" className="social-img-icon" /></a>}
            {settings.twitterUrl && <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer"><img src="/prime_twitter.png" alt="Twitter" className="social-img-icon" /></a>}
            {settings.youtubeUrl && <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer"><img src="/prime_youtube.png" alt="YouTube" className="social-img-icon" /></a>}
            {settings.whatsappUrl && <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer"><img src="/prime_whatsapp.png" alt="WhatsApp" className="social-img-icon" /></a>}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
          <div className="footer-legal-links">
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
            <span className="divider">|</span>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
