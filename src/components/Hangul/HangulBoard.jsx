import React, { useState } from 'react';
import { hangulData } from './hangulData';
import { useLanguage } from '../../context/LanguageContext';
import { globalAudioPlayer } from '../../utils/audio';
import './HangulBoard.css';

const HangulBoard = () => {
  const [filter, setFilter] = useState('all');
  const { t } = useLanguage();

  const filteredData = hangulData.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  const playAudio = (item, e) => {
    if (e) e.stopPropagation();
    if (item && item.romanization) {
      const url = `/audio/hangul/${item.romanization}.mp3`;
      globalAudioPlayer.play(url);
    }
  };

  return (
    <div className="hangul-module-container">
      <div className="hangul-header">
        <h2 className="hangul-title">{t('hangul_title')}</h2>
        <div className="hangul-filters">
          <button 
            className={`hangul-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {t('hangul_all')}
          </button>
          <button 
            className={`hangul-filter-btn ${filter === 'consonant' ? 'active' : ''}`}
            onClick={() => setFilter('consonant')}
          >
            {t('hangul_consonants')}
          </button>
          <button 
            className={`hangul-filter-btn ${filter === 'vowel' ? 'active' : ''}`}
            onClick={() => setFilter('vowel')}
          >
            {t('hangul_vowels')}
          </button>
        </div>
      </div>
      
      <div className="hangul-sections">
        <h3 className="section-title">{t('hangul_basic')}</h3>
        <div className="hangul-grid">
          {filteredData.filter(item => item.level === 'basic').map((item, index) => (
            <div 
              key={`basic-${index}`} 
              className={`hangul-card ${item.type}`}
              onClick={(e) => playAudio(item, e)}
              style={{ cursor: 'pointer', position: 'relative' }}
              title="Click to hear pronunciation"
            >
              <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.6 }}>
                🔊
              </div>
              <div className="hangul-char">{item.char}</div>
              <div className="hangul-romanization">{item.romanization}</div>
              <div className="hangul-type-badge">{item.type}</div>
            </div>
          ))}
        </div>

        <h3 className="section-title" style={{ marginTop: '3rem' }}>{t('hangul_advanced')}</h3>
        <div className="hangul-grid">
          {filteredData.filter(item => item.level === 'advanced').map((item, index) => (
            <div 
              key={`adv-${index}`} 
              className={`hangul-card ${item.type}`}
              onClick={(e) => playAudio(item, e)}
              style={{ cursor: 'pointer', position: 'relative' }}
              title="Click to hear pronunciation"
            >
              <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.6 }}>
                🔊
              </div>
              <div className="hangul-char">{item.char}</div>
              <div className="hangul-romanization">{item.romanization}</div>
              <div className="hangul-type-badge">{item.type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HangulBoard;
