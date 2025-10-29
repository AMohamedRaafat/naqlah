# Naqlah - نقلة

A modern, mobile-first Progressive Web App (PWA) for furniture moving services built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ PWA Features

✅ **Installable** - Install on any device like a native app  
✅ **Offline Support** - Works without internet connection  
✅ **Fast & Reliable** - Smart caching for instant loads  
✅ **Auto Updates** - Always get the latest version  
✅ **Push Notifications** - Stay informed (coming soon)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Test PWA functionality
npm run test:pwa
```

Visit: **http://localhost:3000**

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **next-intl** - Internationalization (Arabic & English)
- **Axios** - HTTP client
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## 🌍 Features

### Core Features

- ✅ Mobile-first responsive design
- ✅ RTL/LTR support (Arabic & English)
- ✅ Server-side rendering
- ✅ Type-safe API calls
- ✅ Clean architecture
- ✅ Smooth scrolling sections
- ✅ Modern UI components

### PWA Features

- ✅ Offline-first architecture
- ✅ Service worker with smart caching
- ✅ Install prompt for home screen
- ✅ Offline page fallback
- ✅ Update notifications
- ✅ Network status indicator
- ✅ App shortcuts

## 📁 Project Structure

```
naqlah/
├── app/                    # Next.js App Router
│   └── [locale]/          # Locale-based routing
├── components/            # React components
│   ├── home/             # Homepage sections
│   └── ui/               # UI components
├── lib/                   # Core libraries
│   └── axios/            # API configuration
├── messages/              # Translation files
├── services/              # API services
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
├── utils/                 # Utility functions
└── constants/             # App constants
```

## 🌐 Internationalization

Default language: **Arabic (ar)**

Supported languages:

- Arabic (ar) - RTL
- English (en) - LTR

## 📱 PWA Documentation

- 📖 [PWA Repair Complete Guide](./PWA_REPAIR_COMPLETE.md) - Start here!
- 📖 [PWA Setup Guide](./docs/PWA_SETUP.md)
- 📖 [PWA Testing Guide](./docs/PWA_TESTING.md)
- 📖 [Service Worker Documentation](./docs/SERVICE_WORKER.md)
- 📖 [Detailed Fix Summary](./docs/PWA_FIX_SUMMARY.md)

## 🧪 Testing

```bash
# Run PWA tests
npm run test:pwa

# Lint code
npm run lint

# Clean build
npm run clean:build
```

## 📝 License

MIT
