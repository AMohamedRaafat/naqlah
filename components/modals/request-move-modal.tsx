'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';
import { validateField, saudiPhoneSchema } from '@/lib/validations/schemas';
import OTPVerificationModal from './otp-verification-modal';

interface RequestMoveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RequestMoveModal({ open, onOpenChange }: RequestMoveModalProps) {
  const t = useTranslations('requestMove');
  const { locale } = useLanguage();
  const { login } = useAuth();
  const router = useRouter();
  const [showOTP, setShowOTP] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [saveData, setSaveData] = useState(false);
  const isRTL = locale === 'ar';

  // Reset modal state when closed
  useEffect(() => {
    if (!open && !showOTP) {
      setPhoneNumber('');
      setPhoneError('');
      setSaveData(false);
    }
  }, [open, showOTP]);

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    // Clear error when user starts typing
    if (phoneError && value.length > 0) {
      setPhoneError('');
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setPhoneError('');

    // Basic validation first
    if (!phoneNumber || phoneNumber.trim() === '') {
      setPhoneError(t('phoneIncomplete'));
      return;
    }

    if (phoneNumber.length !== 9) {
      setPhoneError(t('phoneIncomplete'));
      return;
    }

    if (!phoneNumber.startsWith('5')) {
      setPhoneError(t('phoneInvalidStart'));
      return;
    }

    // Validate using Zod schema
    const error = validateField(saudiPhoneSchema, phoneNumber);
    if (error) {
      setPhoneError(error);
      return;
    }

    // Phone is valid, proceed to OTP
    console.log('Sending OTP to:', '+966' + phoneNumber);

    // Close the main request modal when opening OTP
    onOpenChange(false);

    // Open OTP modal
    setShowOTP(true);
  };

  const handleOTPVerifySuccess = () => {
    // Close OTP modal
    setShowOTP(false);

    // Mock: Check if user is registered (for demo, phone ending in "000" is new user)
    const isNewUser = phoneNumber.endsWith('000');

    // Create user object
    const userData = {
      id: phoneNumber,
      name: isNewUser ? '' : 'User Name',
      phone: `+966${phoneNumber}`,
      isCompany: false, // Request Move is for customers, not companies
    };

    // Login user if save data is checked
    if (saveData) {
      login(userData);
    }

    // Close main modal
    onOpenChange(false);

    // Redirect based on user status
    if (isNewUser) {
      router.push('/profile'); // New user - complete profile
    } else {
      router.push('/dashboard'); // Existing user - go to dashboard
    }
  };

  const handleBackToPhone = () => {
    setShowOTP(false);
    // Reopen the request modal when going back
    onOpenChange(true);
  };

  return (
    <>
      {/* Phone Input Modal */}
      <Dialog open={open && !showOTP} onOpenChange={onOpenChange}>
        <DialogContent className="w-[90%] sm:max-w-80 font-expo-arabic p-0 gap-0">
          <DialogHeader className="relative border-b border-gray-200 pb-4 pt-6 px-6">
            <DialogTitle className="text-center text-xl font-semibold text-gray-900">
              {t('firstStepTitle')}
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 py-6">
            <p className="text-center text-[#868686] mb-6 text-md">{t('subtitle')}</p>

            <form onSubmit={handlePhoneSubmit}>
              {/* Phone number input */}
              <div className="mb-4">
                <label htmlFor="phone" className="block text-md font-medium text-[#353535] mb-2">
                  {t('phoneLabel')}
                </label>
                <PhoneInput
                  id="phone"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  error={phoneError}
                  placeholder={t('phonePlaceholder')}
                  isRTL={isRTL}
                  required
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-2 mb-6 flex-row">
                <input
                  type="checkbox"
                  id="saveData"
                  checked={saveData}
                  onChange={(e) => setSaveData(e.target.checked)}
                  className="w-5 h-5 text-[#00B8A9] border-[#E7E7E7] checked:bg-[#00B8A9] focus:ring-[#00B8A9] rounded"
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
