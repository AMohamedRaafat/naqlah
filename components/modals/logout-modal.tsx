'use client';

import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
          <DialogTitle className="text-center text-[16px] font-meduim text-[#353535]">
            {t('logoutTitle') || 'تسجيل الخروج'}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Confirmation Message */}
          <p className="text-center text-[#7E7E7E] mb-6 text-[12px]">
            {t('logoutConfirmation') || 'هل أنت متأكد من أنك تريد تسجيل الخروج من حسابك؟'}
          </p>

          {/* Action Buttons */}
          <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <Button
              onClick={handleLogout}
              className="flex-1 bg-[#EF4351] hover:bg-[#EF4351] text-white font-semibold py-6 text-base rounded-md"
            >
              {t('confirmLogout') || 'نعم الخروج'}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 bg-white border border-[#E4E5E8] text-[#151515] hover:bg-gray-50 font-semibold py-6 text-base rounded-md"
            >
              {t('noCancel') || 'لا إلغاء'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
