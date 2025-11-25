import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import LoadingSpinner from '../LoadingSpinner';

interface AuthWrapperProps {
  children: React.ReactNode;
}

type AuthView = 'login' | 'register' | 'forgot-password';

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { isAuthenticated, isLoading, login, register, forgotPassword } = useAuth();
  const [currentView, setCurrentView] = useState<AuthView>('login');

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    switch (currentView) {
      case 'register':
        return (
          <RegisterForm
            onRegister={register}
            onSwitchToLogin={() => setCurrentView('login')}
            isLoading={isLoading}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onForgotPassword={forgotPassword}
            onBackToLogin={() => setCurrentView('login')}
            isLoading={isLoading}
          />
        );
      default:
        return (
          <LoginForm
            onLogin={login}
            onSwitchToRegister={() => setCurrentView('register')}
            onForgotPassword={() => setCurrentView('forgot-password')}
            isLoading={isLoading}
          />
        );
    }
  }

  return <>{children}</>;
}