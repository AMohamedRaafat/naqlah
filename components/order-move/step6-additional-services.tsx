'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface Step6Props {
  data: {
    packaging: string;
    cleaningBefore: string;
    cleaningAfter: string;
    insurance: string;
    needDisassembly: string;
  };
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function Step6AdditionalServices({ data, onNext, onBack }: Step6Props) {
  const t = useTranslations('orderMove.step6');
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';

  const [formData, setFormData] = useState(data);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    onNext({ additionalServices: formData });
  };

  return (
    <div className="w-full">
      {/* Title Card */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 text-center mb-2">
          {t('title') || 'الخدمات الإضافية'}
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          {t('subtitle') || 'يرجي تحديد الخدمات المراد تقديمها عند النقل'}
        </p>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Packaging */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {t('packaging') || 'التغليف المحكم'}
            </label>
            <div className="relative">
              <select
                value={formData.packaging}
                onChange={(e) => handleChange('packaging', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm appearance-none bg-white"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t('selectOption') || 'حدد نعم أو لا'}</option>
                <option value="yes">{t('yes') || 'نعم'}</option>
                <option value="no">{t('no') || 'لا'}</option>
              </select>
              <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Cleaning Before */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {t('cleaningBefore') || 'التنظيف قبل النقل'}
            </label>
            <div className="relative">
              <select
                value={formData.cleaningBefore}
                onChange={(e) => handleChange('cleaningBefore', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm appearance-none bg-white"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t('selectOption') || 'حدد نعم أو لا'}</option>
                <option value="yes">{t('yes') || 'نعم'}</option>
                <option value="no">{t('no') || 'لا'}</option>
              </select>
              <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Cleaning After */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {t('cleaningAfter') || 'التنظيف بعد النقل'}
            </label>
            <div className="relative">
              <select
                value={formData.cleaningAfter}
                onChange={(e) => handleChange('cleaningAfter', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm appearance-none bg-white"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t('selectOption') || 'حدد نعم أو لا'}</option>
                <option value="yes">{t('yes') || 'نعم'}</option>
                <option value="no">{t('no') || 'لا'}</option>
              </select>
              <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Insurance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {t('insurance') || 'التأمين ضد الفقد والكسر'}
            </label>
            <div className="relative">
              <select
                value={formData.insurance}
                onChange={(e) => handleChange('insurance', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm appearance-none bg-white"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t('selectOption') || 'حدد نعم أو لا'}</option>
                <option value="yes">{t('yes') || 'نعم'}</option>
                <option value="no">{t('no') || 'لا'}</option>
              </select>
              <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Need Disassembly */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {t('needDisassembly') || 'هل هناك حاجة للفك والتركيب؟'}
            </label>
            <div className="relative">
              <select
                value={formData.needDisassembly}
                onChange={(e) => handleChange('needDisassembly', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm appearance-none bg-white"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t('selectOption') || 'حدد نعم أو لا'}</option>
                <option value="yes">{t('yes') || 'نعم'}</option>
                <option value="no">{t('no') || 'لا'}</option>
              </select>
              <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
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
          {t('continue') || 'التالي'}
        </Button>
      </div>
    </div>
  );
}

