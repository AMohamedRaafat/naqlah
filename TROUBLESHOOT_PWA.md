# PWA Installation Troubleshooting

## Problem: Chrome shows "Add to Home Screen" instead of "Install"

### Quick Diagnosis

Visit: **https://your-domain.com/pwa-debug**

This page will show you:
- ✅ or ❌ Service Worker status
- ✅ or ❌ Manifest status  
- ✅ or ❌ Installability status
- Current display mode
- HTTPS status

---

## Step 1: Check Chrome DevTools

### Open DevTools
1. Press `F12` or `Ctrl+Shift+I`
2. Go to **Application** tab

### Check Manifest
1. Click **Manifest** in left sidebar
2. Look at **Installability** section at the bottom
3. **What you should see:**
   ```
   ✅ Page is installable
   ```
4. **If you see errors**, they will tell you exactly what's missing

### Common Manifest Errors

#### Error: "No matching service worker detected"
**Solution:** Service worker not registered. See Step 2.

#### Error: "Manifest does not have a suitable icon"
**Solution:** Icons missing or wrong format.
- Need at least 192x192 and 512x512 PNG
- Must have `purpose: "any"` (not "any maskable")

#### Error: "Page is not served over HTTPS"
**Solution:** Must use HTTPS (Vercel provides this automatically)

#### Error: "start_url not responding"
**Solution:** Check that your homepage loads correctly

---

## Step 2: Check Service Worker

### In DevTools → Application → Service Workers

**What you should see:**
```
Status: #activated and is running
Source: /sw.js
```

**If you see nothing:**
1. Go to Console tab
2. Type: `navigator.serviceWorker.register('/sw.js')`
3. Press Enter
4. Check for errors

### Common Service Worker Errors

#### Error: "Failed to register a ServiceWorker: A bad HTTP response code (404)"
**Solution:** Service worker file not found.
- Check: https://your-domain.com/sw.js
- Should show JavaScript code
- If 404, file is not being served

#### Error: "The script has an unsupported MIME type"
**Solution:** Wrong content type header.
- Should be: `application/javascript`
- Already fixed in next.config.mjs

#### Error: "SecurityError"
**Solution:** Not on HTTPS or localhost

---

## Step 3: Manual Registration Test

### In Browser Console

1. **Check if service worker is supported:**
   ```javascript
   'serviceWorker' in navigator
   // Should return: true
   ```

2. **Try to register manually:**
   ```javascript
   navigator.serviceWorker.register('/sw.js')
     .then(reg => console.log('✅ Registered:', reg))
     .catch(err => console.error('❌ Error:', err));
   ```

3. **Check install prompt:**
   ```javascript
   window.addEventListener('beforeinstallprompt', (e) => {
     console.log('✅ Install prompt available!');
   });
   ```
   Refresh the page and wait. If nothing logs, install criteria not met.

4. **Check if already installed:**
   ```javascript
   window.matchMedia('(display-mode: standalone)').matches
   // If true, app is already installed
   ```

---

## Step 4: Check Files Are Accessible

### Test These URLs

Open in browser:

1. **Manifest:**
   ```
   https://your-domain.com/manifest.json
   ```
   Should show JSON with name, icons, etc.

2. **Service Worker:**
   ```
   https://your-domain.com/sw.js
   ```
   Should show JavaScript code

3. **Icon 192x192:**
   ```
   https://your-domain.com/assets/icons/icon-192x192.png
   ```
   Should show the icon image

4. **Icon 512x512:**
   ```
   https://your-domain.com/assets/icons/icon-512x512.png
   ```
   Should show the icon image

### If Any Return 404

**Problem:** Files not deployed correctly

**Solution:**
1. Check files exist in your repo
2. Redeploy from Vercel dashboard
3. Clear build cache and redeploy

---

## Step 5: Run Lighthouse Audit

### In Chrome DevTools

1. Open **Lighthouse** tab
2. Select:
   - ✅ Progressive Web App
   - ✅ Performance
3. Click "Analyze page load"

### PWA Score

**Target:** 100/100

**If less than 100:**
- Lighthouse will list exactly what's missing
- Fix each item listed

### Common Lighthouse Failures

#### "Does not register a service worker"
- Service worker not registering
- Check console for errors
- Try manual registration (Step 3)

#### "Web app manifest does not meet the installability requirements"
- Manifest invalid or missing required fields
- Check manifest with: https://manifest-validator.appspot.com/

#### "Does not provide a valid apple-touch-icon"
- Need apple-touch-icon.png for iOS
- Already included in `/assets/icons/apple-touch-icon.png`

