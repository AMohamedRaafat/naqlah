'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';

export default function ProcessingPage() {
  const t = useTranslations('orderMove.processing');
  const router = useRouter();
  const { locale } = useLanguage();

  const isRTL = locale === 'ar';

  const handleFollowUp = () => {
    // Navigate to order tracking or dashboard
    router.push('/dashboard');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="w-full">
      {/* Main Card */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
        {/* Icon/Illustration */}
        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-48">
            {/* You can replace this with an actual illustration */}
            <Image src="/assets/steps/process.svg" alt="Processing" width={192} height={192} />
          </div>
        </div>

        {/* Title with emoji */}
        <h2 className="text-xl font-bold text-gray-900 text-center mb-3">
          {t('title') || 'جار معالجة طلبك'}
          <span className="inline-block mr-2">🎯</span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-600 text-center mb-6 px-4">
          {t('subtitle') ||
            'تم إنشاء طلبك بنجاح، سيتم إرسال عروض أسعار لك من قبل شركات النقل خلال الساعات القادمة'}
        </p>

        {/* Dotted separator */}
        <div className="border-t-2 border-dashed border-gray-200 my-6"></div>

        {/* Status indicators */}
        <div
          className="flex items-center justify-between text-sm mb-6 px-4"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="text-center">
            <p className="text-gray-600">{t('waitingResponse') || 'بإنتظار الرد'}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-900 font-medium">{t('requestStatus') || 'حالة الطلب'}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleFollowUp}
          className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-base rounded-xl"
        >
          {t('followUp') || 'متابعة الطلب'}
        </Button>

        <Button
          onClick={handleGoHome}
          variant="outline"
          className="w-full bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-6 text-base rounded-xl"
        >
          {t('backToHome') || 'العودة إلي الرئيسية'}
        </Button>
      </div>
    </div>
  );
}
