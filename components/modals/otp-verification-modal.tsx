'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface OTPVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phoneNumber: string;
  onVerifySuccess: () => void;
  onBack?: () => void;
}

export default function OTPVerificationModal({
  open,
  onOpenChange,
  phoneNumber,
  onVerifySuccess,
  onBack,
}: OTPVerificationModalProps) {
  const t = useTranslations('requestMove');
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // WebOTP API for automatic OTP detection
  useEffect(() => {
    if (!open) return;

    const abortController = new AbortController();

    const startWebOTP = async () => {
      if ('OTPCredential' in window) {
        try {
          const otpCredential = await navigator.credentials.get({
            otp: { transport: ['sms'] },
            signal: abortController.signal,
          } as any);

          if (otpCredential && 'code' in otpCredential) {
            setOtp((otpCredential as any).code);
          }
        } catch (err: any) {
          if (err.name === 'AbortError') {
            console.log('[WebOTP] Request aborted');
          } else {
            console.log('[WebOTP] Error:', err);
          }
        }
      }
    };

    startWebOTP();

    return () => {
      abortController.abort();
    };
  }, [open]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setOtpError(t('otpIncomplete'));
      return;
    }

    setIsVerifying(true);
    setOtpError('');

    // Simulate API call
    setTimeout(() => {
      // Mock validation - replace with actual API call
      if (otp === '123456' || otp === '000000') {
        onVerifySuccess();
      } else {
        setOtpError(t('otpInvalid'));
      }
      setIsVerifying(false);
    }, 1000);
  };

  const handleResendOTP = () => {
    setOtp('');
    setOtpError('');
    // Add resend OTP logic here
    console.log('Resending OTP to:', phoneNumber);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] sm:max-w-80 font-expo-arabic p-0 gap-0 rounded-xl">
        {/* Header */}
        <DialogHeader className="relative border-b border-gray-200 pb-4 pt-6 px-6">
          <DialogTitle className="text-center text-xl font-semibold text-gray-900">
            {t('secondStepTitle')}
          </DialogTitle>
        </DialogHeader>

        {/* Modal body */}
        <div className="px-6 py-6">
          {/* Phone Number Display */}
          <p className="text-center text-[#868686] mb-2 text-sm">
            {t('otpSubtitle')} <span className="text-[#353535] font-medium">+966{phoneNumber}</span>
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifyOTP();
            }}
          >
            {/* OTP Label */}
            <div className="mb-4 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3 text-start">
                {t('otpLabel')}
              </label>

              {/* OTP Input using shadcn InputOTP */}
              <div className="flex justify-center mb-4 flex-row">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    setOtpError('');
                  }}
                  autoComplete="one-time-code"
                >
                  <InputOTPGroup className="gap-2 flex-row-reverse">
                    <InputOTPSlot
                      index={0}
                      className={`rounded-md w-12 h-12 text-lg font-semibold border-2 ${
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
                      className={`rounded-md w-12 h-12 text-lg font-semibold border-2 ${
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
                  onClick={handleResendOTP}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
