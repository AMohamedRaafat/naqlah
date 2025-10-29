'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface Step2Props {
  data: {
    city: string;
    fullAddress: string;
    buildingName: string;
    floor: string;
    hasElevator: string;
    elevatorSize: string;
    additionalNotes: string;
  };
  location: {
    city: string;
    address: string;
  };
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function Step2PickupDetails({ data, location, onNext, onBack }: Step2Props) {
  const t = useTranslations('orderMove.step2');
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';

  const [formData, setFormData] = useState({
    city: data.city || location.city,
    fullAddress: data.fullAddress || location.address,
    buildingName: data.buildingName || '',
    floor: data.floor || '',
    hasElevator: data.hasElevator || '',
    elevatorSize: data.elevatorSize || '',
    additionalNotes: data.additionalNotes || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (!formData.city || !formData.fullAddress) {
      alert(t('fillRequiredFields') || 'الرجاء ملء جميع الحقول المطلوبة');
      return;
    }
    onNext({ pickupDetails: formData });
  };

  return (
    <div className="w-full">
      {/* Title Card */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="text-[14px] font-bold text-[#353535] text-start mb-2">
          {t('title') || 'من فضلك أكمل تفاصيل عنوان النقل الحالي المراد النقل منه'}
        </h2>

        {/* Form Fields */}
        <div className="space-y-4 mt-6">
          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {t('city') || 'المدينة'}
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder={t('cityPlaceholder') || 'الرياض'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm placeholder:text-[#A3A3A3]"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Full Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {t('fullAddress') || 'العنوان العام'}
            </label>
            <input
              type="text"
              value={formData.fullAddress}
              onChange={(e) => handleChange('fullAddress', e.target.value)}
              placeholder={location.address}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm placeholder:text-[#A3A3A3]"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Building Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {t('buildingName') || 'إسم البناء'}
            </label>
            <input
              type="text"
              value={formData.buildingName}
              onChange={(e) => handleChange('buildingName', e.target.value)}
              placeholder={t('buildingPlaceholder') || 'أدخل إسم البناء'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm placeholder:text-[#A3A3A3]"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Floor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {t('floor') || 'رقم الطابق'}
            </label>
            <div className="relative">
              <select
                value={formData.floor}
                onChange={(e) => handleChange('floor', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm appearance-none bg-white"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t('selectFloor') || 'أدخل رقم الطابق'}</option>
                {[...Array(20)].map((_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Has Elevator */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {t('hasElevator') || 'يوجد مصعد؟'}
            </label>
            <div className="relative">
              <select
                value={formData.hasElevator}
                onChange={(e) => handleChange('hasElevator', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm appearance-none bg-white"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t('selectOption') || 'اختر نعم أو لا'}</option>
                <option value="yes">{t('yes') || 'نعم'}</option>
                <option value="no">{t('no') || 'لا'}</option>
              </select>
              <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Elevator Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {t('elevatorSize') || 'حجم المصعد التقريبي'}
            </label>
            <div className="relative">
              <select
                value={formData.elevatorSize}
                onChange={(e) => handleChange('elevatorSize', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm appearance-none bg-white"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t('selectSize') || 'اختر حجم المصعد'}</option>
                <option value="small">{t('small') || 'صغير'}</option>
                <option value="medium">{t('medium') || 'وسط'}</option>
                <option value="large">{t('large') || 'كبير'}</option>
              </select>
              <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {t('notes') || 'معلومات إضافية (اختياري)'}
            </label>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => handleChange('additionalNotes', e.target.value)}
              placeholder={t('notesPlaceholder') || 'أترك أي ملاحظة خاصة بالعنوان'}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm resize-none placeholder:text-[#A3A3A3]"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleNext}
          className="flex-1 bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-base rounded-md"
        >
          {t('continue') || 'التالي'}
        </Button>
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-2 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-6 text-base rounded-md"
        >
          {t('back') || 'تراجع'}
        </Button>
      </div>
    </div>
  );
}
