import React from 'react';
import { BookOpen, Trophy, Target, Users, TrendingUp, Calendar, Star, Map } from 'lucide-react';
import { Language, UserProgress, Lesson } from '../types';
import VuduMask from './VuduMask';
import LearningRoadmap from './LearningRoadmap';
import { LEARNING_PATHS } from '../data/lessons';

interface HomePageProps {
  language: Language;
  userProgress: UserProgress;
  onStartLesson: (lesson: Lesson) => void;
  lessons: Lesson[];
  onViewRoadmap: () => void;
}

export default function HomePage({ language, userProgress, onStartLesson, lessons, onViewRoadmap }: HomePageProps) {
  const nextLesson = lessons.find(lesson => 
    !userProgress.completedLessons.includes(lesson.id)
  );

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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-african-brown to-african-orange rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {language.id === 'fulfulde' ? 'A jam tan!' : 
               language.id === 'ewondo' ? 'Mbolo!' :
               language.id === 'duala' ? 'Mudolo!' :
               language.id === 'bamileke' ? 'Nchié!' :
               'Welcome back!'}
            </h1>
            <p className="text-lg opacity-90">
              Continue your journey learning {language.name}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <VuduMask 
              emotion="default"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-african-orange bg-opacity-20 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-african-orange" />
            </div>
            <span className="text-2xl font-bold text-african-orange">
              {languageScore.totalXP}
            </span>
          </div>
          <h3 className="font-bold text-gray-800 mb-1">Wisdom Points</h3>
          <p className="text-sm text-gray-600">In {language.name}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-forest-green bg-opacity-20 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-forest-green" />
            </div>
            <span className="text-2xl font-bold text-forest-green">
              {languageScore.streakInLanguage}
            </span>
          </div>
          <h3 className="font-bold text-gray-800 mb-1">Language Streak</h3>
          <p className="text-sm text-gray-600">Keep it going!</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-savanna-gold bg-opacity-20 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-savanna-gold" />
            </div>
            <span className="text-2xl font-bold text-savanna-gold">
              {languageScore.level}
            </span>
          </div>
          <h3 className="font-bold text-gray-800 mb-1">Level</h3>
          <p className="text-sm text-gray-600">Current level</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Continue Learning */}
        {nextLesson && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Continue Learning</h3>
                <p className="text-gray-600">{nextLesson.title}</p>
              </div>
              <VuduMask 
                emotion="default"
                size="sm"
              />
            </div>
            <button
              onClick={() => onStartLesson(nextLesson)}
              className="w-full bg-gradient-to-r from-african-orange to-savanna-gold text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Start Lesson
            </button>
          </div>
        )}
        
        {/* View Roadmap */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Learning Path</h3>
              <p className="text-gray-600">View your progress roadmap</p>
            </div>
            <Map className="w-8 h-8 text-kente-purple" />
          </div>
          <button
            onClick={onViewRoadmap}
            className="w-full bg-gradient-to-r from-kente-purple to-ndop-blue text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            View Roadmap
          </button>
        </div>
      </div>

      {/* Continue Learning */}
      {/* Cultural Insight */}
      <div className="bg-gradient-to-r from-african-brown to-earth-red rounded-2xl p-6 text-white">
        <div className="flex items-start space-x-4">
          <VuduMask 
            emotion="default"
            size="md"
          />
          <div className="flex-1">
            <h3 className="font-bold text-orange-100 mb-2">Cultural Insight</h3>
            <p className="text-orange-50 leading-relaxed">
              {language.id === 'fulfulde' ? 'In Fulani culture, respect for elders is paramount. Always greet the oldest person first and use formal language.' :
               language.id === 'ewondo' ? 'Beti people believe the forest holds ancestral spirits. Many expressions reference nature and forest wisdom.' :
               language.id === 'duala' ? 'Duala culture is deeply connected to water. Many greetings and blessings invoke protection from water spirits.' :
               language.id === 'bamileke' ? 'Bamiléké society values artistic expression and royal traditions. Greetings often acknowledge social hierarchy.' :
               'In this culture, greetings are very important. Always ask about someone\'s health and family before discussing other matters.'}
            </p>
            <p className="text-xs text-orange-200 mt-2 italic">{language.name} tradition</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
        
        <div className="space-y-4">
          {userProgress.completedLessons.slice(-3).map((lessonId) => {
            const lesson = lessons.find(l => l.id === lessonId);
            if (!lesson) return null;
            
            return (
              <div key={lessonId} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <VuduMask 
                    emotion="celebrating"
                    size="sm"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                </div>
                <div className="text-forest-green font-bold">+{lesson.xpReward} WP</div>
              </div>
            );
          })}
          
          {userProgress.completedLessons.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start your first lesson to see your progress here!</p>
            </div>
          )}
        </div>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200">
          <TrendingUp className="w-8 h-8 text-african-orange mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {languageScore.accuracy}%
          </div>
          <p className="text-sm text-gray-600">Accuracy</p>
        </div>

        <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200">
          <Calendar className="w-8 h-8 text-forest-green mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {languageScore.completedUnits.length}
          </div>
          <p className="text-sm text-gray-600">Units</p>
        </div>

        <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200">
          <Users className="w-8 h-8 text-savanna-gold mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {userProgress.completedLessons.length}
          </div>
          <p className="text-sm text-gray-600">Lessons</p>
        </div>

        <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200">
          <Target className="w-8 h-8 text-kente-purple mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {Math.round((userProgress.completedLessons.length / lessons.length) * 100)}%
          </div>
          <p className="text-sm text-gray-600">Progress</p>
        </div>
      </div>
    </div>
  );
}