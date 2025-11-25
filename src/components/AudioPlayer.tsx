import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  text?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function AudioPlayer({ audioUrl, text, label, size = 'md' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div>
      <audio ref={audioRef} src={audioUrl} />
      <button
        onClick={handlePlayPause}
        disabled={isLoading}
        className={`
          ${sizeClasses[size]}
          inline-flex items-center justify-center
          bg-african-orange bg-opacity-20 text-african-orange
          rounded-full hover:bg-opacity-30 transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-african-orange focus:ring-offset-2
        `}
        title={label || 'Play audio'}
      >
        {isLoading ? (
          <Volume2 className={`${iconSize[size]} animate-pulse`} />
        ) : isPlaying ? (
          <Pause className={iconSize[size]} />
        ) : (
          <Play className={`${iconSize[size]} ml-0.5`} />
        )}
      </button>
      {duration > 0 && (
        <div className="mt-1 text-xs text-gray-500">
          {Math.floor(currentTime)}s / {Math.floor(duration)}s
        </div>
      )}
    </div>
  );
}
