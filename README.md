# ReRoot Languages - African Language Learning App

**🎯 This is the Play Store Version (Android App + Web)**

ReRoot Languages is a mobile and web application dedicated to preserving and teaching indigenous Cameroonian languages. Built with React, TypeScript, and Capacitor, it offers authentic language learning experiences designed by native speakers.

> **📂 Looking for the web-only version?** See [web-only-version/](./web-only-version/) for a lighter version without mobile dependencies.
>
> **🤔 Not sure which version to use?** Check the [VERSION_GUIDE.md](./VERSION_GUIDE.md) for a detailed comparison.

## 🌍 Features

### Languages
Learn 12+ indigenous Cameroonian languages:
- **Fulfulde** - Language of the Fulani people
- **Ewondo** - Beti-Pahuin heritage language
- **Duala** - Coastal trade language
- **Bamiléké (Fe'fe')** - Highland royal language
- **Kanuri** - Language of ancient empires
- **Kom, Meta', Bamoun, Medumba, Mundang, Gbaya, Bassa**

### Learning Features
- ✅ Structured learning paths with progressive difficulty
- ✅ Multiple exercise types (translation, multiple choice, audio)
- ✅ Cultural context and insights with every lesson
- ✅ Progress tracking with XP and streaks
- ✅ Achievement system
- ✅ Offline support (mobile)
- ✅ Native speaker audio and pronunciation
- ✅ Traditional proverbs and cultural wisdom

### Technical Features
- 📱 Native Android app support via Capacitor
- 🌐 Progressive Web App (PWA)
- 🔐 Secure authentication with Supabase
- 💾 Cloud progress sync
- 🎨 Beautiful, responsive UI with Tailwind CSS
- ⚡ Fast and optimized performance

## 🚀 Quick Start

### Web Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Android App

```bash
# Build and prepare Android project
npm run android:build

# Open in Android Studio
npm run android:open
```

For detailed Android deployment instructions, see:
- **Quick Start**: [QUICKSTART_ANDROID.md](./QUICKSTART_ANDROID.md)
- **Full Deployment Guide**: [PLAYSTORE_DEPLOYMENT.md](./PLAYSTORE_DEPLOYMENT.md)

## 📱 Platform Support

### Current
- ✅ Web (Desktop & Mobile browsers)
- ✅ Android (via Capacitor)

### Coming Soon
- 🚧 iOS (App Store)

## 🛠 Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Mobile
- **Capacitor** - Native app wrapper
- **@capacitor/android** - Android platform
- **@capacitor/splash-screen** - Splash screens
- **@capacitor/status-bar** - Status bar control

### Backend & Data
- **Supabase** - Database and authentication
- **PostgreSQL** - Relational database
- **Row Level Security (RLS)** - Data security

## 📂 Project Structure

```
reroot-language-app/
├── src/
│   ├── components/       # React components
│   │   ├── auth/        # Authentication components
│   │   ├── ExerciseTypes/ # Lesson exercise types
│   │   └── ...          # UI components
│   ├── data/            # Language data and lessons
│   │   ├── languages.ts # Language definitions
│   │   └── lessons.ts   # Lesson content
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API and auth services
│   ├── types/           # TypeScript definitions
│   ├── utils/           # Utility functions
│   └── config/          # Configuration files
├── android/             # Android native project
├── public/              # Static assets
├── supabase/           # Database migrations
└── docs/               # Documentation

```

## 🎯 Getting Started with Development

### Prerequisites
- Node.js 18+
- npm or yarn
- (For Android) Android Studio & JDK 11+

### Environment Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run development server:
```bash
npm run dev
```

### Database Setup

The app uses Supabase for data persistence. Database migrations are located in `supabase/migrations/`.

To apply migrations:
1. Connect to your Supabase project
2. Migrations will be automatically applied

## 📚 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Android
```bash
npm run android:build    # Build web and sync to Android
npm run android:open     # Open project in Android Studio
npm run android:run      # Build and open in one command
```

### Capacitor
```bash
npm run capacitor:sync   # Sync web assets to native projects
npm run capacitor:update # Update Capacitor dependencies
```

## 🎨 Lesson Content Structure

Each language includes:
- **Greetings & Basics** - Essential phrases and introductions
- **Family Members** - Kinship terms and relationships
- **Numbers** - Counting and basic math
- **Common Vocabulary** - Daily life words and phrases
- **Cultural Content** - Proverbs, traditions, and context

### Adding New Lessons

1. Edit `src/data/lessons.ts`
2. Add lesson data to the appropriate language array
3. Update learning paths if needed
4. Include cultural context and explanations

## 🔐 Authentication

The app uses Supabase Authentication with:
- Email/password authentication
- Automatic session management
- Secure token refresh
- Row Level Security (RLS) for data access

User data includes:
- Profile information
- Learning progress
- Language-specific XP and levels
- Lesson completion history

## 📊 Progress Tracking

User progress is stored in Supabase:
- **user_profiles** - User preferences and settings
- **user_progress** - Overall XP, streaks, and levels
- **language_progress** - Per-language learning data
- **lesson_completions** - Individual lesson records

## 🎯 Roadmap

### v1.1
- [ ] Audio pronunciation for all lessons
- [ ] Conversation practice mode
- [ ] Community features
- [ ] Leaderboards

### v1.2
- [ ] iOS app release
- [ ] Offline mode improvements
- [ ] Voice recognition for pronunciation
- [ ] More languages (Yoruba, Swahili, Hausa)

### v2.0
- [ ] Live tutoring sessions
- [ ] Certificate programs
- [ ] Advanced grammar lessons
- [ ] Cultural immersion content

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Language Content**: Native speakers can contribute lessons and cultural context
2. **Translation**: Help translate the app interface
3. **Bug Reports**: Report issues on GitHub
4. **Feature Requests**: Suggest new features
5. **Code**: Submit pull requests

### Content Contributors
If you're a native speaker and want to contribute lessons:
1. Review existing lessons for your language
2. Submit corrections or additions
3. Provide audio recordings
4. Share cultural insights

## 📄 Documentation

- [Android Deployment Quick Start](./QUICKSTART_ANDROID.md)
- [Play Store Deployment Guide](./PLAYSTORE_DEPLOYMENT.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Security Guide](./SECURITY_GUIDE.md)

## 🐛 Known Issues

- Audio files are placeholders (need native speaker recordings)
- Some languages have limited lesson content (actively expanding)
- Offline mode requires initial login (Capacitor limitation)

## 📞 Support

- **Issues**: GitHub Issues
- **Email**: support@reroot-languages.com
- **Documentation**: See docs folder

## 📜 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Native speakers who contributed language content
- Cameroonian language preservation organizations
- Open source community
- Supabase for backend infrastructure

## 🌟 Star History

If you find this project useful, please consider giving it a star on GitHub!

---

**Built with ❤️ to preserve and promote African indigenous languages**
