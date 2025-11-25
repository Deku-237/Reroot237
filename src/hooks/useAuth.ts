import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../config/supabase';
import { User, LoginCredentials, RegisterData, AuthState } from '../types/auth';
import AuthService, { AuthError } from '../services/authService';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    tokens: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const authService = AuthService.getInstance();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const user: User = {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name || 'User',
            preferredLanguage: session.user.user_metadata?.preferred_language || 'en',
            emailVerified: session.user.email_confirmed_at ? true : false,
            profilePicture: session.user.user_metadata?.profile_picture || null,
            createdAt: session.user.created_at,
            lastLogin: session.user.last_sign_in_at || null
          };

          setAuthState({
            user,
            tokens: {
              accessToken: session.access_token,
              refreshToken: session.refresh_token
            },
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          setAuthState({
            user: null,
            tokens: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthState({
          user: null,
          tokens: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (session?.user) {
          const user: User = {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name || 'User',
            preferredLanguage: session.user.user_metadata?.preferred_language || 'en',
            emailVerified: session.user.email_confirmed_at ? true : false,
            profilePicture: session.user.user_metadata?.profile_picture || null,
            createdAt: session.user.created_at,
            lastLogin: session.user.last_sign_in_at || null
          };

          setAuthState({
            user,
            tokens: {
              accessToken: session.access_token,
              refreshToken: session.refresh_token
            },
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          setAuthState({
            user: null,
            tokens: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      })();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      const result = await authService.login(credentials);
      const { data: { session } } = await supabase.auth.getSession();

      setAuthState({
        user: result.user,
        tokens: session ? {
          accessToken: session.access_token,
          refreshToken: session.refresh_token
        } : null,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, [authService]);

  const register = useCallback(async (data: RegisterData): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      await authService.register(data);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, [authService]);

  const logout = useCallback(async (): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      await authService.logout();
      setAuthState({
        user: null,
        tokens: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      setAuthState({
        user: null,
        tokens: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, [authService]);

  const forgotPassword = useCallback(async (email: string): Promise<string> => {
    const result = await authService.forgotPassword(email);
    return result.message;
  }, [authService]);

  return {
    ...authState,
    login,
    register,
    logout,
    forgotPassword,
  };
}
