import React, { useState, useEffect } from 'react';
import { User, Settings, Trophy, Flame, LogOut } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import AuthWrapper from './components/auth/AuthWrapper';
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

function App() {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'lesson' | 'progress' | 'languages' | 'roadmap'>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>(getInitialProgress());
  const [currentLesson, setCurrentLesson] = useState<CurrentLesson | null>(null);
  const [languageLessons, setLanguageLessons] = useState<Lesson[]>([]);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const savedProgress = localStorage.getItem('userProgress');
    
    if (savedLanguage) {
      const language = AVAILABLE_LANGUAGES.find(lang => lang.id === savedLanguage);
      if (language) setSelectedLanguage(language);
    }
    
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      // Ensure languageScores exists
      if (!parsed.languageScores) {
        parsed.languageScores = {};
      }
      setUserProgress(parsed);
    }
  }, []);

  useEffect(() => {
    if (selectedLanguage) {
      const fetchLessons = async () => {
        const lessons = await LanguageAPI.getLessons(selectedLanguage.id);
        setLanguageLessons(lessons);
      };
      fetchLessons();
      
      // Initialize language score if it doesn't exist
      if (!userProgress.languageScores[selectedLanguage.id]) {
        const newProgress = {
          ...userProgress,
          languageScores: {
            ...userProgress.languageScores,
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
        setUserProgress(newProgress);
        localStorage.setItem('userProgress', JSON.stringify(newProgress));
      }
    }
  }, [selectedLanguage, userProgress.languageScores]);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language.id);
    setCurrentView('home');
  };

  const handleLessonComplete = (earnedXP: number, isCorrect: boolean) => {
    const newProgress = updateUserProgress(userProgress, earnedXP, isCorrect);
    
    // Update language-specific score
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
  };

  const handleStartLesson = (lesson: CurrentLesson) => {
    setCurrentLesson(lesson);
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

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <AuthWrapper>
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
              
              {/* User Menu */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-100"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
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
    </AuthWrapper>
  );
}

export default App;