import React, { useState, useEffect } from 'react';
import { Trophy, Flame } from 'lucide-react';
import HomePage from './components/HomePage';
import LessonInterface from './components/LessonInterface';
import ProgressDashboard from './components/ProgressDashboard';
import LanguageSelector from './components/LanguageSelector';
import LearningRoadmap from './components/LearningRoadmap';
import Navigation from './components/Navigation';
import ReRootLogo from './components/ReRootLogo';
import { UserProgress, Language, CurrentLesson, Lesson, LanguageScore } from './types';
import { getInitialProgress, updateUserProgress } from './utils/progressManager';
import { AVAILABLE_LANGUAGES } from './data/languages';
import { LEARNING_PATHS, EMPTY_LEARNING_PATH } from './data/lessons';
import { LanguageAPI } from './api/languageAPI';
import { progressService } from './services/progressService';
import { supabase } from './config/supabase';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'lesson' | 'progress' | 'languages' | 'roadmap'>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>(getInitialProgress());
  const [currentLesson, setCurrentLesson] = useState<CurrentLesson | null>(null);
  const [languageLessons, setLanguageLessons] = useState<Lesson[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [lessonStartTime, setLessonStartTime] = useState<number>(0);

  useEffect(() => {
    const initializeUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        await loadProgressFromDatabase(user.id);
      }
    };

    initializeUser();

    const savedLanguage = localStorage.getItem('selectedLanguage');
    const savedProgress = localStorage.getItem('userProgress');

    if (savedLanguage) {
      const language = AVAILABLE_LANGUAGES.find(lang => lang.id === savedLanguage);
      if (language) setSelectedLanguage(language);
    }

    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      if (!parsed.languageScores) {
        parsed.languageScores = {};
      }
      setUserProgress(parsed);
    }
  }, []);

  const loadProgressFromDatabase = async (uid: string) => {
    const languageProgressData = await progressService.getAllLanguageProgress(uid);
    const userProgressData = await progressService.getUserProgress(uid);

    if (userProgressData || Object.keys(languageProgressData).length > 0) {
      setUserProgress(prev => ({
        ...prev,
        totalXP: userProgressData?.total_xp || prev.totalXP,
        currentLevel: userProgressData?.current_level || prev.currentLevel,
        streak: userProgressData?.streak || prev.streak,
        languageScores: Object.entries(languageProgressData).reduce((acc, [langId, progress]) => ({
          ...acc,
          [langId]: {
            languageId: langId,
            totalXP: progress.total_xp,
            level: progress.level,
            completedUnits: [],
            currentUnit: progress.current_unit,
            accuracy: progress.accuracy,
            streakInLanguage: progress.streak
          }
        }), {} as Record<string, LanguageScore>)
      }));
    }
  };

  useEffect(() => {
    if (selectedLanguage) {
      const fetchLessons = async () => {
        const lessons = await LanguageAPI.getLessons(selectedLanguage.id);
        console.log('Fetched lessons for', selectedLanguage.id, ':', lessons);
        setLanguageLessons(lessons);
      };
      fetchLessons();

      // Initialize language score if it doesn't exist
      setUserProgress((prevProgress) => {
        if (!prevProgress.languageScores[selectedLanguage.id]) {
          const newProgress = {
            ...prevProgress,
            languageScores: {
              ...prevProgress.languageScores,
              [selectedLanguage.id]: {
                languageId: selectedLanguage.id,
                totalXP: 0,
                level: 1,
                completedUnits: [],
                currentUnit: 0,
                accuracy: 0,
                streakInLanguage: 0
              }
            }
          };
          localStorage.setItem('userProgress', JSON.stringify(newProgress));
          return newProgress;
        }
        return prevProgress;
      });
    }
  }, [selectedLanguage]);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language.id);
    setCurrentView('home');
  };

  const handleLessonComplete = async (earnedXP: number, isCorrect: boolean) => {
    const newProgress = updateUserProgress(userProgress, earnedXP, isCorrect);

    if (selectedLanguage) {
      const languageScore = newProgress.languageScores[selectedLanguage.id] || {
        languageId: selectedLanguage.id,
        totalXP: 0,
        level: 1,
        completedUnits: [],
        currentUnit: 0,
        accuracy: 0,
        streakInLanguage: 0
      };

      const updatedLanguageScore = {
        ...languageScore,
        totalXP: languageScore.totalXP + earnedXP,
        level: Math.floor((languageScore.totalXP + earnedXP) / 100) + 1,
        accuracy: Math.round(((languageScore.accuracy * languageScore.totalXP) + (isCorrect ? earnedXP : 0)) / (languageScore.totalXP + earnedXP))
      };

      newProgress.languageScores[selectedLanguage.id] = updatedLanguageScore;
    }

    setUserProgress(newProgress);
    localStorage.setItem('userProgress', JSON.stringify(newProgress));

    if (userId && currentLesson && selectedLanguage) {
      const timeSpent = Math.floor((Date.now() - lessonStartTime) / 1000);
      await progressService.saveLessonCompletion(userId, {
        lesson_id: currentLesson.id,
        language_id: selectedLanguage.id,
        score: isCorrect ? 100 : 0,
        xp_earned: earnedXP,
        time_spent: timeSpent
      });

      await progressService.updateUserProgress(userId, earnedXP, isCorrect);
    }
  };

  const handleStartLesson = (lesson: CurrentLesson) => {
    setCurrentLesson(lesson);
    setLessonStartTime(Date.now());
    setCurrentView('lesson');
  };

  const handleViewRoadmap = () => {
    setCurrentView('roadmap');
  };

  const handleUnitSelect = (unitId: string) => {
    // Find the first lesson in the selected unit
    if (selectedLanguage) {
      const path = LEARNING_PATHS[selectedLanguage.id];
      const unit = path?.units.find(u => u.id === unitId);
      if (unit && unit.lessons.length > 0) {
        const firstLessonId = unit.lessons[0];
        const lesson = languageLessons.find(l => l.id === firstLessonId);
        if (lesson) {
          handleStartLesson(lesson);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ReRootLogo 
                size="md"
                showText={false}
              />
              <h1 className="text-xl font-bold text-gray-800">ReRoot</h1>
              {selectedLanguage && (
                <span className="text-sm text-african-orange bg-orange-50 px-3 py-1 rounded-full font-medium">
                  Learning {selectedLanguage.nativeName}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-orange-500">
                <Flame className="w-5 h-5" />
                <span className="font-bold">{userProgress.streak}</span>
              </div>
              <div className="flex items-center space-x-2 text-african-orange">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">{userProgress.totalXP}</span>
              </div>
            </div>
          </div>
        </header>

        <Navigation 
          currentView={currentView} 
          onViewChange={setCurrentView}
          hasSelectedLanguage={!!selectedLanguage}
        />

        <main className="max-w-6xl mx-auto px-4 py-8">
          {!selectedLanguage ? (
            <LanguageSelector 
              languages={AVAILABLE_LANGUAGES}
              onLanguageSelect={handleLanguageSelect}
            />
          ) : (
            <>
              {currentView === 'home' && (
                <HomePage 
                  language={selectedLanguage}
                  userProgress={userProgress}
                  onStartLesson={handleStartLesson}
                  lessons={languageLessons}
                  onViewRoadmap={handleViewRoadmap}
                />
              )}
              
              {currentView === 'roadmap' && (
                <LearningRoadmap 
                  learningPath={LEARNING_PATHS[selectedLanguage.id] || EMPTY_LEARNING_PATH}
                  userProgress={userProgress}
                  language={selectedLanguage}
                  onUnitSelect={handleUnitSelect}
                />
              )}
              
              {currentView === 'lesson' && currentLesson && (
                <LessonInterface 
                  lesson={currentLesson}
                  onComplete={handleLessonComplete}
                  onExit={() => setCurrentView('home')}
                  language={selectedLanguage}
                />
              )}
              
              {currentView === 'progress' && (
                <ProgressDashboard 
                  userProgress={userProgress}
                  language={selectedLanguage}
                />
              )}
              
              {currentView === 'languages' && (
                <LanguageSelector 
                  languages={AVAILABLE_LANGUAGES}
                  onLanguageSelect={handleLanguageSelect}
                  currentLanguage={selectedLanguage}
                />
              )}
            </>
          )}
        </main>
      </div>
  );
}

export default App;