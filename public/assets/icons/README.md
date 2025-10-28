# PWA Icons Guide

## Required Icons

You need to create the following icons from your logo (`logo.svg`):

### Required Sizes:

1. **72x72** - `icon-72x72.png`
2. **96x96** - `icon-96x96.png`
3. **128x128** - `icon-128x128.png`
4. **144x144** - `icon-144x144.png`
5. **152x152** - `icon-152x152.png`
6. **192x192** - `icon-192x192.png`
7. **384x384** - `icon-384x384.png`
8. **512x512** - `icon-512x512.png`
9. **180x180** - `apple-touch-icon.png` (for iOS)

## How to Generate Icons

### Option 1: Using Online Tool (Recommended)

1. **Go to**: https://www.pwabuilder.com/imageGenerator
2. **Upload**: Your logo file (preferably 512x512 or larger PNG/SVG)
3. **Download**: All generated icons
4. **Place**: Icons in this folder (`public/assets/icons/`)

### Option 2: Using PWA Asset Generator (Command Line)

```bash
npm install -g pwa-asset-generator

# From your project root
pwa-asset-generator public/assets/logo.svg public/assets/icons/ \
  --icon-only \
  --favicon \
  --type png \
  --background "#00B8A9"
```

### Option 3: Manual Creation

Use design tools like:
- **Figma**: Create artboards for each size
- **Adobe Photoshop**: Batch export at different sizes
- **GIMP**: Free alternative

## Icon Design Guidelines

### Background Color
- Use: `#00B8A9` (Primary teal color)
- Or: Transparent background

### Logo Sizing
- Keep logo centered
- Use **80% of icon size** for the logo
- Leave **10% padding** on all sides

### Example for 512x512:
- Icon size: 512x512px
- Logo size: ~410x410px
- Padding: 51px on all sides

## Testing Icons

After adding icons:

1. **Build the app**: `npm run build`
2. **Test locally**: Use Chrome DevTools → Application → Manifest
3. **Check all icons are loaded**
4. **Verify colors match your brand**

## For iOS

Apple Touch Icon (180x180):
- Name: `apple-touch-icon.png`
- Size: 180x180px
- No transparency (use background color)
- Corners will be rounded automatically by iOS

## Maskable Icons

For better Android adaptive icons, make sure:
- Logo is centered
- Safe area is 40% of icon size (e.g., 205px in a 512px icon)
- Content stays within safe area
- Background extends to edges

## Quick Checklist

- [ ] All 8 icon sizes created
- [ ] Apple touch icon (180x180) created
- [ ] Icons use primary color (#00B8A9) as background
- [ ] Logo is centered and properly sized
- [ ] Files named correctly
- [ ] Tested in PWA builder or browser DevTools

