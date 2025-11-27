import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Heart } from 'lucide-react';
import { CurrentLesson } from '../types';
import VuduMask from './VuduMask';
import MultipleChoice from './ExerciseTypes/MultipleChoice';
import Translation from './ExerciseTypes/Translation';
import Pronunciation from './ExerciseTypes/Pronunciation';
import Listening from './ExerciseTypes/Listening';

interface LessonInterfaceProps {
  lesson: CurrentLesson;
  onComplete: (earnedXP: number, isCorrect: boolean) => void;
  onExit: () => void;
  language?: { id: string; name: string };
}

export default function LessonInterface({ lesson, onComplete, onExit, language }: LessonInterfaceProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [resultFeedback, setResultFeedback] = useState('');
  const [lives, setLives] = useState(5);
  const [partnerMessage, setPartnerMessage] = useState('Let\'s learn together!');

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;

  useEffect(() => {
    setShowResult(false);
    setIsCorrect(false);
    setResultFeedback('');
  }, [currentExerciseIndex]);

  const handleExerciseSubmit = (correct: boolean, feedback: string = '') => {
    setIsCorrect(correct);
    setShowResult(true);
    setResultFeedback(feedback);

    if (!correct && lives > 0) {
      setLives(lives - 1);
      setPartnerMessage('Don\'t worry! Keep trying!');
    } else if (correct) {
      setPartnerMessage('Amazing! You\'re doing great!');
    }

    onComplete(correct ? 15 : 5, correct);
  };

  const handleNext = () => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      onExit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onExit}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex-1 mx-6">
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 to-green-500 h-4 rounded-full transition-all duration-500 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            <span className="text-lg font-bold text-red-500">{lives}</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8 mb-8">
          {!showResult ? (
            <div>
              <div className="flex items-start space-x-6 mb-8">
                <VuduMask
                  emotion={currentExerciseIndex === 0 ? 'default' : 'encouraging'}
                  size="xl"
                  animated={currentExerciseIndex === 0}
                />
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-2xl p-4 relative">
                    <div className="absolute left-0 top-6 transform -translate-x-2">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gray-100"></div>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{partnerMessage}</p>
                  </div>
                </div>
              </div>

            {currentExercise.type === 'multiple-choice' && currentExercise.options && (
              <MultipleChoice
                question={currentExercise.question}
                options={currentExercise.options}
                correctAnswer={currentExercise.correctAnswer}
                explanation={currentExercise.explanation}
                onSubmit={handleExerciseSubmit}
              />
            )}

            {currentExercise.type === 'translation' && (
              <Translation
                question={currentExercise.question}
                correctAnswer={currentExercise.correctAnswer}
                explanation={currentExercise.explanation}
                onSubmit={handleExerciseSubmit}
              />
            )}

            {currentExercise.type === 'pronunciation' && (
              <Pronunciation
                question={currentExercise.question}
                correctAnswer={currentExercise.correctAnswer}
                audioUrl={currentExercise.audioUrl}
                language={language?.id || 'fulfulde'}
                onSubmit={handleExerciseSubmit}
              />
            )}

            {currentExercise.type === 'listening' && currentExercise.audioUrl && (
              <Listening
                question={currentExercise.question}
                audioUrl={currentExercise.audioUrl}
                options={currentExercise.options}
                correctAnswer={currentExercise.correctAnswer}
                explanation={currentExercise.explanation}
                onSubmit={handleExerciseSubmit}
              />
            )}
          </div>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <VuduMask
                  emotion={isCorrect ? 'celebrating' : 'freaked-out'}
                  size="xxl"
                  animated={true}
                />
              </div>

              <div className={`
                w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg
                ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
              `}>
              {isCorrect ? (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              )}
            </div>

              <h3 className={`text-3xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? 'Excellent!' : 'Correct answer:'}
              </h3>

              {!isCorrect && (
                <p className="text-xl text-gray-800 mb-4 font-semibold">
                  {currentExercise.correctAnswer}
                </p>
              )}

              {currentExercise.explanation && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6 max-w-2xl mx-auto">
                  <p className="text-gray-700 leading-relaxed">{currentExercise.explanation}</p>
                </div>
              )}

              <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full ${isCorrect ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                <span className="text-2xl">✨</span>
                <span className="font-bold text-lg text-gray-800">+{isCorrect ? 15 : 5} XP</span>
              </div>
            </div>
          )}
        </div>

        {showResult && (
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="bg-green-500 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center space-x-3"
            >
              <span>
                {currentExerciseIndex < lesson.exercises.length - 1 ? 'CONTINUE' : 'FINISH'}
              </span>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
