import React from 'react';
import { Lock, Star, Trophy, CheckCircle, Circle } from 'lucide-react';
import { LearningPath, UserProgress, Language } from '../types';

interface LearningRoadmapProps {
  learningPath: LearningPath;
  userProgress: UserProgress;
  language: Language;
  onUnitSelect: (unitId: string) => void;
}

export default function LearningRoadmap({ learningPath, userProgress, language, onUnitSelect }: LearningRoadmapProps) {
  // Safety check to prevent undefined errors
  if (!learningPath || !learningPath.units) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Learning Path Coming Soon</h1>
        <p className="text-gray-600">We're preparing an amazing learning journey for {language.name}!</p>
      </div>
    );
  }

  const languageScore = userProgress.languageScores[language.id] || {
    languageId: language.id,
    totalXP: 0,
    level: 1,
    completedUnits: [],
    currentUnit: 0,
    accuracy: 0,
    streakInLanguage: 0
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{language.flag}</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{learningPath.title}</h1>
        <p className="text-gray-600 mb-4">{learningPath.description}</p>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <span>{learningPath.totalLessons} lessons</span>
          <span>{learningPath.estimatedTime}</span>
        </div>
      </div>

      {/* Language Score */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Your Progress</h2>
            <p className="text-gray-600">Level {languageScore.level} • {languageScore.totalXP} XP</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-african-orange">{languageScore.accuracy}%</div>
              <div className="text-xs text-gray-500">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-forest-green">{languageScore.streakInLanguage}</div>
              <div className="text-xs text-gray-500">Streak</div>
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-african-orange to-savanna-gold h-3 rounded-full transition-all duration-500"
            style={{ width: `${(languageScore.totalXP % 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {100 - (languageScore.totalXP % 100)} XP until Level {languageScore.level + 1}
        </p>
      </div>

      {/* Learning Path */}
      <div className="space-y-6">
        {learningPath.units.map((unit, index) => {
          const isCompleted = languageScore.completedUnits.includes(unit.id);
          const isUnlocked = !unit.isLocked || languageScore.totalXP >= unit.requiredXP;
          const isCurrent = index === languageScore.currentUnit;
          
          return (
            <div key={unit.id} className="relative">
              {/* Connection line to next unit */}
              {index < learningPath.units.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-12 bg-gray-300 z-0"></div>
              )}
              
              <div 
                className={`
                  relative z-10 bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer
                  ${isCompleted 
                    ? 'border-forest-green bg-green-50' 
                    : isCurrent && isUnlocked
                    ? 'border-african-orange bg-orange-50 shadow-xl'
                    : isUnlocked
                    ? 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
                    : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                  }
                `}
                onClick={() => isUnlocked && onUnitSelect(unit.id)}
              >
                <div className="flex items-center space-x-4">
                  {/* Unit Icon */}
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg
                    ${isCompleted 
                      ? 'bg-forest-green text-white' 
                      : isUnlocked
                      ? `bg-gradient-to-r ${unit.color} text-white`
                      : 'bg-gray-300 text-gray-500'
                    }
                  `}>
                    {isCompleted ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : isUnlocked ? (
                      <span>{unit.icon}</span>
                    ) : (
                      <Lock className="w-6 h-6" />
                    )}
                  </div>
                  
                  {/* Unit Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{unit.title}</h3>
                    <p className="text-gray-600 mb-2">{unit.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-500">{unit.lessons.length} lessons</span>
                      {!isUnlocked && (
                        <span className="text-orange-500">Requires {unit.requiredXP} XP</span>
                      )}
                      {isCompleted && (
                        <span className="text-forest-green font-semibold">✓ Completed</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="text-right">
                    {isCompleted ? (
                      <Trophy className="w-6 h-6 text-savanna-gold" />
                    ) : isCurrent ? (
                      <Star className="w-6 h-6 text-african-orange" />
                    ) : isUnlocked ? (
                      <Circle className="w-6 h-6 text-gray-400" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {/* Lesson Progress Bar */}
                {isUnlocked && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isCompleted 
                            ? 'bg-forest-green' 
                            : `bg-gradient-to-r ${unit.color}`
                        }`}
                        style={{ 
                          width: `${isCompleted ? 100 : (unit.lessons.filter(lessonId => 
                            userProgress.completedLessons.includes(lessonId)
                          ).length / unit.lessons.length) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {unit.lessons.filter(lessonId => userProgress.completedLessons.includes(lessonId)).length} / {unit.lessons.length} lessons
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Achievement Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Language Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-lg font-bold text-gray-800">{languageScore.completedUnits.length}</div>
            <div className="text-xs text-gray-500">Units Completed</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-lg font-bold text-gray-800">{userProgress.completedLessons.length}</div>
            <div className="text-xs text-gray-500">Lessons Done</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-lg font-bold text-gray-800">{languageScore.streakInLanguage}</div>
            <div className="text-xs text-gray-500">Day Streak</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl mb-2">🏆</div>
            <div className="text-lg font-bold text-gray-800">{languageScore.level}</div>
            <div className="text-xs text-gray-500">Current Level</div>
          </div>
        </div>
      </div>
    </div>
  );
}