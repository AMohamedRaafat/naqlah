import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/contexts/auth-context';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import './globals.css';

export const metadata = {
  title: 'Naqlah',
  description: 'Next.js application with Arabic and English support',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00B8A9' },
    { media: '(prefers-color-scheme: dark)', color: '#00B8A9' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="theme-color" content="#00B8A9" />
      </head>
      <body className="flex flex-col min-h-screen font-expo-arabic">
        <AuthProvider>
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
