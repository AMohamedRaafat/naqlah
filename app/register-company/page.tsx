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
import { Camera, Paperclip, Eye, EyeOff, X } from 'lucide-react';
import Image from 'next/image';

export default function RegisterCompanyPage() {
  const t = useTranslations('registerCompany');
  const { locale } = useLanguage();
  const router = useRouter();
  const isRTL = locale === 'ar';

  const [formData, setFormData] = useState({
    companyLogo: null as File | null,
    companyName: '',
    covenant: '',
    commercialRegistration: null as File | null,
    city: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretCode: '',
    services: [] as string[],
    aboutCompany: '',
    agreeTerms: false,
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
    // Handle form submission
    console.log('Form submitted:', formData);
    // You can add validation and API call here
  };

  return (
    <div className="min-h-screen pb-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          {/* Company Logo Upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <Image src={logoPreview} alt="Logo" fill className="object-cover rounded-full" />
                ) : (
                  <Camera className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <label
                htmlFor="logo-upload"
                className="absolute bottom-0 right-0 w-10 h-10 bg-[#00B8A9] rounded-full flex items-center justify-center cursor-pointer shadow-lg"
              >
                <Camera className="w-5 h-5 text-white" />
              </label>
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>
            <p className="text-[#00B8A9] text-sm mt-2">{t('uploadLogo')}</p>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-[#353535] font-medium">
              {t('companyName')}
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="border-[#EDEDED]"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Covenant */}
          <div className="space-y-2">
            <Label htmlFor="covenant" className="text-[#353535] font-medium">
              {t('covenant')}
            </Label>
            <Input
              id="covenant"
              value={formData.covenant}
              onChange={(e) => setFormData({ ...formData, covenant: e.target.value })}
              className="border-[#EDEDED]"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Commercial Registration */}
          <div className="space-y-2">
            <Label htmlFor="commercial-reg" className="text-[#353535] font-medium">
              {t('commercialRegistration')}
            </Label>
            <div className="relative">
              <Input
                id="commercial-reg"
                value={formData.commercialRegistration?.name || ''}
                placeholder={t('attachFile')}
                readOnly
                className="border-[#EDEDED] pr-20"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <label
                htmlFor="file-upload"
                className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <Paperclip className="w-5 h-5 text-gray-400" />
              </label>
              <input
                type="file"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileUpload}
              />
              {formData.commercialRegistration && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, commercialRegistration: null })}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
              )}
            </div>
            {formData.commercialRegistration && (
              <p className="text-[#00B8A9] text-sm flex items-center gap-2">
                <Paperclip className="w-4 h-4" />
                {t('fileAttached')}
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-[#353535] font-medium">
              {t('city')}
            </Label>
            <Select
              value={formData.city}
              onValueChange={(value) => setFormData({ ...formData, city: value })}
            >
              <SelectTrigger className="border-[#EDEDED]">
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
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#353535] font-medium">
              {t('email')}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-[#EDEDED]"
              dir="ltr"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#353535] font-medium">
              {t('password')}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border-[#EDEDED] pr-12"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-[#353535] font-medium">
              {t('confirmPassword')}
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="border-[#EDEDED] pr-12"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Secret Code */}
          <div className="space-y-2">
            <Label htmlFor="secretCode" className="text-[#353535] font-medium">
              {t('secretCode')}
            </Label>
            <Input
              id="secretCode"
              type="tel"
              value={formData.secretCode}
              onChange={(e) =>
                setFormData({ ...formData, secretCode: e.target.value.replace(/\D/g, '') })
              }
              maxLength={4}
              className="border-[#EDEDED]"
              dir="ltr"
              placeholder="+966 591002006"
            />
          </div>

          {/* Featured Services */}
          <div className="space-y-3">
            <Label className="text-[#353535] font-medium">{t('featuredServices')}</Label>
            <Select>
              <SelectTrigger className="border-[#EDEDED]">
                <SelectValue placeholder={t('selectServices')} />
              </SelectTrigger>
              <SelectContent>
                {availableServices.map((service) => (
                  <SelectItem
                    key={service.id}
                    value={service.id}
                    onClick={() => toggleService(service.id)}
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
                      className="inline-flex items-center gap-2 bg-[#E8F8F6] text-[#00B8A9] px-3 py-1.5 rounded-full text-sm"
                    >
                      <span>{service?.label}</span>
                      <button
                        type="button"
                        onClick={() => toggleService(serviceId)}
                        className="hover:bg-[#00B8A9] hover:text-white rounded-full p-0.5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* About Company */}
          <div className="space-y-2">
            <Label htmlFor="aboutCompany" className="text-[#353535] font-medium">
              {t('aboutCompany')}
            </Label>
            <Textarea
              id="aboutCompany"
              value={formData.aboutCompany}
              onChange={(e) => setFormData({ ...formData, aboutCompany: e.target.value })}
              placeholder={t('aboutCompanyPlaceholder')}
              className="border-[#EDEDED] min-h-[100px] resize-none"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={formData.agreeTerms}
              onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
              className="w-5 h-5 text-[#00B8A9] border-[#E7E7E7] rounded focus:ring-[#00B8A9]"
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
