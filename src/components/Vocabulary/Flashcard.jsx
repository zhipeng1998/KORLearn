import React, { useState } from 'react';
import './Vocabulary.css';

const Flashcard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const playAudio = (e) => {
    e.stopPropagation(); // Prevent flipping when clicking audio
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(card.korean);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85; // slightly slower for learners
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech not supported in this browser.");
    }
  };

  return (
    <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        <div className="flashcard-front">
          <button className="audio-btn" onClick={playAudio} title="Play Pronunciation">
            🔊
          </button>
          <h2>{card.korean}</h2>
          <span className="flip-hint">Click to flip</span>
        </div>
        <div className="flashcard-back">
          <h3>{card.translation}</h3>
          <p className="romanization">{card.romanization}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
