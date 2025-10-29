'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OTPVerificationModal from './otp-verification-modal';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const t = useTranslations();
  const { locale } = useLanguage();
  const { login } = useAuth();
  const router = useRouter();
  const isRTL = locale === 'ar';

  const [activeTab, setActiveTab] = useState<'customer' | 'company'>('customer');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [saveData, setSaveData] = useState(false);

  // Validate Saudi phone number (9 digits, starts with 5)
  const validatePhoneNumber = (phone: string): boolean => {
    if (phone.length !== 9) {
      setPhoneError(t('requestMove.phoneIncomplete'));
      return false;
    }
    if (!phone.startsWith('5')) {
      setPhoneError(t('requestMove.phoneInvalidStart'));
      return false;
    }
    return true;
  };

  const handlePhoneSubmit = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }

    // Phone is valid, proceed to OTP
    setPhoneError('');

    // Close the main login modal when opening OTP
    onOpenChange(false);

    // Open OTP modal
    setShowOTP(true);
  };

  const handleOTPVerifySuccess = () => {
    // Close OTP modal
    setShowOTP(false);

    // Check if user is registered (mock logic)
    const isNewUser = phoneNumber.endsWith('000');

    if (isNewUser) {
      // New user - redirect to profile/registration
      onOpenChange(false);
      router.push('/profile');
    } else {
      // Existing user - log them in
      const isCompany = activeTab === 'company';
      login({
        id: '1',
        name: isCompany ? 'شركة النقل' : 'محمد أحمد',
        phone: `+966${phoneNumber}`,
        isCompany: isCompany,
      });
      onOpenChange(false);
      router.push('/dashboard');
    }
  };

  const handleBackToPhone = () => {
    setShowOTP(false);
    // Reopen the login modal when going back
    onOpenChange(true);
  };

  return (
    <>
      {/* Main Login Modal */}
      <Dialog open={open && !showOTP} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md" dir={isRTL ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">{t('login.title')}</DialogTitle>
            <p className="text-center text-sm text-gray-600 mt-2">{t('login.subtitle')}</p>
          </DialogHeader>

          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as 'customer' | 'company')}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer">{t('login.customerTab')}</TabsTrigger>
              <TabsTrigger value="company">{t('login.companyTab')}</TabsTrigger>
            </TabsList>

            {/* Customer Tab */}
            <TabsContent value="customer" className="space-y-4 mt-6">
              {/* Phone Number Input */}
              <div className="space-y-2">
                <label htmlFor="customer-phone" className="block text-sm font-medium text-gray-700">
                  {t('requestMove.phoneLabel')}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    +966
                  </span>
                  <Input
                    id="customer-phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setPhoneNumber(value);
                      setPhoneError('');
                    }}
                    maxLength={9}
                    placeholder={t('requestMove.phonePlaceholder')}
                    className={`pl-16 ${phoneError ? 'border-red-500' : ''}`}
                    dir="ltr"
                  />
                </div>
                {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
              </div>

              {/* Save Data Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="customer-save"
                  checked={saveData}
                  onChange={(e) => setSaveData(e.target.checked)}
                  className="w-4 h-4 text-[#00B8A9] border-gray-300 rounded focus:ring-[#00B8A9]"
                />
                <label htmlFor="customer-save" className="text-sm text-gray-700 cursor-pointer">
                  {t('requestMove.saveDataLabel')}
                </label>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handlePhoneSubmit}
                className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white"
              >
                {t('requestMove.submitButton')}
              </Button>
            </TabsContent>

            {/* Company Tab */}
            <TabsContent value="company" className="space-y-4 mt-6">
              {/* Phone Number Input */}
              <div className="space-y-2">
                <label htmlFor="company-phone" className="block text-sm font-medium text-gray-700">
                  {t('requestMove.phoneLabel')}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    +966
                  </span>
                  <Input
                    id="company-phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setPhoneNumber(value);
                      setPhoneError('');
                    }}
                    maxLength={9}
                    placeholder={t('requestMove.phonePlaceholder')}
                    className={`pl-16 ${phoneError ? 'border-red-500' : ''}`}
                    dir="ltr"
                  />
                </div>
                {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
              </div>

              {/* Save Data Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="company-save"
                  checked={saveData}
                  onChange={(e) => setSaveData(e.target.checked)}
                  className="w-4 h-4 text-[#00B8A9] border-gray-300 rounded focus:ring-[#00B8A9]"
                />
                <label htmlFor="company-save" className="text-sm text-gray-700 cursor-pointer">
                  {t('requestMove.saveDataLabel')}
                </label>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handlePhoneSubmit}
                className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white"
              >
                {t('requestMove.submitButton')}
              </Button>

              {/* Register Link for Companies */}
              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  {t('login.noAccount')}{' '}
                  <button
                    onClick={() => {
                      onOpenChange(false);
                      router.push('/register-company');
                    }}
                    className="text-[#00B8A9] font-semibold hover:underline"
                  >
                    {t('login.registerNow')}
                  </button>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* OTP Verification Modal */}
      <OTPVerificationModal
        open={showOTP}
        onOpenChange={setShowOTP}
        phoneNumber={phoneNumber}
        onVerifySuccess={handleOTPVerifySuccess}
        onBack={handleBackToPhone}
      />
    </>
  );
}
