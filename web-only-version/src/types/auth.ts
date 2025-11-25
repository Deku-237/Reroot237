export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  profilePicture?: string;
  preferredLanguage: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  language?: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthError {
  message: string;
  code: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}