'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { X } from 'lucide-react';

interface RequestMoveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 'phone' | 'otp';

export default function RequestMoveModal({ open, onOpenChange }: RequestMoveModalProps) {
  const t = useTranslations('requestMove');
  const { locale } = useLanguage();
  const { login } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [saveData, setSaveData] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const isRTL = locale === 'ar';

  // Reset modal state when closed
  useEffect(() => {
    if (!open) {
      setStep('phone');
      setPhoneNumber('');
      setSaveData(false);
      setOtp('');
      setOtpError('');
    }
  }, [open]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 9) {
      // Simulate sending OTP
      console.log('Sending OTP to:', '+966' + phoneNumber);
      setStep('otp');
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      setOtpError(t('otpIncomplete'));
      return;
    }

    setIsVerifying(true);

    // Simulate OTP verification
    setTimeout(() => {
      // Mock: Check if OTP is valid (for demo, any 6-digit code is valid)
      const isValidOtp = otp.length === 6;

      if (!isValidOtp) {
        setOtpError(t('otpInvalid'));
        setIsVerifying(false);
        return;
      }

      // Mock: Check if user is registered (for demo, phone ending in "000" is new user)
      const isNewUser = phoneNumber.endsWith('000');

      // Create user object
      const userData = {
        id: phoneNumber,
        name: isNewUser ? '' : 'User Name', // Empty for new users
        email: `+966${phoneNumber}@example.com`,
        isCompany: false,
      };

      // Login user
      if (saveData) {
        login(userData);
      }

      setIsVerifying(false);
      onOpenChange(false);

      // Redirect based on user status
      if (isNewUser) {
        router.push('/profile'); // New user - complete profile
      } else {
        router.push('/dashboard'); // Existing user - go to dashboard
      }
    }, 1500);
  };

  const handleResendOtp = () => {
    console.log('Resending OTP to:', '+966' + phoneNumber);
    setOtp('');
    setOtpError('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md font-expo-arabic p-0 gap-0">
        {/* Header with close button */}
        <DialogHeader className="relative border-b border-gray-200 pb-4 pt-6 px-6">
          <DialogTitle className="text-center text-xl font-semibold text-gray-900">
            {t('title')}
          </DialogTitle>
          <DialogClose
            className={`absolute top-4 ${
              isRTL ? 'left-4' : 'right-4'
            } rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        {/* Modal body */}
        <div className="px-6 py-6">
          {step === 'phone' ? (
            <>
              <p className="text-center text-gray-600 mb-6 text-sm">{t('subtitle')}</p>

              <form onSubmit={handlePhoneSubmit}>
                {/* Phone number input */}
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('phoneLabel')}
                  </label>
                  <div
                    className={`flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#00B8A9] focus-within:border-[#00B8A9] ${
                      isRTL ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <input
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder={t('phonePlaceholder')}
                      className={`flex-1 px-4 py-3 outline-none ${isRTL ? 'text-right' : 'text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      maxLength={10}
                    />
                    <span className="px-4 py-3 bg-gray-50 text-gray-700 border-l border-gray-300 font-medium">
                      +966
                    </span>
                  </div>
                </div>

                {/* Checkbox */}
                <div
                  className={`flex items-center gap-2 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                >
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
                  disabled={phoneNumber.length < 9}
                  className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('submitButton')}
                </Button>
              </form>
            </>
          ) : (
            <>
              <p className="text-center text-gray-600 mb-2 text-sm">
                {t('otpSubtitle')} +966{phoneNumber}
              </p>

              <form onSubmit={handleOtpSubmit}>
                {/* OTP Label */}
                <div className="mb-4 mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                    {t('otpLabel')}
                  </label>

                  {/* OTP Input using shadcn InputOTP */}
                  <div className={`flex justify-center mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => {
                        setOtp(value);
                        setOtpError('');
                      }}
                    >
                      <InputOTPGroup className="gap-2">
                        <InputOTPSlot index={0} className={`w-12 h-12 text-lg font-semibold border-2 ${otpError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} />
                        <InputOTPSlot index={1} className={`w-12 h-12 text-lg font-semibold border-2 ${otpError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} />
                        <InputOTPSlot index={2} className={`w-12 h-12 text-lg font-semibold border-2 ${otpError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} />
                        <InputOTPSlot index={3} className={`w-12 h-12 text-lg font-semibold border-2 ${otpError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} />
                        <InputOTPSlot index={4} className={`w-12 h-12 text-lg font-semibold border-2 ${otpError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} />
                        <InputOTPSlot index={5} className={`w-12 h-12 text-lg font-semibold border-2 ${otpError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  {/* OTP Error Message */}
                  {otpError && (
                    <p className="text-red-500 text-sm text-center mb-3">{otpError}</p>
                  )}
                </div>

                {/* Resend OTP Link */}
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600">
                    {t('didNotReceive')}{' '}
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-[#00B8A9] hover:underline font-medium"
                    >
                      {t('resendOtp')}
                    </button>
                  </p>
                </div>

                {/* Verify OTP button */}
                <Button
                  type="submit"
                  disabled={otp.length !== 6 || isVerifying}
                  className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? t('verifying') : t('submitButton')}
                </Button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
