import React, { useState, useMemo } from 'react';
import Flashcard from './Flashcard';
import { useVocab } from '../../hooks/useVocab';
import { useLanguage } from '../../context/LanguageContext';
import './Vocabulary.css';

const VocabModule = () => {
  const { vocabList, srsProgress, reviewWord } = useVocab();
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter words that are due today or haven't been studied yet
  const dueWords = useMemo(() => {
    if (!vocabList || vocabList.length === 0) return [];
    const today = new Date();
    
    return vocabList.filter(word => {
      const progress = srsProgress.find(p => p.wordId === word.id);
      if (!progress) return true; // Never studied
      return new Date(progress.nextReviewDate) <= today;
    });
  }, [vocabList, srsProgress]);

  if (!vocabList || vocabList.length === 0) {
    return <div className="vocab-module"><div className="glass-panel"><p>{t('vocab_no_words')}</p></div></div>;
  }

  if (dueWords.length === 0) {
    return (
      <div className="vocab-module">
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>🎉 All Caught Up!</h2>
          <p style={{ color: 'var(--text-muted)' }}>You have reviewed all your vocabulary for today. Come back tomorrow!</p>
        </div>
      </div>
    );
  }

  const currentWord = dueWords[currentIndex];

  const handleReview = (isKnown) => {
    reviewWord(currentWord.id, isKnown);
    
    // Move to next card, but if we are at the end, it will re-render and dueWords will shrink
    if (currentIndex + 1 < dueWords.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Reset index as array shrinks
    }
  };

  return (
    <div className="vocab-module">
      <div className="glass-panel">
        <h1 className="module-title">{t('vocab_title')} (Due: {dueWords.length})</h1>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1) / dueWords.length) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text">{currentIndex + 1} / {dueWords.length}</p>
        
        <Flashcard card={currentWord} key={currentWord.id} />
        
        <div className="action-buttons">
          <button className="btn btn-dont-know" onClick={() => handleReview(false)}>
            <span className="icon">✕</span> {t('vocab_dont_know')}
          </button>
          <button className="btn btn-know" onClick={() => handleReview(true)}>
            <span className="icon">✓</span> {t('vocab_know')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VocabModule;
