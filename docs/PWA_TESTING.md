# PWA Testing Guide

## How to Test PWA Installation

### ✅ Requirements for PWA Install Prompt

For Chrome to show the "Install" button instead of just "Add to Home Screen", your app must meet these criteria:

1. ✅ **HTTPS** - Must be served over HTTPS (or localhost)
2. ✅ **Manifest** - Valid manifest.json with required fields
3. ✅ **Service Worker** - Registered and active
4. ✅ **Icons** - At least 192x192 and 512x512 PNG icons with `purpose: "any"`
5. ✅ **Display Mode** - `standalone`, `fullscreen`, or `minimal-ui`
6. ✅ **Start URL** - Valid start_url in manifest

## Testing on Desktop (Chrome)

### Step 1: Open Chrome DevTools

1. Open your deployed app in Chrome
2. Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Opt+I` (Mac)
3. Go to **Application** tab

### Step 2: Check Manifest

1. In Application tab, click **Manifest** in left sidebar
2. Verify all fields are populated:
   - ✅ Name: "Naqlah - نقلة"
   - ✅ Short name: "Naqlah"
   - ✅ Start URL: "/?source=pwa"
   - ✅ Theme color: "#00B8A9"
   - ✅ Icons: Multiple sizes shown

### Step 3: Check Service Worker

1. In Application tab, click **Service Workers**
2. You should see:
   - ✅ Status: **activated and running**
   - ✅ Source: `/sw.js`
   - ✅ Scope: `/`

If not activated, try:
- Click "Update" button
- Check Console for errors
- Refresh page with `Ctrl+Shift+R`

### Step 4: Check Install Criteria

1. In Application tab, click **Manifest**
2. Scroll down to "Installability" section
3. Should show: ✅ **"Ready to be installed"**

If not ready, it will list missing requirements.

### Step 5: Install the App

#### Method 1: Install Button in Address Bar
- Look for install icon (⊕ or ↓) in address bar
- Click it and confirm installation

#### Method 2: Chrome Menu
- Click three dots (⋮) in Chrome
- Click "Install Naqlah..." option

#### Method 3: Custom Install Prompt
- Wait 3 seconds after page load
- Custom install banner should appear at bottom
- Click "Install" button

### Step 6: Verify Installation

After installing:
1. App should open in new window (no browser UI)
2. Check taskbar - app icon should be there
3. Check Start Menu/Applications - "Naqlah" should be listed

## Testing on Mobile (Android)

### Using Chrome Mobile

1. **Open your deployed site** in Chrome on Android
2. **Wait for install prompt** (appears after ~3 seconds)
3. **Or use Chrome menu**:
   - Tap three dots (⋮)
   - Look for "Install app" or "Add to Home screen"
   - For PWA, it should say "Install" not "Add"

4. **Tap Install**
5. **Confirm** in the dialog
6. **Check home screen** - App icon should appear
7. **Open the app** - Should open fullscreen (no browser bar)

### Verify Mobile PWA

After installation:
- ✅ Opens fullscreen (no browser UI)
- ✅ Theme color applied to status bar
- ✅ Works offline (turn off wifi and test)
- ✅ Shows splash screen on launch
- ✅ Can be found in app drawer

## Testing on iOS (iPhone/iPad)

### Using Safari

⚠️ **Note**: iOS doesn't support `beforeinstallprompt` event, so no custom install prompt.

1. **Open your deployed site** in Safari
2. **Tap Share button** (□↑)
3. **Scroll down** and tap "Add to Home Screen"
4. **Edit name** if needed
5. **Tap "Add"**

### Limitations on iOS

- ❌ No install prompt (manual only)
- ❌ Limited service worker features
- ❌ No push notifications
- ❌ No background sync
- ✅ Offline caching works
- ✅ Standalone display mode works

## Troubleshooting

### "Add to Home Screen" instead of "Install"

This usually means Chrome doesn't recognize it as a PWA yet.

**Check:**

1. **Service Worker Status**
   ```javascript
   // In browser console:
   navigator.serviceWorker.getRegistrations().then(regs => {
     console.log('SW registered:', regs.length > 0);
   });
   ```

2. **Manifest Errors**
   - DevTools → Console → Check for manifest warnings
   - DevTools → Network → Find manifest.json → Check response

3. **Wait for Engagement**
   - Chrome requires user engagement (browsing for ~30 seconds)
   - Try browsing the site, then check again

4. **Force Update**
   ```javascript
   // In browser console:
   navigator.serviceWorker.getRegistration().then(reg => {
     reg.update();
   });
   ```

### Install Prompt Not Appearing

**Solutions:**

1. **Clear Browser Data**
   - Settings → Privacy → Clear browsing data
   - Check "Cached images and files"
   - Clear and reload

2. **Reset PWA Dismissed State**
   ```javascript
   // In browser console:
   localStorage.removeItem('pwa-install-dismissed');
   location.reload();
   ```

3. **Hard Refresh**
   - `Ctrl+Shift+R` (Windows)
   - `Cmd+Shift+R` (Mac)

4. **Check Console Logs**
   - Look for `[PWA]` prefixed logs
   - `beforeinstallprompt event fired` should appear

### Service Worker Not Registering

**Check these:**

1. **HTTPS Requirement**
   - Must be HTTPS or localhost
   - Staging/preview URLs must use HTTPS

2. **Console Errors**
   - Check for JavaScript errors
   - Check for service worker errors

3. **Manual Registration Test**
   ```javascript
   // In browser console:
   navigator.serviceWorker.register('/sw.js')
     .then(reg => console.log('SW registered:', reg))
     .catch(err => console.error('SW error:', err));
   ```

4. **Disable and Re-enable**
   - DevTools → Application → Service Workers
   - Click "Unregister"
   - Refresh page

### Icons Not Showing

**Verify:**

1. **Icon Files Exist**
   - Navigate to: `https://your-domain.com/assets/icons/icon-192x192.png`
   - Should show the icon image

