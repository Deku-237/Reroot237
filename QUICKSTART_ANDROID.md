# Quick Start: Building Android App

This is a simplified guide to get your Android app built and ready for Play Store submission.

## Prerequisites

1. Install [Android Studio](https://developer.android.com/studio)
2. Node.js installed (already done)

## Build Steps

### 1. Build the Web App
```bash
npm run build
```

### 2. Sync with Android
```bash
npm run android:build
```

### 3. Open in Android Studio
```bash
npm run android:open
```

Or manually:
- Open Android Studio
- File → Open → Select `/android` folder

### 4. Generate Signing Key (First Time Only)

In terminal:
```bash
cd android/app
keytool -genkey -v -keystore reroot-release-key.keystore -alias reroot-key -keyalg RSA -keysize 2048 -validity 10000
```

Enter a strong password and remember it!

### 5. Configure Signing

Create `android/keystore.properties`:
```properties
storePassword=YOUR_PASSWORD_HERE
keyPassword=YOUR_PASSWORD_HERE
keyAlias=reroot-key
storeFile=app/reroot-release-key.keystore
```

### 6. Build Release Bundle

In Android Studio:
1. Build → Generate Signed Bundle / APK
2. Select "Android App Bundle"
3. Next → Select your keystore
4. Enter passwords
5. Select "release" variant
6. Finish

Output location: `android/app/release/app-release.aab`

### 7. Test the App

Before submitting:
1. Build → Build Bundle(s) / APK(s) → Build APK
2. Find APK in: `android/app/build/outputs/apk/release/`
3. Install on a physical device or emulator
4. Test all features

## Upload to Play Store

1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app or open existing
3. Production → Create new release
4. Upload `app-release.aab`
5. Fill in release notes
6. Submit for review

## Quick Commands Reference

```bash
# Full build and open Android Studio
npm run android:run

# Just build and sync
npm run android:build

# Just open Android Studio
npm run android:open

# Update Capacitor plugins
npm run capacitor:update

# Sync changes
npm run capacitor:sync
```

## Common Issues

**Can't find Android SDK?**
- Open Android Studio
- Tools → SDK Manager
- Install latest Android SDK

**Build fails?**
- Clean build: `cd android && ./gradlew clean`
- Sync: `npm run capacitor:sync`
- Rebuild

**App crashes on launch?**
- Check LogCat in Android Studio
- Verify Supabase credentials in `.env`
- Clear app data and try again

## File Checklist

Before submitting to Play Store:
- [ ] App screenshots (minimum 2)
- [ ] Feature graphic (1024x500)
- [ ] App icon (512x512)
- [ ] Privacy policy URL
- [ ] Signed AAB file
- [ ] Release notes

## Next Steps

For full deployment instructions, see: [PLAYSTORE_DEPLOYMENT.md](./PLAYSTORE_DEPLOYMENT.md)

## Need Help?

- Android Studio errors: Check "Build" tab at bottom
- Capacitor issues: Check [Capacitor Docs](https://capacitorjs.com/docs)
- Play Store requirements: [Android Developer Guide](https://developer.android.com/distribute)
