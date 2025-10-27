'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900 mt-auto font-expo-arabic">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/assets/logo.svg"
                alt={t('footer.companyName')}
                width={150}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {t('footer.companyDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3 lg:mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('about');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-600 dark:text-gray-400 hover:text-[#00B8A9] transition-colors"
                >
                  {t('common.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('services');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-600 dark:text-gray-400 hover:text-[#00B8A9] transition-colors"
                >
                  {t('navigation.services')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-600 dark:text-gray-400 hover:text-[#00B8A9] transition-colors"
                >
                  {t('common.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-3 lg:mb-4">{t('common.contact')}</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>info@sakani.com</li>
              <li dir="ltr" className="text-right">
                +966 XX XXX XXXX
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-6 lg:mt-8 pt-6 lg:pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            © {currentYear} {t('footer.companyName')} - {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
