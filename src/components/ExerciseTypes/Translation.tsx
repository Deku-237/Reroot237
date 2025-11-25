import React from 'react';

interface TranslationProps {
  userInput: string;
  onInputChange: (value: string) => void;
  placeholder?: string;
}

export default function Translation({ userInput, onInputChange, placeholder = "Type your translation here..." }: TranslationProps) {
  return (
    <div className="space-y-4">
      <textarea
        value={userInput}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none resize-none text-lg"
        rows={4}
      />
      <p className="text-sm text-gray-500 text-center">
        Type your answer in the target language
      </p>
    </div>
  );
}