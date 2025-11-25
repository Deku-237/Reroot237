import React, { useState } from 'react';
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { AuthError } from '../../services/authService';
import ReRootLogo from '../ReRootLogo';

interface ForgotPasswordFormProps {
  onForgotPassword: (email: string) => Promise<string>;
  onBackToLogin: () => void;
  isLoading: boolean;
}

export default function ForgotPasswordForm({ onForgotPassword, onBackToLogin, isLoading }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const message = await onForgotPassword(email);
      setSuccess(message);
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.message);
      } else {
        setError('Failed to send reset email. Please try again.');
      }
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
          <p className="text-gray-600">Enter your email to receive reset instructions</p>
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

        {!success ? (
          <>
            {/* Reset Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-african-orange focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-african-orange to-savanna-gold text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </form>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-blue-800 text-sm">
                We'll send you an email with instructions to reset your password. 
                Please check your inbox and spam folder.
              </p>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="text-center">
            <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">Email Sent!</h3>
              <p className="text-green-700 text-sm">
                Check your email for password reset instructions. The link will expire in 1 hour.
              </p>
            </div>
          </div>
        )}

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <button
            onClick={onBackToLogin}
            className="inline-flex items-center space-x-2 text-african-orange hover:text-orange-600 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </button>
        </div>

        {/* Cultural Message */}
        <div className="mt-8 p-4 bg-gradient-to-r from-african-brown to-earth-red rounded-xl text-white text-center">
          <p className="text-sm italic">
            "Every new beginning comes from some other beginning's end"
          </p>
          <p className="text-xs mt-1 opacity-80">African Wisdom</p>
        </div>
      </div>
    </div>
  );
}