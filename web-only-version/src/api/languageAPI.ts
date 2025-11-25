import { Language, Lesson, CulturalContent } from '../types';
import { AVAILABLE_LANGUAGES } from '../data/languages';
import { SAMPLE_LESSONS, CULTURAL_CONTENT } from '../data/lessons';

// Simulated API endpoints for language learning content
export class LanguageAPI {
  private static baseURL = '/api/v1';

  // Get all available languages
  static async getLanguages(): Promise<Language[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(AVAILABLE_LANGUAGES), 100);
    });
  }

  // Get lessons for a specific language
  static async getLessons(languageId: string): Promise<Lesson[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lessons = SAMPLE_LESSONS[languageId] || [];
        resolve(lessons);
      }, 200);
    });
  }

  // Get cultural content for a language
  static async getCulturalContent(languageId: string): Promise<CulturalContent[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const content = CULTURAL_CONTENT[languageId] || [];
        resolve(content);
      }, 150);
    });
  }

  // Get pronunciation audio URL
  static async getPronunciationAudio(languageId: string, text: string): Promise<string> {
    // In a real implementation, this would call a text-to-speech service
    // with native speaker recordings
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`/audio/${languageId}/${encodeURIComponent(text)}.mp3`);
      }, 100);
    });
  }

  // Submit lesson completion
  static async submitLessonCompletion(
    userId: string, 
    lessonId: string, 
    score: number,
    timeSpent: number
  ): Promise<{ success: boolean; xpEarned: number }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const xpEarned = Math.floor(score * 20);
        resolve({ success: true, xpEarned });
      }, 300);
    });
  }

  // Get user progress
  static async getUserProgress(userId: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const savedProgress = localStorage.getItem(`progress_${userId}`);
        resolve(savedProgress ? JSON.parse(savedProgress) : null);
      }, 100);
    });
  }

  // Save user progress
  static async saveUserProgress(userId: string, progress: any): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(`progress_${userId}`, JSON.stringify(progress));
        resolve(true);
      }, 100);
    });
  }
}

// Offline capability for areas with limited internet
export class OfflineManager {
  private static CACHE_KEY = 'camlingo_offline_data';

  static async cacheLanguageData(languageId: string): Promise<void> {
    try {
      const [lessons, culturalContent] = await Promise.all([
        LanguageAPI.getLessons(languageId),
        LanguageAPI.getCulturalContent(languageId)
      ]);

      const cacheData = {
        languageId,
        lessons,
        culturalContent,
        cachedAt: Date.now()
      };

      localStorage.setItem(`${this.CACHE_KEY}_${languageId}`, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Failed to cache language data:', error);
    }
  }

  static getCachedLanguageData(languageId: string): { lessons: Lesson[]; culturalContent: CulturalContent[] } | null {
    try {
      const cached = localStorage.getItem(`${this.CACHE_KEY}_${languageId}`);
      if (!cached) return null;

      const data = JSON.parse(cached);
      const isExpired = Date.now() - data.cachedAt > 7 * 24 * 60 * 60 * 1000; // 7 days

      if (isExpired) {
        localStorage.removeItem(`${this.CACHE_KEY}_${languageId}`);
        return null;
      }

      return {
        lessons: data.lessons,
        culturalContent: data.culturalContent
      };
    } catch (error) {
      console.error('Failed to retrieve cached data:', error);
      return null;
    }
  }

  static isOnline(): boolean {
    return navigator.onLine;
  }
}