'use client';

import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-12 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">{t('visionTitle')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('visionText')}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">{t('missionTitle')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('missionText')}</p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {t('valuesTitle')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#00B8A9]/10 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">🤝</div>
              <p className="font-semibold text-gray-800">{t('trust')}</p>
            </div>
            <div className="bg-[#00B8A9]/10 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="font-semibold text-gray-800">{t('speed')}</p>
            </div>
            <div className="bg-[#00B8A9]/10 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">✨</div>
              <p className="font-semibold text-gray-800">{t('quality')}</p>
            </div>
            <div className="bg-[#00B8A9]/10 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">😊</div>
              <p className="font-semibold text-gray-800">{t('satisfaction')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
