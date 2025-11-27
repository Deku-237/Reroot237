import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface DuoPartnerProps {
  emotion?: 'happy' | 'celebrating' | 'thinking' | 'encouraging' | 'explaining';
  message?: string;
  showMessage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function DuoPartner({
  emotion = 'happy',
  message,
  showMessage = false,
  size = 'md',
  animated = false
}: DuoPartnerProps) {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (animated) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 600);
      return () => clearTimeout(timer);
    }
  }, [animated, emotion]);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const getEmotionColor = () => {
    switch (emotion) {
      case 'celebrating':
        return 'from-green-400 to-green-600';
      case 'thinking':
        return 'from-blue-400 to-blue-600';
      case 'encouraging':
        return 'from-yellow-400 to-yellow-600';
      case 'explaining':
        return 'from-purple-400 to-purple-600';
      default:
        return 'from-emerald-400 to-emerald-600';
    }
  };

  const getEmotionExpression = () => {
    switch (emotion) {
      case 'celebrating':
        return (
          <g>
            <circle cx="35" cy="45" r="4" fill="#2C3E50" />
            <circle cx="65" cy="45" r="4" fill="#2C3E50" />
            <path d="M 30 65 Q 50 75 70 65" stroke="#2C3E50" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 25 35 Q 30 30 35 35" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 65 35 Q 70 30 75 35" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        );
      case 'thinking':
        return (
          <g>
            <circle cx="35" cy="45" r="3" fill="#2C3E50" />
            <circle cx="65" cy="45" r="3" fill="#2C3E50" />
            <ellipse cx="50" cy="60" rx="8" ry="5" fill="#2C3E50" opacity="0.3" />
          </g>
        );
      case 'encouraging':
        return (
          <g>
            <circle cx="35" cy="45" r="5" fill="#2C3E50" />
            <circle cx="65" cy="45" r="5" fill="#2C3E50" />
            <path d="M 35 65 Q 50 70 65 65" stroke="#2C3E50" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );
      case 'explaining':
        return (
          <g>
            <circle cx="35" cy="45" r="4" fill="#2C3E50" />
            <circle cx="65" cy="45" r="4" fill="#2C3E50" />
            <path d="M 40 65 L 60 65" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      default:
        return (
          <g>
            <circle cx="35" cy="45" r="4" fill="#2C3E50" />
            <circle cx="65" cy="45" r="4" fill="#2C3E50" />
            <path d="M 35 60 Q 50 70 65 60" stroke="#2C3E50" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );
    }
  };

  return (
    <div className="relative inline-block">
      <div className={`${bounce ? 'animate-bounce' : ''} transition-transform duration-300`}>
        <svg
          viewBox="0 0 100 100"
          className={`${sizeClasses[size]} drop-shadow-lg`}
        >
          <defs>
            <linearGradient id={`gradient-${emotion}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" className={`${getEmotionColor().split(' ')[0].replace('from-', 'text-')}`} stopColor="currentColor" />
              <stop offset="100%" className={`${getEmotionColor().split(' ')[1].replace('to-', 'text-')}`} stopColor="currentColor" />
            </linearGradient>
          </defs>

          <ellipse cx="50" cy="75" rx="30" ry="8" fill="#34495E" opacity="0.2" />

          <ellipse cx="50" cy="50" rx="40" ry="45" fill={`url(#gradient-${emotion})`} />

          <ellipse cx="50" cy="48" rx="35" ry="40" fill="#2ECC71" opacity="0.2" />

          {getEmotionExpression()}

          {emotion === 'celebrating' && (
            <>
              <Sparkles className="absolute top-0 right-0 w-4 h-4 text-yellow-400" />
              <circle cx="20" cy="20" r="2" fill="#FFA500" opacity="0.8" />
              <circle cx="80" cy="25" r="2" fill="#FFA500" opacity="0.8" />
              <circle cx="75" cy="15" r="1.5" fill="#FFD700" opacity="0.8" />
            </>
          )}
        </svg>
      </div>

      {showMessage && message && (
        <div className="absolute top-0 left-full ml-4 bg-white rounded-2xl shadow-lg p-4 max-w-xs border-2 border-gray-200 animate-fadeIn">
          <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"></div>
          </div>
          <p className="text-sm text-gray-800 font-medium">{message}</p>
        </div>
      )}
    </div>
  );
}
