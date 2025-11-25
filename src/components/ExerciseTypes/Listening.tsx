import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import AudioPlayer from '../AudioPlayer';

interface ListeningExerciseProps {
  question: string;
  audioUrl: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  onSubmit: (isCorrect: boolean, feedback: string) => void;
}

export default function ListeningExercise({
  question,
  audioUrl,
  options,
  correctAnswer,
  explanation,
  onSubmit,
}: ListeningExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const correct = selectedAnswer === correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const canSubmit = selectedAnswer.length > 0;

  if (showResult) {
    return (
      <div className="space-y-4">
        <div
          className={`
          rounded-xl p-6 text-center
          ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}
        `}
        >
          <div
            className={`
            w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center
            ${isCorrect ? 'bg-green-100' : 'bg-red-100'}
          `}
          >
            {isCorrect ? (
              <Check className="w-8 h-8 text-green-600" />
            ) : (
              <AlertCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          <h4
            className={`text-lg font-semibold mb-2 ${
              isCorrect ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {isCorrect ? 'Excellent!' : 'Not quite right'}
          </h4>
          <p className="text-gray-700 mb-2">
            The correct answer is: <span className="font-bold text-african-orange">{correctAnswer}</span>
          </p>
          {explanation && (
            <div className="bg-white bg-opacity-60 rounded-lg p-3 text-left mb-4">
              <p className="text-sm text-gray-600">{explanation}</p>
            </div>
          )}
          <button
            onClick={() => onSubmit(isCorrect, isCorrect ? 'Correct!' : 'Incorrect. Try again.')}
            className="px-6 py-2 bg-african-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
          >
            {isCorrect ? 'Continue' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{question}</h3>
        <div className="flex justify-center">
          <AudioPlayer audioUrl={audioUrl} label="Play audio" size="lg" />
        </div>
      </div>

      {options && (
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              className={`
                w-full p-4 text-left rounded-xl border-2 transition-all duration-200
                ${
                  selectedAnswer === option
                    ? 'border-african-orange bg-orange-50 text-african-orange'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${
                    selectedAnswer === option
                      ? 'border-african-orange bg-african-orange'
                      : 'border-gray-300'
                  }
                `}
                >
                  {selectedAnswer === option && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`
          w-full py-3 rounded-xl font-semibold text-lg transition-all duration-200
          ${
            canSubmit
              ? 'bg-african-orange text-white hover:bg-orange-600 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        Check Answer
      </button>
    </div>
  );
}
