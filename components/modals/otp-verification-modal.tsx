'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
      <DialogContent className="sm:max-w-md" dir={isRTL ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {t('secondStepTitle')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Phone Number Display */}
          <p className="text-center text-gray-600">
            {t('otpSubtitle')} <span className="font-semibold">+966 {phoneNumber}</span>
          </p>

          {/* OTP Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {t('otpLabel')}
            </label>
            <div className="flex justify-center" dir="ltr">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                  setOtpError('');
                }}
                autoComplete="one-time-code"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {otpError && (
              <p className="text-sm text-red-500 text-center">{otpError}</p>
            )}
          </div>

          {/* Resend OTP */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {t('didNotReceive')}{' '}
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-[#00B8A9] font-semibold hover:underline"
              >
                {t('resendOtp')}
              </button>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {onBack && (
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1"
              >
                {isRTL ? 'رجوع' : 'Back'}
              </Button>
            )}
            <Button
              onClick={handleVerifyOTP}
              disabled={isVerifying || otp.length !== 6}
              className="flex-1 bg-[#00B8A9] hover:bg-[#009688] text-white"
            >
              {isVerifying ? t('verifying') : t('submitButton')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

