'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import LoadingScreen from '@/components/loading-screen';

type Locale = 'ar' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar');
  const [messages, setMessages] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get locale from localStorage or default to 'ar'
    const savedLocale = (localStorage.getItem('locale') as Locale) || 'ar';
    setLocaleState(savedLocale);
    loadMessages(savedLocale);
  }, []);

  const loadMessages = async (newLocale: Locale) => {
    setIsLoading(true);
    try {
      const msgs = await import(`@/messages/${newLocale}.json`);
      setMessages(msgs.default);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
    setIsLoading(false);
  };

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem('locale', newLocale);
    setLocaleState(newLocale);
    loadMessages(newLocale);
    // Update document direction
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
