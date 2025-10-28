import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/contexts/auth-context';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ThemeColor from '@/components/theme-color';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Naqlah - نقلة | خدمات نقل الأثاث',
  description: 'أفضل خدمات نقل الأثاث في المملكة العربية السعودية - نقل آمن وسريع مع ضمان كامل',
  applicationName: 'Naqlah',
  keywords: ['نقل أثاث', 'نقل عفش', 'شركة نقل', 'نقلة', 'Naqlah', 'furniture moving', 'Saudi Arabia'],
  authors: [{ name: 'Naqlah Team' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Naqlah',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/assets/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/assets/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: 'Naqlah',
    title: 'Naqlah - نقلة | خدمات نقل الأثاث',
    description: 'أفضل خدمات نقل الأثاث في المملكة العربية السعودية',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naqlah - نقلة',
    description: 'أفضل خدمات نقل الأثاث في المملكة العربية السعودية',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00B8A9' },
    { media: '(prefers-color-scheme: dark)', color: '#007973' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Naqlah" />
        
        {/* iOS Splash Screens - will be added when you have the assets */}
        <link rel="apple-touch-startup-image" href="/assets/splash/apple-splash-2048-2732.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/assets/splash/apple-splash-1668-2388.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/assets/splash/apple-splash-1536-2048.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/assets/splash/apple-splash-1242-2688.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/assets/splash/apple-splash-828-1792.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/assets/splash/apple-splash-1125-2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/assets/splash/apple-splash-750-1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" />
      </head>
      <body className="flex flex-col min-h-screen font-expo-arabic">
        <AuthProvider>
          <ThemeColor />
          <LanguageProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
