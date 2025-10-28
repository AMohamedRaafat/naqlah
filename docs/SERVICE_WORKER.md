# Service Worker & PWA Implementation

## Overview

The Naqlah app implements a comprehensive Progressive Web App (PWA) with advanced caching strategies and offline support.

## Architecture

### Files Structure

```
public/
├── sw.js                          # Service Worker main file
└── manifest.json                  # PWA manifest

lib/
└── register-sw.ts                 # Service Worker registration utility

hooks/
└── use-online-status.ts          # Online/offline status hook

components/
└── pwa-manager.tsx               # PWA lifecycle manager component

app/
└── offline/
    └── page.tsx                   # Offline fallback page
```

## Service Worker Features

### 1. Caching Strategies

The service worker implements multiple caching strategies for optimal performance:

#### **Cache First** (Static Assets)
- Used for: Images, fonts, Next.js static files
- Benefits: Fastest loading, reduced bandwidth
- Fallback: Network if cache miss

```javascript
// Example usage
if (request.destination === 'image') {
  return await cacheFirst(request, IMAGE_CACHE, IMAGE_CACHE_LIMIT);
}
```

#### **Network First** (Dynamic Content)
- Used for: HTML pages, API calls
- Benefits: Fresh content, offline fallback
- Fallback: Cache if network fails

```javascript
// Example usage
if (request.destination === 'document') {
  return await networkFirst(request, DYNAMIC_CACHE);
}
```

#### **Stale While Revalidate** (Scripts & Styles)
- Used for: JavaScript, CSS files
- Benefits: Instant loading + background update
- Fallback: Cached version while fetching new

```javascript
// Example usage
if (request.destination === 'script') {
  return await staleWhileRevalidate(request, STATIC_CACHE);
}
```

### 2. Cache Management

#### Cache Versions
```javascript
const CACHE_VERSION = 'naqlah-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;
```

#### Cache Limits
- Dynamic Cache: 50 items
- Image Cache: 60 items
- Automatic cleanup of old caches

### 3. Offline Support

#### Offline Page
- Custom offline page at `/offline`
- Automatically shown when network fails
- Includes retry functionality
- Shows connection status

#### Offline Detection
- Real-time online/offline status
- Visual indicators (banners)
- Automatic recovery when back online

## PWA Manager Component

### Features

1. **Service Worker Registration**
   - Auto-registers in production
   - Disabled in development
   - Error handling

2. **Update Notifications**
   - Detects new versions
   - Shows update prompt
   - One-click update with reload

3. **Offline Banner**
   - Shows when connection lost
   - Auto-hides when back online
   - RTL/LTR support

### Usage

```tsx
import PWAManager from '@/components/pwa-manager';

// In root layout
<PWAManager />
```

## Hooks

### useOnlineStatus

Track online/offline status in any component:

```tsx
import { useOnlineStatus } from '@/hooks/use-online-status';

function MyComponent() {
  const isOnline = useOnlineStatus();
  
  return (
    <div>
      Status: {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}
```

## Manifest Configuration

### Key Features

1. **App Identity**
   - Name: Naqlah - نقلة
   - Theme: #00B8A9 (Primary Teal)
   - RTL Support

2. **Display Mode**
   - Standalone (full-screen app)
   - Custom splash screens
   - Portrait orientation

3. **App Shortcuts**
   - Quick action: Request Move
   - Quick action: Dashboard
   - Long-press menu support

4. **Icons**
   - Multiple sizes (72px to 512px)
   - Maskable icons for adaptive icons
   - iOS-compatible

## Testing

### Local Testing

1. **Build the app**
   ```bash
   npm run build
   npm start
   ```

2. **Open Chrome DevTools**
   - Go to Application tab
   - Check Service Workers section
   - Verify caches

3. **Test Offline Mode**
   - Toggle "Offline" in DevTools
   - Navigate pages
   - Verify offline page appears

### Production Testing

1. **Deploy to Vercel**
   ```bash
   git push origin master
   ```

2. **Test on Real Device**
   - Open app in Chrome/Safari
   - Use "Add to Home Screen"
   - Test offline functionality

3. **Test Update Flow**
   - Make changes and redeploy
   - Open existing PWA
   - Verify update prompt appears

## Browser Support

### Desktop
- ✅ Chrome 67+
- ✅ Edge 79+
- ✅ Firefox 44+
- ✅ Safari 11.1+

### Mobile
- ✅ Chrome Android 90+
- ✅ Safari iOS 11.3+
- ✅ Samsung Internet 4+

## Performance Benefits

### Before Service Worker
- Network-dependent loading
- No offline access
- Repeated asset downloads

### After Service Worker
- ⚡ Instant loading (cached assets)
- 📱 Offline functionality
- 💾 Reduced bandwidth usage
- 🚀 Improved performance scores

## Debugging

### Enable Service Worker Logs

```javascript
// In browser console
localStorage.setItem('debug', 'sw:*');
```

### Clear All Caches

```javascript
// From DevTools console
caches.keys().then(keys => {
  keys.forEach(key => caches.delete(key));
});
```

### Force Update Service Worker

```javascript
// From DevTools console
navigator.serviceWorker.getRegistration().then(reg => {
  reg.update();
});
```

## Troubleshooting

### Service Worker Not Registering

**Problem**: Service worker doesn't register

**Solutions**:
- Check HTTPS (required for SW)
- Verify production build
- Check browser support
- Clear browser cache

### Update Not Showing

**Problem**: New version deployed but no update prompt

**Solutions**:
- Force refresh (Ctrl+Shift+R)
- Clear service worker in DevTools
- Check cache versioning
- Wait for automatic check (1 hour)

### Offline Page Not Showing

**Problem**: Shows default browser offline page

**Solutions**:
- Verify `/offline` page exists
- Check service worker fetch event
- Verify offline page is cached
- Check cache name matches

## Future Enhancements

### Planned Features

1. **Background Sync**
   - Queue form submissions when offline
   - Auto-submit when back online

2. **Push Notifications**
   - Order updates
   - Promotional messages
   - System notifications

3. **Advanced Caching**
   - Predictive prefetching
   - User-specific caching
   - Image optimization

4. **Analytics**
   - Track offline usage
   - Cache hit rates
   - Performance metrics

## API Reference

### registerServiceWorker(options)

Register service worker with lifecycle callbacks:

```typescript
registerServiceWorker({
  onUpdate: (registration) => {
    console.log('Update available');
  },
  onSuccess: (registration) => {
    console.log('Registered successfully');
  },
  onError: (error) => {
    console.error('Registration failed', error);
  },
});
```

### skipWaitingServiceWorker()

Skip waiting and activate new service worker immediately:

```typescript
skipWaitingServiceWorker();
window.location.reload();
```

### clearServiceWorkerCache()

Clear all service worker caches:

```typescript
clearServiceWorkerCache();
```

## Security Considerations

1. **HTTPS Only**
   - Service workers require HTTPS
   - Localhost exception for development

2. **Same-Origin Policy**
   - Service worker scope restrictions
   - Cross-origin requests handled carefully

3. **Cache Validation**
   - Response validation before caching
   - Only cache successful responses (200)

4. **Version Control**
   - Cache versioning prevents stale data
   - Automatic cleanup of old versions

## Resources

- [MDN Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Google PWA Guide](https://web.dev/progressive-web-apps/)
- [Workbox (Advanced)](https://developers.google.com/web/tools/workbox)

