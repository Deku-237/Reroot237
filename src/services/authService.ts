import { supabase } from '../config/supabase';
import { User, LoginCredentials, RegisterData, AuthError } from '../types/auth';

class AuthService {
  private static instance: AuthService;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async register(data: RegisterData): Promise<{ user: User; message: string }> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            preferred_language: data.language || 'en'
          }
        }
      });

      if (error) {
        throw new AuthError(error.message, error.status?.toString() || 'SIGNUP_ERROR');
      }

      if (!authData.user) {
        throw new AuthError('Registration failed', 'NO_USER');
      }

      const user: User = {
        id: authData.user.id,
        email: authData.user.email!,
        name: data.name,
        preferredLanguage: data.language || 'en',
        emailVerified: authData.user.email_confirmed_at ? true : false,
        profilePicture: null,
        createdAt: authData.user.created_at,
        lastLogin: null
      };

      return {
        user,
        message: 'Registration successful! You can now log in.'
      };
    } catch (error: any) {
      if (error instanceof AuthError) throw error;
      throw new AuthError(
        error.message || 'Registration failed. Please try again.',
        'NETWORK_ERROR'
      );
    }
  }

  async login(credentials: LoginCredentials): Promise<{ user: User; message: string }> {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        throw new AuthError(error.message, error.status?.toString() || 'LOGIN_ERROR');
      }

      if (!authData.user) {
        throw new AuthError('Login failed', 'NO_USER');
      }

      const user: User = {
        id: authData.user.id,
        email: authData.user.email!,
        name: authData.user.user_metadata?.name || 'User',
        preferredLanguage: authData.user.user_metadata?.preferred_language || 'en',
        emailVerified: authData.user.email_confirmed_at ? true : false,
        profilePicture: authData.user.user_metadata?.profile_picture || null,
        createdAt: authData.user.created_at,
        lastLogin: new Date().toISOString()
      };

      return {
        user,
        message: 'Login successful!'
      };
    } catch (error: any) {
      if (error instanceof AuthError) throw error;
      throw new AuthError(
        error.message || 'Login failed. Please try again.',
        'NETWORK_ERROR'
      );
    }
  }

  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        throw new AuthError('No authenticated user', 'NO_USER');
      }

      return {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.name || 'User',
        preferredLanguage: user.user_metadata?.preferred_language || 'en',
        emailVerified: user.email_confirmed_at ? true : false,
        profilePicture: user.user_metadata?.profile_picture || null,
        createdAt: user.created_at,
        lastLogin: user.last_sign_in_at || null
      };
    } catch (error: any) {
      if (error instanceof AuthError) throw error;
      throw new AuthError('Failed to get user information', 'NETWORK_ERROR');
    }
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        throw new AuthError(error.message, 'PASSWORD_RESET_ERROR');
      }

      return {
        message: 'Password reset email sent. Please check your inbox.'
      };
    } catch (error: any) {
      if (error instanceof AuthError) throw error;
      throw new AuthError('Failed to send reset email', 'NETWORK_ERROR');
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  }

  async getStoredUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return null;

      return {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.name || 'User',
        preferredLanguage: user.user_metadata?.preferred_language || 'en',
        emailVerified: user.email_confirmed_at ? true : false,
        profilePicture: user.user_metadata?.profile_picture || null,
        createdAt: user.created_at,
        lastLogin: user.last_sign_in_at || null
      };
    } catch {
      return null;
    }
  }
}

class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export { AuthError };
export default AuthService;
