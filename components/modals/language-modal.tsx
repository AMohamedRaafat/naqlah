'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
          <div className=" mb-6 border border-[#ededed] rounded-md">
            {/* Arabic */}
            <button
              onClick={() => setSelectedLanguage('ar')}
              className={`w-full p-4 rounded-md flex items-center justify-between transition-colors
              ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <span
                className={`font-regular ${
                  selectedLanguage === 'ar' ? 'text-[#00B8A9]' : 'text-[#353535]'
                }`}
              >
                العربية
              </span>
              {selectedLanguage === 'ar' && <Check className="w-5 h-5 text-[#00B8A9]" />}
            </button>
            <div className="h-[1px] w-72 mx-auto bg-[#ededed]"></div>
            {/* English */}
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`w-full p-4 rounded-md  flex items-center justify-between transition-colors ${
                isRTL ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <span
                className={`font-regular ${
                  selectedLanguage === 'en' ? 'text-[#00B8A9]' : 'text-[#353535]'
                }`}
              >
                English
              </span>
              {selectedLanguage === 'en' && <Check className="w-5 h-5 text-[#00B8A9]" />}
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
