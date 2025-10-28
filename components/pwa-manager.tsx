'use client';

import { useEffect, useState } from 'react';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { registerServiceWorker, skipWaitingServiceWorker } from '@/lib/register-sw';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { WifiOff, RefreshCw } from 'lucide-react';
import PWAInstallPrompt from './pwa-install-prompt';

export default function PWAManager() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);
  const isOnline = useOnlineStatus();
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';

  useEffect(() => {
    // Register service worker
    registerServiceWorker({
      onUpdate: () => {
        console.log('[PWA] New version available');
        setShowUpdatePrompt(true);
      },
      onSuccess: (registration) => {
        console.log('[PWA] Service Worker registered successfully', registration);
      },
      onError: (error) => {
        console.error('[PWA] Service Worker registration failed', error);
      },
    });
  }, []);

  useEffect(() => {
    // Show offline banner when going offline
    if (!isOnline) {
      setShowOfflineBanner(true);
    } else {
      // Hide banner after a short delay when back online
      const timer = setTimeout(() => {
        setShowOfflineBanner(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  const handleUpdate = () => {
    skipWaitingServiceWorker();
    window.location.reload();
  };

  return (
    <>
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* Update Available Prompt */}
      {showUpdatePrompt && (
        <div className="fixed bottom-4 left-4 right-4 z-[100] lg:left-auto lg:right-4 lg:w-96">
          <div className="bg-white border border-[#00B8A9] rounded-lg shadow-lg p-4">
            <div className="flex items-start gap-3">
              <RefreshCw className="w-6 h-6 text-[#00B8A9] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {isRTL ? 'تحديث متاح' : 'Update Available'}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {isRTL
                    ? 'يتوفر إصدار جديد من التطبيق. قم بالتحديث للحصول على أحدث الميزات.'
                    : 'A new version of the app is available. Update to get the latest features.'}
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={handleUpdate}
                    size="sm"
                    className="bg-[#00B8A9] hover:bg-[#009688] text-white"
                  >
                    {isRTL ? 'تحديث' : 'Update'}
                  </Button>
                  <Button
                    onClick={() => setShowUpdatePrompt(false)}
                    size="sm"
                    variant="outline"
                    className="border-gray-300"
                  >
                    {isRTL ? 'لاحقاً' : 'Later'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Offline Banner */}
      {showOfflineBanner && (
        <div
          className={`fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 ${
            isOnline ? 'translate-y-0' : 'translate-y-0'
          }`}
        >
          <div
            className={`${
              isOnline ? 'bg-green-500' : 'bg-red-500'
            } text-white py-2 px-4 text-center text-sm font-medium`}
          >
            <div className="flex items-center justify-center gap-2">
              {!isOnline && <WifiOff className="w-4 h-4" />}
              <span>
                {isOnline
                  ? isRTL
                    ? 'عاد الاتصال بالإنترنت'
                    : 'You are back online'
                  : isRTL
                  ? 'لا يوجد اتصال بالإنترنت - يعمل التطبيق في وضع عدم الاتصال'
                  : 'No internet connection - App running in offline mode'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

