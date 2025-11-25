# ReRoot Languages - Web-Only Version

This is the web-only version of ReRoot Languages, optimized for browser deployment (Netlify, Vercel, etc.). This version does NOT include Capacitor or any mobile app dependencies.

## 📱 Version Differences

### This Version (Web-Only)
- ✅ Pure web application
- ✅ Optimized for browser deployment
- ✅ Smaller bundle size
- ✅ No mobile dependencies
- ✅ Standard responsive design
- 🌐 Deploy to: Netlify, Vercel, GitHub Pages, etc.

### Play Store Version (Main Project)
- ✅ All web features
- ✅ Capacitor integration
- ✅ Native Android app
- ✅ Splash screens and status bar
- ✅ Mobile-optimized
- 📱 Deploy to: Google Play Store, web hosting

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser at http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

### Netlify

1. Push to GitHub repository
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

Or use drag-and-drop:
```bash
npm run build
# Drag dist folder to netlify.com/drop
```

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
npm run build
vercel --prod
```

### GitHub Pages

1. Build the app:
```bash
npm run build
```

2. Configure base in `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/repository-name/',
  // ... rest of config
})
```

3. Deploy dist folder to gh-pages branch

### Generic Hosting

1. Build: `npm run build`
2. Upload `dist` folder to your hosting provider
3. Point domain to dist folder
4. Ensure routing works (may need `_redirects` or `.htaccess`)

## 🔧 Environment Variables

Create `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📚 Features

All the same features as the Play Store version:
- 12+ Cameroonian languages
- Structured learning paths
- Progress tracking
- Cultural insights
- Multiple exercise types
- User authentication
- Cloud sync via Supabase

## 🔗 Links

- Main Project (Play Store Version): `../` (parent directory)
- Documentation: See main project README
- Live Demo: [Your demo URL]

## 📄 License

MIT License - see main project LICENSE file

---

**Note**: This is a simplified web-only version. For the full-featured version with Android app support, use the main project directory.
