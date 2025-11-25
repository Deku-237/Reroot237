import React from 'react';
import ReRootLogo from './ReRootLogo';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-african-brown via-african-orange to-savanna-gold flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse mb-4">
          <ReRootLogo size="xxl" />
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg font-medium">Loading your heritage journey...</p>
      </div>
    </div>
  );
}