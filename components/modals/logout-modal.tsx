'use client';

import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface LogoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LogoutModal({ open, onOpenChange }: LogoutModalProps) {
  const { locale } = useLanguage();
  const { logout } = useAuth();
  const t = useTranslations('common');
  const isRTL = locale === 'ar';

  const handleLogout = () => {
    logout();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] sm:max-w-md rounded-xl p-0" dir={isRTL ? 'rtl' : 'ltr'}>
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-center text-lg font-bold text-[#353535]">
            {t('logoutTitle') || 'تسجيل الخروج'}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Confirmation Message */}
          <p className="text-center text-gray-600 mb-6">
            {t('logoutConfirmation') || 'هل أنت متأكد من أنك تريد تسجيل الخروج من حسابك؟'}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleLogout}
              className="flex-1 bg-[#FF4D4D] hover:bg-[#E63946] text-white font-semibold py-6 text-base rounded-md"
            >
              {t('confirmLogout') || 'نعم الخروج'}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-6 text-base rounded-md"
            >
              {t('cancel') || 'لا إلغاء'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

