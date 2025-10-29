'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { ChevronDown, Upload, X } from 'lucide-react';
import Image from 'next/image';

interface Step5Props {
  data: {
    roomsCount: string;
    furniture: Array<{ name: string; quantity: number }>;
    photos: File[];
  };
  onNext: (data: any) => void;
  onBack: () => void;
}

const furnitureOptions = [
  { value: 'bed', label: 'سرير', labelEn: 'Bed' },
  { value: 'wardrobe', label: 'دولاب', labelEn: 'Wardrobe' },
  { value: 'sofa', label: 'صوفا', labelEn: 'Sofa' },
  { value: 'table', label: 'طاولة', labelEn: 'Table' },
  { value: 'desk', label: 'مكتب', labelEn: 'Desk' },
];

export default function Step5FurnitureDetails({ data, onNext, onBack }: Step5Props) {
  const t = useTranslations('orderMove.step5');
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [roomsCount, setRoomsCount] = useState(data.roomsCount || '');
  const [furniture, setFurniture] = useState<Array<{ name: string; quantity: number }>>(
    data.furniture || []
  );
  const [selectedItem, setSelectedItem] = useState('');
  const [itemQuantity, setItemQuantity] = useState('5');
  const [photos, setPhotos] = useState<File[]>(data.photos || []);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  const handleAddFurniture = () => {
    if (!selectedItem || !itemQuantity) return;

    const existingIndex = furniture.findIndex((f) => f.name === selectedItem);
    if (existingIndex >= 0) {
      const updated = [...furniture];
      updated[existingIndex].quantity = parseInt(itemQuantity);
      setFurniture(updated);
    } else {
      setFurniture([...furniture, { name: selectedItem, quantity: parseInt(itemQuantity) }]);
    }
    setSelectedItem('');
    setItemQuantity('5');
  };

  const handleRemoveFurniture = (index: number) => {
    setFurniture(furniture.filter((_, i) => i !== index));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPhotos = [...photos, ...files];
    setPhotos(newPhotos);

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews([...photoPreviews, ...newPreviews]);
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = photoPreviews.filter((_, i) => i !== index);
    
    // Revoke the object URL to free memory
    URL.revokeObjectURL(photoPreviews[index]);
    
    setPhotos(newPhotos);
    setPhotoPreviews(newPreviews);
  };

  const handleNext = () => {
    if (!roomsCount) {
      alert(t('selectRooms') || 'الرجاء تحديد عدد الغرف');
      return;
    }
    onNext({ furnitureDetails: { roomsCount, furniture, photos } });
  };

  const getFurnitureLabel = (value: string) => {
    const option = furnitureOptions.find((opt) => opt.value === value);
    return isRTL ? option?.label : option?.labelEn;
  };

  return (
    <div className="w-full">
      {/* Title Card */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 text-center mb-2">
          {t('title') || 'تفاصيل الأثاث'}
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          {t('subtitle') || 'يرجي إدخال كافة المعلومات المطلوبة'}
        </p>

        {/* Rooms Count */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
            {t('roomsCount') || 'عدد الغرف'}
          </label>
          <div className="relative">
            <select
              value={roomsCount}
              onChange={(e) => setRoomsCount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm appearance-none bg-white"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="">{t('selectRooms') || 'اختر عدد الغرف'}</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Furniture Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
            {t('furnitureItems') || 'القطع والأثاث'}
          </label>
          
          {/* Add Item Row */}
          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm appearance-none bg-white"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t('selectItem') || 'حدد القطع والأثاث'}</option>
                {furnitureOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {isRTL ? option.label : option.labelEn}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            <input
              type="number"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              min="1"
              className="w-20 px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] text-sm text-center"
            />

            <Button
              onClick={handleAddFurniture}
              className="bg-[#00B8A9] hover:bg-[#009688] text-white px-6 rounded-xl"
            >
              {t('add') || 'إضافة'}
            </Button>
          </div>

          {/* Added Items */}
          {furniture.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {furniture.map((item, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-[#00B8A9] text-white rounded-lg text-sm"
                >
                  <span>
                    {item.quantity} {getFurnitureLabel(item.name)}
                  </span>
                  <button
                    onClick={() => handleRemoveFurniture(index)}
                    className="hover:bg-white/20 rounded-full p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
            {t('uploadPhotos') || 'رفع صور وفيديو الأثاث *'}
          </label>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center hover:border-[#00B8A9] transition-colors"
          >
            <Upload className="w-8 h-8 text-[#00B8A9] mb-2" />
            <p className="text-sm text-gray-600">
              {t('uploadHint') || 'أرفق بصيغة PNG, JPG, MP4'}
            </p>
          </button>

          {/* Photo Previews */}
          {photoPreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {photoPreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleNext}
          className="flex-1 bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-base rounded-md"
        >
          {t('continue') || 'التالي'}
        </Button>
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-2 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-6 text-base rounded-md"
        >
          {t('back') || 'تراجع'}
        </Button>
      </div>
    </div>
  );
}

