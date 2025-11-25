# Project Structure

## 📂 Directory Layout

```
reroot-language-app/
│
├── 📱 PLAY STORE VERSION (Root - Android + Web)
│   │
│   ├── 📄 Configuration Files
│   │   ├── package.json              # Includes Capacitor dependencies
│   │   ├── capacitor.config.ts       # Capacitor configuration
│   │   ├── vite.config.ts            # Vite build config
│   │   ├── tsconfig.json             # TypeScript config
│   │   ├── tailwind.config.js        # Tailwind CSS config
│   │   ├── .gitignore                # Git ignore rules
│   │   └── .env                      # Environment variables (not in git)
│   │
│   ├── 📱 Android Native
│   │   └── android/                  # Native Android project
│   │       ├── app/                  # Android app module
│   │       │   ├── src/              # Android source code
│   │       │   └── build.gradle      # App build configuration
│   │       ├── gradle/               # Gradle wrapper
│   │       ├── build.gradle          # Root build config
│   │       └── settings.gradle       # Project settings
│   │
│   ├── 💻 Source Code
│   │   └── src/
│   │       ├── components/           # React components
│   │       │   ├── auth/            # Authentication components
│   │       │   ├── ExerciseTypes/   # Lesson exercise components
│   │       │   ├── HomePage.tsx     # Landing page
│   │       │   ├── LanguageSelector.tsx
│   │       │   ├── LearningRoadmap.tsx
│   │       │   ├── LessonInterface.tsx
│   │       │   ├── ProgressDashboard.tsx
│   │       │   └── ...              # Other UI components
│   │       │
│   │       ├── data/                # Static data
│   │       │   ├── languages.ts     # Language definitions
│   │       │   └── lessons.ts       # Lesson content (5+ lessons per language)
│   │       │
│   │       ├── hooks/               # Custom React hooks
│   │       │   └── useAuth.ts       # Authentication hook
│   │       │
│   │       ├── services/            # API services
│   │       │   └── authService.ts   # Auth API calls
│   │       │
│   │       ├── types/               # TypeScript types
│   │       │   ├── index.ts         # Main type definitions
│   │       │   └── auth.ts          # Auth types
│   │       │
│   │       ├── utils/               # Utility functions
│   │       │   ├── culturalContext.ts
│   │       │   └── progressManager.ts
│   │       │
│   │       ├── config/              # Configuration
│   │       │   └── supabase.ts      # Supabase client setup
│   │       │
│   │       ├── App.tsx              # Main app component
│   │       ├── main.tsx             # Entry point (with Capacitor)
│   │       └── index.css            # Global styles
│   │
│   ├── 🌐 Public Assets
│   │   └── public/
│   │       └── favicon.ico
│   │
│   ├── 🗄️ Database
│   │   └── supabase/
│   │       └── migrations/          # Database migrations
│   │           ├── 20250901010940_broken_shore.sql
│   │           └── 20251003153011_update_user_profiles_and_progress.sql
│   │
│   ├── 🏗️ Build Output
│   │   └── dist/                    # Production build (generated)
│   │
│   ├── 📚 Documentation
│   │   ├── README.md                # Main documentation
│   │   ├── PROJECT_OVERVIEW.md      # Project overview (this file)
│   │   ├── VERSION_GUIDE.md         # Version comparison
│   │   ├── STRUCTURE.md             # This file
│   │   ├── QUICKSTART_ANDROID.md    # Android quick start
│   │   ├── PLAYSTORE_DEPLOYMENT.md  # Play Store guide
│   │   ├── API_DOCUMENTATION.md     # API reference
│   │   └── SECURITY_GUIDE.md        # Security documentation
│   │
│   └── 🔧 Server (Optional)
│       └── server/                  # Backend API (if needed)
│           ├── config/
│           ├── middleware/
│           ├── routes/
│           ├── services/
│           └── package.json
│
│
└── 🌐 WEB-ONLY VERSION
    └── web-only-version/
        │
        ├── 📄 Configuration Files
        │   ├── package.json          # WITHOUT Capacitor dependencies
        │   ├── vite.config.ts        # Vite build config
        │   ├── tsconfig.json         # TypeScript config
        │   ├── tailwind.config.js    # Tailwind CSS config
        │   ├── .gitignore            # Git ignore rules
        │   └── .env                  # Environment variables
        │
        ├── 💻 Source Code (Same as Play Store)
        │   └── src/
        │       ├── components/       # React components
        │       ├── data/             # Language data
        │       ├── hooks/            # Custom hooks
        │       ├── services/         # API services
        │       ├── types/            # TypeScript types
        │       ├── utils/            # Utilities
        │       ├── config/           # Configuration
        │       ├── App.tsx
        │       ├── main.tsx          # Entry point (NO Capacitor)
        │       └── index.css
        │
        ├── 🌐 Public Assets
        │   └── public/
        │       └── favicon.ico
        │
        ├── 🗄️ Database
        │   └── supabase/
        │       └── migrations/       # Same as Play Store version
        │
        ├── 🏗️ Build Output
        │   └── dist/                 # Production build (generated)
        │
        └── 📚 Documentation
            └── README.md             # Web-only docs

```

