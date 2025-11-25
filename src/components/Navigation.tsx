import React from 'react';
import { Home, BarChart3, Globe, Map } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: 'home' | 'lesson' | 'progress' | 'languages' | 'roadmap') => void;
  hasSelectedLanguage: boolean;
}

export default function Navigation({ currentView, onViewChange, hasSelectedLanguage }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Learn', icon: Home, disabled: !hasSelectedLanguage },
    { id: 'roadmap', label: 'Roadmap', icon: Map, disabled: !hasSelectedLanguage },
    { id: 'progress', label: 'Progress', icon: BarChart3, disabled: !hasSelectedLanguage },
    { id: 'languages', label: 'Languages', icon: Globe, disabled: false },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            const isDisabled = item.disabled;
            
            return (
              <button
                key={item.id}
                onClick={() => !isDisabled && onViewChange(item.id as any)}
                disabled={isDisabled}
                className={`
                  flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200
                  ${isActive 
                    ? 'border-african-orange text-african-orange' 
                    : isDisabled
                    ? 'border-transparent text-gray-400 cursor-not-allowed'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}