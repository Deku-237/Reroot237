import { useState, useCallback, useRef } from 'react';

interface UseSpeechRecognitionProps {
  language?: string;
  onTranscriptChange?: (transcript: string) => void;
}

interface UseSpeechRecognitionReturn {
  transcript: string;
  isListening: boolean;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  isMicrophoneAvailable: boolean;
}

type SpeechRecognitionType = {
  new (): {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    abort: () => void;
    onstart: () => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
  };
};

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  isFinal: boolean;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: {
    isFinal: boolean;
    [index: number]: {
      transcript: string;
      confidence: number;
    };
    length: number;
  };
}

export const useSpeechRecognition = ({
  language = 'en-US',
  onTranscriptChange,
}: UseSpeechRecognitionProps = {}): UseSpeechRecognitionReturn => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState(true);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);

  const isSupported =
    typeof window !== 'undefined' &&
    !!(
      window.SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition
    );

  console.log('Speech Recognition Support:', {
    isSupported,
    hasWindow: typeof window !== 'undefined',
    hasSpeechRecognition: typeof window !== 'undefined' && !!window.SpeechRecognition,
    hasWebkit: typeof window !== 'undefined' && !!(window as any).webkitSpeechRecognition,
    protocol: typeof window !== 'undefined' ? window.location.protocol : 'unknown',
    isSecure: typeof window !== 'undefined' ? window.location.protocol === 'https:' || window.location.hostname === 'localhost' : false
  });

  const startListening = useCallback(() => {
    console.log('Starting speech recognition...');

    if (!isSupported) {
      console.error('Speech Recognition is not supported in this browser');
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (typeof window !== 'undefined' && window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      alert('Speech recognition requires HTTPS or localhost. Please access the app via HTTPS or run it locally.');
      return;
    }

    const SpeechRecognitionAPI =
      window.SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        console.log('Recognition cleanup');
      }
    }

    recognitionRef.current = new SpeechRecognitionAPI();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = language;
    recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
      setIsMicrophoneAvailable(true);

      timeoutRef.current = setTimeout(() => {
        console.log('Speech recognition timeout after 10 seconds');
        stopListening();
      }, 10000);
    };

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      console.log('Speech recognition result received', event);
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = 0; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        console.log(`Result ${i}: ${transcriptSegment} (final: ${event.results[i].isFinal})`);

        if (event.results[i].isFinal) {
          finalTranscript += transcriptSegment + ' ';
        } else {
          interimTranscript += transcriptSegment;
        }
      }

      const result = (finalTranscript || interimTranscript).trim();
      console.log('Final transcript:', result);
      setTranscript(result);
      onTranscriptChange?.(result);

      if (finalTranscript) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        stopListening();
      }
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error, event);
      setIsListening(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (event.error === 'no-speech') {
        console.warn('No speech detected');
      } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        alert('Microphone access denied. Please allow microphone access in your browser settings.');
        setIsMicrophoneAvailable(false);
      } else if (event.error === 'network') {
        console.error('Network error - speech recognition may not work on this connection');
        alert('Speech recognition network error. This feature requires an internet connection and may not work on all networks. Try using a different network or browser.');
      } else if (event.error === 'aborted') {
        console.log('Speech recognition aborted');
      } else {
        console.error('Unknown speech recognition error:', event.error);
        alert(`Speech recognition error: ${event.error}. Please try again.`);
      }
    };

    recognitionRef.current.onend = () => {
      console.log('Speech recognition ended');
      setIsListening(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
      alert('Failed to start speech recognition. Please try again.');
    }
  }, [isSupported, language, onTranscriptChange]);

  const stopListening = useCallback(() => {
    console.log('Stopping speech recognition');
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error('Error stopping recognition:', e);
      }
      setIsListening(false);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    transcript: transcript.trim(),
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    isMicrophoneAvailable,
  };
};
