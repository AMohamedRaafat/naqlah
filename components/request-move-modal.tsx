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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
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
  const [phoneError, setPhoneError] = useState('');
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
      setPhoneError('');
      setSaveData(false);
      setOtp('');
      setOtpError('');
    }
  }, [open]);

  // Validate Saudi phone number
  const validatePhoneNumber = (phone: string): boolean => {
    // Saudi phone numbers should be 9 digits and start with 5
    if (phone.length === 0) {
      setPhoneError('');
      return false;
    }
    
    if (phone.length < 9) {
      setPhoneError(t('phoneIncomplete'));
      return false;
    }
    
    if (!phone.startsWith('5')) {
      setPhoneError(t('phoneInvalidStart'));
      return false;
    }
    
    if (phone.length === 9) {
      setPhoneError('');
      return true;
    }
    
    return false;
  };

  const handlePhoneChange = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    setPhoneNumber(cleanedValue);
    if (cleanedValue.length > 0) {
      validatePhoneNumber(cleanedValue);
    } else {
      setPhoneError('');
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate before submitting
    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }
    
    // Simulate sending OTP
    console.log('Sending OTP to:', '+966' + phoneNumber);
    setStep('otp');
    
    // Start WebOTP API to auto-detect SMS OTP
    startWebOTP();
  };

  // WebOTP API implementation
  const startWebOTP = async () => {
    // Check if WebOTP API is supported
    if ('OTPCredential' in window) {
      try {
        const ac = new AbortController();

        // Set timeout to abort after 3 minutes
        setTimeout(() => {
          ac.abort();
        }, 3 * 60 * 1000);

        // Request OTP from SMS
        const otp = await navigator.credentials.get({
          otp: { transport: ['sms'] },
          signal: ac.signal,
        } as any);

        if (otp && (otp as any).code) {
          // Auto-fill the OTP field
          setOtp((otp as any).code);
          setOtpError('');
          console.log('OTP auto-filled:', (otp as any).code);
        }
      } catch (err) {
        // User cancelled or timeout - this is fine, user can enter manually
        console.log('WebOTP cancelled or not available:', err);
      }
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
      <DialogContent className="sm:max-w-80 font-expo-arabic p-0 gap-0">
        {/* Header with close button */}
        <DialogHeader className="relative border-b border-gray-200 pb-4 pt-6 px-6">
          <DialogTitle className="text-center text-xl font-semibold text-gray-900">
            {step === 'phone' ? t('firstStepTitle') : t('secondStepTitle')}
          </DialogTitle>
        </DialogHeader>

        {/* Modal body */}
        <div className="px-6 py-6">
          {step === 'phone' ? (
            <>
              <p className="text-center text-[#868686] mb-6 text-md">{t('subtitle')}</p>

              <form onSubmit={handlePhoneSubmit}>
                  {/* Phone number input */}
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-md font-medium text-[#353535] mb-2">
                      {t('phoneLabel')}
                    </label>
                    <div
                      className={`flex items-center border rounded-lg overflow-hidden focus-within:ring-2 flex-row ${
                        phoneError 
                          ? 'border-red-500 focus-within:ring-red-500 focus-within:border-red-500' 
                          : 'border-[#EDEDED] focus-within:ring-[#00B8A9] focus-within:border-[#00B8A9]'
                      }`}
                    >
                      <input
                        type="tel"
                        id="phone"
                        value={phoneNumber}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder={t('phonePlaceholder')}
                        className={`flex-1 px-4 py-3 outline-none ${
                          isRTL ? 'text-right' : 'text-left'
                        }`}
                        dir={'ltr'}
                        maxLength={9}
                      />
                      <span className="px-4 py-3 text-[#A3A3A3] font-regular">+966</span>
                    </div>
                    {phoneError && (
                      <p className="text-red-500 text-sm mt-2">{phoneError}</p>
                    )}
                  </div>

                {/* Checkbox */}
                <div
                  className={`flex items-center gap-2 mb-6 flex-row
                  `}
                >
                  <input
                    type="checkbox"
                    id="saveData"
                    checked={saveData}
                    onChange={(e) => setSaveData(e.target.checked)}
                    className="w-5 h-5 text-[#00B8A9] border-[#E7E7E7] checked:bg-[#00B8A9]  focus:ring-[#00B8A9] rounded"
                  />
                  <label htmlFor="saveData" className="text-sm text-gray-700 cursor-pointer">
                    {t('saveDataLabel')}
                  </label>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={phoneNumber.length !== 9 || !phoneNumber.startsWith('5') || !!phoneError}
                  className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('submitButton')}
                </Button>
              </form>
            </>
          ) : (
            <>
              <p className="text-center text-[#868686] mb-2 text-md">
                {t('otpSubtitle')}

                <span className="text-[#353535] font-medium">+966{phoneNumber}</span>
              </p>

              <form onSubmit={handleOtpSubmit}>
                {/* OTP Label */}
                <div className="mb-4 mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                    {t('otpLabel')}
                  </label>

                  {/* OTP Input using shadcn InputOTP */}
                  <div
                    className={`flex justify-center mb-4 flex-row
                    `}
                  >
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => {
                        setOtp(value);
                        setOtpError('');
                      }}
                    >
                      <InputOTPGroup className="gap-2 flex-row-reverse">
                        <InputOTPSlot
                          index={0}
                          className={` rounded-md w-12 h-12 text-lg font-semibold border-2 ${
                            otpError ? 'border-red-500 bg-red-50' : 'border-[#E7E7E7]'
                          }`}
                        />
                        <InputOTPSlot
                          index={1}
                          className={`rounded-md w-12 h-12 text-lg font-semibold border-2 ${
                            otpError ? 'border-red-500 bg-red-50' : 'border-[#E7E7E7]'
                          }`}
                        />
                        <InputOTPSlot
                          index={2}
                          className={` rounded-md w-12 h-12 text-lg font-semibold border-2 ${
                            otpError ? 'border-red-500 bg-red-50' : 'border-[#E7E7E7]'
                          }`}
                        />
                        <InputOTPSlot
                          index={3}
                          className={`rounded-md w-12 h-12 text-lg font-semibold border-2 ${
                            otpError ? 'border-red-500 bg-red-50' : 'border-[#E7E7E7]'
                          }`}
                        />
                        <InputOTPSlot
                          index={4}
                          className={`rounded-md w-12 h-12 text-lg font-semibold border-2 ${
                            otpError ? 'border-red-500 bg-red-50' : 'border-[#E7E7E7]'
                          }`}
                        />
                        <InputOTPSlot
                          index={5}
                          className={`rounded-md w-12 h-12 text-lg font-semibold border-2 ${
                            otpError ? 'border-red-500 bg-red-50' : 'border-[#E7E7E7]'
                          }`}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  {/* OTP Error Message */}
                  {otpError && <p className="text-red-500 text-sm text-center mb-3">{otpError}</p>}
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
