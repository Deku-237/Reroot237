import React from 'react';
import { ChevronRight, Users, MapPin, Globe2 } from 'lucide-react';
import { Language } from '../types';
import VuduMask from './VuduMask';

interface LanguageSelectorProps {
  languages: Language[];
  onLanguageSelect: (language: Language) => void;
  currentLanguage?: Language | null;
}

export default function LanguageSelector({ languages, onLanguageSelect, currentLanguage }: LanguageSelectorProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="mb-6">
          <div className="text-6xl mb-4">🇨🇲</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Reconnect with Your Roots
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Learn your mother tongue and preserve the rich linguistic heritage of Cameroon. 
          Each language carries centuries of wisdom, culture, and ancestral knowledge.
        </p>
      </div>

      {/* Cultural Heritage Banner */}
      <div className="bg-gradient-to-r from-african-brown to-african-orange rounded-3xl p-8 mb-12 text-white bg-kente-pattern">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Preserve Our Heritage</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            "When an old man dies, a library burns to the ground" - African Proverb
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Choose Your Mother Tongue
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {languages.map((language) => {
          return (
            <button
            key={language.id}
            onClick={() => onLanguageSelect(language)}
            className={`
              group p-6 bg-white rounded-2xl shadow-sm border-2 transition-all duration-300
              hover:shadow-xl hover:border-african-orange hover:-translate-y-1
              ${currentLanguage?.id === language.id 
                ? 'ring-2 ring-african-orange border-african-orange shadow-lg' 
                : 'border-gray-200'
              }
            `}
          >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <VuduMask 
                    emotion="default"
                    size="sm"
                  />
                  <div className="text-2xl">{language.flag}</div>
                </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-african-orange transition-colors" />
            </div>
            
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {language.name}
              </h3>
              <p className="text-lg text-african-orange font-medium mb-2">
                {language.nativeName}
              </p>
              
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{language.region}</span>
              </div>
              
              <div className="flex items-center text-xs text-gray-500 mb-3">
                <Globe2 className="w-3 h-3 mr-1" />
                <span>{language.family}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
                {language.description}
              </p>
              
              <p className="text-xs text-african-brown italic mb-3 leading-relaxed">
                {language.culturalNote}
              </p>
              
              <div className="flex items-center text-xs text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                {language.speakers}
              </div>
            </div>
          </button>
          );
        })}
      </div>

      {/* Why Learn Section */}
      <div className="mt-16 text-center">
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Why Preserve Our Languages?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-african-orange bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-african-orange font-bold text-lg">🏛️</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Cultural Identity</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Strengthen your connection to ancestral wisdom and traditional values passed down through generations
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-forest-green bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-forest-green font-bold text-lg">🌍</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Language Preservation</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Help preserve endangered languages and ensure they survive for future generations of Cameroonians
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-savanna-gold bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-savanna-gold font-bold text-lg">👥</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Community Connection</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Connect with your community and participate fully in traditional ceremonies and cultural events
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Statistics */}
      <div className="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Cameroon's Linguistic Diversity
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-african-orange mb-2">280+</div>
            <p className="text-sm text-gray-600">Languages Spoken</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-forest-green mb-2">10</div>
            <p className="text-sm text-gray-600">Regions</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-savanna-gold mb-2">250+</div>
            <p className="text-sm text-gray-600">Ethnic Groups</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-kente-purple mb-2">2</div>
            <p className="text-sm text-gray-600">Official Languages</p>
          </div>
        </div>
      </div>
    </div>
  );
}