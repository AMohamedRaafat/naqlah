'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';
import { EmailInput } from '@/components/ui/email-input';
import { PasswordInput } from '@/components/ui/password-input';
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

  // Customer (phone-based) state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  // Company (email/password) state
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  // Validate email
  const validateEmail = (emailValue: string): boolean => {
    if (!emailValue) {
      setEmailError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError('Invalid email address');
      return false;
    }
    return true;
  };

  // Validate password
  const validatePassword = (passwordValue: string): boolean => {
    if (!passwordValue) {
      setPasswordError('Password is required');
      return false;
    }
    if (passwordValue.length < 6) {
      setPasswordError('Password must be at least 6 characters');
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

  const handleCompanySubmit = () => {
    // Validate both fields
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    // Clear errors
    setEmailError('');
    setPasswordError('');

    // Mock: Login company user directly (no OTP needed)
    login({
      id: '1',
      name: 'شركة النقل',
      email: email,
      isCompany: true,
    });

    // Close modal and redirect
    onOpenChange(false);
    router.push('/dashboard');
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
            <TabsList className="grid w-full grid-cols-2 bg-white text-[#B1B1B1]">
              <TabsTrigger
                value="customer"
                className="rounded-none data-[state=active]:text-[#00B8A9] data-[state=active]:border-b-2 data-[state=active]:border-[#00B8A9] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {t('login.customerTab')}
              </TabsTrigger>
              <TabsTrigger
                value="company"
                className="rounded-none data-[state=active]:text-[#00B8A9] data-[state=active]:border-b-2 data-[state=active]:border-[#00B8A9] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {t('login.companyTab')}
              </TabsTrigger>
            </TabsList>

            {/* Customer Tab */}
            <TabsContent value="customer" className="space-y-4 mt-6">
              {/* Phone Number Input */}
              <div className="space-y-2">
                <label htmlFor="customer-phone" className="block text-sm font-medium text-gray-700">
                  {t('requestMove.phoneLabel')}
                </label>
                <PhoneInput
                  id="customer-phone"
                  value={phoneNumber}
                  onChange={(value) => {
                    setPhoneNumber(value);
                    setPhoneError('');
                  }}
                  error={phoneError}
                  placeholder={t('requestMove.phonePlaceholder')}
                  isRTL={isRTL}
                />
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
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="company-email" className="block text-sm font-medium text-gray-700">
                  {t('registerCompany.email')}
                </label>
                <EmailInput
                  id="company-email"
                  value={email}
                  onChange={(value) => {
                    setEmail(value);
                    setEmailError('');
                  }}
                  error={emailError}
                  placeholder="example@company.com"
                  isRTL={isRTL}
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label
                  htmlFor="company-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t('registerCompany.password')}
                </label>
                <PasswordInput
                  id="company-password"
                  value={password}
                  onChange={(value) => {
                    setPassword(value);
                    setPasswordError('');
                  }}
                  error={passwordError}
                  placeholder="••••••••"
                  isRTL={isRTL}
                />
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
                onClick={handleCompanySubmit}
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
