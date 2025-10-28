'use client';

import { useEffect, useState } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true);
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      // Redirect to home or reload
      window.location.href = '/';
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (navigator.onLine) {
      window.location.href = '/';
    } else {
      // Show a toast or message that we're still offline
      alert(isRTL ? 'لا يوجد اتصال بالإنترنت' : 'No internet connection');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/assets/logo.svg"
            alt="Naqlah"
            width={180}
            height={80}
            className="h-20 w-auto"
          />
        </div>

        {/* Offline Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <WifiOff className="w-12 h-12 text-gray-500" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {isRTL ? 'لا يوجد اتصال بالإنترنت' : 'No Internet Connection'}
        </h1>
        <p className="text-gray-600 mb-8">
          {isRTL
            ? 'يبدو أنك غير متصل بالإنترنت. يرجى التحقق من اتصالك والمحاولة مرة أخرى.'
            : "It looks like you're offline. Please check your connection and try again."}
        </p>

        {/* Retry Button */}
        <Button
          onClick={handleRetry}
          className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-base"
        >
          <RefreshCw className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إعادة المحاولة' : 'Retry'}
        </Button>

        {/* Status Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isOnline ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></div>
          <span className="text-sm text-gray-600">
            {isOnline
              ? isRTL
                ? 'متصل بالإنترنت'
                : 'Online'
              : isRTL
              ? 'غير متصل بالإنترنت'
              : 'Offline'}
          </span>
        </div>

        {/* Tips */}
        <div className="mt-8 text-right" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {isRTL ? 'نصائح:' : 'Tips:'}
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              {isRTL
                ? '• تحقق من اتصال Wi-Fi أو البيانات الخلوية'
                : '• Check your Wi-Fi or cellular data connection'}
            </li>
            <li>
              {isRTL
                ? '• تأكد من تشغيل وضع الطيران'
                : '• Make sure Airplane mode is turned off'}
            </li>
            <li>
              {isRTL ? '• حاول إعادة تشغيل جهاز التوجيه' : '• Try restarting your router'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

