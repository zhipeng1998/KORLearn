import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem('theme') === 'light';
  });

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" onClick={closeMobileMenu}>
            <span className="logo-text">KOR<span className="logo-accent">Learn</span></span>
          </Link>
        </div>
        
        {/* Mobile Toggle Button */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`navbar-collapse ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="navbar-nav">
            <li>
              <Link to="/" className="nav-link" onClick={closeMobileMenu}>{t('nav_home')}</Link>
            </li>
            <li>
              <Link to="/dashboard" className="nav-link" onClick={closeMobileMenu}>{t('nav_dashboard')}</Link>
            </li>
            <li>
              <Link to="/hangul" className="nav-link" onClick={closeMobileMenu}>{t('nav_hangul')}</Link>
            </li>
            <li>
              <Link to="/vocabulary" className="nav-link" onClick={closeMobileMenu}>{t('nav_vocab')}</Link>
            </li>
            <li>
              <Link to="/grammar" className="nav-link" onClick={closeMobileMenu}>{t('nav_grammar')}</Link>
            </li>
            <li>
              <Link to="/quiz" className="nav-link" onClick={closeMobileMenu}>{t('nav_quiz')}</Link>
            </li>
          </ul>
          
          <div className="navbar-actions">
            <Link to="/admin" className="theme-toggle-btn" aria-label="Admin Settings" title="Manage Vocabulary" onClick={closeMobileMenu}>
              ⚙️
            </Link>
            <button className="theme-toggle-btn" onClick={() => { toggleLanguage(); closeMobileMenu(); }} aria-label="Toggle language" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {language === 'en' ? '中' : 'EN'}
            </button>
            <button className="theme-toggle-btn" onClick={() => { toggleTheme(); closeMobileMenu(); }} aria-label="Toggle theme">
              {isLightMode ? '🌙' : '☀️'}
            </button>
            {user ? (
              <div className="user-action-container">
                <span className="username-display">{user.username}</span>
                <button className="btn-primary" onClick={() => { logout(); closeMobileMenu(); }}>{t('auth_logout')}</button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary" onClick={closeMobileMenu}>{t('auth_login')}</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
