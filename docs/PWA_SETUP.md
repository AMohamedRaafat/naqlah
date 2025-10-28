# PWA (Progressive Web App) Setup Guide

## Overview

Naqlah is now configured as a Progressive Web App (PWA), allowing users to install it on their devices and use it like a native app.

## Features

✅ **Installable** - Users can install the app on their device  
✅ **Offline-Ready** - Works without internet connection (when service worker is added)  
✅ **App-like Experience** - Full-screen, no browser UI  
✅ **Fast Loading** - Optimized for performance  
✅ **Adaptive Theme** - Supports light and dark modes  
✅ **RTL Support** - Proper Arabic (RTL) layout

## Theme Colors

### Dynamic Theme Based on Login State and System Preference

The app automatically adjusts its theme color based on two factors:

1. **User Login State**
2. **System Theme Preference** (Light/Dark mode)

### Color Scheme:

| State         | Light Mode               | Dark Mode               |
| ------------- | ------------------------ | ----------------------- |
| Not Logged In | `#00B8A9` (Primary Teal) | `#007973` (Darker Teal) |
| Logged In     | `#FFFFFF` (White)        | `#1F2937` (Dark Gray)   |

### How It Works:

The `ThemeColor` component:

- Detects system theme using `prefers-color-scheme`
- Listens for theme changes
- Updates the theme-color meta tag dynamically
- Ensures proper status bar coloring on mobile devices

## Manifest Configuration

Location: `public/manifest.json`

### Key Settings:

```json
{
  "name": "Naqlah - نقلة",
  "short_name": "Naqlah",
  "theme_color": "#00B8A9",
  "background_color": "#FFFFFF",
  "display": "standalone",
  "dir": "rtl",
  "lang": "ar"
}
```

### Display Modes:

- **standalone** - App opens in full-screen without browser UI
- Alternative options: `fullscreen`, `minimal-ui`, `browser`

## Required Assets

### 1. App Icons

Location: `public/assets/icons/`

Required sizes:

- 72x72, 96x96, 128x128, 144x144
- 152x152, 192x192, 384x384, 512x512
- Apple Touch Icon: 180x180

See `public/assets/icons/README.md` for icon generation guide.

### 2. Splash Screens (iOS)

Location: `public/assets/splash/`

Required for different iOS devices:

- iPhone SE: 750x1334
- iPhone X/11/12/13: 1125x2436
- iPhone XR/11: 828x1792
- iPhone 12/13 Pro Max: 1284x2778
- iPad: 1536x2048
- iPad Pro: 2048x2732

### 3. Screenshots (Optional but Recommended)

Location: `public/assets/screenshots/`

For app store listings:

- Mobile (narrow): 540x720 or similar
- Desktop (wide): 1280x720 or similar

## Installation

### On Android (Chrome/Edge):

1. Open the website in Chrome
2. Click the "Install" button in address bar
3. Or: Menu → "Install app" / "Add to Home Screen"
4. App icon appears on home screen

### On iOS (Safari):

1. Open the website in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Confirm and the app icon appears

### On Desktop (Chrome/Edge):

1. Open the website
2. Click the install icon in address bar
3. Or: Menu → "Install Naqlah"
4. App opens in its own window

## Testing PWA

### 1. Chrome DevTools:

```
DevTools → Application Tab → Manifest
```

Check:

- ✓ Manifest loads correctly
- ✓ All icons are accessible
- ✓ Theme colors are correct
- ✓ No manifest errors

### 2. Lighthouse Audit:

```
DevTools → Lighthouse → Progressive Web App
```

Run audit and aim for 100% PWA score.

### 3. Mobile Testing:

Use Chrome DevTools Device Emulation:

```
DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
```

Test on different device sizes and check:

- Install prompt appears
- Icons display correctly
- Theme color matches navbar
- App works in standalone mode

## Service Worker (Future Enhancement)

Currently not implemented. To add offline support:

### Using next-pwa:

```bash
npm install next-pwa
```

### Configuration:

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // your existing Next.js config
});
```

## Deployment Checklist

Before deploying PWA to production:

- [ ] All icons generated and placed in `public/assets/icons/`
- [ ] Splash screens created for iOS
- [ ] Manifest file reviewed and updated
- [ ] Theme colors tested in light and dark modes
- [ ] PWA tested on Android Chrome
- [ ] PWA tested on iOS Safari
- [ ] Lighthouse PWA audit passes (90%+)
- [ ] HTTPS enabled (required for PWA)
- [ ] Meta tags verified in browser
- [ ] Install prompt appears correctly

## SEO and Meta Tags

All meta tags configured in `app/layout.tsx`:

- **Title**: "Naqlah - نقلة | خدمات نقل الأثاث"
- **Description**: Arabic and English descriptions
- **Keywords**: نقل أثاث, نقل عفش, furniture moving, etc.
- **Open Graph**: For social media sharing
- **Twitter Card**: For Twitter sharing
- **Apple Web App**: iOS-specific configurations

## Troubleshooting

### Issue: Install prompt doesn't appear

**Causes:**

- Not on HTTPS
- Manifest file has errors
- Icons missing or incorrect
- Already installed

**Solution:**

- Check console for manifest errors
- Verify all icon paths
- Use Lighthouse to diagnose issues

### Issue: Wrong theme color on mobile

**Causes:**

- ThemeColor component not rendering
- Meta tag not updating
- Cache issues

**Solution:**

- Check browser console for errors
- Clear browser cache
- Verify ThemeColor component is in layout

### Issue: Icons don't show in install prompt

**Causes:**

- Icon files missing
- Incorrect paths in manifest
- Wrong file formats

**Solution:**

- Verify all icons exist in `/public/assets/icons/`
- Check manifest.json paths
- Use PNG format (not SVG for icons)

## Resources

- [PWA Builder](https://www.pwabuilder.com/) - Test and enhance your PWA
- [Web.dev PWA Checklist](https://web.dev/pwa-checklist/)
- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Next.js PWA Documentation](https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps)

## Next Steps

1. **Generate all required icons** from your logo
2. **Create splash screens** for iOS devices
3. **Test installation** on real devices
4. **Run Lighthouse audit** and fix any issues
5. **Add service worker** for offline support (optional)
6. **Submit to app stores** (if desired)
