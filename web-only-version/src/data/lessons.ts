import { Lesson, LearningPath, CulturalContent } from '../types';

// Sample lessons for each language with accurate content
export const SAMPLE_LESSONS: Record<string, Lesson[]> = {
  fulfulde: [
    {
      id: 'fulfulde-greetings-1',
      title: 'Basic Greetings',
      description: 'Learn essential Fulfulde greetings',
      difficulty: 'beginner',
      category: 'greetings',
      xpReward: 20,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "How are you?" in Fulfulde?',
          options: ['A jam tan', 'Sannu', 'Mbolo', 'Mudolo'],
          correctAnswer: 'A jam tan',
          explanation: 'A jam tan is the standard greeting in Fulfulde, literally meaning "How is the peace?"'
        },
        {
          id: 'ex2',
          type: 'translation',
          question: 'Translate "Good morning" to Fulfulde',
          correctAnswer: 'Jam waali',
          explanation: 'Jam waali (or Jam waaliyé) is used to greet someone in the morning'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is the typical response to "A jam tan"?',
          options: ['Jam tan', 'Alhamdulillah', 'Baaba', 'Waali'],
          correctAnswer: 'Jam tan',
          explanation: 'You respond with "Jam tan" (peace only) or "Jam tan ko" (only peace)'
        }
      ]
    },
    {
      id: 'fulfulde-family-1',
      title: 'Family Members',
      description: 'Learn family terms in Fulfulde',
      difficulty: 'beginner',
      category: 'family',
      xpReward: 25,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "father" in Fulfulde?',
          options: ['Baaba', 'Mama', 'Gorko', 'Debbo'],
          correctAnswer: 'Baaba',
          explanation: 'Baaba means father in Fulfulde'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "mother" in Fulfulde?',
          options: ['Baaba', 'Mama', 'Gorko', 'Debbo'],
          correctAnswer: 'Mama',
          explanation: 'Mama means mother in Fulfulde'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is "child" in Fulfulde?',
          options: ['Biiɗo', 'Gorko', 'Debbo', 'Baaba'],
          correctAnswer: 'Biiɗo',
          explanation: 'Biiɗo means child in Fulfulde (plural: Biiɓe)'
        }
      ]
    },
    {
      id: 'fulfulde-numbers-1',
      title: 'Numbers 1-10',
      description: 'Count from 1 to 10 in Fulfulde',
      difficulty: 'beginner',
      category: 'numbers',
      xpReward: 30,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "one" in Fulfulde?',
          options: ['Go\'o', 'Didi', 'Tati', 'Nayi'],
          correctAnswer: 'Go\'o',
          explanation: 'Go\'o means one in Fulfulde'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "two" in Fulfulde?',
          options: ['Go\'o', 'Didi', 'Tati', 'Nayi'],
          correctAnswer: 'Didi',
          explanation: 'Didi means two in Fulfulde'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is "three" in Fulfulde?',
          options: ['Tati', 'Nayi', 'Joyi', 'Jeegom'],
          correctAnswer: 'Tati',
          explanation: 'Tati means three in Fulfulde'
        },
        {
          id: 'ex4',
          type: 'multiple-choice',
          question: 'What is "five" in Fulfulde?',
          options: ['Joyi', 'Nayi', 'Jeegom', 'Jeeɗiɗi'],
          correctAnswer: 'Joyi',
          explanation: 'Joyi means five in Fulfulde'
        }
      ]
    },
    {
      id: 'fulfulde-basics-1',
      title: 'Common Words',
      description: 'Essential vocabulary for daily conversation',
      difficulty: 'beginner',
      category: 'vocabulary',
      xpReward: 25,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "water" in Fulfulde?',
          options: ['Ndiyam', 'Kosam', 'Nagge', 'Luumo'],
          correctAnswer: 'Ndiyam',
          explanation: 'Ndiyam means water in Fulfulde'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "food" in Fulfulde?',
          options: ['Ñaamdu', 'Ndiyam', 'Kosam', 'Luumo'],
          correctAnswer: 'Ñaamdu',
          explanation: 'Ñaamdu means food in Fulfulde'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is "cow" (very important in Fulani culture) in Fulfulde?',
          options: ['Nagge', 'Biiɗo', 'Gorko', 'Mbewa'],
          correctAnswer: 'Nagge',
          explanation: 'Nagge means cow in Fulfulde. Cattle are central to Fulani culture'
        }
      ]
    },
    {
      id: 'fulfulde-advanced-1',
      title: 'Polite Expressions',
      description: 'Learn respectful phrases in Fulfulde',
      difficulty: 'intermediate',
      category: 'culture',
      xpReward: 35,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Thank you" in Fulfulde?',
          options: ['A jaraama', 'Jam tan', 'On waawi', 'Jam waali'],
          correctAnswer: 'A jaraama',
          explanation: 'A jaraama (or Jaaraama) means thank you in Fulfulde'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'How do you say "Please" in Fulfulde?',
          options: ['Mbaɗen', 'A jaraama', 'Jam tan', 'Waali'],
          correctAnswer: 'Mbaɗen',
          explanation: 'Mbaɗen means please in Fulfulde'
        }
      ]
    }
  ],
  ewondo: [
    {
      id: 'ewondo-greetings-1',
      title: 'Basic Greetings',
      description: 'Learn essential Ewondo greetings',
      difficulty: 'beginner',
      category: 'greetings',
      xpReward: 20,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in Ewondo?',
          options: ['Mbɔlɔ', 'A jam tan', 'Sannu', 'Mudolo'],
          correctAnswer: 'Mbɔlɔ',
          explanation: 'Mbɔlɔ is the common greeting in Ewondo'
        },
        {
          id: 'ex2',
          type: 'translation',
          question: 'Translate "Good morning" to Ewondo',
          correctAnswer: 'Mbɔlɔ ngɔn',
          explanation: 'Mbɔlɔ ngɔn is used to greet someone in the morning'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'How do you say "Good evening" in Ewondo?',
          options: ['Mbɔlɔ nguguman', 'Mbɔlɔ ngɔn', 'Mbɔlɔ', 'Akiba'],
          correctAnswer: 'Mbɔlɔ nguguman',
          explanation: 'Mbɔlɔ nguguman means good evening in Ewondo'
        }
      ]
    },
    {
      id: 'ewondo-family-1',
      title: 'Family Members',
      description: 'Learn family terms in Ewondo',
      difficulty: 'beginner',
      category: 'family',
      xpReward: 25,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "father" in Ewondo?',
          options: ['Tara', 'Mama', 'Moan', 'Nga'],
          correctAnswer: 'Tara',
          explanation: 'Tara means father in Ewondo'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "mother" in Ewondo?',
          options: ['Tara', 'Mama', 'Moan', 'Nga'],
          correctAnswer: 'Mama',
          explanation: 'Mama means mother in Ewondo'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is "child" in Ewondo?',
          options: ['Moan', 'Tara', 'Mama', 'Nnom'],
          correctAnswer: 'Moan',
          explanation: 'Moan means child in Ewondo (plural: Boan)'
        }
      ]
    },
    {
      id: 'ewondo-numbers-1',
      title: 'Numbers 1-10',
      description: 'Learn to count in Ewondo',
      difficulty: 'beginner',
      category: 'numbers',
      xpReward: 30,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "one" in Ewondo?',
          options: ['Fɔk', 'Bɛbɛ', 'Lal', 'Mana'],
          correctAnswer: 'Fɔk',
          explanation: 'Fɔk means one in Ewondo'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "two" in Ewondo?',
          options: ['Bɛbɛ', 'Fɔk', 'Lal', 'Mana'],
          correctAnswer: 'Bɛbɛ',
          explanation: 'Bɛbɛ means two in Ewondo'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is "three" in Ewondo?',
          options: ['Lal', 'Bɛbɛ', 'Mana', 'Mtan'],
          correctAnswer: 'Lal',
          explanation: 'Lal means three in Ewondo'
        }
      ]
    },
    {
      id: 'ewondo-vocabulary-1',
      title: 'Common Words',
      description: 'Essential Ewondo vocabulary',
      difficulty: 'beginner',
      category: 'vocabulary',
      xpReward: 25,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "water" in Ewondo?',
          options: ['Mendím', 'Bí', 'Nnom', 'Kob'],
          correctAnswer: 'Mendím',
          explanation: 'Mendím means water in Ewondo'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "house" in Ewondo?',
          options: ['Nda', 'Kob', 'Nnom', 'Asu'],
          correctAnswer: 'Nda',
          explanation: 'Nda means house in Ewondo'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is "forest" in Ewondo?',
          options: ['Asu', 'Nda', 'Mendím', 'Kob'],
          correctAnswer: 'Asu',
          explanation: 'Asu means forest in Ewondo, reflecting the Beti forest culture'
        }
      ]
    },
    {
      id: 'ewondo-phrases-1',
      title: 'Useful Phrases',
      description: 'Common expressions in Ewondo',
      difficulty: 'intermediate',
      category: 'phrases',
      xpReward: 35,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Thank you" in Ewondo?',
          options: ['Akiba', 'Mbɔlɔ', 'Osso', 'Ayɛnɛ'],
          correctAnswer: 'Akiba',
          explanation: 'Akiba means thank you in Ewondo'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'How do you say "Yes" in Ewondo?',
          options: ['Ɛɛɛ', 'Ayɛnɛ', 'Akiba', 'Mbɔlɔ'],
          correctAnswer: 'Ɛɛɛ',
          explanation: 'Ɛɛɛ means yes in Ewondo'
        }
      ]
    }
  ],
  duala: [
    {
      id: 'duala-greetings-1',
      title: 'Basic Greetings',
      description: 'Learn essential Duala greetings',
      difficulty: 'beginner',
      category: 'greetings',
      xpReward: 20,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in Duala?',
          options: ['Mudɔlɔ', 'Mbolo', 'A jam tan', 'Sannu'],
          correctAnswer: 'Mudɔlɔ',
          explanation: 'Mudɔlɔ is the common greeting in Duala'
        },
        {
          id: 'ex2',
          type: 'translation',
          question: 'Translate "How are you?" to Duala',
          correctAnswer: 'O bwámɔ ndé?',
          explanation: 'O bwámɔ ndé? is how you ask "How are you?" in Duala'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is the typical response to "O bwámɔ ndé?"',
          options: ['Mbwám mbéné', 'Mudɔlɔ', 'Nasíko', 'Moti'],
          correctAnswer: 'Mbwám mbéné',
          explanation: 'Mbwám mbéné means "I am fine" in Duala'
        }
      ]
    },
    {
      id: 'duala-family-1',
      title: 'Family Members',
      description: 'Learn family terms in Duala',
      difficulty: 'beginner',
      category: 'family',
      xpReward: 25,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "father" in Duala?',
          options: ['Tátá', 'Mámá', 'Mwana', 'Mud'],
          correctAnswer: 'Tátá',
          explanation: 'Tátá means father in Duala'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "mother" in Duala?',
          options: ['Mámá', 'Tátá', 'Mwana', 'Mud'],
          correctAnswer: 'Mámá',
          explanation: 'Mámá means mother in Duala'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is "child" in Duala?',
          options: ['Mwana', 'Tátá', 'Mámá', 'Mud'],
          correctAnswer: 'Mwana',
          explanation: 'Mwana means child in Duala (plural: Bana)'
        }
      ]
    },
    {
      id: 'duala-numbers-1',
      title: 'Numbers 1-10',
      description: 'Learn counting in Duala',
      difficulty: 'beginner',
      category: 'numbers',
      xpReward: 30,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "one" in Duala?',
          options: ['Dísóɔ', 'Bɛbá', 'Bɛlálɔ', 'Bonái'],
          correctAnswer: 'Dísóɔ',
          explanation: 'Dísóɔ means one in Duala'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "two" in Duala?',
          options: ['Bɛbá', 'Dísóɔ', 'Bɛlálɔ', 'Bonái'],
          correctAnswer: 'Bɛbá',
          explanation: 'Bɛbá means two in Duala'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is "three" in Duala?',
          options: ['Bɛlálɔ', 'Bɛbá', 'Bonái', 'Botánui'],
          correctAnswer: 'Bɛlálɔ',
          explanation: 'Bɛlálɔ means three in Duala'
        }
      ]
    },
    {
      id: 'duala-vocabulary-1',
      title: 'Trade and Market',
      description: 'Essential vocabulary for trade (Duala was a trade language)',
      difficulty: 'beginner',
      category: 'vocabulary',
      xpReward: 25,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "water" in Duala?',
          options: ['Mba', 'Lóngé', 'Dibɔ', 'Nyanga'],
          correctAnswer: 'Mba',
          explanation: 'Mba means water in Duala'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "boat" (important for coastal trade) in Duala?',
          options: ['Bolɔ', 'Mba', 'Dibɔ', 'Nyanga'],
          correctAnswer: 'Bolɔ',
          explanation: 'Bolɔ means boat/canoe in Duala, essential for coastal life'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is "market" in Duala?',
          options: ['Kati', 'Bolɔ', 'Mba', 'Dibɔ'],
          correctAnswer: 'Kati',
          explanation: 'Kati means market in Duala'
        }
      ]
    },
    {
      id: 'duala-phrases-1',
      title: 'Polite Expressions',
      description: 'Learn respectful phrases',
      difficulty: 'intermediate',
      category: 'phrases',
      xpReward: 35,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Thank you" in Duala?',
          options: ['Nasíko', 'Mudɔlɔ', 'Mbwám', 'Kati'],
          correctAnswer: 'Nasíko',
          explanation: 'Nasíko means thank you in Duala'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'How do you say "Please" in Duala?',
          options: ['Mbɛlɔ', 'Nasíko', 'Mudɔlɔ', 'Mbwám'],
          correctAnswer: 'Mbɛlɔ',
          explanation: 'Mbɛlɔ means please in Duala'
        }
      ]
    }
  ],
  bamileke: [
    {
      id: 'bamileke-greetings-1',
      title: 'Basic Greetings',
      description: 'Learn essential Bamiléké greetings (Feʼfeʼ dialect)',
      difficulty: 'beginner',
      category: 'greetings',
      xpReward: 20,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in Bamiléké?',
          options: ['Nshi', 'Mbolo', 'A jam tan', 'Mudolo'],
          correctAnswer: 'Nshi',
          explanation: 'Nshi is a common greeting in Feʼfeʼ Bamiléké'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'How do you ask "How are you?" in Bamiléké?',
          options: ['U ka njǔ?', 'Nshi', 'Mbolo', 'Waali'],
          correctAnswer: 'U ka njǔ?',
          explanation: 'U ka njǔ? means "How are you?" in Bamiléké'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is a typical response to "U ka njǔ?"',
          options: ['M ka njǔ', 'Nshi', 'Mbolo', 'Waali'],
          correctAnswer: 'M ka njǔ',
          explanation: 'M ka njǔ means "I am fine" in Bamiléké'
        }
      ]
    },
    {
      id: 'bamileke-family-1',
      title: 'Family Members',
      description: 'Learn family terms in Bamiléké',
      difficulty: 'beginner',
      category: 'family',
      xpReward: 25,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "father" in Bamiléké?',
          options: ['Tà', 'Mà', 'Mù', 'Fɔ'],
          correctAnswer: 'Tà',
          explanation: 'Tà means father in Feʼfeʼ Bamiléké'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "mother" in Bamiléké?',
          options: ['Mà', 'Tà', 'Mù', 'Fɔ'],
          correctAnswer: 'Mà',
          explanation: 'Mà means mother in Feʼfeʼ Bamiléké'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is "child" in Bamiléké?',
          options: ['Mù', 'Tà', 'Mà', 'Nshi'],
          correctAnswer: 'Mù',
          explanation: 'Mù means child in Feʼfeʼ Bamiléké'
        }
      ]
    },
    {
      id: 'bamileke-numbers-1',
      title: 'Numbers 1-5',
      description: 'Basic counting in Bamiléké',
      difficulty: 'beginner',
      category: 'numbers',
      xpReward: 30,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "one" in Bamiléké?',
          options: ['Pàʔ', 'Bàʔ', 'Tàʔ', 'Nàʔ'],
          correctAnswer: 'Pàʔ',
          explanation: 'Pàʔ means one in Feʼfeʼ Bamiléké'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "two" in Bamiléké?',
          options: ['Bàʔ', 'Pàʔ', 'Tàʔ', 'Nàʔ'],
          correctAnswer: 'Bàʔ',
          explanation: 'Bàʔ means two in Feʼfeʼ Bamiléké'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is "three" in Bamiléké?',
          options: ['Tàʔ', 'Bàʔ', 'Pàʔ', 'Nàʔ'],
          correctAnswer: 'Tàʔ',
          explanation: 'Tàʔ means three in Feʼfeʼ Bamiléké'
        }
      ]
    },
    {
      id: 'bamileke-culture-1',
      title: 'Cultural Terms',
      description: 'Learn about Bamiléké culture and traditions',
      difficulty: 'intermediate',
      category: 'culture',
      xpReward: 35,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "chief/king" (Fon) in Bamiléké?',
          options: ['Fɔ̀', 'Tà', 'Mù', 'Nshi'],
          correctAnswer: 'Fɔ̀',
          explanation: 'Fɔ̀ (Fon) is the traditional ruler in Bamiléké chiefdoms'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "palace" in Bamiléké?',
          options: ['Lapá', 'Nda', 'Kati', 'Asu'],
          correctAnswer: 'Lapá',
          explanation: 'Lapá refers to the chief\'s palace in Bamiléké culture'
        }
      ]
    }
  ],
  bassa: [
    {
      id: 'bassa-greetings-1',
      title: 'Basic Greetings',
      description: 'Learn essential Bassa greetings',
      difficulty: 'beginner',
      category: 'greetings',
      xpReward: 20,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in Bassa?',
          options: ['Mbolo', 'Nchié', 'A jam tan', 'Mudolo'],
          correctAnswer: 'Mbolo',
          explanation: 'Mbolo is used as a greeting in Bassa'
        }
      ]
    }
  ],
  kanuri: [
    {
      id: 'kanuri-greetings-1',
      title: 'Basic Greetings',
      description: 'Learn essential Kanuri greetings',
      difficulty: 'beginner',
      category: 'greetings',
      xpReward: 20,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in Kanuri?',
          options: ['Wòsái', 'Mbolo', 'A jam tan', 'Mudolo'],
          correctAnswer: 'Wòsái',
          explanation: 'Wòsái is a common greeting in Kanuri'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'How do you ask "How are you?" in Kanuri?',
          options: ['Kánda lò?', 'Wòsái', 'Sannu', 'Mbolo'],
          correctAnswer: 'Kánda lò?',
          explanation: 'Kánda lò? means "How are you?" in Kanuri'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is the response to "Kánda lò?"',
          options: ['Kánda nǞzé', 'Wòsái', 'Sannu', 'Mudolo'],
          correctAnswer: 'Kánda nǞzé',
          explanation: 'Kánda nǞzé means "I am fine" in Kanuri'
        }
      ]
    },
    {
      id: 'kanuri-family-1',
      title: 'Family Members',
      description: 'Learn family terms in Kanuri',
      difficulty: 'beginner',
      category: 'family',
      xpReward: 25,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "father" in Kanuri?',
          options: ['Bába', 'Máma', 'Nyíma', 'Kára'],
          correctAnswer: 'Bába',
          explanation: 'Bába means father in Kanuri'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "mother" in Kanuri?',
          options: ['Nyíma', 'Bába', 'Kára', 'Wòsái'],
          correctAnswer: 'Nyíma',
          explanation: 'Nyíma means mother in Kanuri'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is "child" in Kanuri?',
          options: ['Kára', 'Bába', 'Nyíma', 'Wòsái'],
          correctAnswer: 'Kára',
          explanation: 'Kára means child in Kanuri'
        }
      ]
    },
    {
      id: 'kanuri-numbers-1',
      title: 'Numbers 1-10',
      description: 'Learn counting in Kanuri',
      difficulty: 'beginner',
      category: 'numbers',
      xpReward: 30,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "one" in Kanuri?',
          options: ['Tílò', 'NǞndò', 'Yáskò', 'Dǝ́gò'],
          correctAnswer: 'Tílò',
          explanation: 'Tílò means one in Kanuri'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "two" in Kanuri?',
          options: ['NǞndò', 'Tílò', 'Yáskò', 'Dǝ́gò'],
          correctAnswer: 'NǞndò',
          explanation: 'NǞndò means two in Kanuri'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is "three" in Kanuri?',
          options: ['Yáskò', 'NǞndò', 'Tílò', 'Dǝ́gò'],
          correctAnswer: 'Yáskò',
          explanation: 'Yáskò means three in Kanuri'
        }
      ]
    },
    {
      id: 'kanuri-vocabulary-1',
      title: 'Common Words',
      description: 'Essential Kanuri vocabulary',
      difficulty: 'beginner',
      category: 'vocabulary',
      xpReward: 25,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What is "water" in Kanuri?',
          options: ['Nǝ́m', 'Kára', 'Fátò', 'Shí'],
          correctAnswer: 'Nǝ́m',
          explanation: 'Nǝ́m means water in Kanuri'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'What is "food" in Kanuri?',
          options: ['Kámma', 'Nǝ́m', 'Shí', 'Fátò'],
          correctAnswer: 'Kámma',
          explanation: 'Kámma means food in Kanuri'
        },
        {
          id: 'ex3',
          type: 'multiple-choice',
          question: 'What is "house" in Kanuri?',
          options: ['Fátò', 'Kámma', 'Nǝ́m', 'Shí'],
          correctAnswer: 'Fátò',
          explanation: 'Fátò means house in Kanuri'
        }
      ]
    },
    {
      id: 'kanuri-phrases-1',
      title: 'Useful Phrases',
      description: 'Common expressions in Kanuri',
      difficulty: 'intermediate',
      category: 'phrases',
      xpReward: 35,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Thank you" in Kanuri?',
          options: ['Káshim nézé', 'Wòsái', 'Kánda lò', 'Nǝ́m'],
          correctAnswer: 'Káshim nézé',
          explanation: 'Káshim nézé means thank you in Kanuri'
        },
        {
          id: 'ex2',
          type: 'multiple-choice',
          question: 'How do you say "Yes" in Kanuri?',
          options: ['Éwo', 'Káshim', 'Wòsái', 'NǞndò'],
          correctAnswer: 'Éwo',
          explanation: 'Éwo means yes in Kanuri'
        }
      ]
    }
  ],
  meta: [
    {
      id: 'meta-greetings-1',
      title: 'Basic Greetings',
      description: 'Learn essential Meta\' greetings',
      difficulty: 'beginner',
      category: 'greetings',
      xpReward: 20,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in Meta\'?',
          options: ['Ndo', 'Mbolo', 'A jam tan', 'Mudolo'],
          correctAnswer: 'Ndo',
          explanation: 'Ndo is a greeting in Meta\' language'
        }
      ]
    }
  ],
  kom: [
    {
      id: 'kom-greetings-1',
      title: 'Basic Greetings',
      description: 'Learn essential Kom greetings',
      difficulty: 'beginner',
      category: 'greetings',
      xpReward: 20,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in Kom?',
          options: ['Ndo', 'Mbolo', 'A jam tan', 'Mudolo'],
          correctAnswer: 'Ndo',
          explanation: 'Ndo is used as a greeting in Kom'
        }
      ]
    }
  ],
  bamoun: [
    {
      id: 'bamoun-greetings-1',
      title: 'Basic Greetings',
      description: 'Learn essential Bamoun greetings',
      difficulty: 'beginner',
      category: 'greetings',
      xpReward: 20,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in Bamoun?',
          options: ['Nchié', 'Mbolo', 'A jam tan', 'Mudolo'],
          correctAnswer: 'Nchié',
          explanation: 'Nchié is a greeting in Bamoun language'
        }
      ]
    }
  ],
  medumba: [
    {
      id: 'medumba-greetings-1',
      title: 'Basic Greetings',
      description: 'Learn essential Medumba greetings',
      difficulty: 'beginner',
      category: 'greetings',
      xpReward: 20,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in Medumba?',
          options: ['Nchié', 'Mbolo', 'A jam tan', 'Mudolo'],
          correctAnswer: 'Nchié',
          explanation: 'Nchié is used as a greeting in Medumba'
        }
      ]
    }
  ],
  mundang: [
    {
      id: 'mundang-greetings-1',
      title: 'Basic Greetings',
      description: 'Learn essential Mundang greetings',
      difficulty: 'beginner',
      category: 'greetings',
      xpReward: 20,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in Mundang?',
          options: ['Sannu', 'Mbolo', 'A jam tan', 'Mudolo'],
          correctAnswer: 'Sannu',
          explanation: 'Sannu is a greeting in Mundang'
        }
      ]
    }
  ],
  gbaya: [
    {
      id: 'gbaya-greetings-1',
      title: 'Basic Greetings',
      description: 'Learn essential Gbaya greetings',
      difficulty: 'beginner',
      category: 'greetings',
      xpReward: 20,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in Gbaya?',
          options: ['Mbolo', 'Nchié', 'A jam tan', 'Mudolo'],
          correctAnswer: 'Mbolo',
          explanation: 'Mbolo is used as a greeting in Gbaya'
        }
      ]
    }
  ]
};

