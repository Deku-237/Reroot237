# Google Play Store Deployment Guide

## Overview
ReRoot Languages is now configured as an Android app using Capacitor. This guide will walk you through deploying it to the Google Play Store.

## Prerequisites

### 1. Google Play Console Account
- Create a Google Play Console account at https://play.google.com/console
- One-time registration fee: $25 USD
- Complete the account setup with your developer information

### 2. Required Software
- **Android Studio**: Download from https://developer.android.com/studio
- **Java Development Kit (JDK)**: Version 11 or higher
- **Node.js**: Already installed (required for building the app)

### 3. App Requirements
- Privacy Policy URL (required by Google)
- App screenshots (minimum 2, maximum 8)
- Feature graphic (1024 x 500 pixels)
- App icon (512 x 512 pixels, 32-bit PNG with alpha)
- Content rating questionnaire responses

## Step 1: Install Android Studio

1. Download and install Android Studio
2. During installation, ensure you install:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)
3. Open Android Studio and complete the setup wizard

## Step 2: Open Project in Android Studio

```bash
# Build and sync the project
npm run android:build

# Open Android Studio
npm run android:open
```

Alternatively, open Android Studio manually:
- File → Open
- Navigate to: `[project-folder]/android`
- Click "Open"

## Step 3: Generate a Signing Key

You need a signing key to publish your app. This is a one-time setup.

### Generate Keystore

```bash
# Navigate to your project directory
cd android/app

# Generate keystore (use a strong password and remember it!)
keytool -genkey -v -keystore reroot-release-key.keystore -alias reroot-key -keyalg RSA -keysize 2048 -validity 10000

# You'll be asked for:
# - Keystore password (remember this!)
# - Your name
# - Organization
# - City/State/Country
# - Key password (can be same as keystore password)
```

**IMPORTANT**: Store this keystore file and passwords securely. You'll need them for all future updates.

### Configure Signing in Android Studio

1. Create `android/keystore.properties`:

```properties
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=reroot-key
storeFile=app/reroot-release-key.keystore
```

2. Update `android/app/build.gradle`:

Add before the `android` block:

