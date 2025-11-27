import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, AlertCircle, Check } from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

interface PronunciationExerciseProps {
  question: string;
  correctAnswer: string;
  audioUrl?: string;
  language: string;
  onSubmit: (isCorrect: boolean, transcript: string, feedback: string) => void;
}

interface FeedbackData {
  isCorrect: boolean;
  score: number;
  feedback: string;
  hints?: string[];
  correction?: string;
}

export default function PronunciationExercise({
  question,
  correctAnswer,
  audioUrl,
  language,
  onSubmit,
}: PronunciationExerciseProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [useTextInput, setUseTextInput] = useState(true);
  const [textInput, setTextInput] = useState('');

  const { transcript, isListening, isSupported, startListening, stopListening, resetTranscript } =
    useSpeechRecognition({
      language: getLanguageCode(language),
    });

  useEffect(() => {
    if (transcript && !isListening && !isAnalyzing && !hasSubmitted) {
      const timer = setTimeout(() => {
        handleAnalyze();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [transcript, isListening]);

  function getLanguageCode(lang: string): string {
    const codes: Record<string, string> = {
      fulfulde: 'ff-FF',
      ewondo: 'en-CM',
      duala: 'en-CM',
      bamileke: 'en-CM',
      bassa: 'en-CM',
      kanuri: 'ha-NG',
      meta: 'en-CM',
      kom: 'en-CM',
      bamoun: 'en-CM',
      medumba: 'en-CM',
      mundang: 'en-NG',
      gbaya: 'en-CF',
    };
    return codes[lang] || 'en-US';
  }

  const handleAnalyze = async () => {
    const userInput = useTextInput ? textInput : transcript;

    if (!userInput || userInput.length < 2) {
      alert('Please provide input and try again.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const normalizedTranscript = userInput.toLowerCase().trim();
      const normalizedAnswer = correctAnswer.toLowerCase().trim();

      const similarity = calculateSimilarity(normalizedTranscript, normalizedAnswer);
      const isCorrect = similarity > 0.7;

      const feedbackResult: FeedbackData = {
        isCorrect,
        score: Math.round(similarity * 100),
        feedback: isCorrect
          ? 'Great pronunciation!'
          : similarity > 0.5
            ? 'Good attempt! Keep practicing.'
            : 'Let\'s try again. Listen carefully to the pronunciation.',
        hints: !isCorrect ? [
          'Listen to the audio example',
          'Speak clearly and at a normal pace',
          'Focus on each syllable'
        ] : undefined,
        correction: !isCorrect ? `Expected: "${correctAnswer}", You said: "${transcript}"` : undefined
      };

      setFeedbackData(feedbackResult);
      setHasSubmitted(true);

      if (isCorrect) {
        onSubmit(true, transcript, feedbackResult.feedback);
      }
    } catch (error) {
      console.error('Error analyzing pronunciation:', error);
      setFeedbackData({
        isCorrect: false,
        score: 0,
        feedback: 'Error analyzing pronunciation. Please try again.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  function calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const editDistance = getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  function getEditDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  const handleRetry = () => {
    resetTranscript();
    setTextInput('');
    setFeedbackData(null);
    setHasSubmitted(false);
    setAttemptCount(attemptCount + 1);
  };

  const handleSubmit = () => {
    if (feedbackData) {
      onSubmit(feedbackData.isCorrect, transcript, feedbackData.feedback);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{question}</h3>
        <p className="text-gray-600 mb-4">
          Pronounce: <span className="font-bold text-african-orange">{correctAnswer}</span>
        </p>
        {audioUrl && (
          <button className="inline-flex items-center space-x-2 bg-african-orange bg-opacity-20 text-african-orange px-4 py-2 rounded-full hover:bg-opacity-30 transition-colors">
            <Volume2 className="w-4 h-4" />
            <span>Listen</span>
          </button>
        )}
      </div>

      {!hasSubmitted ? (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          {!useTextInput ? (
            <div className="text-center">
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isAnalyzing}
                className={`
                  w-20 h-20 rounded-full mx-auto flex items-center justify-center
                  transition-all duration-200 font-semibold text-white
                  ${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'}
                  ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>
              <p className="mt-4 text-gray-700">
                {isAnalyzing
                  ? 'Analyzing your pronunciation...'
                  : isListening
                  ? 'Listening... Speak now!'
                  : 'Click the mic to start speaking'}
              </p>
              {transcript && (
                <>
                  <p className="mt-2 text-sm text-gray-600">
                    You said: <span className="font-semibold">{transcript}</span>
                  </p>
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check Pronunciation
                  </button>
                </>
              )}
              <button
                onClick={() => setUseTextInput(true)}
                className="mt-4 text-sm text-blue-600 hover:text-blue-700 underline"
              >
                Voice not working? Type instead
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-700 mb-2 text-center">Type the phrase to practice pronunciation:</p>
              <p className="text-sm text-gray-500 mb-4 text-center">
                (Voice recognition is experimental and may not work on all networks)
              </p>
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your answer here..."
                autoFocus
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center text-lg mb-4"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && textInput.length > 0) {
                    handleAnalyze();
                  }
                }}
              />
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !textInput}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Answer
                </button>
                {isSupported && (
                  <button
                    onClick={() => {
                      setUseTextInput(false);
                      setTextInput('');
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-2"
                  >
                    <Mic className="w-4 h-4" />
                    Try Voice Instead
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : feedbackData ? (
        <div
          className={`
          rounded-xl p-6 text-center
          ${feedbackData.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}
        `}
        >
          <div className={`
            w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center
            ${feedbackData.isCorrect ? 'bg-green-100' : 'bg-amber-100'}
          `}>
            {feedbackData.isCorrect ? (
              <Check className="w-8 h-8 text-green-600" />
            ) : (
              <AlertCircle className="w-8 h-8 text-amber-600" />
            )}
          </div>
          <h4
            className={`text-lg font-semibold mb-2 ${
              feedbackData.isCorrect ? 'text-green-700' : 'text-amber-700'
            }`}
          >
            {feedbackData.feedback}
          </h4>
          <p className="text-gray-700 mb-2">
            Score: <span className="font-bold text-african-orange">{feedbackData.score}%</span>
          </p>
          {feedbackData.correction && (
            <p className="text-gray-600 mb-4">{feedbackData.correction}</p>
          )}
          {feedbackData.hints && feedbackData.hints.length > 0 && (
            <div className="bg-white bg-opacity-60 rounded-lg p-3 mb-4 text-left">
              <p className="text-sm font-semibold text-gray-700 mb-2">Tips:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {feedbackData.hints.map((hint, i) => (
                  <li key={i}>• {hint}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex gap-3 justify-center">
            {!feedbackData.isCorrect && (
              <button
                onClick={handleRetry}
                className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
              >
                Try Again
              </button>
            )}
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-african-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              {feedbackData.isCorrect ? 'Continue' : 'Skip'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
