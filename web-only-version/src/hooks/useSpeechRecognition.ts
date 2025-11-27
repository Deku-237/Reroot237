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

  const isSupported =
    typeof window !== 'undefined' &&
    !!(
      window.SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition
    );

  const startListening = useCallback(() => {
    if (!isSupported) {
      console.warn('Speech Recognition is not supported in this browser');
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
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
        setIsListening(true);
        setIsMicrophoneAvailable(true);
      };

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = 0; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcriptSegment + ' ';
        } else {
          interimTranscript += transcriptSegment;
        }
      }

      const result = (finalTranscript || interimTranscript).trim();
      setTranscript(result);
      onTranscriptChange?.(result);
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);

      if (event.error === 'no-speech') {
        alert('No speech detected. Please try again.');
        setIsMicrophoneAvailable(false);
      } else if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow microphone access in your browser settings.');
        setIsMicrophoneAvailable(false);
      } else if (event.error === 'network') {
        alert('Network error. Please check your internet connection.');
      }
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
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
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

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