```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Add inside the `android` block, after `defaultConfig`:

```gradle
signingConfigs {
    release {
        if (keystorePropertiesFile.exists()) {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

## Step 4: Build Release APK/AAB

### Option A: Build AAB (Recommended for Play Store)

In Android Studio:
1. Build → Generate Signed Bundle / APK
2. Select "Android App Bundle"
3. Click "Next"
4. Select or create your key store
5. Enter passwords
6. Select "release" build variant
7. Click "Finish"

The AAB will be generated in: `android/app/release/app-release.aab`

### Option B: Build via Command Line

```bash
cd android
./gradlew bundleRelease

# AAB location: android/app/build/outputs/bundle/release/app-release.aab
```

## Step 5: Prepare App Store Assets

### Required Assets

1. **App Icon** (512x512, 32-bit PNG)
   - Create a high-quality icon representing ReRoot
   - Must not have rounded corners or shadows

2. **Feature Graphic** (1024x500)
   - Promotional banner shown in the Play Store
   - Should showcase the app's purpose

3. **Screenshots** (minimum 2)
   - Phone: 16:9 or 9:16 ratio
   - Recommended: 1080 x 1920 or 1080 x 2340
   - Take screenshots of:
     - Language selection screen
     - Lesson interface
     - Progress dashboard
     - Cultural content

4. **Privacy Policy**
   - Create a privacy policy (use a generator if needed)
   - Host it on a public URL
   - Must cover:
     - Data collection
     - How data is used
     - Third-party services (Supabase)
     - User rights

## Step 6: Create Play Store Listing

1. Go to https://play.google.com/console
2. Click "Create app"
3. Fill in basic information:
   - App name: **ReRoot Languages**
   - Default language: English
   - App or game: App
   - Free or paid: Free

### App Details

**Short Description** (80 characters):
```
Learn Cameroonian languages. Reconnect with your heritage and culture.
```

**Full Description** (4000 characters max):
```
ReRoot Languages - Reconnect with Your Heritage

Discover and master indigenous Cameroonian languages through culturally authentic lessons designed by native speakers. Whether you're reconnecting with your roots or exploring African linguistic diversity, ReRoot makes language learning meaningful and engaging.

🌍 FEATURED LANGUAGES
• Fulfulde - Language of the Fulani people
• Ewondo - Beti-Pahuin heritage
• Duala - Coastal trade language
• Bamiléké (Fe'fe') - Highland royal language
• Kanuri - Language of ancient empires
• And many more!

✨ FEATURES
• Structured Learning Paths: Progress through carefully designed units
• Cultural Context: Every lesson includes cultural insights and traditions
• Multiple Exercise Types: Translation, multiple choice, and more
• Progress Tracking: Monitor your XP, streaks, and achievements
• Native Content: All lessons reviewed by native speakers
• Offline Support: Learn anytime, anywhere

📚 LEARN AUTHENTICALLY
Unlike generic language apps, ReRoot focuses exclusively on Cameroonian indigenous languages with deep cultural context. Each lesson includes:
• Accurate pronunciation guides
• Cultural notes and proverbs
• Family terms and social structures
• Traditional greetings and etiquette

🎯 PERFECT FOR
• Diaspora reconnecting with heritage
• Students of African languages
• Cultural researchers
• Anyone interested in linguistic diversity
• Families teaching children their mother tongue

💪 YOUR LEARNING JOURNEY
• Complete lessons to earn XP
• Maintain daily streaks
• Unlock achievements
• Track progress per language
• Build vocabulary systematically

🌟 WHY REROOT?
ReRoot was created to preserve and promote Cameroonian indigenous languages. Every lesson is crafted with input from native speakers and cultural experts to ensure authenticity and accuracy.

Start your journey today and reconnect with your roots!

---
Note: Account required for progress tracking. Internet connection needed for sync.
```

### Categorization
- **Category**: Education
- **Tags**: Languages, African languages, Education, Culture

### Contact Details
- **Email**: [Your support email]
- **Website**: [Your website if available]
- **Phone**: [Optional]

### Privacy Policy
- Upload the URL to your hosted privacy policy

## Step 7: Content Rating

Complete the content rating questionnaire:
- Violence: No
- Sexual content: No
- Profanity: No
- Drug/alcohol/tobacco: No
- User interaction: Yes (if using Supabase auth)
- Personal information sharing: Yes (email for accounts)

## Step 8: Upload APK/AAB

1. Go to "Production" → "Create new release"
2. Upload your `app-release.aab`
3. Add release notes:

```
Version 1.0.0
• Initial release
• 12 Cameroonian languages
• Structured learning paths
• Cultural insights
• Progress tracking
• Achievement system
```

4. Review and roll out to production

## Step 9: Submit for Review

1. Complete all required sections (marked with red exclamation marks)
2. Review the summary
3. Click "Submit for review"

**Review Timeline**: Typically 1-7 days

## Step 10: After Approval

Once approved:
- Your app will be live on the Play Store
- Share the link: `https://play.google.com/store/apps/details?id=com.reroot.language`
- Monitor reviews and ratings
- Respond to user feedback

## Updating the App

For future updates:

1. Update version in `android/app/build.gradle`:
```gradle
versionCode 2  // Increment this
versionName "1.0.1"  // Update version
```

2. Make your changes to the app code

3. Build and sync:
```bash
npm run android:build
```

4. Generate new signed AAB (Step 4)

5. Upload to Play Console:
   - Production → Create new release
   - Upload new AAB
   - Add release notes
   - Submit

## Common Issues

### Issue: "App not signed"
**Solution**: Ensure signing configuration is correct in build.gradle

### Issue: "Invalid package name"
**Solution**: Package name (com.reroot.language) must be unique globally

### Issue: "Missing privacy policy"
**Solution**: Add privacy policy URL in Play Console

### Issue: "Target SDK version too low"
**Solution**: Check android/build.gradle has targetSdkVersion 33+

## Support Commands

```bash
# Build web app
npm run build

# Sync Capacitor
npm run capacitor:sync

# Build and open Android Studio
npm run android:run

# Update Capacitor
npm run capacitor:update

# Clean build
cd android && ./gradlew clean
```

## Additional Resources

- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- [Android Developer Guide](https://developer.android.com/distribute)

## Security Notes

1. **Never commit keystore files** to version control
2. Add to `.gitignore`:
```
*.keystore
keystore.properties
```

3. Store keystore and passwords securely (password manager recommended)
4. Consider using Google Play App Signing for added security

---

**Need Help?**

If you encounter issues during deployment, refer to:
- Capacitor Documentation: https://capacitorjs.com
- Android Developer Docs: https://developer.android.com
- Stack Overflow: Tag your questions with `capacitor` and `android`
