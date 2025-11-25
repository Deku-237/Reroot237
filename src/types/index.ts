export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
  speakers: string;
  region: string;
  family: string;
  culturalNote: string;
}

export interface UserProgress {
  totalXP: number;
  streak: number;
  completedLessons: string[];
  currentLevel: number;
  lessonsCompleted: number;
  correctAnswers: number;
  totalAnswers: number;
  achievements: Achievement[];
  lastLearned: string | null;
  languageScores: Record<string, LanguageScore>;
  currentPath: string[];
}

export interface LanguageScore {
  languageId: string;
  totalXP: number;
  level: number;
  completedUnits: string[];
  currentUnit: number;
  accuracy: number;
  streakInLanguage: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  units: LearningUnit[];
  totalLessons: number;
  estimatedTime: string;
}

export interface LearningUnit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isLocked: boolean;
  requiredXP: number;
  icon: string;
  color: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export interface Exercise {
  id: string;
  type: 'translation' | 'multiple-choice' | 'audio' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string;
  audioUrl?: string;
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
  xpReward: number;
  category: string;
}

export interface CurrentLesson extends Lesson {
  currentExerciseIndex: number;
}

export interface CulturalContent {
  id: string;
  type: 'proverb' | 'story' | 'tradition' | 'history';
  title: string;
  content: string;
  translation: string;
  audioUrl?: string;
  imageUrl?: string;
}

export interface Avatar {
  id: string;
  name: string;
  region: string;
  clothing: string;
  description: string;
  imageUrl: string;
}