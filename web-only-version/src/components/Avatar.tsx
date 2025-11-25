import React from 'react';

interface AvatarProps {
  name: string;
  region: string;
  clothing: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showInfo?: boolean;
  className?: string;
}

export default function Avatar({ 
  name, 
  region, 
  clothing, 
  size = 'md', 
  showInfo = false, 
  className = '' 
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  // Generate avatar based on name and region
  const getAvatarStyle = () => {
    const baseStyle = {
      backgroundColor: '#8B4513', // Brown skin tone
      background: 'linear-gradient(135deg, #8B4513 0%, #A0522D  50%, #CD853F 100%)'
    };

    // Add clothing colors based on region
    if (region.includes('Northern')) {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
        border: '3px solid #FF8C00' // Orange border for Fulani
      };
    } else if (region.includes('Centre')) {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
        border: '3px solid #228B22' // Green border for Beti
      };
    } else if (region.includes('Littoral')) {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
        border: '3px solid #4682B4' // Blue border for coastal
      };
    } else if (region.includes('West')) {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
        border: '3px solid #DAA520' // Gold border for Bamiléké
      };
    }
    
    return baseStyle;
  };

  const avatarStyle = getAvatarStyle();

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <div 
          className={`${sizeClasses[size]} rounded-full flex items-center justify-center shadow-lg overflow-hidden`}
          style={avatarStyle}
        >
          {/* Face */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Eyes */}
            <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full"></div>
            
            {/* Smile */}
            <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-3 h-1 border-b-2 border-white rounded-full"></div>
            
            {/* Traditional headwrap/hat indicator */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-african-orange rounded-t-full opacity-80"></div>
          </div>
        </div>
        
        {/* Traditional clothing indicator */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-african-brown rounded-b-full opacity-60"></div>
      </div>
      
      {showInfo && (
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">{region}</p>
          <p className="text-xs text-african-brown italic">{clothing}</p>
        </div>
      )}
    </div>
  );
}