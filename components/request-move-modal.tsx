'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface RequestMoveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RequestMoveModal({ open, onOpenChange }: RequestMoveModalProps) {
  const t = useTranslations('requestMove');
  const { locale } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [saveData, setSaveData] = useState(false);
  const isRTL = locale === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Phone number:', phoneNumber);
    console.log('Save data:', saveData);
    // Close modal after submission
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md font-expo-arabic p-0 gap-0">
        {/* Header with close button */}
        <DialogHeader className="relative border-b border-gray-200 pb-4 pt-6 px-6">
          <DialogTitle className="text-center text-xl font-semibold text-gray-900">
            {t('title')}
          </DialogTitle>
          <DialogClose className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        {/* Modal body */}
        <div className="px-6 py-6">
          <p className="text-center text-gray-600 mb-6 text-sm">
            {t('subtitle')}
          </p>

          <form onSubmit={handleSubmit}>
            {/* Phone number input */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                {t('phoneLabel')}
              </label>
              <div className={`flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#00B8A9] focus-within:border-[#00B8A9] ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={t('phonePlaceholder')}
                  className={`flex-1 px-4 py-3 outline-none ${isRTL ? 'text-right' : 'text-left'}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <span className="px-4 py-3 bg-gray-50 text-gray-700 border-l border-gray-300 font-medium">
                  +966
                </span>
              </div>
            </div>

            {/* Checkbox */}
            <div className={`flex items-center gap-2 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <input
                type="checkbox"
                id="saveData"
                checked={saveData}
                onChange={(e) => setSaveData(e.target.checked)}
                className="w-4 h-4 text-[#00B8A9] border-gray-300 rounded focus:ring-[#00B8A9]"
              />
              <label htmlFor="saveData" className="text-sm text-gray-700 cursor-pointer">
                {t('saveDataLabel')}
              </label>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-base"
            >
              {t('submitButton')}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

