'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const { locale } = useLanguage();
  const currentYear = new Date().getFullYear();
  const isRTL = locale === 'ar';

  return (
    <footer className="bg-[#00B8A9] text-white mt-auto font-expo-arabic">
      <div className="container mx-auto px-6 py-12">
        {/* Top Section - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Other Links - Right side in RTL */}
          <div className={isRTL ? 'md:order-2' : 'md:order-1'}>
            <h3 className="text-xl font-bold mb-6">{t('footer.otherLinks')}</h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link href="/privacy" className="hover:opacity-80 transition-opacity">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:opacity-80 transition-opacity">
                  {t('footer.termsConditions')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:opacity-80 transition-opacity">
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Site Links - Left side in RTL */}
          <div className={isRTL ? 'md:order-1' : 'md:order-2'}>
            <h3 className="text-xl font-bold mb-6">{t('footer.siteLinks')}</h3>
            <ul className="space-y-3 text-base">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('about');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  {t('footer.aboutUs')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('about');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  {t('footer.aboutUs')}
                </button>
              </li>
              <li>
                <Link href="/login" className="hover:opacity-80 transition-opacity">
                  {t('footer.login')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Center - Logo and Powered By */}
        <div className="flex flex-col items-center mb-10">
          {/* Logo Placeholder */}
          <div className="mb-4">
            <div className="w-48 h-20 bg-white/20 rounded-lg flex items-center justify-center">
              {/* Replace this placeholder with your logo */}
              <span className="text-white text-sm">Logo Placeholder</span>
            </div>
          </div>

          {/* Powered By Placeholder */}
          <div className="mb-6">
            <div className="w-40 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              {/* Replace this placeholder with your powered by image */}
              <span className="text-white text-xs">{t('footer.poweredBy')}</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-6">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Facebook className="w-6 h-6" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Instagram className="w-6 h-6" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Twitter className="w-6 h-6" />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Youtube className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-white/20 pt-8">
          <p className="text-base flex items-center justify-center gap-2">
            <span>©</span>
            <span>{currentYear}</span>
            <span>{t('footer.copyright')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
