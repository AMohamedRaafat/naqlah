'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface LanguageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LanguageModal({ open, onOpenChange }: LanguageModalProps) {
  const { locale, setLocale } = useLanguage();
  const t = useTranslations('common');
  const isRTL = locale === 'ar';

  const [selectedLanguage, setSelectedLanguage] = useState<'ar' | 'en'>(locale);

  const handleSave = () => {
    setLocale(selectedLanguage);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] sm:max-w-md rounded-xl p-0" dir={isRTL ? 'rtl' : 'ltr'}>
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-center text-lg font-bold text-[#353535]">
            {t('language') || 'اللغة'}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Language Options */}
          <div className="space-y-3 mb-6">
            {/* Arabic */}
            <button
              onClick={() => setSelectedLanguage('ar')}
              className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-colors ${
                selectedLanguage === 'ar'
                  ? 'border-[#00B8A9] bg-[#00B8A9]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-[#00B8A9] font-medium">العربية</span>
              {selectedLanguage === 'ar' && (
                <Check className="w-5 h-5 text-[#00B8A9]" />
              )}
            </button>

            {/* English */}
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-colors ${
                selectedLanguage === 'en'
                  ? 'border-[#00B8A9] bg-[#00B8A9]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-gray-700 font-medium">English</span>
              {selectedLanguage === 'en' && (
                <Check className="w-5 h-5 text-[#00B8A9]" />
              )}
            </button>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-base rounded-md"
          >
            {t('save') || 'حفظ'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

