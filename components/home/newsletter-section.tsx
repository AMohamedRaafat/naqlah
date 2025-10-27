'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-[#00B8A9] to-[#009688]">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
          {/* Illustration */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white rounded-2xl p-6 mb-4">
              <div className="text-6xl">📦</div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{t('title')}</h2>
            <p className="text-white/90 text-lg">{t('subtitle')}</p>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <Button
                type="submit"
                className="bg-white text-[#00B8A9] hover:bg-gray-100 font-semibold px-8"
              >
                {t('subscribeNow')}
              </Button>
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{t('weeklyEmails')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎁</span>
              <span>{t('exclusiveOffers')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>{t('dataProtected')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
