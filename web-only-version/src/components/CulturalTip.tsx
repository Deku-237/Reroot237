import React from 'react';
import { Lightbulb, Heart } from 'lucide-react';

interface CulturalTipProps {
  tip: string;
  language: string;
  className?: string;
}

export default function CulturalTip({ tip, language, className = '' }: CulturalTipProps) {
  return (
    <div className={`bg-gradient-to-r from-african-brown to-earth-red rounded-xl p-4 text-white ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <Lightbulb className="w-4 h-4 text-yellow-200" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-orange-100 mb-1 flex items-center">
            <Heart className="w-4 h-4 mr-2" />
            Cultural Insight
          </h4>
          <p className="text-sm text-orange-50 leading-relaxed">{tip}</p>
          <p className="text-xs text-orange-200 mt-2 italic">{language} tradition</p>
        </div>
      </div>
    </div>
  );
}