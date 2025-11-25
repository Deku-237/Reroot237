import { UserProgress } from '../types';

export function getInitialProgress(): UserProgress {
  return {
    totalXP: 0,
    streak: 0,
    completedLessons: [],
    currentLevel: 1,
    lessonsCompleted: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    achievements: [],
    lastLearned: null,
    languageScores: {},
    currentPath: []
  };
}

export function updateUserProgress(
  currentProgress: UserProgress, 
  earnedXP: number, 
  isCorrect: boolean
): UserProgress {
  const newTotalXP = currentProgress.totalXP + earnedXP;
  const newLevel = Math.floor(newTotalXP / 100) + 1;
  
  return {
    ...currentProgress,
    totalXP: newTotalXP,
    currentLevel: newLevel,
    correctAnswers: isCorrect ? currentProgress.correctAnswers + 1 : currentProgress.correctAnswers,
    totalAnswers: currentProgress.totalAnswers + 1,
    lastLearned: new Date().toISOString()
  };
}

export function completeLessonProgress(
  currentProgress: UserProgress,
  lessonId: string
): UserProgress {
  const today = new Date().toDateString();
  const lastLearned = currentProgress.lastLearned ? new Date(currentProgress.lastLearned).toDateString() : null;
  const newStreak = lastLearned === today ? currentProgress.streak : currentProgress.streak + 1;
  
  return {
    ...currentProgress,
    completedLessons: [...currentProgress.completedLessons, lessonId],
    lessonsCompleted: currentProgress.lessonsCompleted + 1,
    streak: newStreak,
    lastLearned: new Date().toISOString()
  };
}