'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function ProcessingPage() {
  const t = useTranslations('orderMove.processing');
  const router = useRouter();

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
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative">
                {/* Decorative circles */}
                <div className="absolute -top-4 -left-4 w-3 h-3 bg-[#00B8A9] rounded-full" />
                <div className="absolute -top-2 -right-6 w-2 h-2 border-2 border-gray-300 rounded-full" />
                <div className="absolute -bottom-4 -left-6 w-2 h-2 border-2 border-gray-300 rounded-full" />
                <div className="absolute -bottom-2 -right-4 w-2.5 h-2.5 text-gray-300">✕</div>
                
                {/* Main circle background */}
                <div className="w-40 h-40 bg-[#D2F2F0] rounded-full flex items-center justify-center">
                  {/* Gear icon */}
                  <svg
                    className="w-24 h-24 text-[#00B8A9]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z" />
                  </svg>
                  
                  {/* Document icon overlay */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-14 bg-white rounded-lg shadow-md flex items-center justify-center">
                    <div className="w-6 h-8 bg-[#FFB84D] rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title with emoji */}
        <h2 className="text-xl font-bold text-gray-900 text-center mb-3">
          <span className="inline-block mr-2">🎯</span>
          {t('title') || 'جار معالجة طلبك'}
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-600 text-center mb-6 px-4">
          {t('subtitle') || 'تم إنشاء طلبك بنجاح، سيتم إرسال عروض أسعار لك من قبل شركات النقل خلال الساعات القادمة'}
        </p>

        {/* Dotted separator */}
        <div className="border-t-2 border-dashed border-gray-200 my-6"></div>

        {/* Status indicators */}
        <div className="flex items-center justify-between text-sm mb-6 px-4">
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