2. **Correct Paths**
   - Paths in manifest should be absolute: `/assets/icons/...`
   - Not relative: `./assets/icons/...`

3. **Correct Format**
   - Must be PNG format
   - Minimum: 192x192 and 512x512
   - Square aspect ratio

## Testing Offline Functionality

### Test Offline Mode

1. **Install the app** first
2. **Open DevTools** → **Network** tab
3. **Check "Offline"** checkbox
4. **Refresh page** - Should still work
5. **Navigate pages** - Cached pages should load
6. **Try new page** - Should show offline page

### Test Cache

```javascript
// In browser console:
caches.keys().then(keys => {
  console.log('Cache names:', keys);
  keys.forEach(key => {
    caches.open(key).then(cache => {
      cache.keys().then(requests => {
        console.log(`${key}: ${requests.length} items`);
      });
    });
  });
});
```

## Chrome Flags for Testing

Enable these flags for better testing (chrome://flags):

1. **Desktop PWAs**
   - `#enable-desktop-pwas`
   - Enables PWA features on desktop

2. **PWA Default Offline Page**
   - `#enable-pwa-default-offline-page`
   - Shows default offline page

3. **Push Notifications**
   - `#enable-experimental-web-platform-features`
   - For testing push notifications

## Automated Testing

### Using Lighthouse

1. **Open DevTools** → **Lighthouse** tab
2. **Select:**
   - ✅ Progressive Web App
   - ✅ Best practices
   - ✅ Performance
3. **Click "Analyze page load"**

**Target Scores:**
- PWA: 100
- Performance: 90+
- Best Practices: 95+

### Using PWA Builder

1. Go to [PWABuilder.com](https://www.pwabuilder.com/)
2. Enter your URL
3. Click "Start"
4. Review PWA score and suggestions

## Checklist for Production

Before going live, verify:

- [ ] App works on HTTPS
- [ ] Service worker registers and activates
- [ ] Manifest loads without errors
- [ ] All required icons present (192x192, 512x512)
- [ ] Install prompt appears on Chrome desktop
- [ ] Install prompt appears on Chrome mobile
- [ ] App opens in standalone mode when installed
- [ ] Offline page shows when no connection
- [ ] Cached pages load offline
- [ ] Theme color shows in browser/status bar
- [ ] App splash screen shows on mobile
- [ ] Lighthouse PWA score is 100
- [ ] No console errors related to PWA

## Useful Console Commands

```javascript
// Check if installed as PWA
window.matchMedia('(display-mode: standalone)').matches;

// Check service worker status
navigator.serviceWorker.controller ? 'Active' : 'Not active';

// Get all service worker registrations
navigator.serviceWorker.getRegistrations();

// Unregister all service workers
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => reg.unregister());
});

// Clear all caches
caches.keys().then(keys => {
  keys.forEach(key => caches.delete(key));
});

// Check if beforeinstallprompt will fire
// (Will be null if already installed or criteria not met)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('Install prompt available!');
  deferredPrompt = e;
});
```

## Resources

- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Testing PWAs](https://web.dev/test-pwa/)

