'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Step7Props {
  data: {
    date: Date | null;
    time: string;
    period: 'AM' | 'PM';
  };
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function Step7DateTime({ data, onNext, onBack }: Step7Props) {
  const t = useTranslations('orderMove.step7');
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';

  const [selectedDate, setSelectedDate] = useState<Date | null>(data.date || null);
  const [time, setTime] = useState(data.time || '11:30');
  const [period, setPeriod] = useState<'AM' | 'PM'>(data.period || 'AM');

  const handleNext = () => {
    if (!selectedDate) {
      alert(t('selectDateError') || 'الرجاء تحديد التاريخ');
      return;
    }
    onNext({ dateTime: { date: selectedDate, time, period } });
  };

  const hours = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1;
    return hour.toString().padStart(2, '0');
  });

  const minutes = ['00', '15', '30', '45'];

  const [selectedHour, selectedMinute] = time.split(':');

  const handleTimeChange = (hour: string, minute: string) => {
    setTime(`${hour}:${minute}`);
  };

  return (
    <div className="w-full">
      {/* Title Card */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="text-[14px] font-bold text-[#353535] text-start mb-2">
          {t('title') || 'الموعد والمرونة'}
        </h2>
        <p className="text-[12px] text-[#494A4D] text-start mb-6">
          {t('subtitle') || 'يرجي تحديد تاريخ ووقت النقل المطلوب'}
        </p>

        {/* Time Picker */}
        <div className="mb-6">
          <label className="block text-[12px] font-regular text-[#353535] mb-3 text-start">
            {t('time') || 'الساعة'}
          </label>

          <div className="flex items-center justify-center gap-3 mb-4">
            {/* AM/PM Toggle */}
            <div
              className={`flex bg-gray-200 rounded-lg p-1 ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <button
                onClick={() => setPeriod('AM')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  period === 'AM' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                AM
              </button>
              <button
                onClick={() => setPeriod('PM')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  period === 'PM' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                PM
              </button>
            </div>

            {/* Time Display */}
            <div
              className={`flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg
                  ${isRTL ? 'flex-row-reverse' : 'flex-row'}
              `}
            >
              <select
                value={selectedHour}
                onChange={(e) => handleTimeChange(e.target.value, selectedMinute)}
                className="bg-transparent text-xl font-bold text-gray-900 focus:outline-none"
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <span className="text-xl font-bold">:</span>
              <select
                value={selectedMinute}
                onChange={(e) => handleTimeChange(selectedHour, e.target.value)}
                className="bg-transparent text-xl font-bold text-gray-900 focus:outline-none"
              >
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-[12px] text-[#A7A7A7] text-start">
            {t('note') ||
              'قد تحدث تغيرات بسيطة في التوقيت بسبب الازدحام أو إعادة تنسيق الجداول التشغيلية'}
          </p>
        </div>

        {/* Date Picker */}
        <div>
          <label className="block text-[14px] font-regualr text-[#353535] mb-3 text-start">
            {t('date') || 'التاريخ'}
          </label>

          <div className="flex justify-center" dir="ltr">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              calendarClassName="custom-calendar"
              className="w-full text-[14px] font-regular text-[#353535]"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-2 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-6 text-base rounded-xl"
        >
          {t('back') || 'تراجع'}
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-base rounded-xl"
        >
          {t('continue') || 'التالي'}
        </Button>
      </div>

      <style jsx global>{`
        .react-datepicker {
          border: none;
          font-family: inherit;
        }
        .react-datepicker__header {
          background-color: white;
          border-bottom: 1px solid #e5e7eb;
          padding-top: 1rem;
        }
        .react-datepicker__current-month {
          color: #1f2937;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        .react-datepicker__day-name {
          color: #6b7280;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .react-datepicker__day {
          color: #374151;
          font-weight: 500;
        }
        .react-datepicker__day:hover {
          background-color: #f3f4f6;
          border-radius: 0.5rem;
        }
        .react-datepicker__day--selected {
          background-color: #00b8a9 !important;
          color: white !important;
          border-radius: 0.5rem;
          font-weight: 700;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: #d2f2f0;
          border-radius: 0.5rem;
        }
        .react-datepicker__day--disabled {
          color: #d1d5db !important;
        }
      `}</style>
    </div>
  );
}
