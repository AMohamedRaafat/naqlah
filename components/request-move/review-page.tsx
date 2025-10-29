'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Pencil, Check, Map } from 'lucide-react';
import Image from 'next/image';
import { OrderFormData } from '@/app/request-move/page';
import RouteMapModal from './route-map-modal';

interface ReviewPageProps {
  formData: OrderFormData;
  onEdit: (step: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function ReviewPage({ formData, onEdit, onSubmit, onBack }: ReviewPageProps) {
  const t = useTranslations('orderMove.review');
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';
  const [showMapModal, setShowMapModal] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const getFurnitureLabel = (name: string) => {
    const labels: Record<string, { ar: string; en: string }> = {
      bed: { ar: 'سرير', en: 'Bed' },
      wardrobe: { ar: 'دولاب', en: 'Wardrobe' },
      sofa: { ar: 'صوفا', en: 'Sofa' },
      table: { ar: 'طاولة', en: 'Table' },
      desk: { ar: 'مكتب', en: 'Desk' },
    };
    return isRTL ? labels[name]?.ar : labels[name]?.en;
  };

  const getServiceLabel = (value: string) => {
    if (value === 'yes') return isRTL ? 'نعم' : 'Yes';
    if (value === 'no') return isRTL ? 'لا' : 'No';
    return '-';
  };

  const getSizeLabel = (value: string) => {
    const labels: Record<string, { ar: string; en: string }> = {
      small: { ar: 'صغير', en: 'Small' },
      medium: { ar: 'وسط', en: 'Medium' },
      large: { ar: 'كبير', en: 'Large' },
    };
    return isRTL ? labels[value]?.ar : labels[value]?.en;
  };

  return (
    <div className="w-full">
      {/* Date & Time Section */}
      <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">{t('dateTime') || 'الموعد والمرونة'}</h3>
          <button
            onClick={() => onEdit(7)}
            className="text-[#00B8A9] hover:text-[#009688] transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>
        <div className="text-right space-y-1">
          <p className="text-gray-700">
            {formatDate(formData.dateTime.date)} {formData.dateTime.time} {formData.dateTime.period}
          </p>
        </div>
      </div>

      {/* Personal Info Section */}
      <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">{t('personalInfo') || 'البيانات الشخصية'}</h3>
          <button
            onClick={() => {}} // This would open profile edit
            className="text-[#00B8A9] hover:text-[#009688] transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>
        <div className="text-right space-y-1">
          <p className="text-gray-700">{t('name') || 'مصدر القهوتاوي'}</p>
          <p className="text-gray-600">598839405</p>
          <p className="text-gray-600">{t('newAddress') || 'منزل جديد'}</p>
        </div>
      </div>

      {/* Destination Address Section */}
      <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">{t('destinationAddress') || 'العنوان: المراد النقل إليه'}</h3>
          <button
            onClick={() => onEdit(3)}
            className="text-[#00B8A9] hover:text-[#009688] transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>
        <div className="text-right space-y-1">
          <p className="text-sm font-bold text-gray-900">{formData.destinationLocation.city}</p>
          <p className="text-sm text-gray-600">{formData.destinationLocation.address}</p>
          <p className="text-sm text-gray-600">{t('floor') || 'طابق'} {formData.destinationDetails.floor}</p>
          <p className="text-sm text-gray-600">{t('elevator') || 'يوجد مصعد'}: {getServiceLabel(formData.destinationDetails.hasElevator)}</p>
          <p className="text-sm text-gray-600">{t('elevatorSize') || 'مصعد كبير'}: {getSizeLabel(formData.destinationDetails.elevatorSize)}</p>
          {formData.destinationDetails.additionalNotes && (
            <>
              <p className="text-sm text-gray-600 mt-2">-</p>
              <p className="text-sm text-gray-600">{formData.destinationDetails.additionalNotes}</p>
            </>
          )}
        </div>
      </div>

      {/* Pickup Address Section */}
      <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">{t('pickupAddress') || 'عنوان النقل الحالي'}</h3>
          <button
            onClick={() => onEdit(1)}
            className="text-[#00B8A9] hover:text-[#009688] transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>
        <div className="text-right space-y-1">
          <p className="text-sm font-bold text-gray-900">{formData.pickupLocation.city}</p>
          <p className="text-sm text-gray-600">{formData.pickupLocation.address}</p>
          <p className="text-sm text-gray-600">{t('floor') || 'طابق'} {formData.pickupDetails.floor}</p>
          <p className="text-sm text-gray-600">{t('elevator') || 'يوجد مصعد'}: {getServiceLabel(formData.pickupDetails.hasElevator)}</p>
          <p className="text-sm text-gray-600">{t('elevatorSize') || 'مصعد'}: {getSizeLabel(formData.pickupDetails.elevatorSize)}</p>
          {formData.pickupDetails.additionalNotes && (
            <>
              <p className="text-sm text-gray-600 mt-2">-</p>
              <p className="text-sm text-gray-600">{formData.pickupDetails.additionalNotes}</p>
            </>
          )}
        </div>
      </div>

      {/* Additional Services Section */}
      <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">{t('additionalServices') || 'الخدمات الإضافية'}</h3>
          <button
            onClick={() => onEdit(6)}
            className="text-[#00B8A9] hover:text-[#009688] transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>
        <div className="text-right space-y-1">
          <p className="text-sm text-gray-700">{t('packaging') || 'تغليف محكم'}: {getServiceLabel(formData.additionalServices.packaging)}</p>
          <p className="text-sm text-gray-700">{t('insurance') || 'تأمين ضد الفقد والكسر'}: {getServiceLabel(formData.additionalServices.insurance)}</p>
          <p className="text-sm text-gray-700">{t('disassembly') || 'فك وتركيب'}: {getServiceLabel(formData.additionalServices.needDisassembly)}</p>
          {formData.furnitureDetails.furniture.map((item, index) => (
            <p key={index} className="text-sm text-gray-700">
              {item.quantity} {getFurnitureLabel(item.name)}
            </p>
          ))}
          {formData.additionalServices.cleaningBefore === 'yes' && (
            <p className="text-sm text-gray-700">{t('cleaningBefore') || 'تنظيف قبل النقل'}</p>
          )}
          {formData.additionalServices.cleaningAfter === 'yes' && (
            <p className="text-sm text-gray-700">{t('cleaningAfter') || 'تنظيف بعد النقل'}</p>
          )}
        </div>
      </div>

      {/* Furniture Details Section */}
      <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">{t('furnitureDetails') || 'تفاصيل الأثاث'}</h3>
          <button
            onClick={() => onEdit(5)}
            className="text-[#00B8A9] hover:text-[#009688] transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>
        <div className="text-right space-y-1 mb-4">
          <p className="text-sm text-gray-700">{formData.furnitureDetails.roomsCount} {t('rooms') || 'غرف'}</p>
          {formData.furnitureDetails.furniture.map((item, index) => (
            <p key={index} className="text-sm text-gray-700">
              {item.quantity} {getFurnitureLabel(item.name)}
            </p>
          ))}
        </div>
        
        {/* Photos */}
        {formData.furnitureDetails.photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {formData.furnitureDetails.photos.slice(0, 3).map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={URL.createObjectURL(photo)}
                  alt={`Furniture ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Terms Checkbox */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="flex-shrink-0 mt-1">
            <div className="w-5 h-5 rounded border-2 border-[#00B8A9] bg-[#00B8A9] flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-700 text-right flex-1">
            {t('agreeTerms') || 'أوافق علي شروط الاستخدام وسياسة الخصوصية الخاصة بنا'}
          </p>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-6 text-base rounded-xl"
        >
          {t('back') || 'تراجع'}
        </Button>
        <Button
          onClick={onSubmit}
          className="flex-1 bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-base rounded-xl"
        >
          {t('confirm') || 'تأكيد الطلب'}
        </Button>
      </div>

      {/* Show Map Button */}
      <Button
        onClick={() => setShowMapModal(true)}
        variant="outline"
        className="w-full mt-3 bg-white border-2 border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9] hover:text-white font-semibold py-6 text-base rounded-xl flex items-center justify-center gap-2"
      >
        <Map className="w-5 h-5" />
        {t('showMap') || 'أظهر الخريطة'}
      </Button>

      {/* Route Map Modal */}
      <RouteMapModal
        open={showMapModal}
        onOpenChange={setShowMapModal}
        pickupLocation={{
          lat: formData.pickupLocation.lat,
          lng: formData.pickupLocation.lng,
          address: formData.pickupLocation.address,
        }}
        destinationLocation={{
          lat: formData.destinationLocation.lat,
          lng: formData.destinationLocation.lng,
          address: formData.destinationLocation.address,
        }}
      />
    </div>
  );
}

