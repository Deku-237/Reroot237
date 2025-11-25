import React from 'react';
import { BookOpen, Heart, Users } from 'lucide-react';
import { CulturalContent } from '../types';

interface CulturalInsightProps {
  content: CulturalContent;
  language: string;
}

export default function CulturalInsight({ content, language }: CulturalInsightProps) {
  const getIcon = () => {
    switch (content.type) {
      case 'proverb': return '💎';
      case 'story': return '📚';
      case 'tradition': return '🎭';
      case 'history': return '🏛️';
      default: return '✨';
    }
  };

  return (
    <div className="bg-gradient-to-r from-african-brown to-earth-red rounded-2xl p-6 text-white mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-3xl">{getIcon()}</span>
        <div>
          <h3 className="text-lg font-bold">{content.title}</h3>
          <p className="text-orange-200 text-sm capitalize">{content.type} • {language}</p>
        </div>
      </div>
      
      <div className="bg-black bg-opacity-20 rounded-xl p-4 mb-4">
        <p className="text-xl font-medium mb-3 italic leading-relaxed">
          "{content.content}"
        </p>
        <p className="text-orange-200 text-lg mb-2">
          {content.translation}
        </p>
      </div>
      
      <div className="flex items-start space-x-2">
        <Heart className="w-4 h-4 text-red-300 mt-1 flex-shrink-0" />
        <p className="text-sm text-orange-100 leading-relaxed">
          Cultural wisdom passed down through generations of {language} speakers
        </p>
      </div>
    </div>
  );
}