import React from 'react';
import { Star, Trophy } from 'lucide-react';

interface LevelProgressProps {
  currentLevel: number;
  totalXP: number;
  className?: string;
}

export default function LevelProgress({ currentLevel, totalXP, className = '' }: LevelProgressProps) {
  const currentLevelXP = totalXP % 100;
  const nextLevelXP = 100;
  const progressPercentage = (currentLevelXP / nextLevelXP) * 100;

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Level {currentLevel}</h3>
            <p className="text-sm text-gray-600">{currentLevelXP} / {nextLevelXP} XP</p>
          </div>
        </div>
        <Star className="w-6 h-6 text-yellow-500" />
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-gray-500 text-center">
        {nextLevelXP - currentLevelXP} XP until Level {currentLevel + 1}
      </p>
    </div>
  );
}