---

## Step 6: Clear Everything and Retry

### Clear Browser Data

1. Chrome Settings → Privacy and security
2. Clear browsing data
3. Check:
   - ✅ Cached images and files
   - ✅ Cookies and other site data
4. Click "Clear data"

### Unregister Service Worker

In DevTools → Application → Service Workers:
1. Click "Unregister"
2. Refresh page
3. Should re-register automatically

### Clear localStorage

```javascript
localStorage.clear();
location.reload();
```

### Hard Refresh

- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

---

## Step 7: Test in Incognito Mode

1. Open Incognito window
2. Visit your site
3. Check if install prompt appears
4. Check DevTools → Application → Manifest

**Why Incognito?**
- No cache
- No extensions
- No localStorage
- Clean slate for testing

---

## What Should Happen (Success Case)

### After ~30 seconds on the site:

1. **`beforeinstallprompt` event fires** (check console)
2. **Custom install banner appears** (bottom of screen)
3. **Install icon appears in address bar** (⊕ or ↓)
4. **Chrome menu shows "Install Naqlah..."** (not "Add to Home Screen")

### When you click Install:

1. Install dialog appears with app name and icon
2. Click "Install"
3. App opens in new window (no browser UI)
4. App appears in Start Menu / Applications

---

## Common Reasons for "Add to Home Screen" Instead of "Install"

### 1. Service Worker Not Active
- Must be registered and activated
- Check: DevTools → Application → Service Workers

### 2. Wrong Icon Format
- Need PNG, not SVG
- Need `purpose: "any"`, not `"any maskable"`
- Need at least 192x192 and 512x512

### 3. Not Enough Engagement
- Chrome requires ~30 seconds of browsing
- Try clicking around, scrolling
- Wait before checking install prompt

### 4. Already Installed
- Check if already installed: `window.matchMedia('(display-mode: standalone)').matches`
- Uninstall from Chrome: chrome://apps → Right-click → Remove

### 5. Browser Cache
- Old manifest/service worker cached
- Clear cache and hard refresh
- Or test in Incognito

### 6. Manifest Validation Error
- Use: https://manifest-validator.appspot.com/
- Paste your manifest.json content
- Fix any errors listed

---

## Test with Minimal Manifest

If nothing works, try the minimal manifest:

### Change in app/layout.tsx:

```tsx
<link rel="manifest" href="/manifest-test.json" />
```

This uses a minimal, guaranteed-to-work manifest with only essential fields.

If THIS works, then the main manifest has an issue.

---

## Check Vercel Deployment

### In Vercel Dashboard:

1. Go to your project
2. Click latest deployment
3. Check "Build Logs"
4. Search for errors
5. Check "Functions" tab - should show no edge functions

### Redeploy:

1. Go to Deployments
2. Click three dots on latest
3. Click "Redeploy"
4. **Uncheck** "Use existing Build Cache"
5. Click "Redeploy"

---

## Get Help

### If Still Not Working:

Please provide:

1. **URL** of your deployed site
2. **Screenshot** of DevTools → Application → Manifest → Installability
3. **Screenshot** of DevTools → Application → Service Workers
4. **Console errors** (if any)
5. **Lighthouse PWA score**
6. **Browser** (Chrome version)
7. **OS** (Windows/Mac/Linux)

### Useful Debug Info:

Run in console and copy results:

```javascript
console.log({
  swSupported: 'serviceWorker' in navigator,
  swRegistered: !!(await navigator.serviceWorker.getRegistration()),
  standalone: window.matchMedia('(display-mode: standalone)').matches,
  https: window.location.protocol === 'https:',
  manifestUrl: document.querySelector('link[rel="manifest"]')?.href
});
```

---

## Quick Checklist

- [ ] Site is on HTTPS (check URL starts with https://)
- [ ] /manifest.json loads correctly (JSON visible)
- [ ] /sw.js loads correctly (JavaScript code visible)
- [ ] Icons load (try opening icon URLs)
- [ ] Service worker shows "activated" in DevTools
- [ ] Manifest shows no errors in DevTools
- [ ] Waited 30+ seconds on the site
- [ ] Not already installed (check standalone mode)
- [ ] Tried in Incognito mode
- [ ] Cleared browser cache
- [ ] Lighthouse PWA score is 100

If all checked ✅ and still not working, there may be a Chrome bug. Try:
- Restart Chrome
- Update Chrome to latest version
- Try different Chrome profile
- Try Microsoft Edge (Chromium-based)

