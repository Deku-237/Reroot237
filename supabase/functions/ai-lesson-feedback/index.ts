import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface FeedbackRequest {
  userAnswer: string;
  correctAnswer: string;
  exerciseType: 'translation' | 'pronunciation' | 'listening' | 'multiple-choice';
  language: string;
  question?: string;
}

interface FeedbackResponse {
  isCorrect: boolean;
  score: number;
  feedback: string;
  hints?: string[];
  correction?: string;
  explanation?: string;
}

function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  if (s1 === s2) return 1;

  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;

  if (longer.length === 0) return 1;

  const editDistance = getEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function getEditDistance(s1: string, s2: string): number {
  const costs: number[] = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function generateFeedback(request: FeedbackRequest): FeedbackResponse {
  const similarity = calculateSimilarity(request.userAnswer, request.correctAnswer);
  const isCorrect = similarity >= 0.85;
  const score = Math.round(similarity * 100);

  let feedback = '';
  let hints: string[] = [];
  let correction = '';
  let explanation = '';

  if (isCorrect) {
    const messages = [
      'Excellent work!',
      'Perfect! You nailed it!',
      'Great job!',
      'That\'s correct!',
      'Well done!',
      'Outstanding!',
    ];
    feedback = messages[Math.floor(Math.random() * messages.length)];
  } else if (similarity >= 0.7) {
    feedback = 'Close! You\'re almost there.';
    correction = `The correct answer is: ${request.correctAnswer}`;
    hints = [
      'Pay attention to spelling',
      'Check the word order',
      'Verify accents and special characters',
    ];
  } else if (similarity >= 0.5) {
    feedback = 'Not quite right. Let\'s try again.';
    correction = `The correct answer is: ${request.correctAnswer}`;
    const length = request.correctAnswer.length;
    hints = [
      `Hint: The answer starts with "${request.correctAnswer.charAt(0)}"`,
      `Hint: The answer has ${length} characters`,
      'Break down the words and try again',
    ];
  } else {
    feedback = 'Keep practicing! Learning takes time.';
    correction = `The correct answer is: ${request.correctAnswer}`;
    hints = [
      'Review the lesson content',
      'Try saying it out loud',
      'Compare letter by letter with the correct answer',
    ];
  }

  if (request.exerciseType === 'pronunciation' && !isCorrect && similarity < 0.7) {
    feedback += ' Try pronouncing each syllable separately.';
    hints.push('Focus on the vowel sounds');
  }

  return {
    isCorrect,
    score,
    feedback,
    hints: hints.slice(0, 2),
    correction: !isCorrect ? correction : undefined,
    explanation,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const request: FeedbackRequest = await req.json();

    if (!request.userAnswer || !request.correctAnswer) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const feedback = generateFeedback(request);

    return new Response(JSON.stringify(feedback), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
