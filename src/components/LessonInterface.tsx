import React, { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onExit}
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex-1 mx-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-african-brown to-african-orange h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            {currentExerciseIndex + 1} of {lesson.exercises.length}
          </p>
        </div>

        <div className="text-right flex items-center space-x-3">
          <VuduMask emotion="default" size="sm" />
          <div>
            <p className="text-sm text-gray-600">Lesson</p>
            <p className="font-semibold text-gray-800">{lesson.title}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 mb-8">
        {!showResult ? (
          <div>
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <VuduMask emotion="default" size="lg" />
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
            <div className="flex justify-center mb-4">
              <VuduMask
                emotion={isCorrect ? 'celebrating' : 'freaked-out'}
                size="lg"
                animated={true}
              />
            </div>

            <div className={`
              w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center
              ${isCorrect ? 'bg-forest-green' : 'bg-earth-red'}
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

            <h3 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-forest-green' : 'text-earth-red'}`}>
              {isCorrect ? 'Excellent! Well done!' : 'Oops! Not quite right'}
            </h3>

            <p className="text-gray-600 mb-4">
              The correct answer is: <span className="font-semibold text-gray-800">{currentExercise.correctAnswer}</span>
            </p>

            {resultFeedback && (
              <p className="text-gray-600 mb-4">{resultFeedback}</p>
            )}

            {currentExercise.explanation && (
              <div className="bg-african-brown bg-opacity-10 border border-african-brown border-opacity-30 rounded-xl p-4 mb-6">
                <p className="text-gray-800">{currentExercise.explanation}</p>
              </div>
            )}

            <p className="text-sm text-gray-600 mb-6">
              You earned <span className="font-bold text-african-orange">+{isCorrect ? 15 : 5} Wisdom Points</span>
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        {showResult && (
          <button
            onClick={handleNext}
            className="bg-african-orange text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <span>
              {currentExerciseIndex < lesson.exercises.length - 1 ? 'Continue' : 'Complete Lesson'}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
