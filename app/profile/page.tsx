'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import { Camera } from 'lucide-react';
import Image from 'next/image';

export default function ProfileCompletePage() {
  const t = useTranslations('profileComplete');
  const { locale } = useLanguage();
  const { user, isLoggedIn, login } = useAuth();
  const router = useRouter();
  const isRTL = locale === 'ar';

  const [formData, setFormData] = useState({
    profilePhoto: null as File | null,
    firstName: '',
    lastName: '',
    phoneNumber: user?.phone?.replace('+966', '') || '',
    requestTitle: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    requestTitle: '',
    agreeTerms: '',
  });

  const [photoPreview, setPhotoPreview] = useState<string>('');

  useEffect(() => {
    // If user already has a name (profile is complete), redirect to dashboard
    if (isLoggedIn && user?.name && user.name !== '') {
      router.push('/dashboard');
    }
  }, [isLoggedIn, user, router]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profilePhoto: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      requestTitle: '',
      agreeTerms: '',
    });

    // Validation
    let hasError = false;

    if (!formData.firstName.trim()) {
      setErrors((prev) => ({ ...prev, firstName: t('errors.firstNameRequired') }));
      hasError = true;
    }

    if (!formData.lastName.trim()) {
      setErrors((prev) => ({ ...prev, lastName: t('errors.lastNameRequired') }));
      hasError = true;
    }

    if (!formData.phoneNumber || formData.phoneNumber.length !== 9) {
      setErrors((prev) => ({ ...prev, phoneNumber: t('errors.phoneNumberInvalid') }));
      hasError = true;
    }

    if (!formData.agreeTerms) {
      setErrors((prev) => ({ ...prev, agreeTerms: t('errors.termsRequired') }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Update user profile
    const updatedUser = {
      ...user!,
      name: `${formData.firstName} ${formData.lastName}`,
      phone: `+966${formData.phoneNumber}`,
    };

    login(updatedUser);

    // Redirect to order-move page to start creating an order
    router.push('/order-move');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-expo-arabic">
      <div className="container mx-auto px-2 py-2 max-w-md mt-4">
        <div className="bg-white rounded-xl border border-[#EDEDED] shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center">
              <label
                htmlFor="photo-upload"
                className="w-24 h-24 rounded-full bg-[#00B8A9] flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {photoPreview ? (
                  <Image
                    src={photoPreview}
                    alt="Profile"
                    className="object-cover w-full h-full"
                    width={54}
                    height={54}
                  />
                ) : (
                  <Camera className="w-10 h-10 text-white" />
                )}
              </label>
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>

            {/* Title */}
            <h1 className="text-start text-md font-medium text-gray-900">{t('title')}</h1>

            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-[#353535] font-regular text-start block">
                {t('firstName')}
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                  if (errors.firstName) setErrors({ ...errors, firstName: '' });
                }}
                placeholder={t('firstNamePlaceholder')}
                className={`border-[#EDEDED] ${
                  errors.firstName ? 'border-red-500' : ''
                } text-[14px] placeholder:text-[#7E7E7E]`}
                dir={isRTL ? 'rtl' : 'ltr'}
                required
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-[#353535] font-regular text-right block">
                {t('lastName')}
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                  if (errors.lastName) setErrors({ ...errors, lastName: '' });
                }}
                placeholder={t('lastNamePlaceholder')}
                className={`border-[#EDEDED] ${
                  errors.lastName ? 'border-red-500' : ''
                } text-[14px] placeholder:text-[#7E7E7E]`}
                dir={isRTL ? 'rtl' : 'ltr'}
                required
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-[#353535] font-medium text-right block">
                {t('phoneNumber')}
              </Label>
              <PhoneInput
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(value) => {
                  setFormData({ ...formData, phoneNumber: value });
                  if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
                }}
                error={errors.phoneNumber}
                isRTL={isRTL}
                disabled
                required
              />
            </div>

            {/* Request Title (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="requestTitle" className="text-[#353535] font-medium text-right block">
                {t('requestTitle')}
              </Label>
              <Input
                id="requestTitle"
                value={formData.requestTitle}
                onChange={(e) => setFormData({ ...formData, requestTitle: e.target.value })}
                placeholder={t('requestTitlePlaceholder')}
                className="border-[#EDEDED] text-[14px] placeholder:text-[#7E7E7E]"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-2">
              <div className="flex items-start gap-3" dir={isRTL ? 'rtl' : 'ltr'}>
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={(e) => {
                    setFormData({ ...formData, agreeTerms: e.target.checked });
                    if (errors.agreeTerms) setErrors({ ...errors, agreeTerms: '' });
                  }}
                  className={`w-5 h-5 text-[#00B8A9] border-[#E7E7E7] rounded focus:ring-[#00B8A9] mt-1 ${
                    errors.agreeTerms ? 'border-red-500' : ''
                  }`}
                  required
                />
                <Label
                  htmlFor="agreeTerms"
                  className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                >
                  {t('agreeTerms')}{' '}
                  <a href="/terms" className="text-[#00B8A9] font-semibold underline">
                    {t('termsLink')}
                  </a>{' '}
                  {t('and')}{' '}
                  <a href="/privacy" className="text-[#00B8A9] font-semibold underline">
                    {t('privacyLink')}
                  </a>
                  {isRTL && ' الخاصة بنا'}
                </Label>
              </div>
              {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!formData.agreeTerms}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-600 font-semibold py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('submitButton')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