// Learning paths for each language
export const LEARNING_PATHS: Record<string, LearningPath> = {
  fulfulde: {
    id: 'fulfulde-path',
    title: 'Fulfulde Learning Journey',
    description: 'Master the language of the Fulani people',
    totalLessons: 5,
    estimatedTime: '3-4 weeks',
    units: [
      {
        id: 'fulfulde-basics',
        title: 'Basics',
        description: 'Essential greetings and introductions',
        lessons: ['fulfulde-greetings-1'],
        isLocked: false,
        requiredXP: 0,
        icon: '👋',
        color: 'from-orange-400 to-red-500'
      },
      {
        id: 'fulfulde-family',
        title: 'Family',
        description: 'Family members and relationships',
        lessons: ['fulfulde-family-1'],
        isLocked: false,
        requiredXP: 20,
        icon: '👨‍👩‍👧‍👦',
        color: 'from-green-400 to-blue-500'
      },
      {
        id: 'fulfulde-numbers',
        title: 'Numbers',
        description: 'Counting and basic mathematics',
        lessons: ['fulfulde-numbers-1'],
        isLocked: false,
        requiredXP: 50,
        icon: '🔢',
        color: 'from-purple-400 to-pink-500'
      },
      {
        id: 'fulfulde-vocabulary',
        title: 'Common Words',
        description: 'Essential daily vocabulary',
        lessons: ['fulfulde-basics-1'],
        isLocked: false,
        requiredXP: 80,
        icon: '📚',
        color: 'from-blue-400 to-indigo-500'
      },
      {
        id: 'fulfulde-culture',
        title: 'Polite Expressions',
        description: 'Cultural and respectful phrases',
        lessons: ['fulfulde-advanced-1'],
        isLocked: false,
        requiredXP: 105,
        icon: '🤝',
        color: 'from-amber-400 to-orange-500'
      }
    ]
  },
  ewondo: {
    id: 'ewondo-path',
    title: 'Ewondo Learning Journey',
    description: 'Discover the language of the Beti people',
    totalLessons: 5,
    estimatedTime: '3-4 weeks',
    units: [
      {
        id: 'ewondo-basics',
        title: 'Basics',
        description: 'Essential greetings and introductions',
        lessons: ['ewondo-greetings-1'],
        isLocked: false,
        requiredXP: 0,
        icon: '👋',
        color: 'from-green-400 to-emerald-500'
      },
      {
        id: 'ewondo-family',
        title: 'Family',
        description: 'Family members and relationships',
        lessons: ['ewondo-family-1'],
        isLocked: false,
        requiredXP: 20,
        icon: '👨‍👩‍👧‍👦',
        color: 'from-blue-400 to-green-500'
      },
      {
        id: 'ewondo-numbers',
        title: 'Numbers',
        description: 'Learn to count in Ewondo',
        lessons: ['ewondo-numbers-1'],
        isLocked: false,
        requiredXP: 45,
        icon: '🔢',
        color: 'from-teal-400 to-cyan-500'
      },
      {
        id: 'ewondo-vocabulary',
        title: 'Common Words',
        description: 'Essential Ewondo vocabulary',
        lessons: ['ewondo-vocabulary-1'],
        isLocked: false,
        requiredXP: 75,
        icon: '📚',
        color: 'from-emerald-400 to-green-500'
      },
      {
        id: 'ewondo-phrases',
        title: 'Useful Phrases',
        description: 'Common expressions',
        lessons: ['ewondo-phrases-1'],
        isLocked: false,
        requiredXP: 100,
        icon: '💬',
        color: 'from-lime-400 to-emerald-500'
      }
    ]
  },
  duala: {
    id: 'duala-path',
    title: 'Duala Learning Journey',
    description: 'Learn the coastal language of trade',
    totalLessons: 5,
    estimatedTime: '3-4 weeks',
    units: [
      {
        id: 'duala-basics',
        title: 'Basics',
        description: 'Essential greetings and introductions',
        lessons: ['duala-greetings-1'],
        isLocked: false,
        requiredXP: 0,
        icon: '👋',
        color: 'from-blue-400 to-cyan-500'
      },
      {
        id: 'duala-family',
        title: 'Family',
        description: 'Family members and relationships',
        lessons: ['duala-family-1'],
        isLocked: false,
        requiredXP: 20,
        icon: '👨‍👩‍👧‍👦',
        color: 'from-cyan-400 to-blue-500'
      },
      {
        id: 'duala-numbers',
        title: 'Numbers',
        description: 'Learn counting in Duala',
        lessons: ['duala-numbers-1'],
        isLocked: false,
        requiredXP: 45,
        icon: '🔢',
        color: 'from-sky-400 to-blue-500'
      },
      {
        id: 'duala-vocabulary',
        title: 'Trade & Market',
        description: 'Essential trade vocabulary',
        lessons: ['duala-vocabulary-1'],
        isLocked: false,
        requiredXP: 75,
        icon: '⚓',
        color: 'from-blue-400 to-indigo-500'
      },
      {
        id: 'duala-phrases',
        title: 'Polite Expressions',
        description: 'Respectful phrases',
        lessons: ['duala-phrases-1'],
        isLocked: false,
        requiredXP: 100,
        icon: '🤝',
        color: 'from-indigo-400 to-blue-500'
      }
    ]
  },
  bamileke: {
    id: 'bamileke-path',
    title: 'Bamiléké Learning Journey',
    description: 'Explore the royal language of the highlands',
    totalLessons: 4,
    estimatedTime: '2-3 weeks',
    units: [
      {
        id: 'bamileke-basics',
        title: 'Basics',
        description: 'Essential greetings and royal protocols',
        lessons: ['bamileke-greetings-1'],
        isLocked: false,
        requiredXP: 0,
        icon: '👋',
        color: 'from-yellow-400 to-orange-500'
      },
      {
        id: 'bamileke-family',
        title: 'Family',
        description: 'Family members and relationships',
        lessons: ['bamileke-family-1'],
        isLocked: false,
        requiredXP: 20,
        icon: '👨‍👩‍👧‍👦',
        color: 'from-orange-400 to-amber-500'
      },
      {
        id: 'bamileke-numbers',
        title: 'Numbers',
        description: 'Basic counting',
        lessons: ['bamileke-numbers-1'],
        isLocked: false,
        requiredXP: 45,
        icon: '🔢',
        color: 'from-amber-400 to-yellow-500'
      },
      {
        id: 'bamileke-culture',
        title: 'Culture',
        description: 'Cultural terms and traditions',
        lessons: ['bamileke-culture-1'],
        isLocked: false,
        requiredXP: 75,
        icon: '👑',
        color: 'from-yellow-400 to-orange-600'
      }
    ]
  },
  bassa: {
    id: 'bassa-path',
    title: 'Bassa Learning Journey',
    description: 'Learn the language of traditional healers',
    totalLessons: 1,
    estimatedTime: '1-2 weeks',
    units: [
      {
        id: 'bassa-basics',
        title: 'Basics',
        description: 'Essential greetings and forest wisdom',
        lessons: ['bassa-greetings-1'],
        isLocked: false,
        requiredXP: 0,
        icon: '🌿',
        color: 'from-green-400 to-emerald-500'
      }
    ]
  },
  kanuri: {
    id: 'kanuri-path',
    title: 'Kanuri Learning Journey',
    description: 'Discover the language of ancient empires',
    totalLessons: 5,
    estimatedTime: '3-4 weeks',
    units: [
      {
        id: 'kanuri-basics',
        title: 'Basics',
        description: 'Essential greetings and introductions',
        lessons: ['kanuri-greetings-1'],
        isLocked: false,
        requiredXP: 0,
        icon: '👋',
        color: 'from-red-400 to-orange-500'
      },
      {
        id: 'kanuri-family',
        title: 'Family',
        description: 'Family members and relationships',
        lessons: ['kanuri-family-1'],
        isLocked: false,
        requiredXP: 20,
        icon: '👨‍👩‍👧‍👦',
        color: 'from-orange-400 to-red-500'
      },
      {
        id: 'kanuri-numbers',
        title: 'Numbers',
        description: 'Learn counting in Kanuri',
        lessons: ['kanuri-numbers-1'],
        isLocked: false,
        requiredXP: 45,
        icon: '🔢',
        color: 'from-amber-400 to-red-500'
      },
      {
        id: 'kanuri-vocabulary',
        title: 'Common Words',
        description: 'Essential Kanuri vocabulary',
        lessons: ['kanuri-vocabulary-1'],
        isLocked: false,
        requiredXP: 75,
        icon: '🏜️',
        color: 'from-yellow-400 to-orange-500'
      },
      {
        id: 'kanuri-phrases',
        title: 'Useful Phrases',
        description: 'Common expressions',
        lessons: ['kanuri-phrases-1'],
        isLocked: false,
        requiredXP: 100,
        icon: '💬',
        color: 'from-orange-400 to-amber-500'
      }
    ]
  },
  meta: {
    id: 'meta-path',
    title: 'Meta\' Learning Journey',
    description: 'Learn the grasslands language',
    totalLessons: 1,
    estimatedTime: '1-2 weeks',
    units: [
      {
        id: 'meta-basics',
        title: 'Basics',
        description: 'Essential greetings and mountain culture',
        lessons: ['meta-greetings-1'],
        isLocked: false,
        requiredXP: 0,
        icon: '⛰️',
        color: 'from-brown-400 to-amber-500'
      }
    ]
  },
  kom: {
    id: 'kom-path',
    title: 'Kom Learning Journey',
    description: 'Explore the highland language',
    totalLessons: 1,
    estimatedTime: '1-2 weeks',
    units: [
      {
        id: 'kom-basics',
        title: 'Basics',
        description: 'Essential greetings and highland traditions',
        lessons: ['kom-greetings-1'],
        isLocked: false,
        requiredXP: 0,
        icon: '🏔️',
        color: 'from-brown-400 to-yellow-500'
      }
    ]
  },
  bamoun: {
    id: 'bamoun-path',
    title: 'Bamoun Learning Journey',
    description: 'Learn the language with its own script',
    totalLessons: 1,
    estimatedTime: '1-2 weeks',
    units: [
      {
        id: 'bamoun-basics',
        title: 'Basics',
        description: 'Essential greetings and royal traditions',
        lessons: ['bamoun-greetings-1'],
        isLocked: false,
        requiredXP: 0,
        icon: '📜',
        color: 'from-yellow-400 to-amber-500'
      }
    ]
  },
  medumba: {
    id: 'medumba-path',
    title: 'Medumba Learning Journey',
    description: 'Discover the artisan language',
    totalLessons: 1,
    estimatedTime: '1-2 weeks',
    units: [
      {
        id: 'medumba-basics',
        title: 'Basics',
        description: 'Essential greetings and craft traditions',
        lessons: ['medumba-greetings-1'],
        isLocked: false,
        requiredXP: 0,
        icon: '🎨',
        color: 'from-amber-400 to-orange-500'
      }
    ]
  },
  mundang: {
    id: 'mundang-path',
    title: 'Mundang Learning Journey',
    description: 'Learn the language of warriors',
    totalLessons: 1,
    estimatedTime: '1-2 weeks',
    units: [
      {
        id: 'mundang-basics',
        title: 'Basics',
        description: 'Essential greetings and warrior traditions',
        lessons: ['mundang-greetings-1'],
        isLocked: false,
        requiredXP: 0,
        icon: '⚔️',
        color: 'from-red-400 to-pink-500'
      }
    ]
  },
  gbaya: {
    id: 'gbaya-path',
    title: 'Gbaya Learning Journey',
    description: 'Explore the forest language',
    totalLessons: 1,
    estimatedTime: '1-2 weeks',
    units: [
      {
        id: 'gbaya-basics',
        title: 'Basics',
        description: 'Essential greetings and forest wisdom',
        lessons: ['gbaya-greetings-1'],
        isLocked: false,
        requiredXP: 0,
        icon: '🌳',
        color: 'from-green-400 to-emerald-500'
      }
    ]
  }
};

