# ReRoot Languages - Version Guide

This project contains TWO versions of the ReRoot Languages app:

## 📱 Main Project (Current Directory) - Play Store Version

**Purpose**: Android app for Google Play Store + Web deployment

**Location**: Root directory (`./`)

**Features**:
- ✅ Full web application
- ✅ Capacitor integration for native Android
- ✅ Splash screens and status bar control
- ✅ Mobile-optimized UI
- ✅ Play Store ready
- ✅ Can also be deployed as a website

**Technologies**:
- React + TypeScript + Vite
- Capacitor (for Android)
- @capacitor/android
- @capacitor/splash-screen
- @capacitor/status-bar
- Tailwind CSS
- Supabase

**Use Cases**:
- Publishing to Google Play Store
- Native Android app development
- Full mobile optimization
- Can also deploy as web app

**Quick Start**:
```bash
# Web development
npm run dev

# Android development
npm run android:build
npm run android:open
```

**Documentation**:
- [README.md](./README.md) - Full documentation
- [QUICKSTART_ANDROID.md](./QUICKSTART_ANDROID.md) - Quick Android guide
- [PLAYSTORE_DEPLOYMENT.md](./PLAYSTORE_DEPLOYMENT.md) - Play Store deployment

---

## 🌐 Web-Only Version

**Purpose**: Pure web application for browser deployment

**Location**: `./web-only-version/`

**Features**:
- ✅ Pure web application
- ✅ No mobile dependencies
- ✅ Smaller bundle size
- ✅ Optimized for Netlify/Vercel/etc.
- ✅ Standard responsive design
- ❌ No native Android features
- ❌ No Capacitor

**Technologies**:
- React + TypeScript + Vite
- Tailwind CSS
- Supabase
- (No Capacitor dependencies)

**Use Cases**:
- Web hosting only (Netlify, Vercel, etc.)
- Smaller deployments
- No mobile app needed
- Traditional web application

**Quick Start**:
```bash
cd web-only-version
npm install
npm run dev
```

**Documentation**:
- [web-only-version/README.md](./web-only-version/README.md) - Web deployment guide

---

## 🤔 Which Version Should I Use?

### Use the **Play Store Version** (main directory) if:
- ✅ You want to publish to Google Play Store
- ✅ You need a native Android app
- ✅ You want mobile-specific features (splash screen, status bar)
- ✅ You want one codebase for both web and mobile

### Use the **Web-Only Version** if:
- ✅ You only need a website (no app)
- ✅ You want a smaller bundle size
- ✅ You're deploying to Netlify, Vercel, etc.
- ✅ You don't need mobile-specific features

---

## 📊 Comparison Table

| Feature | Play Store Version | Web-Only Version |
|---------|-------------------|------------------|
| Web Deployment | ✅ Yes | ✅ Yes |
| Google Play Store | ✅ Yes | ❌ No |
| Android App | ✅ Yes | ❌ No |
| Bundle Size | Larger | Smaller |
| Mobile Optimizations | Advanced | Standard |
| Splash Screen | ✅ Yes | ❌ No |
| Status Bar Control | ✅ Yes | ❌ No |
| Capacitor Plugins | ✅ Yes | ❌ No |
| Dependencies | More | Fewer |
| Learning Curve | More complex | Simpler |

---

## 🔄 Switching Between Versions

### From Play Store to Web-Only:
```bash
cd web-only-version
npm install
npm run dev
```

### From Web-Only to Play Store:
```bash
cd ..  # Return to root
npm install
npm run dev
```

---

## 📦 Installation

### Play Store Version (Root):
```bash
npm install
npm run dev           # For web development
npm run android:run   # For Android development
```

### Web-Only Version:
```bash
cd web-only-version
npm install
npm run dev
```

---

## 🚀 Deployment

### Play Store Version:

**For Web:**
```bash
npm run build
# Deploy dist folder to hosting
```

**For Android:**
```bash
npm run android:build
npm run android:open
# Build APK/AAB in Android Studio
# Upload to Play Console
```

See [PLAYSTORE_DEPLOYMENT.md](./PLAYSTORE_DEPLOYMENT.md) for detailed instructions.

### Web-Only Version:

```bash
cd web-only-version
npm run build
# Deploy dist folder to Netlify/Vercel/etc.
```

---

## 🗂️ File Structure

```
reroot-language-app/
├── 📱 PLAY STORE VERSION (root directory)
│   ├── src/                    # React source code
│   ├── android/                # Native Android project
│   ├── public/                 # Static assets
│   ├── capacitor.config.ts     # Capacitor configuration
│   ├── package.json            # With Capacitor dependencies
│   ├── README.md               # Play Store version docs
│   ├── QUICKSTART_ANDROID.md   # Android quick start
│   └── PLAYSTORE_DEPLOYMENT.md # Play Store guide
│
└── 🌐 WEB-ONLY VERSION
    └── web-only-version/
        ├── src/                # React source code (no Capacitor)
        ├── public/             # Static assets
        ├── package.json        # Without Capacitor dependencies
        └── README.md           # Web-only version docs
```

---

## ⚠️ Important Notes

1. **Both versions share the same core features**: All language lessons, learning paths, authentication, and progress tracking work the same.

2. **Database**: Both versions use the same Supabase database. They can share user data.

3. **Updates**: When updating lessons or features, you may need to sync changes between both versions.

4. **Environment Variables**: Both versions need `.env` files with Supabase credentials.

5. **Dependencies**: The Play Store version has additional mobile-specific dependencies. The web-only version is lighter.

---

## 🆘 Support

- **Play Store Issues**: See [PLAYSTORE_DEPLOYMENT.md](./PLAYSTORE_DEPLOYMENT.md)
- **Web Deployment**: See [web-only-version/README.md](./web-only-version/README.md)
- **General Issues**: Open an issue on GitHub

---

## 📝 Development Workflow

### Working on Both Versions:

If you make changes to lessons or core features:

1. Make changes in Play Store version (root)
2. Copy relevant changes to web-only version:
   ```bash
   # Example: Update lessons
   cp src/data/lessons.ts web-only-version/src/data/lessons.ts
   ```

3. Test both versions
4. Commit changes

---

**Choose the right version for your needs and start building!** 🚀
