import React from 'react';
import { Trophy, Star, Flame, Target, Calendar, TrendingUp, Award, Check } from 'lucide-react';
import { UserProgress, Language } from '../types';

interface ProgressDashboardProps {
  userProgress: UserProgress;
  language: Language;
}

export default function ProgressDashboard({ userProgress, language }: ProgressDashboardProps) {
  const accuracyPercentage = userProgress.totalAnswers > 0 
    ? Math.round((userProgress.correctAnswers / userProgress.totalAnswers) * 100) 
    : 0;

  const achievementsList = [
    { id: 'first-lesson', title: 'First Steps', description: 'Complete your first lesson', icon: '🎯', earned: userProgress.lessonsCompleted > 0 },
    { id: 'streak-3', title: 'Getting Started', description: 'Maintain a 3-day streak', icon: '🔥', earned: userProgress.streak >= 3 },
    { id: 'streak-7', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '⚡', earned: userProgress.streak >= 7 },
    { id: 'xp-100', title: 'Learning Machine', description: 'Earn 100 XP', icon: '🏆', earned: userProgress.totalXP >= 100 },
    { id: 'accuracy-90', title: 'Perfectionist', description: 'Achieve 90% accuracy', icon: '🎖️', earned: accuracyPercentage >= 90 },
    { id: 'lessons-5', title: 'Dedicated Learner', description: 'Complete 5 lessons', icon: '📚', earned: userProgress.lessonsCompleted >= 5 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">{language.flag}</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Learning Journey</h1>
        <p className="text-gray-600">Tracking your progress with {language.nativeName}</p>
        <p className="text-sm text-african-brown italic mt-2">{language.region} • {language.family}</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8 text-savanna-gold" />
            <span className="text-2xl font-bold text-gray-800">{userProgress.totalXP}</span>
          </div>
          <h3 className="font-semibold text-gray-700">Wisdom Points</h3>
          <p className="text-sm text-gray-500">Cultural Knowledge Gained</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Flame className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-800">{userProgress.streak}</span>
          </div>
          <h3 className="font-semibold text-gray-700">Day Streak</h3>
          <p className="text-sm text-gray-500">Consecutive Days Learning</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-ndop-blue" />
            <span className="text-2xl font-bold text-gray-800">{accuracyPercentage}%</span>
          </div>
          <h3 className="font-semibold text-gray-700">Accuracy</h3>
          <p className="text-sm text-gray-500">Correct Answers</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Star className="w-8 h-8 text-kente-purple" />
            <span className="text-2xl font-bold text-gray-800">{userProgress.currentLevel}</span>
          </div>
          <h3 className="font-semibold text-gray-700">Current Level</h3>
          <p className="text-sm text-gray-500">Learning Progress</p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Learning Statistics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-forest-green" />
            Learning Statistics
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Lessons Completed</span>
              <span className="font-semibold text-gray-800">{userProgress.lessonsCompleted}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Questions Answered</span>
              <span className="font-semibold text-gray-800">{userProgress.totalAnswers}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Correct Answers</span>
              <span className="font-semibold text-forest-green">{userProgress.correctAnswers}</span>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Learning Language</span>
              <span className="font-semibold text-gray-800">{language.nativeName}</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Award className="w-6 h-6 mr-3 text-kente-purple" />
            Cultural Achievements
          </h2>
          
          <div className="space-y-3">
            {achievementsList.map((achievement) => (
              <div
                key={achievement.id}
                className={`
                  flex items-center space-x-4 p-4 rounded-xl transition-all duration-200
                  ${achievement.earned 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' 
                    : 'bg-gray-50 border border-gray-200 opacity-60'
                  }
                `}
              >
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${achievement.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.earned && (
                  <Check className="w-5 h-5 text-forest-green" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Level Progress</h2>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-3xl font-bold text-african-orange">Level {userProgress.currentLevel}</div>
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-african-brown to-african-orange h-4 rounded-full transition-all duration-500"
                style={{ width: `${(userProgress.totalXP % 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>{userProgress.totalXP % 100} Wisdom Points</span>
              <span>{100 - (userProgress.totalXP % 100)} points to Level {userProgress.currentLevel + 1}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600">
          Keep learning to reach the next level! You're doing great with {language.nativeName}.
        </p>
      </div>
    </div>
  );
}