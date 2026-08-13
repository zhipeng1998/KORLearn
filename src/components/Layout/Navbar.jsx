import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();
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

  return (
    <nav className="navbar glass-panel" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', width: '100%', maxWidth: '1200px', margin: '1.5rem auto', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
      <div className="navbar-brand">
        <Link to="/">
          <span className="logo-text">KOR<span className="logo-accent">Learn</span></span>
        </Link>
      </div>
      <ul className="navbar-nav">
        <li>
          <Link to="/" className="nav-link">{t('nav_home')}</Link>
        </li>
        <li>
          <Link to="/dashboard" className="nav-link">{t('nav_dashboard')}</Link>
        </li>
        <li>
          <Link to="/hangul" className="nav-link">{t('nav_hangul')}</Link>
        </li>
        <li>
          <Link to="/vocabulary" className="nav-link">{t('nav_vocab')}</Link>
        </li>
        <li>
          <Link to="/grammar" className="nav-link">{t('nav_grammar')}</Link>
        </li>
        <li>
          <Link to="/quiz" className="nav-link">{t('nav_quiz')}</Link>
        </li>
      </ul>
      <div className="navbar-actions">
        <Link to="/admin" className="theme-toggle-btn" aria-label="Admin Settings" title="Manage Vocabulary">
          ⚙️
        </Link>
        <button className="theme-toggle-btn" onClick={toggleLanguage} aria-label="Toggle language" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
          {language === 'en' ? '中' : 'EN'}
        </button>
        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {isLightMode ? '🌙' : '☀️'}
        </button>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{user.username}</span>
            <button className="btn-primary" onClick={logout}>{t('auth_logout')}</button>
          </div>
        ) : (
          <Link to="/login" className="btn-primary">{t('auth_login')}</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
