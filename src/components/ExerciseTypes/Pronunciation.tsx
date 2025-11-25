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

  const { transcript, isListening, startListening, stopListening, resetTranscript } =
    useSpeechRecognition({
      language: getLanguageCode(language),
    });

  useEffect(() => {
    if (transcript && !isListening && attemptCount === 0) {
      handleAnalyze();
    }
  }, [isListening]);

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
    if (!transcript) return;

    setIsAnalyzing(true);
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-lesson-feedback`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          userAnswer: transcript,
          correctAnswer,
          exerciseType: 'pronunciation',
          language,
          question,
        }),
      });

      const data = await response.json();
      setFeedbackData(data);
      setHasSubmitted(true);

      if (data.isCorrect) {
        onSubmit(true, transcript, data.feedback);
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

  const handleRetry = () => {
    resetTranscript();
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
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
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
            <p className="mt-2 text-sm text-gray-600">
              You said: <span className="font-semibold">{transcript}</span>
            </p>
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
