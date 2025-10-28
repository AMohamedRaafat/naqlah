# Vercel Deployment Guide

## Current Issue Fix

If you're seeing this error:
```
Error: ENOENT: no such file or directory, lstat '/vercel/path0/.next/server/app/(public)/page_client-reference-manifest.js'
```

This is caused by Vercel's build cache referencing an old `app/(public)` route group that was removed.

## Solution Steps

### 1. Clear Vercel Build Cache (Recommended)

Go to your Vercel project dashboard:

1. Navigate to: **Settings** → **General**
2. Scroll down to **Build & Development Settings**
3. Click **"Clear Cache"** or **"Redeploy"** with cache cleared

OR use Vercel CLI:
```bash
vercel --force
```

### 2. Manual Cache Clear via Dashboard

1. Go to your Vercel project
2. Click on **Deployments**
3. Find the latest deployment
4. Click the three dots (•••)
5. Select **"Redeploy"**
6. Check **"Use existing Build Cache"** → **UNCHECK IT**
7. Click **"Redeploy"**

### 3. Using Git to Force Fresh Deploy

Add an empty commit to trigger a fresh deployment:

```bash
git commit --allow-empty -m "Force Vercel rebuild - clear cache"
git push origin master
```

### 4. Environment Variables

If the above doesn't work, try adding this environment variable in Vercel:

1. Go to **Settings** → **Environment Variables**
2. Add: `NEXT_PUBLIC_FORCE_BUILD_ID` = `[any random string]`
3. Redeploy

## Prevention

The following files are now configured to prevent this issue:

### `vercel.json`
- Forces clean `.next` directory before build
- Configures proper headers for PWA

### `.vercelignore`
- Ignores all cache and build directories
- Prevents stale artifacts from being uploaded

### `next.config.mjs`
- `cleanDistDir: true` ensures clean builds
- Optimized for Vercel deployment

## Build Commands

Local clean build:
```bash
npm run clean:build
```

Regular build:
```bash
npm run build
```

## Verification

After deployment, verify:

1. **Check build logs** - No references to `(public)` folder
2. **Test app** - All pages load correctly
3. **Check routes** - Homepage at `/` works
4. **PWA features** - Service worker registers correctly

## Common Issues

### Issue: Build succeeds but app doesn't load
**Solution**: Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: Old version still showing
**Solution**: Service worker might be cached. Clear application data in DevTools.

### Issue: Environment variables not working
**Solution**: Redeploy after changing environment variables.

## Support

If issues persist:

1. Check Vercel build logs for detailed error messages
2. Verify all files committed: `git status`
3. Check for uncommitted changes in `app/` directory
4. Verify no `(public)` folder exists locally: `ls -la app/`

## Quick Fix Checklist

- [ ] Cleared Vercel build cache
- [ ] Deployed without build cache
- [ ] Verified no `app/(public)` folder locally
- [ ] Checked git history shows folder deletion
- [ ] All changes committed and pushed
- [ ] Browser cache cleared
- [ ] Service worker unregistered (if needed)

## Files Modified

These files were updated to fix the issue:

- ✅ Removed `app/(public)/` folder
- ✅ Created `components/public-layout-wrapper.tsx`
- ✅ Updated `app/page.tsx` to use new wrapper
- ✅ Added `vercel.json` with clean build command
- ✅ Added `.vercelignore` to prevent cache issues
- ✅ Updated `next.config.mjs` with clean build settings
- ✅ Added clean build scripts to `package.json`

## Contact

If you continue experiencing issues after following these steps, the problem might be with Vercel's infrastructure. Contact Vercel support or check their status page.

