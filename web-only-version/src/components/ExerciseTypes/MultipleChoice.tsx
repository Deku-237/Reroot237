import React from 'react';
import { Exercise } from '../../types';

interface MultipleChoiceProps {
  exercise: Exercise;
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
}

export default function MultipleChoice({ exercise, selectedAnswer, onAnswerSelect }: MultipleChoiceProps) {
  return (
    <div className="space-y-3">
      {exercise.options?.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswerSelect(option)}
          className={`
            w-full p-4 text-left rounded-xl border-2 transition-all duration-200
            ${selectedAnswer === option
              ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <div className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${selectedAnswer === option 
                ? 'border-green-500 bg-green-500' 
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
  );
}