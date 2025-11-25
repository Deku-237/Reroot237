# ReRoot Languages - Project Overview

## 📱 Two Versions Available

This repository contains **two versions** of the ReRoot Languages application:

### 1. 📱 **Play Store Version** (Main Directory)
- **Location**: Root directory (`./`)
- **Purpose**: Android app for Google Play Store + Web
- **Quick Start**: `npm install && npm run android:run`
- **Documentation**: [README.md](./README.md)

### 2. 🌐 **Web-Only Version**
- **Location**: `./web-only-version/`
- **Purpose**: Pure web application (Netlify, Vercel, etc.)
- **Quick Start**: `cd web-only-version && npm install && npm run dev`
- **Documentation**: [web-only-version/README.md](./web-only-version/README.md)

---

## 🚀 Quick Commands

### Play Store Version (Android + Web)
```bash
# Web development
npm install
npm run dev

# Android development
npm run android:build
npm run android:open

# Build for production
npm run build
```

### Web-Only Version
```bash
cd web-only-version
npm install
npm run dev
npm run build
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [VERSION_GUIDE.md](./VERSION_GUIDE.md) | Compare both versions and choose the right one |
| [README.md](./README.md) | Play Store version documentation |
| [QUICKSTART_ANDROID.md](./QUICKSTART_ANDROID.md) | Quick guide for Android development |
| [PLAYSTORE_DEPLOYMENT.md](./PLAYSTORE_DEPLOYMENT.md) | Complete Play Store deployment guide |
| [web-only-version/README.md](./web-only-version/README.md) | Web-only version documentation |

---

## 🎯 Which Version Do I Need?

**Choose Play Store Version if:**
- ✅ You want to publish to Google Play Store
- ✅ You need a native Android app
- ✅ You want mobile-specific features

**Choose Web-Only Version if:**
- ✅ You only need a website
- ✅ You want smaller bundle size
- ✅ You're deploying to web hosting only

**Detailed comparison**: See [VERSION_GUIDE.md](./VERSION_GUIDE.md)

---

## 🌍 Features (Both Versions)

- 12+ Cameroonian indigenous languages
- Structured learning paths
- Progress tracking and achievements
- Cultural insights and proverbs
- Multiple exercise types
- User authentication
- Cloud sync with Supabase

---

## 🛠️ Technology Stack

**Shared**:
- React 18 + TypeScript
- Vite build tool
- Tailwind CSS
- Supabase (database + auth)
- Lucide React (icons)

**Play Store Version Only**:
- Capacitor (native wrapper)
- @capacitor/android
- @capacitor/splash-screen
- @capacitor/status-bar

---

## 📞 Get Help

- [VERSION_GUIDE.md](./VERSION_GUIDE.md) - Choose the right version
- [README.md](./README.md) - Play Store version help
- [QUICKSTART_ANDROID.md](./QUICKSTART_ANDROID.md) - Android quick start
- [PLAYSTORE_DEPLOYMENT.md](./PLAYSTORE_DEPLOYMENT.md) - Play Store deployment
- [web-only-version/README.md](./web-only-version/README.md) - Web deployment

---

## 🚦 Getting Started

### First Time Setup

1. **Choose your version**: Read [VERSION_GUIDE.md](./VERSION_GUIDE.md)

2. **For Play Store Version**:
   ```bash
   npm install
   cp .env.example .env  # Configure your environment
   npm run dev
   ```

3. **For Web-Only Version**:
   ```bash
   cd web-only-version
   npm install
   cp .env.example .env  # Configure your environment
   npm run dev
   ```

4. **Configure Environment**: Both versions need `.env` with:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

---

## 📁 Project Structure

```
reroot-language-app/
│
├── 📱 PLAY STORE VERSION (Android + Web)
│   ├── src/                    # React app source
│   ├── android/                # Android native project
│   ├── capacitor.config.ts     # Capacitor config
│   ├── package.json            # With Capacitor deps
│   ├── README.md
│   ├── QUICKSTART_ANDROID.md
│   └── PLAYSTORE_DEPLOYMENT.md
│
├── 🌐 WEB-ONLY VERSION
│   └── web-only-version/
│       ├── src/                # React app source
│       ├── package.json        # No Capacitor deps
│       └── README.md
│
└── 📚 DOCUMENTATION
    ├── PROJECT_OVERVIEW.md     # This file
    ├── VERSION_GUIDE.md        # Version comparison
    └── API_DOCUMENTATION.md    # API reference
```

---

## ⚡ Quick Links

- **Start Here**: [VERSION_GUIDE.md](./VERSION_GUIDE.md)
- **Android Development**: [QUICKSTART_ANDROID.md](./QUICKSTART_ANDROID.md)
- **Play Store Deployment**: [PLAYSTORE_DEPLOYMENT.md](./PLAYSTORE_DEPLOYMENT.md)
- **Web Deployment**: [web-only-version/README.md](./web-only-version/README.md)

---

**Built with ❤️ to preserve and promote African indigenous languages**
