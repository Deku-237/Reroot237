import React from 'react';

interface VuduMaskProps {
  emotion?: 'default' | 'freaked-out' | 'excited' | 'thinking' | 'celebrating' | 'encouraging';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
  animated?: boolean;
}

export default function VuduMask({ 
  emotion = 'default', 
  size = 'md', 
  className = '',
  animated = false 
}: VuduMaskProps) {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    xxl: 'w-32 h-32'
  };

  // Eye specifications based on emotion
  const getEyeSpecs = () => {
    switch (emotion) {
      case 'freaked-out':
        return {
          leftEye: { cx: 40, cy: 45, r: 8 },
          rightEye: { cx: 60, cy: 45, r: 8 },
          leftPupil: { cx: 40, cy: 48, r: 4 },
          rightPupil: { cx: 60, cy: 48, r: 4 },
          leftHighlight: { cx: 43, cy: 42, r: 2 },
          rightHighlight: { cx: 63, cy: 42, r: 2 }
        };
      case 'excited':
        return {
          leftEye: { cx: 40, cy: 42, r: 7 },
          rightEye: { cx: 60, cy: 42, r: 7 },
          leftPupil: { cx: 40, cy: 42, r: 3 },
          rightPupil: { cx: 60, cy: 42, r: 3 },
          leftHighlight: { cx: 42, cy: 39, r: 1.5 },
          rightHighlight: { cx: 62, cy: 39, r: 1.5 }
        };
      case 'thinking':
        return {
          leftEye: { cx: 40, cy: 45, r: 6 },
          rightEye: { cx: 60, cy: 45, r: 6 },
          leftPupil: { cx: 37, cy: 45, r: 2.5 },
          rightPupil: { cx: 57, cy: 45, r: 2.5 },
          leftHighlight: { cx: 39, cy: 42, r: 1.5 },
          rightHighlight: { cx: 59, cy: 42, r: 1.5 }
        };
      case 'celebrating':
        return {
          leftEye: { cx: 40, cy: 40, r: 5 },
          rightEye: { cx: 60, cy: 40, r: 5 },
          leftPupil: { cx: 40, cy: 40, r: 2 },
          rightPupil: { cx: 60, cy: 40, r: 2 },
          leftHighlight: { cx: 42, cy: 37, r: 1.5 },
          rightHighlight: { cx: 62, cy: 37, r: 1.5 }
        };
      case 'encouraging':
        return {
          leftEye: { cx: 40, cy: 45, r: 6.5 },
          rightEye: { cx: 60, cy: 45, r: 6.5 },
          leftPupil: { cx: 40, cy: 45, r: 3 },
          rightPupil: { cx: 60, cy: 45, r: 3 },
          leftHighlight: { cx: 42, cy: 42, r: 1.5 },
          rightHighlight: { cx: 62, cy: 42, r: 1.5 }
        };
      default:
        return {
          leftEye: { cx: 40, cy: 45, r: 7 },
          rightEye: { cx: 60, cy: 45, r: 7 },
          leftPupil: { cx: 40, cy: 45, r: 3 },
          rightPupil: { cx: 60, cy: 45, r: 3 },
          leftHighlight: { cx: 42, cy: 42, r: 1.5 },
          rightHighlight: { cx: 62, cy: 42, r: 1.5 }
        };
    }
  };

  // Mouth expressions
  const getMouthPath = () => {
    switch (emotion) {
      case 'freaked-out':
        return 'M 45 65 Q 50 75 55 65';
      case 'excited':
        return 'M 40 65 Q 50 75 60 65';
      case 'thinking':
        return 'M 47 68 Q 50 66 53 68';
      case 'celebrating':
        return 'M 38 65 Q 50 78 62 65';
      case 'encouraging':
        return 'M 42 65 Q 50 72 58 65';
      default:
        return 'M 42 65 Q 50 72 58 65';
    }
  };

  const eyeSpecs = getEyeSpecs();
  const mouthPath = getMouthPath();

  return (
    <div className={`${sizeClasses[size]} ${className} ${animated ? 'animate-bounce' : ''}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-lg"
      >
        <defs>
          {/* Gradients for the mask */}
          <linearGradient id="maskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D2691E" />
            <stop offset="30%" stopColor="#CD853F" />
            <stop offset="70%" stopColor="#A0522D" />
            <stop offset="100%" stopColor="#8B4513" />
          </linearGradient>
          
          <linearGradient id="innerMaskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4A460" />
            <stop offset="50%" stopColor="#DEB887" />
            <stop offset="100%" stopColor="#D2691E" />
          </linearGradient>
          
          <filter id="softShadow">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Colorful feathers on top */}
        <g>
          {/* Green feather (left) */}
          <ellipse cx="35" cy="15" rx="3" ry="12" fill="#32CD32" transform="rotate(-20 35 15)" opacity="0.9" />
          <path d="M 35 8 Q 32 12 35 16 Q 38 12 35 8" fill="#228B22" opacity="0.8" />
          
          {/* Yellow feather (center-left) */}
          <ellipse cx="42" cy="12" rx="3" ry="14" fill="#FFD700" transform="rotate(-5 42 12)" opacity="0.9" />
          <path d="M 42 5 Q 39 9 42 13 Q 45 9 42 5" fill="#FFA500" opacity="0.8" />
          
          {/* Teal feather (center) */}
          <ellipse cx="50" cy="10" rx="3" ry="15" fill="#20B2AA" opacity="0.9" />
          <path d="M 50 3 Q 47 7 50 11 Q 53 7 50 3" fill="#008B8B" opacity="0.8" />
          
          {/* Orange feather (center-right) */}
          <ellipse cx="58" cy="12" rx="3" ry="14" fill="#FF6347" transform="rotate(5 58 12)" opacity="0.9" />
          <path d="M 58 5 Q 55 9 58 13 Q 61 9 58 5" fill="#FF4500" opacity="0.8" />
          
          {/* Red feather (right) */}
          <ellipse cx="65" cy="15" rx="3" ry="12" fill="#DC143C" transform="rotate(20 65 15)" opacity="0.9" />
          <path d="M 65 8 Q 62 12 65 16 Q 68 12 65 8" fill="#B22222" opacity="0.8" />
        </g>

        {/* Main mask shape - outer layer */}
        <ellipse
          cx="50" cy="55" rx="22" ry="30"
          fill="url(#maskGradient)"
          stroke="#654321"
          strokeWidth="2"
          filter="url(#softShadow)"
        />
        
        {/* Inner mask layer */}
        <ellipse
          cx="50" cy="55" rx="18" ry="26"
          fill="url(#innerMaskGradient)"
          opacity="0.8"
        />

        {/* Decorative white dots around the mask */}
        <circle cx="32" cy="45" r="1.5" fill="white" opacity="0.9" />
        <circle cx="68" cy="45" r="1.5" fill="white" opacity="0.9" />
        <circle cx="30" cy="45" r="1.2" fill="white" opacity="0.8" />
        <circle cx="70" cy="45" r="1.2" fill="white" opacity="0.8" />
        <circle cx="32" cy="55" r="1" fill="white" opacity="0.7" />
        <circle cx="68" cy="55" r="1" fill="white" opacity="0.7" />
        <circle cx="35" cy="65" r="1.2" fill="white" opacity="0.8" />
        <circle cx="65" cy="65" r="1.2" fill="white" opacity="0.8" />
        <circle cx="40" cy="75" r="1" fill="white" opacity="0.7" />
        <circle cx="60" cy="75" r="1" fill="white" opacity="0.7" />

        {/* Spiral decorations on cheeks */}
        <path 
          d="M 38 55 Q 36 53 34 55 Q 36 57 38 55 Q 40 53 38 55" 
          stroke="white" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.8"
        />
        <path 
          d="M 62 55 Q 64 53 66 55 Q 64 57 62 55 Q 60 53 62 55" 
          stroke="white" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.8"
        />

        {/* Large friendly eyes with white background */}
        <circle 
          cx={eyeSpecs.leftEye.cx} 
          cy={eyeSpecs.leftEye.cy} 
          r={eyeSpecs.leftEye.r} 
          fill="white" 
          stroke="#2D1810"
          strokeWidth="1"
        />
        <circle 
          cx={eyeSpecs.rightEye.cx} 
          cy={eyeSpecs.rightEye.cy} 
          r={eyeSpecs.rightEye.r} 
          fill="white" 
          stroke="#2D1810"
          strokeWidth="1"
        />
        
        {/* Black pupils */}
        <circle 
          cx={eyeSpecs.leftPupil.cx} 
          cy={eyeSpecs.leftPupil.cy} 
          r={eyeSpecs.leftPupil.r} 
          fill="#000000"
        />
        <circle 
          cx={eyeSpecs.rightPupil.cx} 
          cy={eyeSpecs.rightPupil.cy} 
          r={eyeSpecs.rightPupil.r} 
          fill="#000000"
        />
        
        {/* Eye highlights */}
        <circle 
          cx={eyeSpecs.leftHighlight.cx} 
          cy={eyeSpecs.leftHighlight.cy} 
          r={eyeSpecs.leftHighlight.r} 
          fill="white" 
          opacity="0.9"
        />
        <circle 
          cx={eyeSpecs.rightHighlight.cx} 
          cy={eyeSpecs.rightHighlight.cy} 
          r={eyeSpecs.rightHighlight.r} 
          fill="white" 
          opacity="0.9"
        />
        
        {/* Eyebrows for freaked-out emotion */}
        {emotion === 'freaked-out' && (
          <>
            <path d="M 30 35 Q 40 28 50 35" stroke="#654321" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 50 35 Q 60 28 70 35" stroke="#654321" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        )}
        
        {/* Orange triangular nose */}
        <path
          d="M 50 55 L 47 60 L 53 60 Z"
          fill="#FF8C00"
          stroke="#FF6347"
          strokeWidth="1"
        />
        
        {/* Friendly smile */}
        <path
          d={mouthPath}
          stroke="#654321"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Open mouth interior for freaked-out state */}
        {emotion === 'freaked-out' && (
          <ellipse cx="50" cy="75" rx="4" ry="6" fill="#2D1810" opacity="0.8" />
        )}
        
        {/* Decorative forehead pattern */}
        <path
          d="M 45 33 Q 50 30 55 33"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0.9"
        />
        <circle cx="50" cy="35" r="1.5" fill="white" opacity="0.9" />

        {/* Celebration sparkles for excited/celebrating states */}
        {(emotion === 'excited' || emotion === 'celebrating') && (
          <>
            <g className="animate-pulse">
              <path d="M 15 20 L 17 25 L 22 23 L 17 28 L 15 33 L 13 28 L 8 23 L 13 25 Z" fill="#FFD700" opacity="0.8" />
              <path d="M 85 25 L 87 30 L 92 28 L 87 33 L 85 38 L 83 33 L 78 28 L 83 30 Z" fill="#FF8C00" opacity="0.8" />
              <path d="M 20 65 L 22 70 L 27 68 L 22 73 L 20 78 L 18 73 L 13 68 L 18 70 Z" fill="#32CD32" opacity="0.8" />
              <path d="M 80 70 L 82 75 L 87 73 L 82 78 L 80 83 L 78 78 L 73 73 L 78 75 Z" fill="#20B2AA" opacity="0.8" />
            </g>
          </>
        )}
        
        {/* Stress lines for freaked-out state */}
        {emotion === 'freaked-out' && (
          <g className="animate-pulse">
            <path d="M 18 25 L 12 20" stroke="#654321" strokeWidth="2" strokeLinecap="round" />
            <path d="M 82 25 L 88 20" stroke="#654321" strokeWidth="2" strokeLinecap="round" />
            <path d="M 15 35 L 8 32" stroke="#654321" strokeWidth="2" strokeLinecap="round" />
            <path d="M 85 35 L 92 32" stroke="#654321" strokeWidth="2" strokeLinecap="round" />
            <path d="M 18 50 L 12 55" stroke="#654321" strokeWidth="2" strokeLinecap="round" />
            <path d="M 82 50 L 88 55" stroke="#654321" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
        
        {/* Floating animation for celebrating */}
        {emotion === 'celebrating' && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-2; 0,0"
            dur="0.6s"
            repeatCount="indefinite"
          />
        )}
        
        {/* Gentle sway for encouraging */}
        {emotion === 'encouraging' && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50; 2 50 50; 0 50 50; -2 50 50; 0 50 50"
            dur="2s"
            repeatCount="indefinite"
          />
        )}
        
        {/* Shake animation for freaked-out */}
        {emotion === 'freaked-out' && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 1,0; -1,0; 0,0"
            dur="0.1s"
            repeatCount="3"
          />
        )}
      </svg>
    </div>
  );
}