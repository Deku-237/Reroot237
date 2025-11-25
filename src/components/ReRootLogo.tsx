import React from 'react';

interface ReRootLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
  showText?: boolean;
}

export default function ReRootLogo({ 
  size = 'md', 
  className = '',
  showText = false 
}: ReRootLogoProps) {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    xxl: 'w-32 h-32'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
    xxl: 'text-4xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img 
        src="/favicon.ico" 
        alt="ReRoot Logo" 
        className={`${sizeClasses[size]} object-contain rounded-lg`}
      />
      
      {showText && (
        <span className={`font-bold text-gray-800 ${textSizeClasses[size]}`}>
          ReRoot
        </span>
      )}
    </div>
  );
}