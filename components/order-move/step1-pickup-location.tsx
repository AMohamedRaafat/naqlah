'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import('./map-component'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-200 rounded-xl animate-pulse" />,
});

interface Step1Props {
  data: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function Step1PickupLocation({ data, onNext, onBack }: Step1Props) {
  const t = useTranslations('orderMove.step1');
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';

  const [location, setLocation] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocationSelect = (lat: number, lng: number, address: string, city: string) => {
    setLocation({ lat, lng, address, city });
  };

  const handleNext = () => {
    if (!location.address || !location.city) {
      alert(t('selectLocationError') || 'الرجاء تحديد الموقع');
      return;
    }
    onNext({ pickupLocation: location });
  };

  return (
    <div className="w-full">
      {/* Title Card */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          {t('title') || 'ماهو الموقع المراد النقل منه'}
        </h2>
        <p className="text-sm text-gray-600 text-center">
          {t('subtitle') || 'من فضلك أدخل علي الخريطة تفاصيل الموقع'}
        </p>

        {/* Search Input */}
        <div className="mt-4 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder') || 'إبحث عن العنوان'}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm placeholder:text-[#7E7E7E]"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00B8A9] w-5 h-5" />
        </div>

        {/* Selected Location Display */}
        {location.address && (
          <div className="mt-4 p-3 bg-gray-50 rounded-xl">
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-[#00B8A9] mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">{t('result') || 'النتائج'}</p>
                <p className="text-sm font-bold text-gray-900">{location.city}</p>
                <p className="text-xs text-gray-600">{location.address}</p>
              </div>
            </div>
          </div>
        )}

        {/* Map */}
        <div className="mt-4 rounded-xl overflow-hidden border-2 border-gray-200">
          <MapComponent
            center={[location.lat, location.lng]}
            onLocationSelect={handleLocationSelect}
            searchQuery={searchQuery}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-6 text-base rounded-xl"
        >
          {t('back') || 'تراجع'}
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-base rounded-xl"
        >
          {t('continue') || 'أكمل'}
        </Button>
      </div>
    </div>
  );
}

