import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { RegisterData } from '../../types/auth';
import { AuthError } from '../../services/authService';
import ReRootLogo from '../ReRootLogo';

interface RegisterFormProps {
  onRegister: (data: RegisterData) => Promise<void>;
  onSwitchToLogin: () => void;
  isLoading: boolean;
}

export default function RegisterForm({ onRegister, onSwitchToLogin, isLoading }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    name: '',
    language: 'en',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
    };
    return requirements;
  };

  const passwordRequirements = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🎯 Registration form submitted');
    console.log('📝 Form data:', { 
      email: formData.email, 
      name: formData.name, 
      language: formData.language,
      passwordLength: formData.password.length 
    });
    
    setError('');
    setSuccess('');
    setFieldErrors({});

    // Validate form
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!isPasswordValid) {
      errors.password = 'Password does not meet requirements';
    }

    if (Object.keys(errors).length > 0) {
      console.log('❌ Form validation failed:', errors);
      setFieldErrors(errors);
      return;
    }

    console.log('✅ Form validation passed, calling registration API...');
    
    try {
      await onRegister(formData);
      console.log('🎉 Registration completed successfully!');
      setSuccess('Account created successfully! Please check your email to verify your account.');
    } catch (err) {
      console.error('💥 Registration failed in form component:', err);
      console.error('💥 Error details:', {
        name: err.name,
        message: err.message,
        code: err.code,
        details: err.details
      });
      
      if (err instanceof AuthError) {
        console.log('🔍 Handling AuthError:', err.code);
        if (err.details) {
          console.log('📋 Setting field errors:', err.details);
          const newFieldErrors: Record<string, string> = {};
          err.details.forEach(detail => {
            newFieldErrors[detail.field] = detail.message;
          });
          setFieldErrors(newFieldErrors);
        } else {
          console.log('⚠️ Setting general error message:', err.message);
          setError(err.message);
        }
      } else {
        console.error('🚨 Unknown error type:', err);
        setError('Registration failed. Please try again.');
      }
    }
  };

  const handleInputChange = (field: keyof RegisterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-african-brown via-african-orange to-savanna-gold flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ReRootLogo size="xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Join ReRoot</h1>
          <p className="text-gray-600">Start your journey to reconnect with your heritage</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-african-orange focus:border-transparent ${
                  fieldErrors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
                required
              />
            </div>
            {fieldErrors.name && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-african-orange focus:border-transparent ${
                  fieldErrors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
                required
              />
            </div>
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-african-orange focus:border-transparent ${
                  fieldErrors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Create a strong password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
            )}

            {/* Password Requirements */}
            {formData.password && (
              <div className="mt-3 space-y-1">
                <p className="text-xs font-medium text-gray-700">Password must contain:</p>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  <div className={`flex items-center space-x-2 ${passwordRequirements.length ? 'text-green-600' : 'text-gray-400'}`}>
                    <span>{passwordRequirements.length ? '✓' : '○'}</span>
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                    <span>{passwordRequirements.uppercase ? '✓' : '○'}</span>
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                    <span>{passwordRequirements.lowercase ? '✓' : '○'}</span>
                    <span>One lowercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${passwordRequirements.number ? 'text-green-600' : 'text-gray-400'}`}>
                    <span>{passwordRequirements.number ? '✓' : '○'}</span>
                    <span>One number</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${passwordRequirements.special ? 'text-green-600' : 'text-gray-400'}`}>
                    <span>{passwordRequirements.special ? '✓' : '○'}</span>
                    <span>One special character (@$!%*?&)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Language Preference */}
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Language
            </label>
            <select
              id="language"
              value={formData.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-african-orange focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading || !isPasswordValid}
            className="w-full bg-gradient-to-r from-african-orange to-savanna-gold text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-african-orange hover:text-orange-600 font-semibold"
            >
              Sign In
            </button>
          </p>
        </div>

        {/* Cultural Message */}
        <div className="mt-8 p-4 bg-gradient-to-r from-african-brown to-earth-red rounded-xl text-white text-center">
          <p className="text-sm italic">
            "The roots of education are bitter, but the fruit is sweet"
          </p>
          <p className="text-xs mt-1 opacity-80">African Proverb</p>
        </div>
      </div>
    </div>
  );
}