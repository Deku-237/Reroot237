import { supabase } from '../config/supabase';

export interface LessonCompletion {
  lesson_id: string;
  language_id: string;
  score: number;
  xp_earned: number;
  time_spent: number;
}

export interface LanguageProgress {
  language_id: string;
  total_xp: number;
  level: number;
  current_unit: number;
  accuracy: number;
  streak: number;
  completed_lessons: string[];
}

export const progressService = {
  async saveLessonCompletion(userId: string, completion: LessonCompletion) {
    const { data, error } = await supabase
      .from('lesson_completions')
      .insert({
        user_id: userId,
        ...completion
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error saving lesson completion:', error);
      return null;
    }

    await this.updateLanguageProgress(userId, completion);

    return data;
  },

  async updateLanguageProgress(userId: string, completion: LessonCompletion) {
    const { data: existingProgress } = await supabase
      .from('language_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('language_id', completion.language_id)
      .maybeSingle();

    if (existingProgress) {
      const completedLessons = existingProgress.completed_lessons || [];
      if (!completedLessons.includes(completion.lesson_id)) {
        completedLessons.push(completion.lesson_id);
      }

      const newTotalXp = (existingProgress.total_xp || 0) + completion.xp_earned;
      const newLevel = Math.floor(newTotalXp / 100) + 1;

      const { error } = await supabase
        .from('language_progress')
        .update({
          total_xp: newTotalXp,
          level: newLevel,
          completed_lessons: completedLessons,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('language_id', completion.language_id);

      if (error) {
        console.error('Error updating language progress:', error);
      }
    } else {
      const { error } = await supabase
        .from('language_progress')
        .insert({
          user_id: userId,
          language_id: completion.language_id,
          total_xp: completion.xp_earned,
          level: 1,
          current_unit: 0,
          accuracy: completion.score,
          streak: 0,
          completed_lessons: [completion.lesson_id]
        });

      if (error) {
        console.error('Error creating language progress:', error);
      }
    }
  },

  async getLanguageProgress(userId: string, languageId: string): Promise<LanguageProgress | null> {
    const { data, error } = await supabase
      .from('language_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('language_id', languageId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching language progress:', error);
      return null;
    }

    return data as LanguageProgress;
  },

  async getAllLanguageProgress(userId: string): Promise<Record<string, LanguageProgress>> {
    const { data, error } = await supabase
      .from('language_progress')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching all language progress:', error);
      return {};
    }

    const progressMap: Record<string, LanguageProgress> = {};
    data?.forEach((progress: any) => {
      progressMap[progress.language_id] = progress;
    });

    return progressMap;
  },

  async getUserProgress(userId: string) {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user progress:', error);
      return null;
    }

    return data;
  },

  async updateUserProgress(userId: string, xpEarned: number, isCorrect: boolean) {
    const { data: existingProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (existingProgress) {
      const newTotalXp = (existingProgress.total_xp || 0) + xpEarned;
      const newLevel = Math.floor(newTotalXp / 100) + 1;
      const newCorrectAnswers = isCorrect ? (existingProgress.correct_answers || 0) + 1 : existingProgress.correct_answers;
      const newTotalAnswers = (existingProgress.total_answers || 0) + 1;

      const { error } = await supabase
        .from('user_progress')
        .update({
          total_xp: newTotalXp,
          current_level: newLevel,
          correct_answers: newCorrectAnswers,
          total_answers: newTotalAnswers,
          last_learned: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) {
        console.error('Error updating user progress:', error);
      }
    } else {
      const { error } = await supabase
        .from('user_progress')
        .insert({
          user_id: userId,
          total_xp: xpEarned,
          current_level: 1,
          streak: 0,
          lessons_completed: 0,
          correct_answers: isCorrect ? 1 : 0,
          total_answers: 1,
          last_learned: new Date().toISOString()
        });

      if (error) {
        console.error('Error creating user progress:', error);
      }
    }
  }
};
