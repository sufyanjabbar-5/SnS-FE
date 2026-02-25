import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyProvider';
import { useCertifications } from '../../context/CertificationContext';
import './Header.css';

const Header: React.FC = () => {
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const itemCount = getItemCount();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { selectedCurrency, setSelectedCurrency, currencies } = useCurrency();
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const { certifications, appInfo: settings } = useCertifications();
  const currencyRef = useRef<HTMLDivElement>(null);

  // Check if user is logged in
  const token = localStorage.getItem('access_token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isLoggedIn = !!token && !!user;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setCurrencyDropdownOpen(false);
      }
    };
    if (currencyDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [currencyDropdownOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleCurrencyDropdown = () => setCurrencyDropdownOpen(!currencyDropdownOpen);
  const handleCurrencySelect = (currency: any) => {
    setSelectedCurrency(currency);
    setCurrencyDropdownOpen(false);
  };

  // Helper function to get course slug
  const getCourseSlug = (courseName: string): string => {
    const slugMap: { [key: string]: string } = {
      'PMP': 'pmp',
      'PMI-PgMP': 'pgmp',
      'PMI-ACP': 'acp',
      'PMI-RMP': 'rmp',
      'PMI-CPMAI': 'cpmai',
      'PMI-PfMP': 'pfmp',
      'PMI-PMOCP': 'pmocp',
      'PMI-PBA': 'pba'
    };
    return slugMap[courseName] || courseName.toLowerCase().replace(/\s+/g, '-');
  };

  // Dynamic navigation items
  const bootcampItems = certifications.length > 0
    ? certifications
        .filter(c => c.offerings?.some(o => o.type === 'live_bootcamp'))
        .map(c => ({ label: c.shortName, path: `/live-bootcamp/${getCourseSlug(c.shortName)}` }))
    : [
        { label: 'PMP', path: '/live-bootcamp/pmp' },
        { label: 'PMI-PgMP', path: '/live-bootcamp/pgmp' },
        { label: 'PMI-ACP', path: '/live-bootcamp/acp' },
        { label: 'PMI-RMP', path: '/live-bootcamp/rmp' },
        { label: 'PMI-CPMAI', path: '/live-bootcamp/cpmai' },
        { label: 'PMI-PfMP', path: '/live-bootcamp/pfmp' }
      ];

  const selfStudyItems = certifications.length > 0
    ? certifications
        .filter(c => c.offerings?.some(o => o.type === 'self_study'))
        .map(c => ({ label: c.shortName, path: `/self-study-bundle` }))
    : [
        { label: 'PMP', path: '/self-study-bundle' },
        { label: 'PMI-PgMP', path: '/self-study-bundle' },
        { label: 'PMI-ACP', path: '/self-study-bundle' },
        { label: 'PMI-RMP', path: '/self-study-bundle' },
        { label: 'PMI-CPMAI', path: '/self-study-bundle' },
        { label: 'PMI-PfMP', path: '/self-study-bundle' },
        { label: 'PMI-PMOCP', path: '/self-study-bundle' },
        { label: 'PMI-PBA', path: '/self-study-bundle/pba' }
      ]; 
    // Usually self-study bundle page shows all, but user might want specific.
    // Given the prompt: "Complete Self-Study Bundle (No schedule one time payment for specific period on /self-study-bundle page)"

  const navItems = [
    { 
      label: "Live Bootcamp", 
      hasDropdown: true, 
      path: "/live-bootcamp/pmp",
      items: bootcampItems 
    },
    { 
      label: "Complete Self-Study Bundle", 
      hasDropdown: true, 
      path: "/self-study-bundle",
      items: selfStudyItems 
    },
    { label: "Corporate Training", path: "/corporate-training", hideOnMobile: false },
    { label: "One on One Training", path: "/one-on-one-training", hideOnMobile: false },
  ];

  return (
    <header className="site-header">
      {/* Top Bar */}
      <div className="header-top-bar">
        <div className="header-container">
          <div className="top-bar-left">
            <a href={`tel:${settings?.phone?.replace(/[^0-9+]/g, '') || ''}`} className="top-bar-link">
              <i className="fas fa-phone"></i> {settings?.phone || 'Loading...'}
            </a>
            <span className="separator">|</span>
            <a href={`mailto:${settings?.contactEmail || ''}`} className="top-bar-link">
              <i className="fas fa-envelope"></i> {settings?.contactEmail || ''}
            </a>
          </div>

          <div className="top-bar-center">
            <div className="social-links">
              <a href={settings?.facebookUrl || '#'} target="_blank" rel="noopener noreferrer"><img src="/prime_facebook.png" alt="Facebook" /></a>
              <a href={settings?.instagramUrl || '#'} target="_blank" rel="noopener noreferrer"><img src="/prime_instagram.png" alt="Instagram" /></a>
              <a href={settings?.linkedinUrl || '#'} target="_blank" rel="noopener noreferrer"><img src="/prime_linkedin.png" alt="LinkedIn" /></a>
              <a href={settings?.twitterUrl || '#'} target="_blank" rel="noopener noreferrer"><img src="/prime_twitter.png" alt="Twitter" /></a>
              <a href={settings?.youtubeUrl || '#'} target="_blank" rel="noopener noreferrer"><img src="/prime_youtube.png" alt="YouTube" /></a>
              <a href={settings?.whatsappUrl || '#'} target="_blank" rel="noopener noreferrer"><img src="/prime_whatsapp.png" alt="WhatsApp" /></a>
            </div>
          </div>

          <div className="top-bar-right">
            <nav className="top-nav">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact#support">Support</Link>
              <Link to="/contact#ready-to-start">Contact</Link>
            </nav>
            <div className="currency-selector" ref={currencyRef}>
              <button className="currency-toggle" onClick={toggleCurrencyDropdown}>
                <span className="flag">{selectedCurrency.flag}</span>
                <span className="code">{selectedCurrency.code}</span>
                <i className={`fas fa-chevron-down ${currencyDropdownOpen ? 'open' : ''}`}></i>
              </button>
              {currencyDropdownOpen && (
                <div className="currency-dropdown">
                  {currencies.map(c => (
                    <button key={c.code} onClick={() => handleCurrencySelect(c)}>
                      {c.flag} {c.code}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="header-main-nav">
        <div className="header-container">
          <Link to="/" className="header-logo">
            <img src="/logo.png" alt={settings?.siteName || 'Logo'} />
          </Link>

          <nav className="desktop-nav">
            <ul className="nav-list">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className={`nav-item ${item.hasDropdown ? 'has-dropdown' : ''}`}
                  onMouseEnter={() => item.hasDropdown && setOpenDropdown(index)}
                  onMouseLeave={() => item.hasDropdown && setOpenDropdown(null)}
                >
                  <Link 
                    to={item.path || '#'} 
                    className="nav-link"
                    onClick={(e) => !item.path && e.preventDefault()}
                  >
                    {item.label} {item.hasDropdown && <i className="fas fa-chevron-down"></i>}
                  </Link>
                  {item.hasDropdown && openDropdown === index && (
                    <div 
                      className="nav-dropdown"
                      onMouseEnter={() => setOpenDropdown(index)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.items?.map((subItem: any, idx) => (
                        <Link 
                          key={idx} 
                          to={subItem.path} 
                          className="dropdown-link"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <Link to="/cart" className="action-cart">
              <img src="/cart.png" alt="Cart" />
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </Link>
            <Link to="/self-study-bundle" className="btn btn-enroll">Enroll Now</Link>
            {isLoggedIn ? (
              user.role === 'admin' ? (
                <Link to="/admin/dashboard" className="btn btn-signup">Admin Dashboard</Link>
              ) : (
                <Link to="/student/dashboard" className="btn btn-signup">Student Dashboard</Link>
              )
            ) : (
              <Link to="/login" className="btn btn-signup">Sign in</Link>
            )}
          </div>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="mobile-logo" onClick={toggleMobileMenu}>
            <img src="/logo.png" alt={settings.siteName} />
          </Link>
          <button className="mobile-close" onClick={toggleMobileMenu}>
             <i className="fas fa-times"></i>
          </button>
        </div>
        
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="mobile-nav-item">
                <div className="mobile-nav-link-wrapper">
                   <Link 
                     to={item.path || '#'} 
                     className="mobile-nav-link" 
                     onClick={(e) => {
                       if (item.path && !item.hasDropdown) toggleMobileMenu();
                       else if (!item.path) e.preventDefault();
                     }}
                   >
                     {item.label}
                   </Link>
                   {item.hasDropdown && (
                     <button 
                       className={`mobile-dropdown-toggle ${openDropdown === index ? 'active' : ''}`}
                       onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                     >
                       <i className="fas fa-chevron-down"></i>
                     </button>
                   )}
                </div>
                
                {item.hasDropdown && openDropdown === index && (
                  <ul className="mobile-dropdown-list">
                    {item.items?.map((subItem: any, idx) => (
                      <li key={idx}>
                        <Link 
                          to={subItem.path} 
                          className="mobile-dropdown-link"
                          onClick={toggleMobileMenu}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="mobile-nav-item">
               <Link to="/cart" className="mobile-nav-link" onClick={toggleMobileMenu}>
                 My Cart ({itemCount})
               </Link>
            </li>
            <li className="mobile-nav-item mt-4">
               {isLoggedIn ? (
                 <Link 
                   to={user.role === 'admin' ? "/admin/dashboard" : "/student/dashboard"} 
                   className="btn btn-signup w-full text-center" 
                   onClick={toggleMobileMenu}
                 >
                   Dashboard
                 </Link>
               ) : (
                 <Link to="/login" className="btn btn-signup w-full text-center" onClick={toggleMobileMenu}>
                   Sign in
                 </Link>
               )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
