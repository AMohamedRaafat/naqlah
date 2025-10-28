'use client';

import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{t('navigation.dashboard')}</h1>
      <p className="text-gray-600">Dashboard content goes here...</p>
    </div>
  );
}
