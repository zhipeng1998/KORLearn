import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Home.css';

function Home() {
  const { t } = useLanguage();

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('home_title1')} <br/>
            <span className="text-gradient">{t('home_title2')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('home_subtitle')}
          </p>
          <div className="hero-actions">
            <Link to="/hangul" className="btn-primary btn-large">
              {t('home_btn_start')}
            </Link>
            <button className="btn-secondary">{t('home_btn_explore')}</button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="decoration blob-1"></div>
        <div className="decoration blob-2"></div>
      </section>

      <section className="features-section">
        <h2 className="section-title">{t('home_path_title')}</h2>
        <div className="features-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon">🇰🇷</div>
            <h3>{t('home_feat1_title')}</h3>
            <p>{t('home_feat1_desc')}</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon">🧠</div>
            <h3>{t('home_feat2_title')}</h3>
            <p>{t('home_feat2_desc')}</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon">📝</div>
            <h3>{t('home_feat3_title')}</h3>
            <p>{t('home_feat3_desc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
