import React, { useState } from 'react';
import { globalAudioPlayer } from '../../utils/audio';
import './Vocabulary.css';

const Flashcard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const playAudio = (e) => {
    e.stopPropagation(); // Prevent flipping when clicking audio
    if (card && card.id) {
      const url = `/audio/vocab/${card.id}.mp3`;
      globalAudioPlayer.play(url);
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
