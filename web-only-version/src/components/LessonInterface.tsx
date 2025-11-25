import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Volume2, Check, AlertCircle } from 'lucide-react';
import { CurrentLesson, Exercise } from '../types';
import VuduMask from './VuduMask';

interface LessonInterfaceProps {
  lesson: CurrentLesson;
  onComplete: (earnedXP: number, isCorrect: boolean) => void;
  onExit: () => void;
  language?: { id: string; name: string };
}

export default function LessonInterface({ lesson, onComplete, onExit, language }: LessonInterfaceProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userInput, setUserInput] = useState('');

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;
  
  useEffect(() => {
    setSelectedAnswer('');
    setUserInput('');
    setShowResult(false);
  }, [currentExerciseIndex]);

  const handleAnswerSubmit = () => {
    const answer = currentExercise.type === 'translation' ? userInput : selectedAnswer;
    const correct = answer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase().trim();
    
    setIsCorrect(correct);
    setShowResult(true);
    onComplete(correct ? 15 : 5, correct);
  };

  const handleNext = () => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      onExit();
    }
  };

  const canSubmit = currentExercise.type === 'translation' 
    ? userInput.trim().length > 0 
    : selectedAnswer.length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
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
          <VuduMask 
            emotion="default"
            size="sm"
          />
          <div>
          <p className="text-sm text-gray-600">Lesson</p>
          <p className="font-semibold text-gray-800">{lesson.title}</p>
          </div>
        </div>
      </div>

      {/* Exercise Content */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 mb-8">
        {!showResult ? (
          <div>
            <div className="text-center mb-8 relative">
              <div className="flex justify-center mb-4">
                <VuduMask 
                  emotion="default"
                  size="lg"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {currentExercise.question}
              </h2>
              
              {currentExercise.audioUrl && (
                <button className="inline-flex items-center space-x-2 bg-african-orange bg-opacity-20 text-african-orange px-4 py-2 rounded-full hover:bg-opacity-30 transition-colors">
                  <Volume2 className="w-4 h-4" />
                  <span>Play Audio</span>
                </button>
              )}
            </div>

            {/* Multiple Choice */}
            {currentExercise.type === 'multiple-choice' && currentExercise.options && (
              <div className="space-y-3">
                {currentExercise.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(option)}
                    className={`
                      w-full p-4 text-left rounded-xl border-2 transition-all duration-200
                      ${selectedAnswer === option
                        ? 'border-african-orange bg-orange-50 text-african-orange'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${selectedAnswer === option 
                          ? 'border-african-orange bg-african-orange' 
                          : 'border-gray-300'
                        }
                      `}>
                        {selectedAnswer === option && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Translation Input */}
            {currentExercise.type === 'translation' && (
              <div>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your translation here..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-african-orange focus:outline-none resize-none"
                  rows={3}
                />
              </div>
            )}
          </div>
        ) : (
          /* Result Display */
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <VuduMask 
                emotion={isCorrect ? "celebrating" : "freaked-out"}
                size="lg"
                animated={true}
              />
            </div>
            
            <div className={`
              w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center
              ${isCorrect ? 'bg-forest-green' : 'bg-earth-red'}
            `}>
              {isCorrect ? (
                <Check className="w-8 h-8 text-white" />
              ) : (
                <AlertCircle className="w-8 h-8 text-white" />
              )}
            </div>
            
            <h3 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-forest-green' : 'text-earth-red'}`}>
              {isCorrect ? 'Excellent! Well done!' : 'Oops! Not quite right'}
            </h3>
            
            <p className="text-gray-600 mb-4">
              The correct answer is: <span className="font-semibold text-gray-800">{currentExercise.correctAnswer}</span>
            </p>
            
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

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        {!showResult ? (
          <button
            onClick={handleAnswerSubmit}
            disabled={!canSubmit}
            className={`
              px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200
              ${canSubmit
                ? 'bg-african-orange text-white hover:bg-orange-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Check Answer
          </button>
        ) : (
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