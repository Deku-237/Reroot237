import React, { useState } from 'react';

interface MultipleChoiceProps {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  onSubmit: (isCorrect: boolean, feedback: string) => void;
}

export default function MultipleChoice({ question, options, correctAnswer, explanation, onSubmit }: MultipleChoiceProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedAnswer || hasSubmitted) return;
    setHasSubmitted(true);
    const isCorrect = selectedAnswer === correctAnswer;
    onSubmit(isCorrect, explanation || '');
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{question}</h3>
      <div className="space-y-3 mb-6">
        {options?.map((option, index) => (
        <button
          key={index}
          onClick={() => setSelectedAnswer(option)}
          disabled={hasSubmitted}
          className={`
            w-full p-4 text-left rounded-xl border-2 transition-all duration-200
            ${selectedAnswer === option
              ? 'border-african-orange bg-orange-50 text-orange-700 shadow-md'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }
            ${hasSubmitted ? 'opacity-50 cursor-not-allowed' : ''}
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

      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer || hasSubmitted}
        className={`
          w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200
          ${selectedAnswer && !hasSubmitted
            ? 'bg-african-orange text-white hover:bg-orange-600 shadow-lg hover:shadow-xl'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }
        `}
      >
        Check Answer
      </button>
    </div>
  );
}
