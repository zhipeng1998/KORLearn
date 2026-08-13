import React, { useState, useEffect } from 'react';
import { useVocab } from '../../hooks/useVocab';
import { useLanguage } from '../../context/LanguageContext';
import './Quiz.css';

export default function QuizModule() {
  const { vocabList } = useVocab();
  const { t } = useLanguage();
  const [dynamicQuizData, setDynamicQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Generate dynamic quiz on mount or when vocabList changes
  useEffect(() => {
    if (vocabList && vocabList.length >= 4) {
      generateQuiz();
    }
  }, [vocabList]);

  const generateQuiz = () => {
    // Select 5 random words for questions (or all if < 5)
    const numQuestions = Math.min(5, vocabList.length);
    let shuffledVocab = [...vocabList].sort(() => 0.5 - Math.random());
    const selectedWords = shuffledVocab.slice(0, numQuestions);

    const generated = selectedWords.map(word => {
      // Find 3 distractors
      const distractors = vocabList
        .filter(w => w.id !== word.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w.translation);

      // Combine and shuffle options
      const options = [word.translation, ...distractors].sort(() => 0.5 - Math.random());

      return {
        question: `${t('quiz_meaning')} "${word.korean}"?`,
        options,
        answer: word.translation
      };
    });

    setDynamicQuizData(generated);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowResults(false);
  };

  if (!vocabList || vocabList.length < 4) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <p>{t('quiz_need_more')}</p>
        </div>
      </div>
    );
  }

  if (dynamicQuizData.length === 0) {
    return <div>{t('quiz_loading')}</div>;
  }

  const currentQuestion = dynamicQuizData[currentQuestionIndex];

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < dynamicQuizData.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        {showResults ? (
          <div className="quiz-results">
            <h2>{t('quiz_complete')}</h2>
            <p>{t('quiz_scored')} {score} {t('quiz_out_of')} {dynamicQuizData.length}!</p>
            <button className="restart-button" onClick={generateQuiz}>
              {t('quiz_restart')}
            </button>
          </div>
        ) : (
          <>
            <div className="quiz-header">
              <span>{t('quiz_question_of')} {currentQuestionIndex + 1} {t('quiz_of')} {dynamicQuizData.length}</span>
              <span>{t('quiz_score')} {score}</span>
            </div>
            
            <h3 className="quiz-question">{currentQuestion.question}</h3>
            
            <div className="quiz-options">
              {currentQuestion.options.map((option, index) => {
                let optionClass = "quiz-option";
                if (isAnswered) {
                  if (option === currentQuestion.answer) {
                    optionClass += " correct";
                  } else if (option === selectedOption) {
                    optionClass += " incorrect";
                  }
                }

                return (
                  <button 
                    key={index}
                    className={optionClass}
                    onClick={() => handleOptionClick(option)}
                    disabled={isAnswered}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <button className="next-button" onClick={handleNext}>
                {currentQuestionIndex + 1 === dynamicQuizData.length ? t('quiz_show_results') : t('quiz_next')}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