export const EMPTY_LEARNING_PATH: LearningPath = {
  id: 'empty',
  title: 'Learning Path',
  description: 'Start your language journey',
  totalLessons: 0,
  estimatedTime: '0 weeks',
  units: []
};

// Cultural content for each language
export const CULTURAL_CONTENT: Record<string, CulturalContent[]> = {
  fulfulde: [
    {
      id: 'fulani-proverb-1',
      type: 'proverb',
      title: 'Fulani Wisdom',
      content: 'Hoore mawdo, hoore mawdo',
      translation: 'A big head, a big head (wisdom comes with experience)',
      audioUrl: '/audio/fulfulde/proverb1.mp3'
    }
  ],
  ewondo: [
    {
      id: 'beti-proverb-1',
      type: 'proverb',
      title: 'Beti Wisdom',
      content: 'Nnam be asu, be asu nnam',
      translation: 'The forest teaches, we learn from the forest',
      audioUrl: '/audio/ewondo/proverb1.mp3'
    }
  ],
  duala: [
    {
      id: 'duala-proverb-1',
      type: 'proverb',
      title: 'Duala Wisdom',
      content: 'Mbu ma loba, mbu ma kosa',
      translation: 'Water flows, water cleanses (life moves forward)',
      audioUrl: '/audio/duala/proverb1.mp3'
    }
  ],
  bamileke: [
    {
      id: 'bamileke-proverb-1',
      type: 'proverb',
      title: 'Bamiléké Wisdom',
      content: 'Fon ka nkap, nkap ka fon',
      translation: 'The chief makes the people, the people make the chief',
      audioUrl: '/audio/bamileke/proverb1.mp3'
    }
  ],
  bassa: [
    {
      id: 'bassa-proverb-1',
      type: 'proverb',
      title: 'Bassa Wisdom',
      content: 'Nkomo i bot, bot i nkomo',
      translation: 'Medicine heals, healing is medicine',
      audioUrl: '/audio/bassa/proverb1.mp3'
    }
  ],
  kanuri: [
    {
      id: 'kanuri-proverb-1',
      type: 'proverb',
      title: 'Kanuri Wisdom',
      content: 'Kura da sauki, sauki da kura',
      translation: 'Patience brings ease, ease comes with patience',
      audioUrl: '/audio/kanuri/proverb1.mp3'
    }
  ],
  meta: [
    {
      id: 'meta-proverb-1',
      type: 'proverb',
      title: 'Meta\' Wisdom',
      content: 'Ndo ka nkeng, nkeng ka ndo',
      translation: 'Greetings bring unity, unity brings greetings',
      audioUrl: '/audio/meta/proverb1.mp3'
    }
  ],
  kom: [
    {
      id: 'kom-proverb-1',
      type: 'proverb',
      title: 'Kom Wisdom',
      content: 'Yaa ka nkwenti, nkwenti ka yaa',
      translation: 'Respect brings honor, honor brings respect',
      audioUrl: '/audio/kom/proverb1.mp3'
    }
  ],
  bamoun: [
    {
      id: 'bamoun-proverb-1',
      type: 'proverb',
      title: 'Bamoun Wisdom',
      content: 'Njoya ka shum, shum ka njoya',
      translation: 'The king makes the kingdom, the kingdom makes the king',
      audioUrl: '/audio/bamoun/proverb1.mp3'
    }
  ],
  medumba: [
    {
      id: 'medumba-proverb-1',
      type: 'proverb',
      title: 'Medumba Wisdom',
      content: 'Byèp ka tagne, tagne ka byèp',
      translation: 'Craft makes the artisan, the artisan makes the craft',
      audioUrl: '/audio/medumba/proverb1.mp3'
    }
  ],
  mundang: [
    {
      id: 'mundang-proverb-1',
      type: 'proverb',
      title: 'Mundang Wisdom',
      content: 'Kaltuma ka bello, bello ka kaltuma',
      translation: 'Strength comes from unity, unity comes from strength',
      audioUrl: '/audio/mundang/proverb1.mp3'
    }
  ],
  gbaya: [
    {
      id: 'gbaya-proverb-1',
      type: 'proverb',
      title: 'Gbaya Wisdom',
      content: 'Nzapa ka koda, koda ka nzapa',
      translation: 'The forest teaches the hunter, the hunter respects the forest',
      audioUrl: '/audio/gbaya/proverb1.mp3'
    }
  ]
};