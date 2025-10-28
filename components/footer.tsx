'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaRegCopyright } from 'react-icons/fa';

export default function Footer() {
  const t = useTranslations();
  const { locale } = useLanguage();
  const currentYear = new Date().getFullYear();
  const isRTL = locale === 'ar';

  return (
    <footer className="bg-[#00B8A9] text-white mt-auto font-expo-arabic">
      <div className="container mx-auto px-6 py-6">
        {/* Top Section - Two Columns */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
          {/* Site Links - Left side in RTL */}
          <div className={isRTL ? 'md:order-1' : 'md:order-2'}>
            <h3 className="text-[16px] font-semibold mb-3">{t('footer.siteLinks')}</h3>
            <ul className="space-y-3 text-base text-[12px] font-regular">
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
          {/* Other Links - Right side in RTL */}
          <div className={isRTL ? 'md:order-2' : 'md:order-1'}>
            <h3 className="text-[16px] font-semibold mb-3">{t('footer.otherLinks')}</h3>
            <ul className="space-y-3 text-base text-[12px] font-regular">
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
        </div>

        {/* Center - Logo and Powered By */}
        <div className="flex flex-col items-center mb-6">
          {/* Logo Placeholder */}
          <div className="mb-1">
            <Image
              src="/assets/logo.svg"
              alt={t('footer.companyName')}
              width={192}
              height={80}
              className="w-48 h-24"
            />
          </div>

          {/* Powered By Placeholder */}
          <div className="mb-6">
            <Image
              src="/assets/powerdBy.svg"
              alt={t('footer.companyName')}
              width={192}
              height={40}
              className="w-48 h-10"
            />
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-6">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <FaFacebookF className="w-6 h-6" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <FaInstagram className="w-6 h-6" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <FaTwitter className="w-6 h-6" />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <FaYoutube className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-4">
          <p className="text-base flex items-center justify-center gap-2">
            <span>{t('footer.copyright')}</span>
            <span>{currentYear}</span>
            <FaRegCopyright className="w-4 h-4" />
          </p>
        </div>
      </div>
    </footer>
  );
}
