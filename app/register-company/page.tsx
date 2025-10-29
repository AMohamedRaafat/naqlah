'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PhoneInput } from '@/components/ui/phone-input';
import { Camera, Paperclip, Eye, EyeOff, X } from 'lucide-react';
import Image from 'next/image';
import { registerCompanySchema, safeValidate } from '@/lib/validations/schemas';

export default function RegisterCompanyPage() {
  const t = useTranslations('registerCompany');
  const { locale } = useLanguage();
  const router = useRouter();
  const isRTL = locale === 'ar';

  const [formData, setFormData] = useState({
    companyLogo: null as File | null,
    companyName: '',
    commercialRegistration: null as File | null,
    city: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    services: [] as string[],
    aboutCompany: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({
    companyName: '',
    city: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    services: '',
    aboutCompany: '',
    agreeTerms: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('');

  // Available services
  const availableServices = [
    { id: 'disassembly', label: t('services.disassembly') },
    { id: 'packing', label: t('services.packing') },
    { id: 'insurance', label: t('services.insurance') },
    { id: 'cleaning', label: t('services.cleaning') },
    { id: 'moving', label: t('services.moving') },
  ];

  // Saudi cities
  const cities = ['jeddah', 'riyadh', 'dammam', 'mecca', 'medina', 'khobar', 'tabuk', 'abha'];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, companyLogo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, commercialRegistration: file });
    }
  };

  const toggleService = (serviceId: string) => {
    if (formData.services.includes(serviceId)) {
      setFormData({
        ...formData,
        services: formData.services.filter((s) => s !== serviceId),
      });
    } else {
      setFormData({
        ...formData,
        services: [...formData.services, serviceId],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate using Zod schema
    const validation = safeValidate(registerCompanySchema, formData);

    if (!validation.success) {
      // Set all errors from Zod validation
      setErrors({
        companyName: validation.errors?.companyName || '',
        city: validation.errors?.city || '',
        email: validation.errors?.email || '',
        password: validation.errors?.password || '',
        confirmPassword: validation.errors?.confirmPassword || '',
        phoneNumber: validation.errors?.phoneNumber || '',
        services: validation.errors?.services || '',
        aboutCompany: validation.errors?.aboutCompany || '',
        agreeTerms: validation.errors?.agreeTerms || '',
      });

      // Scroll to first error
      const firstErrorField = Object.keys(validation.errors || {})[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element?.focus();
      }

      return;
    }

    // Handle form submission with validated data
    console.log('Form submitted:', validation.data);
    // You can add API call here
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen pb-8 bg-[#fafafa] p-4">
      <div className="container bg-white mx-auto px-4 max-w-2xl py-6 rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          {/* Company Logo Upload */}
          <div className="flex flex-row items-center justify-between">
            <div className="relative flex items-center gap-4">
              <label
                htmlFor="logo-upload"
                className="w-20 h-20 rounded-full border border-gray-200 bg-white flex items-center justify-center overflow-hidden"
              >
                {logoPreview ? (
                  <Image src={logoPreview} alt="Logo" fill className="object-cover rounded-full" />
                ) : (
                  <Camera className="w-12 h-12 text-gray-400 rounded-full p-2" />
                )}
              </label>
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
              <p className="text-[#353535] text-md mt-2">{t('companyLogo')}</p>
            </div>
            <p className="text-[#00B8A9] text-sm mt-2">{t('uploadLogo')}</p>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-[#353535] font-medium">
              {t('companyName')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => {
                setFormData({ ...formData, companyName: e.target.value });
                if (errors.companyName) setErrors({ ...errors, companyName: '' });
              }}
              className={`border-[#EDEDED] ${errors.companyName ? 'border-red-500' : ''}`}
              dir={isRTL ? 'rtl' : 'ltr'}
              required
            />
            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
          </div>

          {/* Commercial Registration */}
          <div className="space-y-2">
            <Label htmlFor="commercial-reg" className="text-[#353535] font-medium">
              {t('commercialRegistration')}
            </Label>
            <div className="relative">
              {/* <Input
                id="commercial-reg"
                value={formData.commercialRegistration?.name || ''}
                placeholder={t('attachFile')}
                readOnly
                className="border-[#EDEDED]  text-start"
                dir={isRTL ? 'rtl' : 'ltr'}
              /> */}
              <label
                htmlFor="file-upload"
                className="border border-gray-200 rounded-md p-3 flex items-center gap-2 justify-between"
              >
                <p className="text-[#A3A3A3] text-sm">{t('attachFile')}</p>
                <Paperclip className="w-5 h-5 text-gray-400" />
              </label>

              <input
                type="file"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
            {formData.commercialRegistration && (
              <p className="text-[#00B8A9] text-sm flex items-center gap-2 border border-[#EDEDED] rounded-md p-2 w-fit">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, commercialRegistration: null })}
                >
                  <X className="w-5 h-5 text-[#00B8A9]" />
                </button>
                <Paperclip className="w-4 h-4" />
                {t('fileAttached')}
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-[#353535] font-medium">
              {t('city')} <span className="text-red-500">*</span>
            </Label>
            <Select
              dir={isRTL ? 'rtl' : 'ltr'}
              value={formData.city}
              onValueChange={(value) => {
                setFormData({ ...formData, city: value });
                if (errors.city) setErrors({ ...errors, city: '' });
              }}
              required
            >
              <SelectTrigger className={`border-[#EDEDED] ${errors.city ? 'border-red-500' : ''}`}>
                <SelectValue placeholder={t('selectCity')} />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {t(`cities.${city}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#353535] font-medium">
              {t('email')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className={`border-[#EDEDED] ${errors.email ? 'border-red-500' : ''}`}
              dir="ltr"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#353535] font-medium">
              {t('password')} <span className="text-red-500">*</span>
            </Label>
            <div className="relative" dir={isRTL ? 'rtl' : 'ltr'}>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                className={`border-[#EDEDED] ${isRTL ? 'pl-12' : 'pr-12'} ${
                  errors.password ? 'border-red-500' : ''
                }`}
                dir={isRTL ? 'rtl' : 'ltr'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${
                  isRTL ? 'left-3' : 'right-3'
                }`}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-[#353535] font-medium">
              {t('confirmPassword')} <span className="text-red-500">*</span>
            </Label>
            <div className="relative" dir={isRTL ? 'rtl' : 'ltr'}>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                }}
                className={`border-[#EDEDED] ${isRTL ? 'pl-12' : 'pr-12'} ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
                dir={isRTL ? 'rtl' : 'ltr'}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${
                  isRTL ? 'left-3' : 'right-3'
                }`}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-[#353535] font-medium">
              {t('phoneNumber')} <span className="text-red-500">*</span>
            </Label>
            <PhoneInput
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(value) => {
                setFormData({ ...formData, phoneNumber: value });
                if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
              }}
              error={errors.phoneNumber}
              placeholder={t('phoneNumberPlaceholder')}
              isRTL={isRTL}
              required
            />
          </div>

          {/* Featured Services */}
          <div className="space-y-3">
            <Label className="text-[#353535] font-medium">
              {t('featuredServices')} <span className="text-red-500">*</span>
            </Label>
            <Select dir={isRTL ? 'rtl' : 'ltr'}>
              <SelectTrigger
                className={`border-[#EDEDED] ${errors.services ? 'border-red-500' : ''}`}
              >
                <SelectValue placeholder={t('selectServices')} />
              </SelectTrigger>
              <SelectContent>
                {availableServices.map((service) => (
                  <SelectItem
                    key={service.id}
                    value={service.id}
                    onClick={() => {
                      toggleService(service.id);
                      if (errors.services) setErrors({ ...errors, services: '' });
                    }}
                  >
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Selected Services as Chips */}
            {formData.services.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.services.map((serviceId) => {
                  const service = availableServices.find((s) => s.id === serviceId);
                  return (
                    <div
                      key={serviceId}
                      className="inline-flex items-center gap-2 bg-[#fff] text-[#35353] px-3 py-1.5 rounded-md border border-[#ededed] text-sm"
                    >
                      <button
                        type="button"
                        onClick={() => toggleService(serviceId)}
                        className=" hover:bg-[#00B8A9] hover:text-white rounded-full p-0.5"
                      >
                        <X className="w-4 h-4 text-[#00B8A9]" />
                      </button>
                      <span>{service?.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
            {errors.services && <p className="text-red-500 text-sm">{errors.services}</p>}
          </div>

          {/* About Company */}
          <div className="space-y-2">
            <Label htmlFor="aboutCompany" className="text-[#353535] font-medium">
              {t('aboutCompany')} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="aboutCompany"
              value={formData.aboutCompany}
              onChange={(e) => {
                setFormData({ ...formData, aboutCompany: e.target.value });
                if (errors.aboutCompany) setErrors({ ...errors, aboutCompany: '' });
              }}
              placeholder={t('aboutCompanyPlaceholder')}
              className={`border-[#EDEDED] min-h-[100px] resize-none ${
                errors.aboutCompany ? 'border-red-500' : ''
              }`}
              dir={isRTL ? 'rtl' : 'ltr'}
              required
            />
            {errors.aboutCompany && <p className="text-red-500 text-sm">{errors.aboutCompany}</p>}
          </div>

          {/* Terms Checkbox */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={(e) => {
                  setFormData({ ...formData, agreeTerms: e.target.checked });
                  if (errors.agreeTerms) setErrors({ ...errors, agreeTerms: '' });
                }}
                className={`w-5 h-5 text-[#00B8A9] border-[#E7E7E7] rounded focus:ring-[#00B8A9] ${
                  errors.agreeTerms ? 'border-red-500' : ''
                }`}
                required
              />
              <Label htmlFor="agreeTerms" className="text-sm text-gray-700 cursor-pointer">
                {t('agreeTerms')}{' '}
                <a href="/terms" className="text-[#00B8A9] underline">
                  {t('termsLink')}
                </a>{' '}
                {t('and')}{' '}
                <a href="/privacy" className="text-[#00B8A9] underline">
                  {t('privacyLink')}
                </a>
              </Label>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!formData.agreeTerms}
            className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('submitButton')}
          </Button>
        </form>
      </div>
    </div>
  );
}
