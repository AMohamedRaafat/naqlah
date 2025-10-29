import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/contexts/auth-context';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Naqlah - نقلة | خدمات نقل الأثاث',
  description: 'أفضل خدمات نقل الأثاث في المملكة العربية السعودية - نقل آمن وسريع مع ضمان كامل',
  keywords: [
    'نقل أثاث',
    'نقل عفش',
    'شركة نقل',
    'نقلة',
    'Naqlah',
    'furniture moving',
    'Saudi Arabia',
  ],
  authors: [{ name: 'Naqlah Team' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex flex-col min-h-screen font-expo-arabic">
        <AuthProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
