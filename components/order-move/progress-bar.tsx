'use client';

import { useLanguage } from '@/contexts/language-context';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 h-full bg-[#00B8A9] transition-all duration-300 ease-in-out"
          style={{
            width: `${progress}%`,
            [isRTL ? 'right' : 'left']: 0,
          }}
        />
      </div>

      {/* Step Counter */}
      <div className="flex items-center justify-between mt-2">
        <div className="text-sm text-gray-600">
          {isRTL ? (
            <>
              الخطوة {currentStep} من {totalSteps}
            </>
          ) : (
            <>
              Step {currentStep} of {totalSteps}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

