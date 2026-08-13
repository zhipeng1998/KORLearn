import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Grammar.css';

const GrammarModule = () => {
  const { t, language } = useLanguage();

  const playAudio = (text, e) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="grammar-container">
      <header className="grammar-header">
        <h1>{t('grammar_title')}</h1>
        <p>{t('grammar_subtitle')}</p>
      </header>

      <div className="grammar-cards-wrapper">
        
        {/* SOV Structure Card */}
        <section className="grammar-card glassmorphism">
          <div className="card-content">
            <h2>{t('grammar_sov_title')}</h2>
            <p className="description">
              {language === 'zh' ? (
                <>与遵循 <strong>主谓宾（SVO）</strong> 结构的英语或中文不同，韩语严格遵循 <strong>主宾谓（SOV）</strong> 结构。动词始终放在最后。</>
              ) : (
                <>Unlike English or Chinese which follow a <strong>Subject-Verb-Object (SVO)</strong> structure, Korean strictly follows a <strong>Subject-Object-Verb (SOV)</strong> structure. The verb always comes last.</>
              )}
            </p>
            
            <div className="comparison-box">
              <div className="language-example svo-lang">
                <span className="lang-label">{t('grammar_en_svo')}</span>
                <div className="sentence">
                  <span className="subject">I</span>
                  <span className="verb">eat</span>
                  <span className="object">an apple</span>.
                </div>
              </div>
              <div className="language-example svo-lang">
                <span className="lang-label">{t('grammar_zh_svo')}</span>
                <div className="sentence">
                  <span className="subject">我</span>
                  <span className="verb">吃</span>
                  <span className="object">苹果</span>。
                </div>
              </div>
              <div className="language-example korean">
                <span className="lang-label">{t('grammar_ko_sov')}</span>
                <div 
                  className="sentence highlight-pulse" 
                  onClick={(e) => playAudio('저는 사과를 먹어요', e)}
                  style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                  title="Click to hear pronunciation"
                >
                  <span className="subject">저는</span>
                  <span className="object">사과를</span>
                  <span className="verb">먹어요</span>.
                  <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem', opacity: 0.7 }}>🔊</span>
                </div>
                <div className="pronunciation">jeoneun sagwareul meogeoyo.</div>
              </div>
            </div>
            
            <div className="legend">
              <span className="legend-item"><span className="dot subject-dot"></span> {t('grammar_subject')}</span>
              <span className="legend-item"><span className="dot object-dot"></span> {t('grammar_object')}</span>
              <span className="legend-item"><span className="dot verb-dot"></span> {t('grammar_verb')}</span>
            </div>
          </div>
        </section>

        {/* Particles Card */}
        <section className="grammar-card glassmorphism">
          <div className="card-content">
            <h2>{t('grammar_particles_title')}</h2>
            <p className="description">
              {t('grammar_particles_desc')}
            </p>
            
            <div className="particles-grid">
              <div className="particle-item">
                <div className="particle-header">
                  <span className="particle-chars">은 / 는</span>
                  <span className="particle-name">{t('grammar_topic_particle')}</span>
                </div>
                <p>{t('grammar_topic_desc')}</p>
                <div className="usage">
                  <span className="rule">{t('grammar_cons_ending')} <strong className="rule-badge">은</strong></span>
                  <span className="rule">{t('grammar_vowel_ending')} <strong className="rule-badge">는</strong></span>
                </div>
              </div>
              
              <div className="particle-item">
                <div className="particle-header">
                  <span className="particle-chars">이 / 가</span>
                  <span className="particle-name">{t('grammar_subj_particle')}</span>
                </div>
                <p>{t('grammar_subj_desc')}</p>
                <div className="usage">
                  <span className="rule">{t('grammar_cons_ending')} <strong className="rule-badge">이</strong></span>
                  <span className="rule">{t('grammar_vowel_ending')} <strong className="rule-badge">가</strong></span>
                </div>
              </div>
              
              <div className="particle-item">
                <div className="particle-header">
                  <span className="particle-chars">을 / 를</span>
                  <span className="particle-name">{t('grammar_obj_particle')}</span>
                </div>
                <p>{t('grammar_obj_desc')}</p>
                <div className="usage">
                  <span className="rule">{t('grammar_cons_ending')} <strong className="rule-badge">을</strong></span>
                  <span className="rule">{t('grammar_vowel_ending')} <strong className="rule-badge">를</strong></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Honorifics Card */}
        <section className="grammar-card glassmorphism">
          <div className="card-content">
            <h2>{t('grammar_honorifics_title')}</h2>
            <p className="description">
              {t('grammar_honorifics_desc')}
            </p>
            
            <div className="particles-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              
              {/* Informal */}
              <div className="particle-item">
                <div className="particle-header">
                  <span className="particle-chars" style={{ fontSize: '1.8rem' }}>반말</span>
                  <span className="particle-name" style={{ background: 'rgba(234, 88, 12, 0.1)', color: '#ea580c' }}>Informal</span>
                </div>
                <p>{t('grammar_informal_desc')}</p>
                <div 
                  className="usage" 
                  onClick={(e) => playAudio('안녕! 먹어.', e)}
                  style={{ cursor: 'pointer', background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}
                >
                  <strong style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.2rem' }}>{t('grammar_informal_ex')} 🔊</strong>
                </div>
              </div>

              {/* Polite */}
              <div className="particle-item">
                <div className="particle-header">
                  <span className="particle-chars" style={{ fontSize: '1.8rem' }}>해요체</span>
                  <span className="particle-name" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}>Polite</span>
                </div>
                <p>{t('grammar_polite_desc')}</p>
                <div 
                  className="usage" 
                  onClick={(e) => playAudio('안녕하세요! 먹어요.', e)}
                  style={{ cursor: 'pointer', background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}
                >
                  <strong style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.2rem' }}>{t('grammar_polite_ex')} 🔊</strong>
                </div>
              </div>

              {/* Formal */}
              <div className="particle-item">
                <div className="particle-header">
                  <span className="particle-chars" style={{ fontSize: '1.8rem' }}>하십시오체</span>
                  <span className="particle-name" style={{ background: 'rgba(22, 163, 74, 0.1)', color: '#16a34a' }}>Formal</span>
                </div>
                <p>{t('grammar_formal_desc')}</p>
                <div 
                  className="usage" 
                  onClick={(e) => playAudio('안녕하십니까! 먹습니다.', e)}
                  style={{ cursor: 'pointer', background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}
                >
                  <strong style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.2rem' }}>{t('grammar_formal_ex')} 🔊</strong>
                </div>
              </div>

            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default GrammarModule;