## 📊 Key Differences

### Play Store Version (Root)
- ✅ Has `android/` directory
- ✅ Has `capacitor.config.ts`
- ✅ Capacitor dependencies in `package.json`
- ✅ Mobile optimizations in `main.tsx`
- ✅ Mobile meta tags in `index.html`

### Web-Only Version
- ❌ No `android/` directory
- ❌ No `capacitor.config.ts`
- ❌ No Capacitor dependencies
- ✅ Clean `main.tsx` (no Capacitor imports)
- ✅ Standard meta tags in `index.html`

## 📝 Important Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `capacitor.config.ts` | Capacitor configuration (Play Store only) |
| `vite.config.ts` | Build tool configuration |
| `.env` | Environment variables (Supabase credentials) |
| `src/data/lessons.ts` | Lesson content (12+ languages, 5+ lessons each) |
| `src/data/languages.ts` | Language definitions |
| `android/app/build.gradle` | Android build config (Play Store only) |
| `supabase/migrations/` | Database schema |

## 🔄 Shared Components

Both versions share:
- ✅ All React components
- ✅ All lesson content
- ✅ All language data
- ✅ Authentication system
- ✅ Progress tracking
- ✅ UI/UX design
- ✅ Supabase integration

## 📦 Package Dependencies

### Play Store Version
```json
{
  "dependencies": {
    "@capacitor/android": "^7.4.3",
    "@capacitor/cli": "^7.4.3",
    "@capacitor/core": "^7.4.3",
    "@capacitor/splash-screen": "^7.0.3",
    "@capacitor/status-bar": "^7.0.3",
    "@supabase/supabase-js": "^2.58.0",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

### Web-Only Version
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.58.0",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

## 🎯 Build Outputs

### Play Store Version
- `dist/` - Web build for hosting
- `android/app/build/outputs/bundle/release/` - Android App Bundle (.aab)
- `android/app/build/outputs/apk/release/` - Android APK

### Web-Only Version
- `dist/` - Web build for hosting

## 📖 Documentation Map

```
Documentation/
├── PROJECT_OVERVIEW.md       ← Start here
├── VERSION_GUIDE.md          ← Choose your version
├── STRUCTURE.md              ← This file (understand structure)
│
├── Play Store Version Docs
│   ├── README.md             ← Main docs
│   ├── QUICKSTART_ANDROID.md ← Quick Android setup
│   └── PLAYSTORE_DEPLOYMENT.md ← Play Store guide
│
└── Web-Only Version Docs
    └── web-only-version/README.md ← Web deployment
```

## 🚀 Getting Started Flow

1. **Read**: [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
2. **Choose**: [VERSION_GUIDE.md](./VERSION_GUIDE.md)
3. **Understand**: [STRUCTURE.md](./STRUCTURE.md) (this file)
4. **Build**:
   - Play Store: [QUICKSTART_ANDROID.md](./QUICKSTART_ANDROID.md)
   - Web: [web-only-version/README.md](./web-only-version/README.md)
5. **Deploy**:
   - Play Store: [PLAYSTORE_DEPLOYMENT.md](./PLAYSTORE_DEPLOYMENT.md)
   - Web: Standard web hosting

---

**Navigate the project with confidence!** 🎯
