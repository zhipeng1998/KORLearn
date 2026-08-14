import React, { useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useVocab } from '../../hooks/useVocab';
import './Dashboard.css';

const DashboardModule = () => {
  const { t, language } = useLanguage();
  const { vocabList, srsProgress, userStats, resetProgress } = useVocab();
  
  const totalWords = vocabList.length;
  const studiedWordsCount = srsProgress.length;

  const dueWordsCount = useMemo(() => {
    if (!vocabList || vocabList.length === 0) return 0;
    const today = new Date();
    
    return vocabList.filter(word => {
      const progress = srsProgress.find(p => p.wordId === word.id);
      if (!progress) return true; // Never studied
      return new Date(progress.nextReviewDate) <= today;
    }).length;
  }, [vocabList, srsProgress]);

  const progressPercentage = totalWords === 0 ? 0 : (studiedWordsCount / totalWords) * 100;
  
  // XP Level calculation (every 100 XP is a level)
  const currentLevel = Math.floor(userStats.xp / 100) + 1;
  const xpToNextLevel = 100 - (userStats.xp % 100);
  const xpPercent = (userStats.xp % 100);

  const handleReset = () => {
    if (window.confirm(t('dash_confirm_reset') || "Are you sure you want to reset your progress?")) {
      resetProgress();
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-glass-card">
        <h1 className="welcome-message">{t('dash_welcome')}</h1>
        
        {/* Gamification Stats */}
        <div className="stats-grid">
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔥</div>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{language === 'en' ? 'Day Streak' : '连续学习'}</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{userStats.streak}</div>
          </div>
          
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⭐</div>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{language === 'en' ? 'Total XP' : '总经验值'}</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{userStats.xp}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Level {currentLevel}</div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🧠</div>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{language === 'en' ? 'Due Review' : '待复习'}</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{dueWordsCount}</div>
          </div>
        </div>
        
        <div className="progress-section">
          <h2 className="progress-title">{t('dash_progress_title')}</h2>
          
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ '--target-width': `${progressPercentage}%` }}
            ></div>
          </div>
          
          <p className="progress-text">{t('dash_words_mastered')}: {studiedWordsCount} / {totalWords}</p>
        </div>
        
        <div className="motivation-section" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <p className="motivation-text">
            {language === 'en' ? `You need ${xpToNextLevel} XP to reach Level ${currentLevel + 1}!` : `您还需要 ${xpToNextLevel} 经验值即可升至 Lv ${currentLevel + 1}！`}
          </p>
          <div className="progress-bar-container" style={{ width: '80%', height: '8px', background: 'rgba(0,0,0,0.1)' }}>
            <div 
              className="progress-bar-fill" 
              style={{ '--target-width': `${xpPercent}%`, background: 'var(--color-primary)' }}
            ></div>
          </div>

          <button 
            onClick={handleReset}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              transition: 'all 0.2s',
              marginTop: '1rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          >
            {t('dash_reset')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardModule;
